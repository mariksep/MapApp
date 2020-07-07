import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

//MUI
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { TextField } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

//HOOKS
import { login } from "../Hooks/ApiHooks";
import useLoginform from "../Hooks/LoginHooks";

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
    width: "50%",
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

const Loginform = ({ history }) => {
  const [error, setError] = useState();
  const [user, setUser] = useState();

  const classes = useStyles();
  console.log(user);
  const doLogin = async () => {
    try {
      const userData = await login(inputs);
      setUser(userData);

      if (userData.token !== undefined) {
        localStorage.setItem("FBIdToken", `Bearer ${userData.token}`);

        history.push("/home");
      }
      if (userData.general) {
        setError(userData.general);
      }
    } catch (e) {
      console.error(e);
      console.log(e.message);
    }
  };
  const { handleSubmit, handleInputsChange, inputs } = useLoginform(doLogin);

  return (
    <div className={classes.loginform}>
      <Typography className={classes.text} variant="h5" gutterBottom>
        Login
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

          <button className={classes.button}>Login</button>
        </form>
      </Grid>
    </div>
  );
};

Loginform.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Loginform);
