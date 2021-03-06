import React, { useRef, useState } from 'react'
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
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import firebase from 'firebase/compat/app';
import TimeAgo from 'timeago-react';
import getRecipientEmail from '../utils/getRecipientEmail';

function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const EndOfMessageRef = useRef(null);
  const [input, setInput] = useState("");
  const [messagesSnapshot] = useCollection(db.collection("chats").doc(router.query.id).collection("messages").orderBy('timestamp', 'asc'));

  const showMessages = () => {
    if(messagesSnapshot){
      return messagesSnapshot.docs.map(message => (
        <Message key={message.id} user={message.data().user} message={{
          ...message.data(),
          timestamp: message.data().timestamp?.toDate().getTime()
        }} />
      ))
    } else {
      return JSON.parse(messages).map(message => (
        <Message key={message.id} user={message.user} message={message} />
      ))
    }
  }

  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(chat.users, user))
  )

  const scrollToBottom = () => {
    EndOfMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  const sendMessage = (e) => {
    e.preventDefault();

    // Update the last seen
    db.collection("users").doc(user.uid).set({
      lastSeen: firebase.firestore.FieldValue.serverTimestamp()
    }, {merge: true}) // don't overwrite everything

    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL
    })

    setInput("");
    scrollToBottom();
  }

  const recipient = recipientSnapshot?.docs?.[0]?.data();

  return (
    <Container>
      <Header>
        {recipient ? <Avatar src={recipient?.photoURL} /> : <Avatar />}
        <HeaderInformation>
          <h3>{getRecipientEmail(chat.users, user)}</h3>
          {recipientSnapshot ? (
          <p>Last active: {recipient?.lastSeen?.toDate() ? (
          <TimeAgo datetime={recipient?.lastSeen?.toDate()}/>) : ("Unavailable")}</p> 
          ) : (
            <p>Loading Last active ...</p>
          )}
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
        <EndOfMessage ref={EndOfMessageRef} />
      </MessageContainer>

      <InputContainer>
        <InsertEmoticonIcon />
        <Input value={input} onChange={e => setInput(e.target.value)} />
        <button hidden type="submit" onClick={sendMessage}>Send Message</button>
        <MicIcon />
      </InputContainer>
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

  @media screen and (max-width: 390px) {
    padding: 5px;
     
    .css-1wlk0hk-MuiAvatar-root{
      width: 30px !important;
      height: 30px !important;
    }
  }
`

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  @media screen and (max-width: 450px) { 
    margin-left: 5px;
    }

  > h3{
    margin-bottom: 3px;
    line-height: 1em;

    @media screen and (max-width: 750px) { 
        font-size: 1rem;
    }

    @media screen and (max-width: 450px) { 
        font-size: 0.8rem;
        line-height: 0.7em;
    }
  }

  > p{
    font-size: 14px;
    color: gray;
    line-height: 1em;

    @media screen and (max-width: 450px) { 
        font-size: 0.8rem;
        line-height: 0.7em;
    }
  }
`

const HeaderIcons = styled.div`
    @media screen and (max-width: 700px) { 
        display: none;
    }
`

const MessageContainer = styled.div`
  padding: 30px;
  background: #e5ded8;
  min-height: 90vh;
  padding-bottom: 100px;

  @media screen and (max-width: 700px) { 
    padding: 15px;
  }

  @media screen and (max-width: 450px) { 
    padding: 10px;
  }
`

const EndOfMessage = styled.div`

`

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background: white;
  z-index: 100;
`

const Input = styled.input`
  flex: 1;
  align-items: center;
  padding: 20px 10px;
  margin-left: 10px;
  position: sticky;
  bottom: 0;
  background: whitesmoke;
  z-index: 100;
  border-radius: 5px;
  border: none;

  &:focus{
    background: whitesmoke;
    outline: none;
  }
`