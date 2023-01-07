import { useEffect } from "react";
import { useAppDispatch } from "@store/store.model";
import { pxToRem } from "@utils/text-size";
import {
  ConnectorTypes,
  NetworkConnector,
  setWallet
} from "@store/WalletProvider/WalletProvider";
import { ReactComponent as WalletConnectLogo } from "@assets/aut/wallet-connect.svg";
import { ReactComponent as MetamaskLogo } from "@assets/aut/metamask.svg";
import { Button, Typography } from "@mui/material";
import { AutButton } from "@components/buttons";
import { useSelector } from "react-redux";

const btnConfig = {
  [ConnectorTypes.Metamask]: {
    label: "Metamask",
    icon: <MetamaskLogo />
  },
  [ConnectorTypes.WalletConnect]: {
    label: "WalletConnect",
    icon: <WalletConnectLogo />
  }
};

export default function ConnectorBtn({
  connectorType,
  setConnector
}: {
  connectorType: ConnectorTypes;
  setConnector: any;
}) {
  const dispatch = useAppDispatch();
  const [connector] = useSelector(NetworkConnector(connectorType));

  useEffect(() => {
    if (connector) {
      // connector.connectEagerly();
    }
  }, [connector]);

  return (
    <Button
      onClick={async () => {
        await connector.connectEagerly();
        dispatch(setWallet(connectorType));
        setConnector(connector);
      }}
      startIcon={btnConfig[connectorType].icon}
      variant="outlined"
      size="normal"
      color="offWhite"
      sx={{
        minWidth: {
          xs: "260px",
          md: "280px",
          lg: "300px",
          xxl: "440px"
        }
      }}
    >
      {btnConfig[connectorType].label}
    </Button>
  );
}
