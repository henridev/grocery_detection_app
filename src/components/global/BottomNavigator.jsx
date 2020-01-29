import React from "react";
// import NavigatorLink from "../utils/NavigatorLink"
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import HomeIcon from "@material-ui/icons/Home";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    position: "fixed",
    bottom: 0,
    alignItems: "center",
    backgroundColor: "rgb(60, 91, 104)"
  }
});

export default function BottomNavigator() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <Link to="/">
        <BottomNavigationAction label="" icon={<HomeIcon />} />
      </Link>
      <Link to="/webcampage">
        <BottomNavigationAction label="" icon={<CameraAltIcon />} />
      </Link>
      <Link to="/uploadpage">
        <BottomNavigationAction label="" icon={<CloudUploadIcon />} />
      </Link>
    </BottomNavigation>
  );
}
