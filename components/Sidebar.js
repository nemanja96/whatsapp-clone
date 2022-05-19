import React from 'react'
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

function Sidebar() {
  return (
    <Container>
        <Header>
            <UserAvatar />

            <IconsContainer>
                <IconButton>
                    <ChatIcon /> 
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </IconsContainer>
        </Header>
        
        <Search>
            <SearchIcon />
            <SearchInput placeholder="Search in chats" />
        </Search>

        <SidebarButton>
            Start a new chat
        </SidebarButton>
    </Container>
  )
}

export default Sidebar

const Container = styled.div`

`;

const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 2px;
`

const SidebarButton = styled(Button)`
    width: 100%;

    &&& {
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
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
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;

    &:hover{
        opacity: 0.8;
    }
`

const IconsContainer = styled.div`

`