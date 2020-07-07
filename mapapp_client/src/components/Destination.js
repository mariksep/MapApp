import React, { useState, useEffect } from "react";
import { checkingUser, postDestination } from "../Hooks/ApiHooks";

import PropTypes from "prop-types";
import usePostDestination from "../Hooks/PostDestinationHooks";
import DestinationPage from "../components/DestinationPage";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core/";

//ICONS
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CloseIcon from "@material-ui/icons/Close";
import RoomIcon from "../media/map-marker.png";

//LEAFLET
import { Map, TileLayer, Marker } from "react-leaflet";
import { Icon } from "leaflet";

const useStyles = makeStyles({
  map: {
    height: "50vh",
    width: "80vw",
    borderRadius: "10px",
  },
  arrow: {
    backgroundColor: "white",
    width: "50vw",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
  },
  list: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },

  addContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "90vw",
  },
  modalContent: {
    borderRadius: "10px",
    backgroundColor: "white",
  },
  inputs: {
    margin: "0.5em",
    width: "50%",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
  },
  buttonAdd: {
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
const MarkerIcon = new Icon({
  iconUrl: RoomIcon,
  iconSize: [40, 40],
  className: "pinMarker",
});

const Destinations = ({ history }) => {
  const classes = useStyles();
  const [user, setUser] = useState();
  const [open, setOpen] = useState(false);

  let token = localStorage.getItem("FBIdToken");

  let error;
  useEffect(() => {
    const checkUser = async () => {
      let userData = await checkingUser(token);
      setUser(userData);
    };
    checkUser();
  }, [token]);

  const modalOpenHandle = () => {
    setOpen(true);
  };
  const modalClose = () => {
    setOpen(false);
  };

  const doAdd = async () => {
    try {
      const newDestination = {
        coords: inputs.coords,
        destinationName: inputs.destinationName,
      };
      console.log(newDestination);
      await postDestination(newDestination, token);
      window.location.reload();
    } catch (e) {
      console.log(e.message);
    }
  };
  const {
    inputs,
    handlesubmit,
    handleInputChange,
    handleCoordsChange,
  } = usePostDestination(doAdd);

  return (
    <>
      <div className={classes.arrow}>
        <div className={classes.addContainer}>
          <Tooltip title="Add new destniation">
            <IconButton
              aria-label="Add new destniation"
              onClick={modalOpenHandle}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip>
        </div>
        {user !== undefined ? (
          <div className={classes.list}>
            {user.destination !== undefined ? (
              <>
                {user.destination.map((file, index) => (
                  <DestinationPage key={index} file={file}></DestinationPage>
                ))}
              </>
            ) : (
              <CircularProgress />
            )}
          </div>
        ) : (
          <div className={classes.list}>
            <CircularProgress />
          </div>
        )}
      </div>
      {open ? (
        <div className={classes.modal}>
          <div className={classes.modalContent}>
            <IconButton aria-label="Close modal" onClick={modalClose}>
              <CloseIcon />
            </IconButton>
            <div className={classes.formContainer}>
              <Typography variant="h3">Adding new destination</Typography>
              <form onSubmit={handlesubmit} className={classes.form}>
                <TextField
                  required
                  className={classes.inputs}
                  label="Where are you going?"
                  type="text"
                  name="destinationName"
                  error={error}
                  helperText={error}
                  value={inputs.destinationName}
                  onChange={handleInputChange}
                />
                <div>
                  <Map
                    onClick={handleCoordsChange}
                    className={classes.map}
                    center={[0, 0]}
                    zoom={1}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {inputs.coords.length !== 0 && (
                      <Marker
                        icon={MarkerIcon}
                        position={[inputs.coords.lat, inputs.coords.lng]}
                      />
                    )}
                  </Map>
                </div>
                <button className={classes.buttonAdd}>Add</button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

Destinations.propTypes = {
  history: PropTypes.object,
};

export default Destinations;
