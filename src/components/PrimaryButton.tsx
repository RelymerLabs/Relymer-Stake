/** @format */

import { Button, ButtonProps, CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const StyledButton = withStyles(({ palette }) => ({
  root: {
    textTransform: "uppercase",
    flex: "0 0 100px",
    fontWeight: 700,
    color: "#fff", //palette.text.primary,
    borderRadius: "5px",
    background: "linear-gradient(90deg, #4c9540 0%, #4A7133 100%)",

    letterSpacing: "0.88px",

    "&:disabled": {
      color: "#ffff",
      background: "#4c9540ac",

      boxShadow: "none",
    },
  },
}))(Button);

interface Props extends ButtonProps {
  loading?: boolean;
}

export default function PrimaryButton({
  loading = false,
  disabled,
  children,
  ...props
}: Props) {
  return (
    <StyledButton disabled={loading || disabled} {...props}>
      {loading ? (
        <CircularProgress color='inherit' size={20} thickness={2} />
      ) : (
        children
      )}
    </StyledButton>
  );
}
