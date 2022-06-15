import { Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { pxToRem } from '@utils/text-size';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const UploadWrapper = styled('div')({
  height: pxToRem(65),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: '1px solid #439EDD',
});

const AFileUpload = ({ fileChange = (file: File) => null, initialPreviewUrl = null }) => {
  const [preview, setPreview] = useState(initialPreviewUrl);
  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    multiple: false,
    noKeyboard: true,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
    },
    onDrop: ([file]) => {
      const url = URL.createObjectURL(file);
      setPreview(url);
      fileChange(file);
    },
  });

  const handleActionClick = () => {
    if (preview) {
      setPreview(null);
      fileChange(null);
    } else {
      open();
    }
  };

  return (
    <UploadWrapper className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
      </div>
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            fontSize: pxToRem(18),
            paddingLeft: '14px',
            color: '#fff',
          }}
        >
          Logo
        </Typography>
      </div>
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          sx={{
            height: '100%',
            width: pxToRem(200),
          }}
          variant="contained"
          disableElevation
          color="primary"
          onClick={handleActionClick}
        >
          Upload
        </Button>
      </div>
    </UploadWrapper>
  );
};

export default AFileUpload;
