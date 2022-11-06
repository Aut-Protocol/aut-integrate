import { Box, Typography } from "@mui/material";
import { RootState } from "@store/store.model";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { AutButton } from "./buttons";

function NotFound() {
  const { previousRoute } = useSelector((state: RootState) => state.ui);
  const { search } = useLocation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        transform: "translate(-50%, -50%)",
        left: "50%",
        top: "50%"
      }}
    >
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: "10px",
          fontSize: "70px"
        }}
      >
        404.
      </Typography>
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: "70px"
        }}
        variant="h2"
      >
        This page could not be found
      </Typography>
      <AutButton
        sx={{
          width: "140px",
          height: "50px"
        }}
        type="button"
        mode="light"
        component={Link}
        to={previousRoute + search}
        label="Go back"
      />
    </Box>
  );
}

export default NotFound;
