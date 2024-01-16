// @flow
import type { Node } from 'react';
import { Component } from 'react';
import { observer } from 'mobx-react';
import Maintenance from '../components/loading/Maintenance';
import type { InjectedProps } from '../types/injectedPropsType';
import { handleExternalLinkClick } from '../utils/routing';

@observer
export default class MaintenancePage extends Component<InjectedProps> {

  render(): Node {
    return (
      <Maintenance
        onExternalLinkClick={handleExternalLinkClick}
      />
    );
  }
}
