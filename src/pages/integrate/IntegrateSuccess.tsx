/* eslint-disable max-len */
import { StepperChildProps } from '@components/Stepper/model';
import { Avatar, Box, Container, IconButton, styled, Tooltip, Typography } from '@mui/material';
import { pxToRem } from '@utils/text-size';
import { ReactComponent as CutLogo } from '@assets/aut/cut.svg';
import { AutButton } from '@components/buttons';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useParams } from 'react-router-dom';
import { trimAddress } from '@utils/helpers';
import CopyAddress from '@components/CopyAddress';
import { AutShareDialog } from '@components/Share';
import { useSelector } from 'react-redux';
import { IntegrateCommunity } from '@store/Integrate/integrate';
import { useState } from 'react';

const StepWrapper = styled(Container)({
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

const IntegrateSuccess = (props: StepperChildProps) => {
  const [open, setOpen] = useState(false);
  const community = useSelector(IntegrateCommunity);
  const params = useParams<{ address: string }>();
  const shareMessage = `Hey there! We've just deployed ${community?.name} on Aut - choose your Role in our Community, and let's build something great together!`;
  return (
    <StepWrapper maxWidth="md" sx={{ width: '100%', flexGrow: 1, boxSizing: 'border-box', position: 'relative' }}>
      <AutShareDialog
        open={open}
        onClose={() => setOpen(false)}
        url="https://Aut.id/"
        title="Title for Tweet Here"
        description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. "
        twitterProps={{
          title: shareMessage,
          hashtags: ['Aut', 'DAO', 'Blockchain'],
        }}
        hideCloseBtn
        rightSide={
          <Avatar
            sx={{
              height: pxToRem(165),
              width: pxToRem(165),
            }}
            variant="square"
            src={community?.image as string}
          />
        }
      />
      <Typography letterSpacing="10.5px" textTransform="uppercase" marginTop={pxToRem(50)} fontSize={pxToRem(70)} color="white">
        Congratulations
      </Typography>
      <CutLogo />

      <Typography letterSpacing="1.25px" maxWidth="80%" marginTop={pxToRem(20)} fontSize={pxToRem(18)} color="white">
        Your new community address
      </Typography>

      <CopyAddress
        textStyles={{
          fontSize: pxToRem(30),
        }}
        iconStyles={{
          width: pxToRem(30),
        }}
        address={params.address}
      />
      <Typography
        letterSpacing="1.25px"
        minHeight={pxToRem(240)}
        maxWidth="80%"
        marginTop={pxToRem(40)}
        fontSize={pxToRem(25)}
        color="white"
      >
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
        erat, sed diam voluptua.
      </Typography>
      <Box sx={{ gridGap: '30px', display: 'flex', justifyContent: 'center' }} className="right-box">
        <AutButton
          sx={{
            width: pxToRem(450),
            height: pxToRem(90),
          }}
          type="button"
          color="primary"
          onClick={() => setOpen(true)}
          variant="outlined"
        >
          Share
        </AutButton>
        <AutButton
          sx={{
            width: pxToRem(450),
            height: pxToRem(90),
          }}
          type="button"
          color="primary"
          variant="outlined"
          href="https://github.com/SkillWallet/web-component"
        >
          See Your Dashboard
        </AutButton>
      </Box>
    </StepWrapper>
  );
};

export default IntegrateSuccess;
