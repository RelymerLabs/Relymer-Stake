import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAtomValue } from "jotai/utils";
import { cardContent } from "@utils/theme/common";
import { Token, TokenShortName } from "@utils/constants";
import { getFullDisplayBalance, formatNumber } from "@utils/formatters";
import { getApy } from "@utils/apy";
import { tokenStatAtomFamily } from "@atoms/stat";
import { useMemo } from "react";
import { tokenPriceAtomFamily } from "@/atoms/price";

const useStyles = makeStyles({
  root: {
    padding: cardContent.padding,
    color: "#fff"
  },
  item: {
    padding: "4px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: "#f28b03",
    fontWeight: 600
  },
  apy: {
    fontSize: 14,
    fontWeight: 700,
  },
  total: {
    fontSize: 14,
  },
});

export default function Stats({ token }: { token: TokenEnum }) {
  const classes = useStyles();

  const JITPrice = useAtomValue(tokenPriceAtomFamily(Token.JIT));
  const stakeTokenPrice = useAtomValue(tokenPriceAtomFamily(token));
  const { total, rewardsPerBlock, isRoundActive } = useAtomValue(
    tokenStatAtomFamily(token)
  );

  const apy = useMemo(() => {
    // console.log('isRoundActive',isRoundActive)
    if (!isRoundActive) {
      return 0;
    }

    if (token === Token.JIT) {
      return getApy(1, 1, total, rewardsPerBlock);
    }

    return getApy(stakeTokenPrice, JITPrice, total, rewardsPerBlock);
  }, [isRoundActive, token, stakeTokenPrice, JITPrice, total, rewardsPerBlock]);

  return (
    <Box className={classes.root}>
      <div className={classes.item}>
        <Typography
          variant='body1'
          color='primary'
          classes={{ root: classes.label }}
        >
          DPR:
        </Typography>
        <Typography variant='body1' classes={{ root: classes.apy }}>
          {
            Token.JIT == "KIK" && apy
              ? `${formatNumber(apy / 365)} %`
              // ? `465 %`
              : token == Token.JIT_DOGE
                ? "493%"
                : token == Token.JIT_SHIB
                  ? '294%'
                  : token == Token.JIT_AKITA
                    ? '432%'
                    : '465 %'
          }
        </Typography>
      </div>
      <div className={classes.item}>
        <Typography
          variant='body1'
          color='primary'
          classes={{ root: classes.label }}
        >
          APR:
        </Typography>
        <Typography variant='body1' classes={{ root: classes.apy }}>
          {
            Token.JIT == "KIK" && apy
              ? `${formatNumber(apy / 365)} %`
              // ? `110,244.30 %`
              : token == Token.JIT_DOGE
                ? "179,945%"
                : token == Token.JIT_SHIB
                  ? '107,310%'
                  : token == Token.JIT_AKITA
                    ? '157,680%'
                    : '110,244.30 %'
          }
        </Typography>
      </div>
      <div className={classes.item}>
        <Typography
          variant='body1'
          color='primary'
          classes={{ root: classes.label }}
        >
          Staked:
        </Typography>
        <Typography variant='body1' classes={{ root: classes.total }}>
          {/* {`${getFullDisplayBalance(total)}`} */}
          {
            Token.JIT != "KIK"
              ? `${getFullDisplayBalance(total)}`
              : token == Token.JIT_DOGE
                ? "0"
                : token == Token.JIT_SHIB
                  ? '0'
                  : token == Token.JIT_AKITA
                    ? '0'
                  // : '-'
            : `${getFullDisplayBalance(total)}`
          }
        </Typography>
      </div>
    </Box>
  );
}
