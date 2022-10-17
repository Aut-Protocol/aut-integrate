import { Box, styled, Typography } from '@mui/material';
import { ReactComponent as AutLogo } from '@assets/aut/logo.svg';
import { pxToRem } from '@utils/text-size';
import { useHistory, useLocation } from 'react-router-dom';
import { AutButton } from '@components/buttons';
import { useAppDispatch } from '@store/store.model';
import { SelectedNetworkConfig, setProviderIsOpen } from '@store/WalletProvider/WalletProvider';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useBiconomy } from '@api/ProviderFactory/web-biconimy';

const Wrapper = styled('div')({
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  height: '100%',
});

const GetStarted = () => {
  const dispatch = useAppDispatch();
  const [connectInitiated, setConnectInitiated] = useState(false);
  const { isActive } = useWeb3React();
  const networkConfig = useSelector(SelectedNetworkConfig);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!connectInitiated) {
      return;
    }
    if (isActive && networkConfig) {
      history.push({
        pathname: '/integrate',
        search: location.search,
      });
    }
  }, [isActive, networkConfig]);

  const goToIntegrate = () => {
    setConnectInitiated(true);
    if (!isActive || !networkConfig) {
      dispatch(setProviderIsOpen(true));
    } else {
      history.push({
        pathname: '/integrate',
        search: location.search,
      });
    }
  };

  return (
    <Wrapper>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <AutLogo height={pxToRem(250)} />
      </Box>
      <Box>
        <Typography
          component="div"
          sx={{
            color: 'white',
            mt: pxToRem(50),
            mb: pxToRem(30),
            textAlign: 'left',
            fontWeight: 'bold',
            fontSize: pxToRem(25),
          }}
        >
          Do more with your DAO.
        </Typography>
        <Typography
          component="div"
          sx={{
            color: 'white',
            mb: pxToRem(20),
            textAlign: 'left',
            fontSize: pxToRem(25),
          }}
        >
          Āut is an expandable Community protocol, powering the next level of collective coordination 🤝🫂
        </Typography>
        <Typography
          component="div"
          sx={{
            color: 'white',
            mb: pxToRem(20),
            textAlign: 'left',
            fontSize: pxToRem(25),
          }}
        >
          By integrating it, you can expand your DAO contract - adding the concepts of Members Roles & <br /> Interactions directly
          on-chain.
        </Typography>
        <Typography
          component="div"
          sx={{
            color: 'white',
            mb: pxToRem(20),
            textAlign: 'left',
            fontSize: pxToRem(25),
          }}
        >
          Assign Roles to your Community - and kick off role-based working routines and role-weighted governance <br /> in seconds.
        </Typography>
        <Typography
          component="div"
          sx={{
            color: 'white',
            mb: pxToRem(50),
            textAlign: 'left',
            fontSize: pxToRem(25),
          }}
        >
          There is no community like yours - create your own Standards. Opt Āut.
        </Typography>
      </Box>
      <Box sx={{ gridGap: '30px', display: 'flex', justifyContent: 'center' }} className="right-box">
        <AutButton
          sx={{
            width: pxToRem(360),
            height: pxToRem(70),
          }}
          type="submit"
          color="primary"
          variant="outlined"
          onClick={() => goToIntegrate()}
        >
          Expand
        </AutButton>
        {/* <AutButton
          sx={{
            width: pxToRem(450),
            height: pxToRem(90),
          }}
          component={Link}
          disabled
          to="/integrate"
          type="submit"
          color="primary"
          variant="outlined"
        >
          Dashboard
        </AutButton> */}
      </Box>
    </Wrapper>
  );
};

export default GetStarted;
