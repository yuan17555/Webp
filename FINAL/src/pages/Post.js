import { useParams } from 'react-router-dom';
import {Container, Grid, Image, Header, Segment, Icon, Comment, Form} from 'semantic-ui-react';
import React from 'react';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

function Post(){
    const {postId} =useParams();
    const [post, setPost] = React.useState({
        author: {},
    });

    const [commentContent, setCommentContent] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [comments, setComments] = React.useState([]);

    React.useEffect(()=>{
        firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .onSnapshot((docSnapshot)=>{
            const data = docSnapshot.data();
            setPost(data);
        });
        // .get()
        // .then((docSnapshot)=>{
        //     const data = docSnapshot.data();
        //     setPost(data);
        // });
    }, []);

    React.useEffect(()=>{
        firebase
        .firestore()
        .collection('posts')
        .doc(postId)
        .collection('comments', 'desc')
        .orderBy('createdAt')
        .onSnapshot((collectionSnapshot)=>{
            const dataC = collectionSnapshot.docs.map(()=>{
                return ()=>{
                    doc.data();
                    // setComments("");
                }
            });
            setComments(dataC);
        });
    }, []);

    function toggleLiked(){
        const uid = firebase.auth().currentUser.uid;
        if(isLiked){
            firebase
            .firestore()
            .collection('posts')
            .doc(postId)
            .update({
                likedBy: firebase.firestore.FieldValue.arrayRemove(uid),
            });
        }
        else{
            firebase
            .firestore()
            .collection('posts')
            .doc(postId)
            .update({
                likedBy: firebase.firestore.FieldValue.arrayUnion(uid),
            });
        }
    }

    function togglebooked(){
        const uid = firebase.auth().currentUser.uid;
        if(isBooked){
            firebase
            .firestore()
            .collection('posts')
            .doc(postId)
            .update({
                bookedBy: firebase.firestore.FieldValue.arrayRemove(uid),
            });
        }
        else{
            firebase
            .firestore()
            .collection('posts')
            .doc(postId)
            .update({
                bookedBy: firebase.firestore.FieldValue.arrayUnion(uid),
            });
        }
    }

    const isLiked = post.likedBy?.includes(
        firebase.auth().currentUser.uid
    );
    const isBooked = post.bookedBy?.includes(
        firebase.auth().currentUser.uid
    );

    function onSubmit(){
        setIsLoading(true);
        const firestore = firebase.firestore();
        const batch = firestore.batch();
        const postRef = firestore.collection('posts').doc(postId);

        batch.update(postRef, {
            commentsCount:firebase.firestore.FieldValue.increment(1),
        });

        const commentRef = postRef.collection('comments').doc();

        batch.set(commentRef, {
            content: commentContent,
            // createdAt:firebase.firestore.Timestamp.now(),
            author: {
                uid: firebase.auth().currentUser.uid,
                displayName: firebase.auth().currentUser.displayName || '',
                photoURL: firebase.auth().currentUser.photoURL || '',
            },
        });

        batch.commit().then(() => {
            setCommentContent('');
            setIsLoading(false);
        });
    }

    return (
        <Container>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}></Grid.Column>
                    <Grid.Column width={10}>
                        {post.author.photoURL ? (
                            <Image src={post.author.photoURL}/>
                        ) : (
                            <Icon name='user circle' />
                        )}
                        {post.author.displayName || '使用者'}
                        <Image src={post.imageUrl} />
                        <Segment basic vertical >
                            <Icon 
                                name={`heart${isLiked ? '' : '' }`}
                                color={isLiked?'red':'grey outline'}
                                link
                                onClick={toggleLiked}
                            /> · 
                            <Icon 
                                name={`bookmark${isBooked ? '' : '' }`}
                                color={isBooked?'blue':'grey outline'}
                                link
                                onClick={togglebooked}
                            /> · 
                            讚 {post.likedBy?.length || 0} · 留言 {post.commentsCount || 0}
                        </Segment>
                        <Header>
                            {post.title}
                            {/* <Header.Subheader>
                                {post.createdAt?.toDtate().toLocaleDateString()}
                            </Header.Subheader> */}
                        </Header>
                        <Segment basic vertical>
                            {post.content}
                        </Segment>
                        <Comment.Group>
                            <Form>
                                <Form.TextArea value={commentContent} onChange={(e)=>setCommentContent(e.target.value)} />
                                <Form.Button onClick={onSubmit} loading={isLoading} >送出留言</Form.Button>
                            </Form>
                            <Header>共 {post.commentsCount || 0} 則留言</Header>
                            {comments.map((comment)=>{
                                return (
                                    <Comment>
                                        <Comment.Avatar src={comment.author.photoURL} />
                                        <Comment.Content>
                                            <Comment.Author>
                                                {comment.author.displayName || '使用者'}
                                            </Comment.Author>
                                            {/* <Comment.Metadata>
                                                {comment.createdAt.toDate().toLocateString()}
                                            </Comment.Metadata> */}
                                            <Comment.Text>
                                                {comment.content}
                                            </Comment.Text>
                                        </Comment.Content>
                                    </Comment>
                                );
                            })}
                        </Comment.Group>
                    </Grid.Column>
                    <Grid.Column width={3}></Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
}

export default Post;