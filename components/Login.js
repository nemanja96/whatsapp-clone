import React from 'react'
import styled from 'styled-components';
import Head from 'next/head';
import Button from '@mui/material/Button';
import { auth } from '../firebase';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

function Login() {

    const [signInWithGoogle] = useSignInWithGoogle(auth);

  return (
    <Container>
        <Head>
            <title>Login</title>
        </Head>

        <LoginContainer>
            <Logo src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/479px-WhatsApp.svg.png" />
            <Button onClick={() => signInWithGoogle()} variant="outlined">Sign in with Google</Button>
        </LoginContainer>
    </Container>
  )
}

export default Login

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
`

const LoginContainer = styled.div`
    display: flex;
    padding: 100px;
    align-items:center;
    background: white;
    border-radius: 5px;
    flex-direction: column;
    box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`

const Logo = styled.img`
    width: 200px;
    height: 200px;
    margin-bottom: 50px;
`