import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import logoBlack from '@assets/sw-logo-black.svg';
import { ReactComponent as NetworkIcon } from '@assets/network.svg';
import { ReactComponent as AnalyticsIcon } from '@assets/analytics-dark.svg';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store.model';
import { pxToRem } from '@utils/text-size';
import PartnerButton from '@components/Button';

const GetStarted = () => {
  const { isAutheticated } = useSelector((state: RootState) => state.auth);

  return (
    <div className="sw-get-started-container">
      <Box className="black-box" />
      <Box sx={{ px: '85px' }} className="right-box" />
    </div>
  );
};

export default GetStarted;
