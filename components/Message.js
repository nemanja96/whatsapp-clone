import React from 'react'
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Avatar from '@mui/material/Avatar';
import moment from 'moment';

function Message({user, message}) {
  const [userLoggedIn] = useAuthState(auth);

  const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;
  const MessagePosition = user === userLoggedIn.email ? PositionRight : PositionLeft;

  return (
    <Container>
      <MessagePosition>
        <TypeOfMessage>{message.message}
        <Timestamp>
            {message.timestamp ? moment(message.timestamp).format('LT') : "..." }
          </Timestamp>
        </TypeOfMessage>
        <AvatarInfo>
          <Avatar src={message?.photoURL} />
        </AvatarInfo>
        
      </MessagePosition>

    </Container>
  )
}



export default Message

const Container = styled.div`

`

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
`

const PositionRight = styled(MessageContainer)`
  flex-direction: row;
  justify-content: end;
  align-items: center;
  margin-right: auto;
`

const PositionLeft = styled(MessageContainer)`
  flex-direction: row-reverse;
  justify-content: start;
  align-items: center;
  margin-left: auto;
`

const AvatarInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MessageElement = styled.p`
  width: fit-content;
  padding: 5px 15px;
  border-radius: 10px;
  margin: 10px;
  min-width: 60px;
  position: relative;
`

const Sender = styled(MessageElement)`
  margin-left: auto;
  background: #25D366;
  color: white;

  > p{
    color: #fff;
    text-align: right;
  }
`

const Reciever = styled(MessageElement)`
  margin-left: left;
  background: white;
  color: #000;

  > p{
    color: #999;
    text-align: left;
  }
`

const Timestamp = styled.p`
  color: #999;
  font-size: 11px;
  line-height: 0em;
`