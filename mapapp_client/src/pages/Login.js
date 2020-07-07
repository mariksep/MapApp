import React, { useState } from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Loginform from "../components/Loginform";
import SignupForm from "../components/Signupform";

const useStyles = makeStyles({
  loginContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  loginInfo: {
    backgroundColor: "white",
    height: "50%",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  loginInfoTriangel: {
    height: "50%",
    width: "10%",
    borderTop: "25vh solid white",
    borderBottom: "25vh solid white",
    borderLeft: "20vh solid transparent",
  },
  loginInfoText: {
    fontSize: "x-large",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    margin: "35px auto",
  },
  button: {
    cursor: "pointer",
    padding: "10px 30px",
    background: "transparent",
    border: "0",
    outline: "none",
    fontSize: ".9rem",
    borderBottom: "solid 1px",
    fontWeight: "700",
  },

  buttonDisabled: {
    fontWeight: "700",

    cursor: "pointer",
    color: "grey",
    padding: "10px 30px",
    background: "transparent",
    border: "0",
    outline: "none",
    fontSize: ".9rem",
    "&:hover": {
      color: "#d94e73",
    },
  },
});

const Login = () => {
  const classes = useStyles();
  const [toggle, setToggle] = useState(true);

  const toggleForm = () => {
    setToggle(!toggle);
  };

  return (
    <div className={classes.loginContainer}>
      <div className={classes.loginInfoTriangel}></div>

      <div className={classes.loginInfo}>
        <div>
          <Typography variant="h1" component="h1" gutterBottom>
            Map App
          </Typography>
        </div>
        <div className={classes.loginInfoText}>
          In Map App, you can create a map of your destination where you can add
          attractions.
        </div>
      </div>

      <div className={classes.loginInfo}>
        <div className={classes.buttonContainer} onClick={toggleForm}>
          {toggle ? (
            <button className={classes.button}>Login</button>
          ) : (
            <button className={classes.buttonDisabled}>Login</button>
          )}
          {toggle ? (
            <button className={classes.buttonDisabled}>Register</button>
          ) : (
            <button className={classes.button}>Register</button>
          )}
        </div>
        {/**Tähän ?: milloin login ja milloin register */}
        {toggle ? <Loginform /> : <SignupForm />}
      </div>
    </div>
  );
};

export default Login;
