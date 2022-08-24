/* eslint-disable max-len */
import { StepperChildProps } from '@components/Stepper/model';
import { Avatar, Box, Container, IconButton, Link, styled, Tooltip, Typography } from '@mui/material';
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
    <StepWrapper maxWidth="lg" sx={{ width: '100%', flexGrow: 1, boxSizing: 'border-box', position: 'relative' }}>
      <AutShareDialog
        open={open}
        onClose={() => setOpen(false)}
        url="https://Aut.id/"
        title="Celebrate the new era of your DAO 🎉"
        description={
          <>
            <Typography marginBottom={pxToRem(15)} fontSize={pxToRem(18)} color="white">
              {community?.name} 2.0 is now live on @opt_aut - with on-chain Roles & Interactions for all our Members 🙌 <br />
            </Typography>

            {/* <Typography marginBottom={pxToRem(15)} fontSize={pxToRem(18)} color="white">
              Have a look at the Contract {'—> '} <br />
              <Link sx={{ color: 'white' }} target="_blank" href={`https://blockscout.com/xdai/mainnet/address/${params.address}`}>
                https://blockscout.com/xdai/mainnet/address/${trimAddress(params.address)}
              </Link>
            </Typography> */}

            <Typography marginBottom={pxToRem(15)} fontSize={pxToRem(18)} color="white">
              Let’s coordinate, change things - break things. Together 🫂
            </Typography>
          </>
        }
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
      <Typography letterSpacing="8px" textTransform="uppercase" marginTop={pxToRem(50)} fontSize={pxToRem(50)} color="white">
        You’ve now expanded your Community 🎉
      </Typography>
      <CutLogo />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: pxToRem(100),
        }}
      >
        <Typography letterSpacing="1.25px" maxWidth="80%" marginRight={pxToRem(100)} fontSize={pxToRem(25)} color="white">
          Your expanded DAO Contract {'—> '}
        </Typography>

        <CopyAddress
          textStyles={{
            fontSize: pxToRem(25),
          }}
          iconStyles={{
            width: pxToRem(50),
          }}
          address={params.address}
        />
      </div>
      <Typography letterSpacing="1.25px" maxWidth="80%" marginTop={pxToRem(40)} fontSize={pxToRem(20)} color="white">
        This contract already knows about the Roles and Interactions of your Community Members.
      </Typography>

      <Typography
        letterSpacing="1.25px"
        marginTop={pxToRem(40)}
        marginBottom={pxToRem(100)}
        maxWidth="80%"
        fontSize={pxToRem(20)}
        color="white"
      >
        Today begins the 2nd life of your DAO. <br /> Tweet to let everybody know about it, or just head over to your Dashboard & get things
        started!
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
          disabled
          href="https://github.com/SkillWallet/web-component"
        >
          See Your Dashboard
        </AutButton>
      </Box>
    </StepWrapper>
  );
};

export default IntegrateSuccess;
