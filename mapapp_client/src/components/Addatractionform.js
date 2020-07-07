import React, { useState, useEffect } from "react";
import { postAttraction, getDestinationInform } from "../Hooks/ApiHooks";
import { withRouter } from "react-router-dom";
import usePostAttraction from "../Hooks/PostAttractionHooks";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core/";

//ICONS
import CloseIcon from "@material-ui/icons/Close";
import RoomIcon from "../media/map-marker.png";

//LEAFLET
import { Map, TileLayer, Marker } from "react-leaflet";
import { Icon } from "leaflet";

const useStyles = makeStyles({
  addContainer: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "0",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  whiteContainer: {
    borderRadius: "10px",
    padding: "1em",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formHeader: {
    display: "flex",
  },
  map: {
    height: "50vh",
    width: "80vw",
    borderRadius: "10px",
  },
  inputs: {
    margin: "0.5em",
    width: "50vw",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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

const Addatractionform = ({ destination }) => {
  const [loading, setLoading] = useState(false);
  const [destinationData, setDestinationData] = useState();

  const classes = useStyles();
  let token = localStorage.getItem("FBIdToken");
  console.log(destination);
  let destinationId = destination.destinationId;
  useEffect(() => {
    const checkUser = async () => {
      let Data = await getDestinationInform(destinationId);
      setDestinationData(Data);
    };
    checkUser();
  }, [destinationId]);
  console.log(destinationData);
  const doAdd = async () => {
    setLoading(true);

    try {
      const newAttraction = {
        coords: inputs.coords,
        name: inputs.name,
        address: inputs.address,
        type: inputs.type,
      };
      console.log(newAttraction);
      await postAttraction(newAttraction, token, destinationId);
      setTimeout(() => {
        setLoading(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }, 5000);
    } catch (e) {
      console.log(e.message);
    }
  };
  const closeAttraction = () => {
    window.location.reload();
  };
  const {
    inputs,

    handlesubmit,
    handleInputChange,
    handleCoordsChange,
  } = usePostAttraction(doAdd);

  let error;
  return (
    <div className={classes.addContainer}>
      {destinationData !== undefined ? (
        <div className={classes.whiteContainer}>
          <form onSubmit={handlesubmit}>
            <div className={classes.formContainer}>
              <div className={classes.formHeader}>
                <Tooltip title="Close">
                  <IconButton aria-label="Close" onClick={closeAttraction}>
                    <CloseIcon></CloseIcon>
                  </IconButton>
                </Tooltip>
                <Typography variant="h3">Adding object</Typography>
              </div>
              <TextField
                required
                className={classes.inputs}
                label="What is the name object?"
                type="text"
                name="name"
                error={error}
                helperText={error}
                value={inputs.name}
                onChange={handleInputChange}
              />
              <TextField
                required
                className={classes.inputs}
                label="What is the address?"
                type="text"
                name="address"
                error={error}
                helperText={error}
                value={inputs.address}
                onChange={handleInputChange}
              />
              <div className={classes.inputs}>
                <label htmlFor="type">Type of the object</label>
                <select
                  className="formselect"
                  required
                  value={inputs.type}
                  onChange={handleInputChange}
                  name="type"
                >
                  <option value="" defaultValue disabled hidden></option>
                  <option className="formselectoption" value="Food">
                    Food
                  </option>
                  <option className="formselectoption" value="Museum">
                    Museum
                  </option>
                  <option className="formselectoption" value="Park">
                    Park
                  </option>
                  <option className="formselectoption" value="Landmark">
                    Landmark
                  </option>
                </select>
              </div>
            </div>
            <div>
              <Map
                required
                onClick={handleCoordsChange}
                className={classes.map}
                center={[
                  destinationData.coords.lat,
                  destinationData.coords.lng,
                ]}
                zoom={11}
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
            {loading ? (
              <div className={classes.buttonDiv}>
                <CircularProgress></CircularProgress>
              </div>
            ) : (
              <div className={classes.buttonDiv}>
                <button className={classes.buttonAdd}>Add</button>
              </div>
            )}
          </form>
        </div>
      ) : (
        <CircularProgress></CircularProgress>
      )}
    </div>
  );
};

export default withRouter(Addatractionform);
