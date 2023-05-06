import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardProps,
  CardHeader,
  CardActions,
  CardContent,
} from "@material-ui/core";
import { useAtomValue } from "jotai/utils";
import { stakedAtomFamily, withdrawableAtomFamily } from "@atoms/balance";
import defaultTheme from "@utils/theme";
import useWallet from "@hooks/useWallet";
import ExternalLink from "@components/ExternalLink";
import ConnectButton from "../ConnectButton";
import CardSection from "./CardSection";
import Pending from "./Pending";
import Stats from "./Stats";
import Earned from "./Earned";
import AmountStake from "./AmountStake";
import { useMemo } from "react";
import { DEPRECATED_TOKENS } from "@/utils/constants";

const useStyles = makeStyles(() => ({
  desc: {
    color: "#fff",
    fontSize: "14px",
    fontFamily: "Padauk",

    lineHeight: "22px",
    minHeight: 22 * 3,
  },
}));

const StyledCard = withStyles(({ palette }) => ({
  root: {
    width: 340,
    flex: "0 0 340px",
    // borderRadius: 20,
    // backgroundColor: "transparent",
    backgroundRepeat: "no-repeat",
    backgroundSize: "auto 180px",
    backgroundPosition: "top -12px right -12px",
    border: `2px solid #4caf50`,
    boxShadow: "0px 8px #4caf50 !important"

  },
}))(Card);

const StyledHeader = withStyles({
  root: {
    paddingTop: 32,
    backgroundColor: "#4CAF50ae",
    color: "#fff"
  },
  title: {
    marginBottom: 8,
    fontFamily: "Lemon",
    letterSpacing: "3px",
    textTransform: "uppercase",
    color: "#fff"

  },
})(CardHeader);

const StyledContent = withStyles(() => ({
  root: {
    padding: 0,
    backgroundColor: "#4A7133",
    color: "#fff"

  },
}))(CardContent);

const StyledLinks = withStyles(({ palette }) => ({
  root: {
    padding: 1,
    backgroundColor: "#4CAF50ac",
    borderTop: `none`,
    color: "#fff"

  },
}))(CardActions);

interface LinkProps {
  href: string;
  logo: string;
  text: string;
}

export interface StakeCardProps extends CardProps {
  token: TokenEnum;
  cardTitle?: string | React.ReactNode;
  desc: string | React.ReactNode;
  bg: string;
  color?: string;
  logo?: string;
  links?: LinkProps[];
  open?: boolean;
  disabledActions?: ActionEnum[];
}

export default function StakeCard({
  token,
  bg,
  color = defaultTheme.palette.primary.main,
  cardTitle,
  desc,
  logo,
  links,
  open = true,
  disabledActions,
  ...props
}: StakeCardProps) {
  const classes = useStyles();
  const { connected } = useWallet();

  const staked = useAtomValue(stakedAtomFamily(token));
  const withdrawable = useAtomValue(withdrawableAtomFamily(token));

  const cardEnabled = useMemo(() => {
    // if (DEPRECATED_TOKENS.indexOf(token) > -1) {
    //   return !staked.isZero() || !withdrawable.isZero();
    // }
    return true;
  }, [staked, token, withdrawable]);

  if (!cardEnabled) {
    return null;
  }

  return (
    <StyledCard
      variant='outlined'
      style={{
        backgroundImage: `url(${bg})`,
        backgroundColor: '#113f65',
        boxShadow: '0 8px 40px 0 rgba(0,0,0,10%)',
        color: "#fff"
      }}
      {...props}
    >
      <StyledHeader
        title={cardTitle || `Stake ${token}`}
        subheader={
          <Typography className={classes.desc} >
            {desc}
          </Typography>
        }
        style={{
          color,
        }}
      />
      <StyledContent>
        <Stats token={token} />
      </StyledContent>
      <div
        style={{
          position: open ? undefined : "relative",
        }}
      >
        <StyledContent>
          <Earned token={token} />
          {connected ? (
            <AmountStake
              logo={logo}
              token={token}
            // disabledActions={disabledActions}
            />
          ) : (
            <CardSection>
              <ConnectButton fullWidth rounded size='large' />
            </CardSection>
          )}
        </StyledContent>
        <StyledLinks>
          {links?.map(({ href, logo, text }) => (
            <ExternalLink key={href} href={href} logo={logo}>
              {text}
            </ExternalLink>
          ))}
        </StyledLinks>
        {!open && <Pending>pending</Pending>}
      </div>
    </StyledCard>
  );
}
