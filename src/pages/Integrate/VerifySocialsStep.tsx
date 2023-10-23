/* eslint-disable max-len */
import { PluginDefinition } from "@aut-labs/sdk";
import { PluginDefinitionType } from "@aut-labs/sdk/dist/models/plugin";
import ErrorDialog from "@components/Dialog/ErrorPopup";
import { StepperButton } from "@components/Stepper";
import { StepperChildProps } from "@components/Stepper/model";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  alpha,
  styled,
  Typography,
  useTheme,
  CircularProgress,
  Stack,
  Avatar
} from "@mui/material";
import {
  IntegrateCommunity,
  integrateUpdateCommunity
} from "@store/Integrate/integrate";
import { SelectedNetwork } from "@store/WalletProvider/WalletProvider";
import { useAppDispatch } from "@store/store.model";
import { MarketTemplates, VerificationSocials } from "@utils/misc";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { red } from "@mui/material/colors";
import { verifySocial } from "@api/social-verifications/verify";
import { useAccount } from "wagmi";

const StepWrapper = styled("form")({
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column"
});

const GridBox = styled(Box)(({ theme }) => {
  return {
    boxSizing: "border-box",
    display: "grid",
    gridTemplateColumns: "1fr",
    gridGap: "30px",
    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "repeat(2,minmax(0,1fr))"
    },
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(3,minmax(0,1fr))"
    },
    [theme.breakpoints.up("lg")]: {
      gridTemplateColumns: "repeat(4,minmax(0,1fr))"
    }
  };
});

const GridCard = styled(Card)(({ theme }) => {
  return {
    minHeight: "165px",
    width: "100%",
    transition: theme.transitions.create(["transform", "background-color"]),
    "&:hover": {
      transform: "scale(1.019)"
    },
    "&:hover:not(.active)": {
      backgroundColor: alpha(theme.palette.primary.main, 0.16)
    },
    "&.active": {
      backgroundColor: alpha(theme.palette.primary.main, 0.3)
    }
  };
});

const VerifySocialStep = (props: StepperChildProps) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { address: account } = useAccount();
  const { market } = useSelector(IntegrateCommunity);
  const { control, handleSubmit, getValues, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      market
    }
  });

  const updateState = () => {
    return dispatch(integrateUpdateCommunity(getValues()));
  };

  const onSubmit = async () => {
    await updateState();
    props?.stepper?.nextStep();
  };

  return (
    <StepWrapper onSubmit={handleSubmit(onSubmit)}>
      <GridBox sx={{ flexGrow: 1 }}>
        {VerificationSocials.map(
          ({ title, description, icon, type }, index) => (
            <Grid item key={index}>
              <Controller
                name="market"
                key={market}
                control={control}
                rules={{
                  validate: {
                    selected: (v) => !!v
                  }
                }}
                render={({ field: { value, onChange } }) => {
                  return (
                    <GridCard
                      // className={value === market ? "active" : ""}
                      sx={{
                        bgcolor: "nightBlack.main",
                        borderColor: "divider",
                        borderRadius: "16px",
                        minHeight: "100px",
                        boxShadow: 3,
                        display: "flex",
                        flexDirection: "column",
                        position: "relative"
                      }}
                      variant="outlined"
                    >
                      <CardHeader
                        avatar={
                          <Avatar src={icon} aria-label="icon">
                            R
                          </Avatar>
                        }
                        sx={{
                          ".MuiCardHeader-action": {
                            mt: "3px"
                          }
                          // display: "flex",
                          // flexDirection: "column"
                        }}
                        titleTypographyProps={{
                          fontFamily: "FractulAltBold",
                          mb: 1,
                          fontWeight: 900,
                          textAlign: "left",
                          color: "white",
                          variant: "subtitle2"
                        }}
                        title={title}
                      />
                      <CardContent
                        sx={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column"
                        }}
                      >
                        <Typography
                          textAlign="left"
                          className="text-secondary"
                          variant="body"
                        >
                          {description}
                        </Typography>
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex"
                          }}
                        >
                          <LoadingButton
                            // loading={isLoading}
                            sx={{
                              width: "80%",
                              mt: 3,
                              mx: "auto"
                            }}
                            type="button"
                            size="medium"
                            // disabled={
                            //   isFetching ||
                            //   !path ||
                            //   (!plugin.pluginAddress && !isAdmin)
                            // }
                            variant="outlined"
                            loadingIndicator={
                              <Stack
                                direction="row"
                                gap={1}
                                alignItems="center"
                              >
                                <Typography className="text-secondary">
                                  Installing...
                                </Typography>
                                <CircularProgress
                                  size="20px"
                                  // @ts-ignore
                                  color="offWhite"
                                />
                              </Stack>
                            }
                            onClick={() =>
                              dispatch(
                                verifySocial({
                                  type,
                                  userAddress: account
                                })
                              )
                            }
                            color="offWhite"
                          >
                            Connect
                          </LoadingButton>
                        </Box>
                      </CardContent>
                    </GridCard>
                  );
                }}
              />
            </Grid>
          )
        )}
      </GridBox>
      <StepperButton label="Next" disabled={!formState.isValid} />
    </StepWrapper>
  );
};

export default VerifySocialStep;
