import {Menu, Search} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import React from 'react';
import firebase from './utils/firebase';

function Header(){
    const [user, setUser] = React.useState(null);
    React.useEffect(() => {
        firebase.auth().onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
    }, []);
    
    return (
    <Menu>
        <Menu.Item as={Link} to="/">
            Fake instagram
        </Menu.Item>
        {/* <Menu.Menu>
            <Search />
        </Menu.Menu> */}
        <Menu.Menu position='right'>
            {user ? (
            <>
                <Menu.Item as={Link} to="/new-post">發表動態</Menu.Item>
                <Menu.Item as={Link} to="/my">個人檔案</Menu.Item>
                <Menu.Item onClick={() => firebase.auth().signOut()}>登出</Menu.Item>
            </>
            ) : (
                <Menu.Item as={Link} to="/signin">登入/註冊</Menu.Item>
            )}
        </Menu.Menu>
    </Menu>
    );
}

export default Header;
