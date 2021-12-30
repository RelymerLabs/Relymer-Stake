import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ConnectButton from "@components/ConnectButton";
import logo from "@assets/logo.png";
import useWallet from "@hooks/useWallet";
import WalletInfo from "./WalletInfo";
import WalletIndicator from "./WalletIndicator";

const useStyles = makeStyles({
  container: {
    position: "relative",
    padding: "36px 0",
    borderBottom: "1px solid #11263B",
    backgroundColor: '#f1ed10',
    boxShadow: '-15px 10px #18ffff',
  },
  logo: {
    width: 40,
    color:"#fff"
  },
  connect: {
    position: "absolute",
    right: 24,
    top: 38,
    fontSize: 14,
    paddingLeft: 18,
    paddingRight: 18,
    borderRadius: "6px",
    background: '#6c757d',
    color:"#fff",
    boxShadow: "-5px 5px #18ffff",
    "&:hover": {
      background: '#ef5350',
    },
  },
  walletInfo: {
    position: "absolute",
    right: 24,
    top: 12,
  },
  walletIndicator: {
    position: "absolute",
    bottom: -16,
    "&:hover": {
      background: '#424242 !important',
    },
    "&:focus": {
      background: '#424242 !important',
    },
  },
  title:{
    padding:30,
    fontSize:22,
    color:"#000"
  }
});

export default function Header() {
  const classes = useStyles();
  const { connected } = useWallet();

  return (
    <Grid container justify='center' classes={{ container: classes.container }}>
      <a href="#" target="_BLANK">
        <img src={logo} alt='Kikswap' className={classes.logo} /> 
      </a>
      <strong className={classes.title}>Kikswap</strong>
      {connected ? (
        <>
          <WalletInfo className={classes.walletInfo} />
          <WalletIndicator classes={{ root: classes.walletIndicator }} />
        </>
      ) : (
        <ConnectButton classes={{ root: classes.connect }} />
      )}
    </Grid>
  );
}
