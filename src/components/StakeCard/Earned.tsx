import { useCallback, useState, useMemo } from "react";
import { useAtomValue } from "jotai/utils";
import { Box, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import CountUp from "react-countup";
import { cardContent } from "@utils/theme/common";
import useFetchState from "@hooks/useFetchState";
import PrimaryButton from "@components/PrimaryButton";
import { earnedAtomFamily } from "@atoms/balance";
import { getFullDisplayBalance } from "@utils/formatters";
import useStaking from "@hooks/useStaking";

const useStyles = makeStyles({
  root: {
    ...cardContent,
    display: "flex",
    alignItems: "center",
    // background: "#f06500",

  },
  amount: {
    flex: 1,
    overflow: "hidden",
  },
});

const AmountLabel = withStyles({
  root: {
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: "1px",
  },
})(Typography);

const Amount = withStyles({
  root: {
    paddingRight: 8,
    fontSize: 22,
    letterSpacing: "1.71px",
    fontWeight: 500,
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
})(Typography);

interface Props {
  token: TokenEnum;
}

export default function Earned({ token }: Props) {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);

  const refresh = useFetchState();
  const earned = useAtomValue(earnedAtomFamily(token));

  const stakingContract = useStaking(token);

  const end = useMemo(
    () => parseFloat(getFullDisplayBalance(earned).replace(/,/g, "")),
    [earned]
  );

  const handleHarvest = useCallback(async () => {
    if (stakingContract) {
      try {
        setLoading(true);
        const tx = await stakingContract.getReward();
        enqueueSnackbar(
          <>
            Transaction has been sent to blockchain,
            <br />
            waiting for confirmation...
          </>,
          { variant: "info" }
        );
        const res = await tx.wait(1);
        console.log("Harvest:", res);
        enqueueSnackbar(
          `Successfully harvested ${getFullDisplayBalance(earned)} REL`,
          { variant: "success" }
        );
        refresh();
      } catch (e) {
        // console.log(e);
        // enqueueSnackbar(e.error ?? "Operation Failed", { variant: "error" });
      }
      setLoading(false);
    }
  }, [earned, enqueueSnackbar, refresh, stakingContract]);

  return (
    <Box className={classes.root}>
      <Box className={classes.amount}>
        <AmountLabel variant='caption' style={{color:"#fff"}}>
          Your Earnings
        </AmountLabel>

        <CountUp
          start={0}
          end={end}
          delay={0.1}
          duration={end === 0 ? 0 : 2}
          decimals={2}
          preserveValue
        >
          {({ countUpRef }) => (
            <Amount ref={countUpRef} style={{color:"#fff"}} variant='body1'></Amount>
          )}
        </CountUp>
      </Box>
      <PrimaryButton
        loading={loading}
        size='large'
        disabled={earned.lte(0)}
        onClick={handleHarvest}
      >
        withdraw
      </PrimaryButton>
    </Box>
  );
}
