/* eslint-disable max-len */
import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton
} from "@mui/material";
import { pxToRem } from "@utils/text-size";
import CloseIcon from "@mui/icons-material/Close";

export const DialogWrapper = ({
  children,
  actions = null,
  open,
  onClose = null,
  fullScreen = false,
  contentSx = {} as any
}) => {
  return (
    <Dialog
      open={open}
      fullScreen={fullScreen}
      {...(onClose && {
        onClose
      })}
      sx={{
        ".MuiPaper-root": {
          ...(contentSx?.maxWidth && {
            maxWidth: contentSx.maxWidth
          })
        }
      }}
    >
      <DialogContent
        sx={{
          maxWidth: pxToRem(550),
          minWidth: pxToRem(550),
          minHeight: actions ? pxToRem(400) : pxToRem(550),
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          background: "#000",
          borderStyle: "solid",
          borderImage:
            "linear-gradient(45deg, #009fe3 0%, #0399de 8%, #0e8bd3 19%, #2072bf 30%, #3a50a4 41%, #5a2583 53%, #453f94 71%, #38519f 88%, #3458a4 100%) 1",
          borderWidth: pxToRem(15),
          ...contentSx
        }}
      >
        {!!onClose && (
          <IconButton
            size="small"
            aria-label="close"
            onClick={() => {
              onClose();
            }}
            type="button"
            sx={{
              color: "white",
              position: "absolute",
              right: pxToRem(15),
              top: pxToRem(15)
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}

        {children}

        {actions && (
          <DialogActions
            sx={{
              backgroundColor: "background.default",
              py: pxToRem(30),
              justifyContent: "center",
              height: pxToRem(120)
            }}
          >
            {actions}
          </DialogActions>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogWrapper;
