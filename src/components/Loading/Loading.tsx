import React from 'react';

import ClayLoadingIndicator from '@clayui/loading-indicator';

import './styles.css';

const Loading = () => {
  return (
    <div className="loading-indicator">
      <ClayLoadingIndicator />
    </div>
  );
};

export default Loading;
