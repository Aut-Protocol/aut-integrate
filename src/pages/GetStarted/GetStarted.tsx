import { Box, styled, Typography } from '@mui/material';
import { ReactComponent as AutLogo } from '@assets/aut/logo.svg';
import { pxToRem } from '@utils/text-size';
import { Link, useHistory } from 'react-router-dom';
import { AutGradientButton } from '@components/buttons';
import { useAppDispatch } from '@store/store.model';
import { SelectedNetworkConfig } from '@store/WalletProvider/WalletProvider';
import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

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
  const { isActive } = useWeb3React();
  const networkConfig = useSelector(SelectedNetworkConfig);
  const history = useHistory();

  // useEffect(() => {
  //   dispatch(setProviderIsOpen(false));
  // }, []);

  useEffect(() => {
    // if (isActive && networkConfig) {
    //   history.push('/integrate');
    // }
  }, [isActive, networkConfig]);

  return (
    <Wrapper>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <AutLogo height={pxToRem(300)} />
      </Box>
      <Box
        sx={{
          maxWidth: pxToRem(750),
        }}
      >
        <Typography
          component="div"
          variant="h1"
          sx={{
            color: 'white',
            mt: pxToRem(50),
            mb: pxToRem(10),
            textAlign: 'left',
            fontWeight: 'bold',
          }}
        >
          Do more with your DAO.
        </Typography>
        <Typography
          component="div"
          variant="emphasis"
          sx={{
            color: 'white',
            mb: pxToRem(20),
            textAlign: 'left',
          }}
        >
          Āut is an expandable Community protocol, powering the next level of collective coordination 🤝🫂
        </Typography>
        <Typography
          component="div"
          variant="body1"
          sx={{
            color: 'white',
            mb: pxToRem(20),
            textAlign: 'left',
          }}
        >
          By integrating it, you can expand your DAO contract - adding the concepts of Members Roles & <br /> Interactions directly
          on-chain.
        </Typography>
        <Typography
          component="div"
          variant="body1"
          sx={{
            color: 'white',
            mb: pxToRem(20),
            textAlign: 'left',
          }}
        >
          Assign Roles to your Community - and kick off role-based working routines and role-weighted governance <br /> in seconds.
        </Typography>
        <Typography
          component="div"
          variant="body1"
          sx={{
            color: 'white',
            mb: pxToRem(50),
            textAlign: 'left',
          }}
        >
          There is no community like yours - create your own Standards. Opt Āut.
        </Typography>
      </Box>
      <Box sx={{ gridGap: '30px', display: 'flex', justifyContent: 'center' }} className="right-box">
        {/* <AutButton
          sx={{
            width: pxToRem(450),
            height: pxToRem(90),
          }}
          type="submit"
          color="primary"
          variant="outlined"
          onClick={() => dispatch(setProviderIsOpen(true))}
        >
          Integrate
        </AutButton> */}
        <AutGradientButton
          sx={{
            width: pxToRem(335),
            height: pxToRem(85),
          }}
          component={Link}
          to="/integrate"
          type="submit"
          color="primary"
          variant="outlined"
        >
          Integrate
        </AutGradientButton>
      </Box>
    </Wrapper>
  );
};

export default GetStarted;
