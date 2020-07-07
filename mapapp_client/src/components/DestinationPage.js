import React, { useState, useEffect } from "react";
import { getDestinationInform } from "../Hooks/ApiHooks";

import Addatractionform from "./Addatractionform";
import MarkerByType from "./MarkerByType";

//LEAFLET
import { Map, TileLayer } from "react-leaflet";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import CloseIcon from "@material-ui/icons/Close";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const useStyles = makeStyles({
  destinationHeader: {
    width: "80%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  map: {
    margin: "1em",
    height: "50vh",
    width: "60vw",
    borderRadius: "10px",
  },
  destinationContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    top: 0,
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  destination: {
    borderRadius: "10px",
    width: "90vw",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
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

const DestinationPages = (file) => {
  const destination = file.file;

  const [destinationData, setDestinationData] = useState();
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);

  const classes = useStyles();
  const destinationId = destination.destinationId;

  useEffect(() => {
    const checkUser = async () => {
      let Data = await getDestinationInform(destinationId);
      setDestinationData(Data);
    };
    checkUser();
  }, [destinationId]);

  const openDestinationPage = () => {
    setOpen(true);
  };
  const closeDestinationPage = () => {
    setOpen(false);
  };
  const openAddingattraction = () => {
    setAdding(true);
    setOpen(false);
  };

  return (
    <>
      <>
        <div>
          <button className={classes.button} onClick={openDestinationPage}>
            {destination.destinationName}
          </button>
        </div>

        <>
          {open === true ? (
            <>
              <div className={classes.destinationContainer}>
                {destinationData !== undefined ? (
                  <div className={classes.destination}>
                    <div className={classes.destinationHeader}>
                      <div>
                        <Tooltip title="Close">
                          <IconButton
                            aria-label="Close"
                            onClick={closeDestinationPage}
                          >
                            <CloseIcon></CloseIcon>
                          </IconButton>
                        </Tooltip>
                      </div>
                      <div>
                        <Typography variant="h3">
                          {destinationData.destinationName}
                        </Typography>
                      </div>
                      <div>
                        <Tooltip title=" Add new object">
                          <IconButton
                            onClick={openAddingattraction}
                            aria-label="Add new object"
                          >
                            <AddCircleOutlineIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>

                    <Map
                      className={classes.map}
                      zoom={11}
                      center={[
                        destinationData.coords.lat,
                        destinationData.coords.lng,
                      ]}
                    >
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      {destinationData.attractions.map((file, index) => {
                        return (
                          <MarkerByType key={index} file={file}></MarkerByType>
                        );
                      })}
                    </Map>
                  </div>
                ) : (
                  <CircularProgress />
                )}
              </div>
            </>
          ) : (
            <></>
          )}
        </>
      </>
      {adding !== false && (
        <Addatractionform destination={destination}></Addatractionform>
      )}
    </>
  );
};

export default DestinationPages;
