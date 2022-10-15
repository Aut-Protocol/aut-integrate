import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { trimAddress } from '@utils/helpers';
import { Tooltip, Typography, IconButton, Snackbar, Button } from '@mui/material';
import { pxToRem } from '@utils/text-size';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export const CopyAddress = ({ address, textStyles = {}, iconStyles = {} }) => {
  const [open, setOpen] = useState(false);

  const action = (
    <>
      <IconButton size="small" aria-label="close" color="inherit" onClick={() => setOpen(false)}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
      <Snackbar
        sx={{
          '.MuiPaper-root': {
            // background: '#009FE3',
            color: 'white',
            borderRadius: '4px',
            overflow: 'hidden',
            fontSize: pxToRem(18),
            paddingY: 0,
            textalign: 'center',
            alignItems: '',
            display: 'flex',
            justifyContent: 'center',
            minWidth: '200px',
            backgroundColor: 'transparent',
            borderImage:
              // eslint-disable-next-line max-len
              'linear-gradient(45.57deg, #009fe3 0%, #0399de 8%, #0e8bd3 19%, #2072bf 30%, #3a50a4 41%, #5a2583 53%, #453f94 71%, #38519f 88%, #3458a4 100%) 1',
            borderWidth: '3px',
            borderColor: 'transparent',
          },
        }}
        open={open}
        autoHideDuration={2000}
        action={action}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message="Copied to clipboard"
      />
      <CopyToClipboard text={address} onCopy={() => setOpen(true)}>
        <div style={{ color: 'white' }}>
          <Tooltip title="Copy Address">
            <Typography sx={{ color: 'white', fontSize: pxToRem(12), ...textStyles }} component="div">
              {trimAddress(address)}
              <IconButton sx={{ color: 'white', p: 0 }}>
                <ContentCopyIcon sx={{ cursor: 'pointer', width: pxToRem(12), ml: '5px', ...iconStyles }} />
              </IconButton>
            </Typography>
          </Tooltip>
        </div>
      </CopyToClipboard>
    </>
  );
};

export default CopyAddress;
