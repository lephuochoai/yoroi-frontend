//@flow
// import type { AssetAmount } from '../../../components/swap/types';
import { Box, Typography } from '@mui/material';
import { ReactComponent as InfoIcon } from '../../../assets/images/revamp/icons/info.inline.svg';
import TextField from '../../../components/common/TextField';
import { useSwapForm } from '../context/swap-form';
import adaTokenImage from '../mockAssets/ada.inline.svg';
import defaultTokenImage from '../../../assets/images/revamp/token-default.inline.svg';
import { urlResolveForIpfsAndCorsproxy } from '../../../coreUtils';

type Props = {|
  defaultTokenInfo: RemoteTokenInfo,
|};

export default function SwapConfirmationStep({ defaultTokenInfo }: Props): React$Node {

  const { sellTokenInfo, buyTokenInfo } = useSwapForm();

  function resolveImageForToken({ name, image } = {}): any {
    if (name === defaultTokenInfo.name) return adaTokenImage;
    return urlResolveForIpfsAndCorsproxy(image) ?? defaultTokenInfo;
  }

  console.log(11, sellTokenInfo);
  console.log(22, buyTokenInfo);

  return (
    <Box width="100%" mx="auto" maxWidth="506px" display="flex" flexDirection="column" gap="24px">
      <Box textAlign="center">
        <Typography component="div" variant="h4" fontWeight={500}>
          Confirm swap transaction
        </Typography>
      </Box>
      <Box display="flex" gap="16px" flexDirection="column">
        <Box>
          <Box>
            <Typography component="div" variant="body1" color="grayscale.500">
              Swap From
            </Typography>
          </Box>
          <Box>
            <Box
              width="40px"
              height="40px"
              sx={{ overflowY: 'hidden', '& > svg': { width: '100%', height: '100%' } }}
            >
              <img
                width="100%"
                src={resolveImageForToken(sellTokenInfo)}
                alt=""
                onError={e => {
                  e.target.src = defaultTokenImage;
                }}
              />
            </Box>
            <Box width="max-content">{sellTokenInfo?.ticker ?? ''}</Box>
          </Box>
        </Box>
        <Box>
          <Box>
            <Typography component="div" variant="body1" color="grayscale.500">
              Swap To
            </Typography>
          </Box>
          <Box>
            <Box>
              <Box
                width="40px"
                height="40px"
                sx={{ overflowY: 'hidden', '& > svg': { width: '100%', height: '100%' } }}
              >
                <img
                  width="100%"
                  src={resolveImageForToken(buyTokenInfo)}
                  alt=""
                  onError={e => {
                    e.target.src = defaultTokenImage;
                  }}
                />
              </Box>
              <Box width="max-content">{buyTokenInfo?.ticker ?? ''}</Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box display="flex" gap="8px" flexDirection="column">
        {/*<SummaryRow*/}
        {/*  col1="Dex"*/}
        {/*  col2={*/}
        {/*    <Box display="flex" alignItems="center" gap="8px">*/}
        {/*      <Box display="inline-flex">{poolInfo.image}</Box>*/}
        {/*      <Typography component="div" variant="body1" color="primary.500" fontWeight={500}>*/}
        {/*        {poolInfo.name} {poolInfo.isAuto ? '(Auto)' : null}*/}
        {/*      </Typography>*/}
        {/*    </Box>*/}
        {/*  }*/}
        {/*/>*/}
        <SummaryRow col1="Slippage tolerance" col2="1%" withInfo />
        <SummaryRow col1="Min ADA" col2="2 ADA" withInfo />
        <SummaryRow col1="Minimum assets received" col2="2.99 USDA" withInfo />
        <SummaryRow col1="Fees" col2="0 ADA" withInfo />
        <Box p="16px" bgcolor="#244ABF" borderRadius="8px" color="common.white">
          <Box display="flex" justifyContent="space-between">
            <Box>Total</Box>
            <Typography component="div" fontSize="20px" fontWeight="500">
              11 ADA
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Box />
            <Typography component="div" variant="body1">
              4.32 USD
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <TextField
          className="walletPassword"
          value=""
          label="Password"
          type="password"
          // {...walletPasswordField.bind()}
          // done={walletPasswordField.isValid}
          // error={walletPasswordField.error}
        />
      </Box>
    </Box>
  );
}

// type AssetRowProps = {|
//   asset: AssetAmount,
//   usdAmount?: string,
// |};

// const AssetRow = ({ asset, usdAmount = null }: AssetRowProps) => {
//   const { image = null, name, address, amount, ticker } = asset;
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         gap: '12px',
//         p: '8px',
//       }}
//     >
//       <Box flexShrink="0" width="48px" height="48px">
//         {image || <AssetDefault />}
//       </Box>
//       <Box flexGrow="1" width="100%">
//         <Box>
//           <Typography component="div" variant="body1">
//             {name}
//           </Typography>
//         </Box>
//         <Box>
//           <Typography component="div" variant="body2" color="grayscale.600">
//             {address}
//           </Typography>
//         </Box>
//       </Box>
//       <Box flexShrink="0" display="flex" flexDirection="column" alignItems="flex-end">
//         <Typography component="div" variant="body1" color="grayscale.900">
//           <span>{amount}</span>&nbsp;<span>{ticker}</span>
//         </Typography>
//         {usdAmount && (
//           <Typography component="div" variant="body2" color="grayscale.600">
//             {usdAmount} USD
//           </Typography>
//         )}
//       </Box>
//     </Box>
//   );
// };

const SummaryRow = ({ col1, col2, withInfo = false }) => (
  <Box display="flex" alignItems="center" justifyContent="space-between">
    <Box display="flex" alignItems="center">
      <Typography component="div" variant="body1" color="grayscale.500">
        {col1}
      </Typography>
      {withInfo ? (
        <Box ml="8px">
          <InfoIcon />
        </Box>
      ) : null}
    </Box>
    <Box>
      <Typography component="div" variant="body1">
        {col2}
      </Typography>
    </Box>
  </Box>
);
