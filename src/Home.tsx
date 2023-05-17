/** @format */

import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import useRequest from "@ahooksjs/use-request";
import StakeCard, { StakeCardProps } from "@components/StakeCard";
import { Token, TOKEN_ADDRESS, Action } from "@utils/constants";
import useWallet from "@hooks/useWallet";
import useFetchStats from "@hooks/useFetchStats";
import useFetchState from "@hooks/useFetchState";
import bnbBg from "@assets/bgs/bnb.png";

const useStyles = makeStyles({
  container: {
    padding: "6vh 24px 24px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  card: {
    margin: 10,
  },
});

const cards: StakeCardProps[] = [
  {
    token: Token.JIT,
    bg: bnbBg,
    color: "#ef5350",
    cardTitle: (
      <>
        <img
          src='friends/logo.png'
          alt=''
          style={{ width: "23px", marginBottom: "-4px", marginRight: "8px" }}
        />
        PEPES ~ PEPES
      </>
    ),
    desc: (
      <>
        Stake PEPES to earn PEPES. <br />
        Simplest way to get more PEPES with amazing returns is to just stake
        them in this pool!
      </>
    ),
  },
  {
    token: Token.JIT_PEPE,
    bg: bnbBg,
    color: "#ef5350",
    // open: false,
    cardTitle: (
      <>
        <img
          src='friends/pov.png'
          style={{ width: "23px", marginBottom: "-4px", marginRight: "8px" }}
        />
        PEPES ~ POV
      </>
    ),
    desc: (
      <>
        Stake PEPES to earn POV. <br />
        Wan't to earn POV? Just buy PEPES and stake in this pool with amazing
        returns!
      </>
    ),
  },
  {
    token: Token.JIT_BOB,
    bg: bnbBg,
    color: "#ef5350",
    open: false,
    cardTitle: (
      <>
        <img
          src='friends/BOB.png'
          style={{ width: "23px", marginBottom: "-4px", marginRight: "8px" }}
        />
        PEPES ~ BOB
      </>
    ),
    desc: (
      <>
        Stake PEPES to earn BOB. <br />
        Wan't to earn BOB? Just buy PEPES and stake in this pool with amazing
        returns!
      </>
    ),
  },
  {
    token: Token.JIT_WOJAK,
    bg: bnbBg,
    color: "#ef5350",
    open: false,
    cardTitle: (
      <>
        <img
          src='friends/WOJAK.png'
          style={{ width: "23px", marginBottom: "-4px", marginRight: "8px" }}
        />
        PEPES ~ WOJAK
      </>
    ),
    desc: (
      <>
        Stake PEPES to earn WOJAK. <br />
        Wan't to earn WOJAK? Just buy PEPES and stake in this pool with amazing
        returns!
      </>
    ),
  },
];

export default function Home() {
  const classes = useStyles();

  const { connected } = useWallet();

  const fetchStats = useFetchStats();
  const fetchState = useFetchState();

  useRequest(fetchStats, {
    loadingDelay: 500,
    pollingInterval: 10000,
    pollingWhenHidden: false,
    refreshOnWindowFocus: true,
    throttleInterval: 1000,
  });

  const { run, cancel } = useRequest(fetchState, {
    manual: true,
    loadingDelay: 500,
    pollingInterval: 10000,
    pollingWhenHidden: false,
    refreshOnWindowFocus: true,
    throttleInterval: 1000,
  });

  useEffect(() => {
    if (connected) {
      run();
    } else {
      cancel();
    }
  }, [cancel, connected, run]);

  return (
    <div className={classes.container}>
      {cards.map(card => (
        <StakeCard key={card.token} {...card} className={classes.card} />
      ))}
    </div>
  );
}
