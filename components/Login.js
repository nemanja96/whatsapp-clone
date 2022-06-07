import React from 'react'
import styled from 'styled-components';
import Head from 'next/head';
import Button from '@mui/material/Button';
import { auth } from '../firebase';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import googleIcon from '../public/google.png';
import whatsappIcon from '../public/whatsapp.png';
import Image from 'next/image';

function Login() {

    const [signInWithGoogle] = useSignInWithGoogle(auth);

  return (
    <Container>
        <Head>
            <title>WhatsApp Clone - Nemanja Radivojevic</title>
        </Head>

        <LoginContainer>
            <Image src={whatsappIcon} width="200" height="200" />
            <SignIn onClick={() => signInWithGoogle()} variant="outlined"><Image src={googleIcon} width="25" height="25" /><span>Sign in with Google</span></SignIn>
        </LoginContainer>
    </Container>
  )
}

export default Login

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background: #25D366;
`

const LoginContainer = styled.div`
    display: flex;
    padding: 100px;
    align-items:center;
    border-radius: 5px;
    flex-direction: column;

    @media screen and (max-width: 450px) {
        padding: 50px;
    }
`

const SignIn = styled(Button)`
    background: white !important;
    height: 50px !important;
    text-transform: none;
    font-weight: 600;
    margin-top: 40px;
    color: #777;

    > span {
        margin-left: 10px;
    }

    &:hover, &:focus {
        outline: none !important;
        border: none !important;
    }
`