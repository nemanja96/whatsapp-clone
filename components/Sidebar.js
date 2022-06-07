import React from 'react'
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import ChatIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import * as EmailValidator from 'email-validator';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import LogoutIcon from '@mui/icons-material/Logout';
import {useCollection} from 'react-firebase-hooks/firestore';
import Chat from './Chat';

function Sidebar() {

    const [user] = useAuthState(auth);

    const userChatRef = db.collection("chats").where("users", "array-contains", user.email);
    const [chatsSnapshot] = useCollection(userChatRef);

    const logout = () => {
        signOut(auth);
      };

    const createChat = () => {
        const input = prompt("Please enter an email address for the user you wish to chat with");

        if(!input) {
            return null;
        }

        if(EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email){
            db.collection("chats").add({
                users: [user.email, input]
            })
        }

    }

    const chatAlreadyExists = (recipientEmail) => 
        !!chatsSnapshot?.docs.find(
            (chat) => chat.data().users.find((user) => user === recipientEmail)?.length > 0
        )

  return (
    <Container>
        <Header>
            <UserAvatar src={user?.photoURL} />

            <IconsContainer>
                <IconButton>
                    <ChatIcon className="removeIcon" /> 
                </IconButton>
                <IconButton>
                    <LogoutIcon onClick={logout} />
                </IconButton>
            </IconsContainer>
        </Header>
        
        <Search>
            <SearchIcon />
            <SearchInput placeholder="Search in chats" />
        </Search>

        <SidebarButton onClick={createChat}>
            New Chat
        </SidebarButton>

        {
            chatsSnapshot?.docs.map(chat => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            ))
        }
    </Container>
  )
}

export default Sidebar

const Container = styled.div`
    flex: 0.45;
    border-right: 1px solid whitesmoke;
    height: 100vh;
    min-width: 300px;
    max-width: 350px;
    overflow-y: scroll;

    ::-webkit-scrollbar{
        display: none;
    }

    -ms-overflow-style: none; 
    scrollbar-width: none;

    @media screen and (max-width: 850px) { 
        flex: 0.3;
        min-width: 250px;
    }

    @media screen and (max-width: 600px) { 
        flex: 0.3;
        min-width: 200px;
    }

    @media screen and (max-width: 550px) { 
        flex: 0.2;
        min-width: 100px;
    }

    @media screen and (max-width: 390px) { 
        min-width: 50px;
    }
`

const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 2px;

    @media screen and (max-width: 550px) { 
        display: none;
    }
`

const SidebarButton = styled(Button)`
    width: 100%;

    &&& {
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
    }

    @media screen and (max-width: 390px) { 
      padding: 0px;
      min-width: 50px;
    }
`

const SearchInput = styled.input`
    outline-width: 0;
    border: none;
    flex: 1;
`

const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background: white;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 120px;
    border-bottom: 1px solid whitesmoke;

    @media screen and (max-width: 600px) {
        justify-content: center;
        flex-direction: column;

        .removeIcon{
            display: none;  
        } 
    }
`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;

    &:hover{
        opacity: 0.8;
    }

    @media screen and (max-width: 390px) {
            width: 30px !important;
            height: 30px !important;
    }
`

const IconsContainer = styled.div`
    @media screen and (max-width: 600px) { 
        
    }
`