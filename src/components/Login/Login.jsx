import React, { useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { auth, googleProvider } from "../../firebase"
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth"
import { setUser } from "../../store/authSlice"
import { FcGoogle } from "react-icons/fc"
import { toast } from "react-hot-toast"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isSignup, setIsSignup] = useState(false)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const validatePassword = (password) => {
    const minLength = 6
    const hasNumber = /\d/
    const hasUpperCase = /[A-Z]/
    const hasLowerCase = /[a-z]/
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/

    if (password.length < minLength) {
      return "Password must be at least 6 characters long."
    }
    if (!hasNumber.test(password)) {
      return "Password must contain at least one number."
    }
    if (!hasUpperCase.test(password)) {
      return "Password must contain at least one uppercase letter."
    }
    if (!hasLowerCase.test(password)) {
      return "Password must contain at least one lowercase letter."
    }
    if (!hasSpecialChar.test(password)) {
      return "Password must contain at least one special character."
    }
    return null
  }

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
      }
      dispatch(setUser(user))
      navigate("/manage-students")
      toast.success("Google login successful!")
    } catch (error) {
      console.error("Google login error:", error)
    }
  }

  const handleEmailLogin = async (event) => {
    event.preventDefault()
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      const user = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
      }
      dispatch(setUser(user))
      navigate("/manage-students")
      toast.success("Login successful!")
    } catch (error) {
      console.error("Email login error:", error)
      toast.error("Email login failed.")
    }
  }

  const handleSignup = async (event) => {
    event.preventDefault()
    const passwordError = validatePassword(password)
    if (passwordError) {
      toast.error(passwordError)
      return
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(result.user, { displayName: fullName })
      const user = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
      }
      dispatch(setUser(user))
      toast.success("Signup successful! Please log in.")
      setIsSignup(false)
    } catch (error) {
      console.error("Signup error:", error)
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use.")
      } else {
        toast.error("Signup failed.")
      }
    }
  }

  const toggleForm = () => {
    setIsSignup(!isSignup)
    setFullName("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value
    setPassword(value)
    if (isSignup) {
      setPasswordError(validatePassword(value))
    }
  }

  return (
    <Wrapper>
      <LoginContainer>
        <Header>
          <Title>{isSignup ? "Sign Up" : "Login"}</Title>
        </Header>
        <Form onSubmit={isSignup ? handleSignup : handleEmailLogin}>
          {isSignup && (
            <Input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          )}
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
            onChange={handlePasswordChange}
          />
          {passwordError && <ErrorText>{passwordError}</ErrorText>}
          {isSignup && (
            <Input
              type="password"
              placeholder="Re-type Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <Button type="submit">{isSignup ? "Sign Up" : "Login"}</Button>
          <Separator>or</Separator>
        </Form>
        <GoogleButton onClick={handleGoogleLogin}>
          <FcGoogle size="20px" style={{ marginRight: "8px" }} />
          {isSignup ? "Sign Up with Google" : "Login with Google"}
        </GoogleButton>
        <ToggleText onClick={toggleForm}>
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </ToggleText>
      </LoginContainer>
    </Wrapper>
  )
}

export default Login

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoginContainer = styled.div`
  border-radius: 12px;
  width: 40%;
  margin: 4.4% 20% 0 0;
  font-family: "Roboto", sans-serif;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`

const Title = styled.h1`
  color: #333;
  font-size: 28px;
  margin: 0;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: all 0.3s;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.25);
    outline: none;
  }
`

const Button = styled.button`
  width: 100%;
  padding: 14px 20px;
  background: linear-gradient(45deg, #f33823, #ff6347);
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 18px;
  transition: background 0.3s;

  &:hover {
    background: linear-gradient(45deg, #d32f2f, #e57373);
  }
`

const Separator = styled.div`
  margin: 20px 0;
  text-align: center;
  font-size: 14px;
  color: #999;
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    background-color: #ddd;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 14px 20px;
  background-color: #4285f4;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #357ae8;
  }
`

const ToggleText = styled.p`
  text-align: center;
  color: #007bff;
  cursor: pointer;
  margin-top: 20px;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`
// original
