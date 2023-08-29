/** @format */

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import WalletsDialog from "@components/WalletsDialog";
import Header from "@components/Header";
import Home from "./Home";
import "./App.css";
import React from "react";
import { Nav, OverlayTrigger, Tab, Tooltip } from "react-bootstrap";

import ReactDOM from "react-dom";
import Countdown from "react-countdown";
// import ReactGA from "react-ga";
// ReactGA.initialize("UA-267478037-1");
// ReactGA.pageview(window.location.pathname + window.location.search);

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
const Completionist = () => <>Spot Trading Platform is Live Now!</>;

function App() {
  return (
    <>
      <div className='App'>
        <Header />
        <Home />

        {/* <Tab.Container
          id='left-tabs-example'
          // className='m-auto'
          defaultActiveKey='Binance'>
          <Nav variant='pills' className='flex-row w-25 m-auto nav-img'>
            <Nav.Item className='m-auto'>
              <Nav.Link eventKey='Binance'>
                <OverlayTrigger
                  placement='bottom'
                  overlay={<Tooltip>Binance Smart Chain (Live)</Tooltip>}>
                  <img src='bnb.png' width={80} className='mx-2' alt='' />
                </OverlayTrigger>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className='m-auto'>
              <Nav.Link eventKey='ETHEREUM'>
                <OverlayTrigger
                  placement='bottom'
                  overlay={<Tooltip>ETHEREUM</Tooltip>}>
                  <img
                    src='eth.png'
                    className='mx-2 img-fade'
                    width={80}
                    alt=''
                  />
                </OverlayTrigger>
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey='Binance'>
            </Tab.Pane>
            <Tab.Pane eventKey='ETHEREUM'>
              <iframe
                title='stake'
                src=''
                width='100%'
                height='590px'></iframe>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container> */}
        {/* {COMMIT_VERSION ? (
          <Version variant='caption'>Version: {COMMIT_VERSION}</Version>
        ) : null} */}
      </div>
      <WalletsDialog />
    </>
  );
}

export default App;
