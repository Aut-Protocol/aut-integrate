import { Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store.model';
import { ReactComponent as AutLogo } from '@assets/aut/logo.svg';
import { pxToRem } from '@utils/text-size';
import { Link } from 'react-router-dom';

const GetStarted = () => {
  const { isAutheticated } = useSelector((state: RootState) => state.auth);

  return (
    <div className="sw-get-started-container">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <AutLogo height={pxToRem(300)} />
      </Box>
      <Box sx={{ gridGap: '20px', display: 'flex', justifyContent: 'center' }} className="right-box">
        <Button
          sx={{
            width: pxToRem(450),
            height: pxToRem(90),
            mt: pxToRem(50),
          }}
          type="submit"
          color="primary"
          variant="outlined"
          component={Link}
          to="/integrate"
        >
          Integrate
        </Button>
        <Button
          sx={{
            width: pxToRem(450),
            height: pxToRem(90),
            mt: pxToRem(50),
          }}
          component={Link}
          to="/integrate"
          type="submit"
          color="primary"
          variant="outlined"
        >
          Dashboard
        </Button>
      </Box>
    </div>
  );
};

export default GetStarted;
