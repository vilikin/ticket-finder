import React from 'react';
import './ProgressBar.css';
import classNames from 'classnames';

import { getLoadingContext } from '../../utils/loading-context';

const LoadingContext = getLoadingContext();

class ProgressBar extends React.Component {

  render() {
    const { loading, progress } = this.context;
    const progressPercent = (progress * 100).toFixed(0);

    const containerClasses = classNames('progress-bar', {
      'visible': loading,
    });

    return (
      <div className={containerClasses}>
        <div className="fill" style={{width: `${progressPercent}%`}} />
      </div>
    );
  }
}

ProgressBar.contextType = LoadingContext;

export default ProgressBar;