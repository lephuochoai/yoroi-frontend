// @flow
import type { Node, ComponentType } from 'react';
import type { $npm$ReactIntl$IntlShape } from 'react-intl';
import type { RestoreModeType } from '../../../../../actions/common/wallet-restore-actions';
import { defineMessages, injectIntl, FormattedHTMLMessage } from 'react-intl';
import { observer } from 'mobx-react';
import { Stack, Typography, Box } from '@mui/material';
import StepController from '../../StepController';
import fifteenImg from '../../../../../assets/images/add-wallet/restore/15-word.inline.svg';
import twentyfourImg from '../../../../../assets/images/add-wallet/restore/24-word.inline.svg';
import AddWalletCard from '../../../add-wallet-revamp/AddWalletCard';
import styles from './SelectWalletTypeStep.scss';

const messages: * = defineMessages({
  fifteenWords: {
    id: 'wallet.restore.type.fifteen',
    defaultMessage: '!!!15-word recovery phrase',
  },
  twentyfourWords: {
    id: 'wallet.restore.type.twentyfour',
    defaultMessage: '!!!24-word recovery phrase',
  },
});

type Intl = {|
  intl: $npm$ReactIntl$IntlShape,
|};

type Props = {|
  onNext(mode: RestoreModeType): void,
  goBack(): void,
|};

function SelectWalletTypeStep(props: Props & Intl): Node {
  const { onNext, goBack, intl } = props;

  return (
    <Stack alignItems="center" justifyContent="center">
      <Stack direction="column" alignItems="center" justifyContent="center" maxWidth="648px">
        <Box className={styles.container}>
          <AddWalletCard
            onClick={() => onNext({ type: 'cip1852', extra: undefined, length: 15 })}
            imageSx={{ pt: '10px' }}
            imageSrc={fifteenImg}
            label={intl.formatMessage(messages.fifteenWords)}
          />
          <AddWalletCard
            onClick={() => onNext({ type: 'cip1852', extra: undefined, length: 24 })}
            imageSx={{ pt: '10px' }}
            imageSrc={twentyfourImg}
            label={intl.formatMessage(messages.twentyfourWords)}
          />
        </Box>

        <StepController goBack={goBack} showNextButton={false} />
      </Stack>
    </Stack>
  );
}

export default (injectIntl(observer(SelectWalletTypeStep)): ComponentType<Props>);
