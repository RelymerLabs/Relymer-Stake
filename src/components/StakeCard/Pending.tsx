import { Box, Backdrop, Typography, BackdropProps } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const StyledBackdrop = withStyles({
  root: {
    position: "absolute",
    zIndex: 1,
    fontSize: 22,
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
  },
})(Backdrop);

export default function Pending({
  children,
  ...props
}: Omit<BackdropProps, "open">) {
  return (
    <StyledBackdrop open {...props}>
      <Box>
        <Typography variant='h6' display='block'>
        This staking pool is not live,
 <br />
 stay tuned for updates.<br />
         
        </Typography>
      </Box>
    </StyledBackdrop>
  );
}
