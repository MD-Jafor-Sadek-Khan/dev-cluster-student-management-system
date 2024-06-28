import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../store/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      dispatch(setUser(result.user));
      navigate("/manage-students");
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleEmailLogin = async (event) => {
    event.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setUser(result.user));
      navigate("/manage-students");
    } catch (error) {
      console.error("Email login error:", error);
    }
  };

  return (
    <Container>
      <Header>
        <Title>Login</Title>
      </Header>
      <Form onSubmit={handleEmailLogin}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
        <Separator>or</Separator>
        <GoogleButton onClick={handleGoogleLogin}>Login with Google</GoogleButton>
      </Form>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  background-color: #fffcfb;
  padding: 40px;
  border-radius: 8px;
  margin: 20px;
  width: 50%;
  margin: 5rem auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  color: #000;
  font-size: 24px;
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GoogleButton = styled.button`
  width: 100%;
  padding: 15px 20px;
  background-color: #1255c4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;

  &:hover {
    background-color: #357ae8;
  }
`;

const Separator = styled.div`
  margin: 20px 0;
  font-size: 14px;
  color: #999;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

const Button = styled.button`
  width: 100%;
  padding: 15px 20px;
  background-color: #f33823;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #d32f2f;
  }
`;