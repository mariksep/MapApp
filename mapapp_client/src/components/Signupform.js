import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

//MUI
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { TextField } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
//HOOKS
import { register } from "../Hooks/ApiHooks";
import useRegisterform from "../Hooks/RegisterHooks";

const useStyles = makeStyles({
  loginform: {
    width: "50vw",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "column",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
  },
  text: { width: "50%" },
  inputs: {
    width: "25vw",
  },
  button: {
    color: "black",
    width: "40vw",
    border: "none",
    cursor: "pointer",
    borderRadius: "15px",
    padding: "1em",
    margin: "1em",
    outline: "none",
    fontSize: "medium",
    backgroundColor: "rgb(239, 239, 239)",
    "&:hover": {
      backgroundColor: "rgba(11, 58, 92, 0.7)",
      color: "white",
    },
    "&:active": {
      color: "white",
      backgroundColor: "rgba(11, 58, 92, 0.9)",
    },
  },
});

const SignupForm = ({ history }) => {
  const classes = useStyles();
  const [error, setError] = useState();
  const [user, setUser] = useState();
  console.log(user);

  const doRegister = async () => {
    try {
      console.log(inputs);
      const userData = await register(inputs);
      setUser(userData);
      console.log(userData);
      if (userData.token !== undefined) {
        localStorage.setItem("FBIdToken", `Bearer ${userData.token}`);
        history.push("/home");
      }
      if (userData.message) {
        setError(userData.message);
      }
    } catch (e) {
      console.error(e);
      console.log(e.message);
    }
  };

  const { handleSubmit, handleInputsChange, inputs } = useRegisterform(
    doRegister
  );

  return (
    <div className={classes.loginform}>
      <Typography className={classes.text} variant="h5" gutterBottom>
        Set up account
      </Typography>

      <Grid item container>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            required
            className={classes.inputs}
            label="Email"
            type="email"
            name="email"
            onChange={handleInputsChange}
            value={inputs.email}
            error={error}
            helperText={error}
          />

          <TextField
            required
            className={classes.inputs}
            label="Password"
            type="password"
            name="password"
            onChange={handleInputsChange}
            value={inputs.password}
            error={error}
            helperText={error}
          />
          <TextField
            required
            className={classes.inputs}
            label="Confirm password"
            type="password"
            name="confirmPassword"
            onChange={handleInputsChange}
            value={inputs.confirmPassword}
            error={error}
            helperText={error}
          />
          <TextField
            required
            className={classes.inputs}
            label="Your username"
            type="text"
            name="username"
            onChange={handleInputsChange}
            value={inputs.username}
            error={error}
            helperText={error}
          />

          <button className={classes.button}>Register</button>
        </form>
      </Grid>
    </div>
  );
};

SignupForm.propTypes = {
  history: PropTypes.object,
};

export default withRouter(SignupForm);
