import { useCallback, useMemo, useRef } from "react";
import { Box, Button, InputBase, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NumberFormat from "react-number-format";
import { BigNumber } from "ethers";
import prettyMilliseconds from "pretty-ms";
import PrimaryButton from "@components/PrimaryButton";
import { TokenName } from "@utils/constants";
import { getFullDisplayBalance } from "@utils/formatters";

const useStyles = makeStyles(({ palette }) => ({
  root: {
    // background: "#f06500",
  },
  inputBox: {
    display: "flex",
    alignItems: "center",
    borderRadius: 10,
    border: `1px solid #fff`,
    overflow: "hidden",
    // background: "#f06500",

  },
  token: {
    padding: 12,
    display: " inline-flex",
    alignItems: "center",
  },
  logo: {
    height: 22,
    
    marginRight: 8,
  },
  input: {
    flex: 1,
    padding: "10px 12px",
    borderLeft: `1px solid ${palette.divider}`,
    fontSize: 24,
    color: "#fff"

  },
  max: {
    fontWeight: 700,
    color: "#fff"
  },
  maxLabelBox: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,


  },
  maxLabel: {
    fontSize: 10,
    fontWeight: 700,
    fontFamily: "Padauk",

    color: "#fff"
    
  },
}));

interface Props {
  token: TokenEnum;
  input?: string;
  onInput: (v: string, max?: boolean) => void;
  amount: BigNumber; // ehter BN format of input
  max: BigNumber;
  lockDownSeconds: BigNumber | null;
  btnLabel: string;
  logo?: string;
  loading: boolean;
  disabled: boolean;
  onSubmit: () => void;
}

export default function AmountInput({
  token,
  input,
  onInput,
  amount,
  max,
  lockDownSeconds,
  btnLabel,
  logo,
  loading = false,
  disabled = false,
  onSubmit,
}: Props) {
  const classes = useStyles();

  const maxRef = useRef<boolean>();

  const setMax = useCallback(() => {
    if (!amount.eq(max)) {
      maxRef.current = true;
      onInput(
        getFullDisplayBalance(max, { mantissa: 6, trimMantissa: true }),
        true
      );
    }
  }, [amount, max, onInput]);

  const lockDownTime = useMemo(
    () =>
      lockDownSeconds
        ? prettyMilliseconds(lockDownSeconds.toNumber() * 1000, {
          verbose: true,
        })
        : null,
    [lockDownSeconds]
  );

  return (
    <Box className={classes.root}>
      <Box className={classes.inputBox}>
        <span className={classes.token}>
          {logo ? <img src={logo} alt={""} className={classes.logo} /> : null}
          <Typography>{TokenName[token]}</Typography>
        </span>
        <NumberFormat
          value={input}
          onValueChange={(values) => {
            onInput(values.value, maxRef.current);
            maxRef.current = false;
          }}
          allowNegative={false}
          thousandSeparator
          isNumericString
          placeholder='0.0'
          customInput={InputBase}
          className={classes.input}
        />
        <Button
          variant='text'
          color='primary'
          className={classes.max}
          onClick={setMax}
        >
          Max
        </Button>
      </Box>
      <Box className={classes.maxLabelBox}>
        <Typography variant='overline' color='textSecondary'>
          {lockDownTime && `Lock: ${lockDownTime}`}
        </Typography>
        <Typography
          variant='overline'
          color={amount.gt(max) ? "error" : "primary"}
          className={classes.maxLabel}
        >
          {getFullDisplayBalance(max)} Available
        </Typography>
      </Box>
      <PrimaryButton
        size='large'
        fullWidth
        disabled={disabled || amount.lte(0) || amount.gt(max)}
        onClick={onSubmit}
        loading={loading}
      >
        {btnLabel}
      </PrimaryButton>
    </Box>
  );
}
