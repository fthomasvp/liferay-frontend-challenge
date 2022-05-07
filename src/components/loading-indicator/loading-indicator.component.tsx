import React from 'react';

import ClayLoadingIndicator from '@clayui/loading-indicator';

import './loading-indicator.styles.css';

const LoadingIndicator = (): JSX.Element => {
  return (
    <div className="loading-indicator">
      <ClayLoadingIndicator />
    </div>
  );
};

export default LoadingIndicator;
