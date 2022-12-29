/* eslint-disable max-len */
import {
  Dialog,
  DialogActions,
  DialogContent,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { pxToRem } from "@utils/text-size";

export const DialogWrapper = ({
  children,
  actions = null,
  open,
  onClose = null,
  fullScreen = false
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Dialog
      open={open}
      fullScreen={isMobile || fullScreen}
      {...(onClose && {
        onClose
      })}
    >
      <DialogContent
        sx={{
          ...(!isMobile &&
            !fullScreen && {
              maxWidth: {
                xs: "100%",
                sm: "450px"
              },
              minWidth: {
                xs: "100%",
                sm: "450px"
              },
              maxHeight: {
                xs: "100%",
                sm: "450px"
              },
              minHeight: {
                xs: "100%",
                sm: "450px"
              }
            }),
          padding: {
            xs: "20px",
            sm: "28px",
            md: "32px",
            lg: "40px"
          },
          display: "flex",
          alignItems: "center",
          flexDirection: "column"
          // background: "#000",
          // borderStyle: "solid",
          // borderImage:
          //   "linear-gradient(45deg, #009fe3 0%, #0399de 8%, #0e8bd3 19%, #2072bf 30%, #3a50a4 41%, #5a2583 53%, #453f94 71%, #38519f 88%, #3458a4 100%) 1",
          // borderWidth: pxToRem(15)
        }}
      >
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
