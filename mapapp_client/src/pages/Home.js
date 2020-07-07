import React from "react";

import PropTypes from "prop-types";
import Destination from "../components/Destination";

//MUI
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  homeContent: {
    display: "flex",
    justifyContent: "center",
    height: "100%",
  },
  list: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  arrow: {
    backgroundColor: "white",
    width: "50vw",
  },
  traingle: {
    width: "50vw",
    height: "15%",
    borderTop: "15vh solid transparent",
    borderRight: "25vw solid white",
    borderLeft: "25vw solid white",
  },
  backPic: {
    borderRadius: "10px",
    backgroundColor: "rgb(11, 58, 92)",

    width: "50vw",
    height: "45vh",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "column",
  },
  homeHeader: {
    color: "white",

    textAlign: "center",
  },
});

const Home = ({ history }) => {
  const classes = useStyles();
  let token = localStorage.getItem("FBIdToken");
  let auth = false;

  if (token != null) {
    auth = true;
  }

  return (
    <>
      {auth !== false ? (
        <>
          <div className={classes.homeContent}>
            <div className={classes.list}>
              <div className={classes.backPic}>
                <Typography
                  className={classes.homeHeader}
                  variant="h3"
                  gutterBottom
                >
                  Your destinations
                </Typography>

                <div className={classes.traingle}></div>
              </div>

              <Destination />
            </div>
          </div>
        </>
      ) : (
        <div className={classes.homeContent}>
          <div className={classes.list}>
            <CircularProgress />
          </div>
        </div>
      )}
    </>
  );
};

Home.propTypes = {
  history: PropTypes.object,
};

export default Home;
