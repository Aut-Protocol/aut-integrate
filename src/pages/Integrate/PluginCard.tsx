import { PluginDefinition } from "@aut-labs/sdk";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Stack,
  Typography,
  styled
} from "@mui/material";
import { memo, useMemo } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSelector } from "react-redux";
import { SelectedNetwork } from "@store/WalletProvider/WalletProvider";
import ErrorDialog from "@components/Dialog/ErrorPopup";
import { PluginDefinitionType } from "@aut-labs/sdk/dist/models/plugin";

const GridCard = styled(Card)(({ theme }) => {
  return {
    minHeight: "365px",
    width: "100%",
    transition: theme.transitions.create(["transform"]),
    "&:hover": {
      transform: "scale(1.019)"
    }
  };
});

const VerifySocialCard = ({
  plugin,
  isFetching,
  isAdmin,
  hasCopyright
}: {
  isAdmin: boolean;
  plugin: PluginDefinition;
  isFetching: boolean;
  hasCopyright: boolean;
}) => {
  const selectedNetwork = useSelector(SelectedNetwork);
  const [addPlugin, { error, isLoading, isError, reset }] = null as any;

  const path = useMemo(() => {
    return `${PluginDefinitionType[plugin.pluginDefinitionId]}`;
  }, []);

  const actionName = useMemo(() => {
    if (!plugin?.pluginAddress) return "Install";

    if (
      plugin.pluginDefinitionId === PluginDefinitionType.QuestOnboardingPlugin
    ) {
      return "Go to Quests";
    }
    return "Add Task";
  }, [plugin]);

  return (
    <>
      <ErrorDialog handleClose={() => reset()} open={isError} message={error} />
      <GridCard
        sx={{
          bgcolor: "nightBlack.main",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderColor: "divider",
          borderRadius: "16px",
          minHeight: "300px",
          boxShadow: 7,
          position: hasCopyright ? "relative" : "inherit"
        }}
        variant="outlined"
      >
        <CardHeader
          sx={{
            alignItems: "flex-start",
            minHeight: "140px",
            ".MuiCardHeader-action": {
              mt: "3px"
            }
          }}
          titleTypographyProps={{
            fontFamily: "FractulAltBold",
            mb: 2,
            fontWeight: 900,
            color: "white",
            variant: "subtitle1"
          }}
          subheaderTypographyProps={{
            color: "white"
          }}
          action={
            <>
              {!!plugin?.pluginAddress && <CheckCircleIcon color="success" />}
            </>
          }
          title={plugin?.metadata?.properties?.title}
          subheader={plugin?.metadata?.properties?.shortDescription}
        />
        <CardContent
          sx={{
            pt: 0
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex"
            }}
          >
            <LoadingButton
              loading={isLoading}
              sx={{
                width: "80%",
                my: 6,
                mx: "auto"
              }}
              size="large"
              disabled={
                isFetching || !path || (!plugin.pluginAddress && !isAdmin)
              }
              variant="outlined"
              loadingIndicator={
                <Stack direction="row" gap={1} alignItems="center">
                  <Typography className="text-secondary">
                    Installing...
                  </Typography>
                  <CircularProgress
                    size="20px"
                    // @ts-ignore
                    color={plugin.pluginAddress ? "offWhite" : "primary"}
                  />
                </Stack>
              }
              onClick={() => addPlugin(plugin)}
              color="offWhite"
            >
              {actionName}
            </LoadingButton>
          </Box>
          {hasCopyright && (
            <Box
              sx={{
                position: "absolute",
                bottom: "15px",
                right: "15px"
              }}
            >
              {" "}
              <Typography color="white" variant="caption">
                © Āut Labs
              </Typography>
            </Box>
          )}
        </CardContent>
      </GridCard>
    </>
  );
};

export default memo(VerifySocialCard);
