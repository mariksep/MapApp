import React from "react";

//LEAFLET
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

//MUI
import { Typography } from "@material-ui/core";

//ICONS
import IconFood from "../media/food-and-restaurant.png";
import IconPark from "../media/location.png";
import IconMuseum from "../media/placeholder (1).png";
import IconLandmark from "../media/placeholder (2).png";

const MarkerFoodIcon = new Icon({
  iconUrl: IconFood,
  iconSize: [35, 35],
  className: "pinMarker",
});
const MarkerParkIcon = new Icon({
  iconUrl: IconPark,
  iconSize: [35, 35],
  className: "pinMarker",
});
const MarkerMuseumIcon = new Icon({
  iconUrl: IconMuseum,
  iconSize: [35, 35],
  className: "pinMarker",
});
const MarkerLandmarkIcon = new Icon({
  iconUrl: IconLandmark,
  iconSize: [35, 35],
  className: "pinMarker",
});

const MarkerByType = ({ file }) => {
  console.log(file);
  if (file.type === "Landmark") {
    return (
      <Marker
        icon={MarkerLandmarkIcon}
        position={[file.coords.lat, file.coords.lng]}
      >
        <Popup>
          <Typography variant="body1">{file.name}</Typography>
          <Typography variant="body1">{file.address}</Typography>
        </Popup>
      </Marker>
    );
  }
  if (file.type === "Food") {
    return (
      <Marker
        icon={MarkerFoodIcon}
        position={[file.coords.lat, file.coords.lng]}
      >
        <Popup>
          <Typography variant="body1">{file.name}</Typography>
          <Typography variant="body1">{file.address}</Typography>
        </Popup>
      </Marker>
    );
  }
  if (file.type === "Museum") {
    return (
      <Marker
        icon={MarkerMuseumIcon}
        position={[file.coords.lat, file.coords.lng]}
      >
        <Popup>
          <Typography variant="body1">{file.name}</Typography>
          <Typography variant="body1">{file.address}</Typography>
        </Popup>
      </Marker>
    );
  }
  if (file.type === "Park") {
    return (
      <Marker
        icon={MarkerParkIcon}
        position={[file.coords.lat, file.coords.lng]}
      >
        <Popup>
          <Typography variant="body1">{file.name}</Typography>
          <Typography variant="body1">{file.address}</Typography>
        </Popup>
      </Marker>
    );
  }
};

export default MarkerByType;
