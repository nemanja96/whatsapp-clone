import React from 'react'
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';

function Chat({ id, user }) {
  return (
    <Container>
        <UserAvatar />
        {user[1]}
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