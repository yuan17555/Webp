import React from 'react';
import {useHistory} from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import firebase from '../utils/firebase';

function Empty(){
    const history = useHistory();
    history.push('/empty');
    firebase
            .auth()
            .then(() => {
                history.push('/');

            })
    return (
        <Container>

        </Container>
    );
}

export default Empty;