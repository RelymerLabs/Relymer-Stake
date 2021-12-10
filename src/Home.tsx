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
        <img src="friends/logo.png" style={{ width: "23px", marginBottom: "-4px", marginRight: "8px" }} />
        KIK ~ KIK
      </>
    ),
    desc: (
      <>
        Stake KIK to earn KIK. <br />
        Simplest way to get more KIK with amazing returns is to just stake them in this pool!
      </>
    ),
  },
  {
    token: Token.JIT_DOGE,
    bg: bnbBg,
    color: "#ef5350",
    cardTitle: (
      <>
        <img src="friends/doge.png" style={{ width: "23px", marginBottom: "-4px", marginRight: "8px" }} />
        KIK ~ Doge
      </>
    ),
    desc: (
      <>
        Stake KIK to earn DOGE. <br />
        Wan't to earn DOGE? Just buy KIK and stake in this pool with amazing returns!
      </>
    ),
  },
  {
    token: Token.JIT_SHIB,
    bg: bnbBg,
    color: "#ef5350",
    cardTitle: (
      <>
        <img src="friends/shib-inu.png" style={{ width: "23px", marginBottom: "-4px", marginRight: "8px" }} />
        KIK ~ SHIBA INU
      </>
    ),
    desc: (
      <>
        Stake KIK to earn SHIB. <br />
        Wan't to earn SHIB? Just buy KIK and stake in this pool with amazing returns!
      </>
    ),
  },
  {
    token: Token.JIT_AKITA,
    bg: bnbBg,
    color: "#ef5350",
    cardTitle: (
      <>
        <img src="friends/akita-inu.png" style={{ width: "23px", marginBottom: "-4px", marginRight: "8px" }} />
        KIK ~ AKITA INU
      </>
    ),
    desc: (
      <>
        Stake KIK to earn AKITA. <br />
        Wan't to earn AKITA? Just buy KIK and stake in this pool with amazing returns!
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
      {cards.map((card) => (
        <StakeCard key={card.token} {...card} className={classes.card} />
      ))}
    </div>
  );
}
