import React from 'react'
import styled from 'styled-components';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useCollection} from 'react-firebase-hooks/firestore';
import Message from './Message';

function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [messagesSnapshot] = useCollection(db.collection("chats").doc(router.query.id).collection("messages").orderBy('timestamp', 'asc'));

  const showMessages = () => {
    if(messagesSnapshot){
      return messagesSnapshot.docs.map(message => (
        <Message key={message.id} user={message.data().user} message={{
          ...message.data(),
          timestamp: message.data().timestamp?.toDate().getTime()
        }} />
      ))
    }
  }

  return (
    <Container>
      <Header>
        <Avatar />
        <HeaderInformation>
          <h3>Rec Email</h3>
          <p>last seen ...</p>
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>

      <MessageContainer>
        {showMessages()}
        <EndOfMessage />
      </MessageContainer>
    </Container>
  )
}

export default ChatScreen

const Container = styled.div`

`

const Header = styled.div`
  position: sticky;
  background: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3{
    margin-bottom: 3px;
  }

  > p{
    font-size: 14px;
    color: gray;
  }
`

const HeaderIcons = styled.div`

`

const MessageContainer = styled.div`

`

const EndOfMessage = styled.div`

`