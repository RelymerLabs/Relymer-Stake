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
          src='https://relymer.com/assets/Logo.svg'
          alt=''
          style={{ width: "28px", marginBottom: "-4px", marginRight: "8px" }}
        />
        REL ~ REL
      </>
    ),
    desc: (
      <>
        Stake REL to earn REL. <br />
        Simplest way to get more REL with amazing returns is to just stake
        them in this pool!
      </>
    ),
  },
  {
    token: Token.JIT_BNB,
    bg: bnbBg,
    color: "#ef5350",
    // open: false,
    cardTitle: (
      <>
        <img
          src='/bnb.png'
          style={{ width: "23px", marginBottom: "-4px", marginRight: "8px" }}
        />
        REL ~ BNB
      </>
    ),
    desc: (
      <>
        Stake REL to earn BNB. <br />
        Wan't to earn BNB? Just buy REL and stake in this pool with amazing
        returns!
      </>
    ),
  },
  {
    token: Token.JIT_BUSD,
    bg: bnbBg,
    color: "#ef5350",
    // open: false,
    cardTitle: (
      <>
        <img
          src='friends/busd.png'
          style={{ width: "23px", marginBottom: "-4px", marginRight: "8px" }}
        />
        REL ~ BUSD
      </>
    ),
    desc: (
      <>
        Stake REL to earn BUSD. <br />
        Wan't to earn BUSD? Just buy REL and stake in this pool with amazing
        returns!
      </>
    ),
  },
  {
    token: Token.JIT_DOGE,
    bg: bnbBg,
    color: "#ef5350",
    // open: false,
    cardTitle: (
      <>
        <img
          src='friends/doge.png'
          style={{ width: "23px", marginBottom: "-4px", marginRight: "8px" }}
        />
        REL ~ DOGE
      </>
    ),
    desc: (
      <>
        Stake REL to earn DOGE. <br />
        Wan't to earn DOGE? Just buy REL and stake in this pool with amazing
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
