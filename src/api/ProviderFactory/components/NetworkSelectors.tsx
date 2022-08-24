import { environment } from '@api/environment';
import { AutGradientButton } from '@components/buttons';
import { pxToRem } from '@utils/text-size';

export const NetworkSelectors = ({ onSelect }) => {
  return (
    <>
      {environment.networks.split(',').map((networkName, index) => {
        const label = environment.networkNames.split(',')[index];
        const foundChainId = Number(environment.chainIds.split(',')[index]);
        return (
          <AutGradientButton
            key={`key-${index}`}
            onClick={() => {
              onSelect(foundChainId, networkName.trim());
            }}
            sx={{
              width: pxToRem(330),
              height: pxToRem(80),
              marginBottom: pxToRem(30),
              fontSize: pxToRem(16),
              textTransform: 'inherit',
              letterSpacing: 0,
              '&.MuiButton-root': {
                letterSpacing: '0px',
              },
            }}
            type="button"
            color="primary"
            variant="outlined"
          >
            Switch to {label}
          </AutGradientButton>
        );
      })}
    </>
  );
};
