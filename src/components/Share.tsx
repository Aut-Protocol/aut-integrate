import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TwitterShareButton } from "react-share";
import { pxToRem } from "@utils/text-size";
import { AutButton } from "./buttons";
import DialogWrapper from "./Dialog/DialogWrapper";
import AppTitle from "./AppTitle";

export interface SimpleDialogProps {
  title: string;
  url: string;
  description?: JSX.Element;
  open?: boolean;
  onClose?: () => void;
  twitterProps?: any;
  rightSide: JSX.Element;
  hideCloseBtn?: boolean;
}

const AutShare = (props: SimpleDialogProps) => {
  const { onClose, title, description, url, twitterProps, hideCloseBtn } =
    props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        flex: 1
      }}
    >
      <AppTitle
        mb={{
          xs: "16px",
          lg: "24px",
          xxl: "32px"
        }}
        variant="h2"
      />

      <Typography
        mb={{
          xs: "16px",
          lg: "24px",
          xxl: "32px"
        }}
        color="white"
        component="span"
        variant="subtitle1"
      >
        {title}
      </Typography>

      {description}

      <div
        className="links"
        style={{
          display: "flex",
          justifyContent: "center",
          width: "330px",
          margin: "40px auto 0 auto"
        }}
      >
        <TwitterShareButton
          url={url}
          className="social-button"
          {...twitterProps}
        >
          <Button
            type="submit"
            color="offWhite"
            variant="outlined"
            size="normal"
          >
            Share now
          </Button>
        </TwitterShareButton>
      </div>
    </div>
  );
};

export function AutShareDialog(props: SimpleDialogProps) {
  return (
    <DialogWrapper onClose={props.onClose} open={props.open}>
      <AutShare {...props} />
    </DialogWrapper>
  );
}

export default AutShare;
