import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import WalletsDialog from "@components/WalletsDialog";
import Header from "@components/Header";
import Home from "./Home";
import "./App.css";
import React from 'react';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-267478037-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const COMMIT_VERSION = process.env.REACT_APP_COMMIT_VERSION;

const Version = withStyles(() => ({
  root: {
    position: "absolute",
    right: 12,
    bottom: 0,
    color: "#666",
  },
}))(Typography);
const CountDown = withStyles(() => ({
  root: {
    color: "#666",
    fontSize: "60px",
    textAlign: "center",
  },
}))(Typography);
const Completionist = () => <>
  Spot Trading Platform is Live Now!
</>;

function App() {
  return (
    <>
      <div className='App'>
        {/* <Header /> */}
        <Home />
        {/* {COMMIT_VERSION ? (
          <Version variant='caption'>Version: {COMMIT_VERSION}</Version>
        ) : null} */}
      </div>
      <WalletsDialog />
    </>
  );
}

export default App;
