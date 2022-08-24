import { Dialog, DialogContent, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TwitterShareButton } from 'react-share';
import { pxToRem } from '@utils/text-size';
import { AutButton } from './buttons';

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
  const { onClose, title, description, url, twitterProps, hideCloseBtn } = props;
  return (
    <div
      style={{
        width: pxToRem(700),
        minHeight: pxToRem(400),
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        borderWidth: '5px',
        backgroundColor: 'black',
        borderColor: '#439EDD',
        borderStyle: 'solid',
        padding: pxToRem(50),
      }}
    >
      {!hideCloseBtn && (
        <CloseIcon
          onClick={onClose}
          sx={{
            position: 'absolute',
            cursor: 'pointer',
            top: 8,
            right: 8,
            color: 'white',
          }}
        />
      )}

      <div
        style={{
          display: 'flex',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
            flex: 1,
          }}
        >
          <Typography color="white" marginBottom={pxToRem(20)} component="span" fontSize={pxToRem(35)}>
            {title}
          </Typography>

          {description}

          <div
            className="links"
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '330px',
              margin: '10px auto 0 auto',
            }}
          >
            <TwitterShareButton url={url} className="social-button" {...twitterProps}>
              <AutButton
                sx={{
                  width: pxToRem(250),
                  height: pxToRem(50),
                  mt: pxToRem(20),
                  '&.MuiButton-root': {
                    borderRadius: 0,
                    borderWidth: '2px',
                  },
                }}
                type="submit"
                color="primary"
                variant="outlined"
              >
                Share now
              </AutButton>
            </TwitterShareButton>
          </div>
        </div>

        {/* <div
          style={{
            flex: 1,
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {props.rightSide}
        </div> */}
      </div>
    </div>
  );
};

export function AutShareDialog(props: SimpleDialogProps) {
  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      sx={{
        maxWidth: 'none',
        '.MuiPaper-root': {
          maxWidth: 'none',
        },
      }}
    >
      <DialogContent
        sx={{
          minWidth: 'inherit',
          border: 0,
          padding: 0,
        }}
      >
        <AutShare {...props} />
      </DialogContent>
    </Dialog>
  );
}

export default AutShare;
