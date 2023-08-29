/** @format */

import { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ConnectButton from "@components/ConnectButton";
import logo from "@assets/logo.png";
import useWallet from "@hooks/useWallet";
import WalletInfo from "./WalletInfo";
import ReactGA from "react-ga";
// import WalletIndicator from "./WalletIndicator";

const useStyles = makeStyles({
  container: {
    position: "relative",
    padding: "20px 60px",
    backgroundColor: "transparent",
    boxShadow: "0 0 10px rgb(99 99 98 / 20%)",
  },
  logo: {
    marginBottom: 8,
    fontFamily: "Lemon",
    letterSpacing: "3px",
    textTransform: "uppercase",
    color: "#fff",
  },
  connect: {
    position: "relative",
    height: "40px",
    right: 10,
    top: 8,
    fontSize: "17px",
    letterSpacing: 0,
    lineHeight: "25px",
    color: "#fff",
    background: "linear-gradient(84deg, #4caf50, #4A7133)",
    padding: "0 26px",
    borderRadius: "5px",
    fontWeight: 400,
    display: "inline-block",
    "&:hover": {
      background: 'linear-gradient(180deg , #4A7133  , #4caf50)',
    },
  },
  walletInfo: {
    position: "relative",
    padding: "0px 26px",
    right: 10,
    top: -10,
  },
  walletIndicator: {
    position: "absolute",
    bottom: -16,
    "&:hover": {
      background: "#424242 !important",
    },
    "&:focus": {
      background: "#424242 !important",
    },
  },
  navbar: {
    color: "#000",
    margin: "14px auto",
    "& a": {
      textDecoration: "none",
      color: "#4f5b6d",
    },
    "& li": {
      // marginTop: "20px",
      display: "inline",
      paddingRight: "10px",
      fontSize: "16px",
      letterSpacing: "0px",
      lineHeight: "24px",
      padding: "5px 10px",
      color: "#4f5b6d",
    },
  },
});

export default function Header() {
  const classes = useStyles();
  const { connected } = useWallet();

  useEffect(() => {
    ReactGA.initialize("UA-269597103-1");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <Grid container classes={{ container: classes.container }}>
      {/* <img src={logo} alt='' className={classes.logo} /> */}
      <h1 className={classes.logo}>Relymer Stake</h1>
      <ul className={classes.navbar}></ul>
      {connected ? (
        <>
          <WalletInfo className={classes.walletInfo} />
          {/* <WalletIndicator classes={{ root: classes.walletIndicator }} /> */}
        </>
      ) : (
        <ConnectButton classes={{ root: classes.connect }} />
      )}
    </Grid>
  );
}
