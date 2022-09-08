import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../auth/authSlice";
import { useLoginMutation } from "../auth/authApiSlice";
import { CircularProgress, Box, TextField, Button, Grid } from "@mui/material";
import { dark } from "@mui/material/styles/createPalette";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ username, password }).unwrap();
      dispatch(setCredentials({ ...userData }));
      setUser("");
      setPassword("");
      navigate("/");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Нет ответа от сервера");
      } else if (err.response?.status === 400) {
        setErrMsg("Нет логина или пароля");
      } else if (err.response?.status === 401) {
        setErrMsg("Не авторизованы");
      } else {
        setErrMsg("Ошибка авторизации");
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUser(e.target.value);

  const handlePwdInput = (e) => setPassword(e.target.value);

  const content = isLoading ? (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  ) : (
    <Grid
    container
    spacing={1}
    direction='column'
    alignItems="center"
    justify="center"
    style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscren"}></p>
        <h1>Авторизация</h1>
      </Grid>
      <Grid item xs={3} >
        <TextField
          type="text"
          id="username"
          ref={userRef}
          value={username}
          onChange={handleUserInput}
          autoComplete="off"
          required
          label="Username"
          variant="standard"
        />
        </Grid>
        <Grid item xs={3} >
        <TextField
          type="password"
          id="password"
          value={password}
          onChange={handlePwdInput}
          required
          label="Password"
          variant="standard"
        />
        </Grid>
        <Grid item xs={3} >
        <Button variant="outlined" onClick={handleSubmit}>
          Войти
        </Button>
        </Grid>
      </Grid>
    
  );

  return content;
};

export default Login;
