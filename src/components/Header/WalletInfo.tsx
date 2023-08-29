import React from "react";
import { useMemo } from "react";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { Button, Box, BoxProps, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { openAtom } from "@atoms/wallet";
import { availableAtomFamily } from "@atoms/balance";
import useWallet from "@hooks/useWallet";
import { Token } from "@utils/constants";
import { getFullDisplayBalance } from "@utils/formatters";

const useStyles = makeStyles({
  root: {
    borderRadius: 3,
    // background: "rgba(16,38,55,0.3)",
    border: "1px dotted #35e39d",
    whiteSpace: "nowrap",
    textAlign: "center",
    marginTop: "20px",
  },
  button: {
    padding: "6px 12px",
  },
  dot: {
    display: "inline-block",
    marginRight: 12,
    height: 12,
    width: 12,
    borderRadius: "50%",
    backgroundColor: ({ connected }: { connected: boolean }) =>
      connected ? "#2AD4B7" : "gray",
  },
  balance: {
    // borderTop: "1px solid #11263B",
    padding: "6px 12px",
    textAlign: "right",
  },
});

const StyledUnit = withStyles(() => ({
  root: {
    paddingLeft: 12,
    paddingRight: 12,
    color: "#fff",
    fontWeight: 600,
  },
}))(Typography);

export default function WalletInfo({ className, ...props }: BoxProps) {
  const { shortAccount, connected } = useWallet();
  const classes = useStyles({ connected });
  const setOpen = useUpdateAtom(openAtom);

  // const availablePHB = useAtomValue(availableAtomFamily(Token.PHB));
  const availableJIT = useAtomValue(availableAtomFamily(Token.JIT));

  const balances = useMemo(() => {
    return [
      {
        token: Token.JIT,
        amount: availableJIT,
      },
      // {
      //   token: Token.PHB,
      //   amount: availablePHB,
      // },
    ];
  }, [availableJIT]);

  return (
    // <React.Fragment>
    //   {balances.map(({ token, amount }) => (
    //     <StyledUnit variant='caption'> {getFullDisplayBalance(amount)} {token} Balance</StyledUnit>
    //   ))}
    // </React.Fragment>
    <Box className={clsx(classes.root, className)} {...props}>
      {/* <Button variant='text' size='small' className={classes.button}>
        <Typography variant='body2' onClick={() => setOpen(true)}>
          <i className={classes.dot} />
          {shortAccount}
        </Typography>
      </Button> */}
      <Box className={classes.balance}>
        {balances.map(({ token, amount }) => (
          <Box key={token}>
            <StyledUnit variant='caption'>Balance: {getFullDisplayBalance(amount)} {token}</StyledUnit>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
