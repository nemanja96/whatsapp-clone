import React from 'react'
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import getRecipientEmail from '../utils/getRecipientEmail';
import {useCollection} from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/router';

function Chat({ id, users }) {

  const router = useRouter();
  const [user] = useAuthState(auth);
  const [recipientSnapshot] = useCollection(db.collection('users').where('email', '==', getRecipientEmail(users, user)))

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(users, user);

  console.log(recipient)

  const enterChat = () => {
    router.push(`/chat/${id}`);
  }

  return (
    <Container onClick={enterChat}>
        { recipient ? <UserAvatar src={recipient?.photoURL} /> : <UserAvatar>{recipientEmail[0].toUpperCase()}</UserAvatar> }
        {recipientEmail}
    </Container>
  )
}

export default Chat

const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 15px;
    word-break: break-word;

    &:hover{
        background: #e9eaeb;
    }
`

const UserAvatar = styled(Avatar)`
    margin: 5px;
    margin-right: 15px;
`   