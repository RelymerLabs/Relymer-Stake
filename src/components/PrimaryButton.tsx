import { Button, ButtonProps, CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const StyledButton = withStyles(({ palette }) => ({
  root: {
    textTransform: "lowercase",
    flex: "0 0 100px",
    fontWeight: 700,
    color: '#fff',//palette.text.primary,
    borderRadius: "2px",
    background: 'linear-gradient(180deg , #f06500  , #f28b03)',

    letterSpacing: "0.88px",
   
    "&:disabled": {
      color: "#ffff",
      background: '#f06400bb',
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
      {loading ? <CircularProgress color="inherit" size={20} thickness={2} /> : children}
    </StyledButton>
  );
}
