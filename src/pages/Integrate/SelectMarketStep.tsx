/* eslint-disable max-len */
import { StepperButton } from "@components/Stepper";
import { StepperChildProps } from "@components/Stepper/model";
import { Card, CardContent, Grid, styled, Typography } from "@mui/material";
import {
  IntegrateCommunity,
  integrateUpdateCommunity
} from "@store/Integrate/integrate";
import { useAppDispatch } from "@store/store.model";
import { MarketTemplates } from "@utils/misc";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const StepWrapper = styled("form")({
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column"
});

const AutCard = styled(Card)(({ theme, color }) => {
  return {
    "&.MuiPaper-root": {
      boxSizing: "border-box",
      cursor: "pointer",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      backgroundColor: "transparent",
      border: "none",
      position: "relative",
      "&::before": {
        transition: theme.transitions.create(["border-color"]),
        border: `1px solid ${theme.palette[color].dark}`,
        content: `" "`,
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      "&:hover::before": {
        borderWidth: "2px",
        borderColor: theme.palette[color].dark
      },
      "&.active::before": {
        borderWidth: "2px",
        borderColor: theme.palette[color].light
      }
    }
  };
});

const SelectMarketStep = (props: StepperChildProps) => {
  const dispatch = useAppDispatch();
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
      <Grid
        container
        justifyContent="space-around"
        alignItems="center"
        spacing={{
          xs: "20px",
          md: "22px",
          xxl: "75px"
        }}
      >
        {MarketTemplates.map(({ title, market, description }, index) => (
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
                  <AutCard
                    sx={{
                      height: {
                        xs: "100%",
                        md: "235px",
                        lg: "250px",
                        xxl: "350px"
                      },
                      width: {
                        xs: "100%",
                        md: "280px",
                        lg: "290px",
                        xxl: "335px"
                      }
                    }}
                    square
                    color="offWhite"
                    onClick={() => onChange(value === market ? null : market)}
                    className={value === market ? "active" : ""}
                  >
                    <CardContent
                      sx={{
                        flex: 1,
                        display: "flex",
                        padding: {
                          xs: "20px",
                          md: "28px",
                          lg: "30px",
                          xxl: "50px"
                        },
                        flexDirection: "column"
                      }}
                    >
                      <Typography mb={2} color="white" variant="subtitle1">
                        {title}
                      </Typography>
                      <Typography
                        textAlign="left"
                        color="white"
                        variant="body1"
                      >
                        {description}
                      </Typography>
                    </CardContent>
                  </AutCard>
                );
              }}
            />
          </Grid>
        ))}
      </Grid>

      <StepperButton label="Next" disabled={!formState.isValid} />
    </StepWrapper>
  );
};

export default SelectMarketStep;
