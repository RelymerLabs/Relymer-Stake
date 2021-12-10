import { useUpdateAtom } from "jotai/utils";
import { Button, ButtonProps } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { openAtom } from "@atoms/wallet";

interface Props extends ButtonProps {
  rounded?: boolean;
}

const StyledButton = withStyles(({ palette }) => ({
  root: {
    fontWeight: 700,
    borderRadius: 16,
    color: "#fff"
  },
}))(Button);

const useStyles = makeStyles({
  rounded: {
    borderRadius: "6px",
    background: 'linear-gradient(84deg, #f28b03, #f06500)',


    "&:hover": {
      background: 'linear-gradient(180deg , #f06500  , #f28b03)',

    },
  },
});

const isAvailable = true;

export default function ConnectButton({ rounded, ...props }: Props) {
  const classes = useStyles();

  const setOpen = useUpdateAtom(openAtom);

  return (
    <StyledButton
      variant='contained'
      color='primary'
      size='small'
      onClick={() => setOpen(true)}
      disabled={!isAvailable}
      {...props}
      className={rounded ? classes.rounded : ""}
    >
      {isAvailable ? "Connect Wallet" : "Available Soon"}
    </StyledButton>
  );
}
