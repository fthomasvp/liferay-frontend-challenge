/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';

import ClayLayout from '@clayui/layout';
import ClayEmptyState from '@clayui/empty-state';

import animatedNotFoundIllustration from 'assets/images/animated_not_found_illustration.gif';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(`[ErrorBoundary][error]\n${error}`);
    console.log(`[ErrorBoundary][errorInfo]\n${JSON.stringify(errorInfo)}`);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ClayLayout.ContainerFluid view>
          <ClayEmptyState
            description="Please try to refresh the page"
            imgProps={{
              alt: 'satellite moving up and down',
              title: 'error',
            }}
            imgSrc={animatedNotFoundIllustration}
            title="Oops! Something went wrong"
          />
        </ClayLayout.ContainerFluid>
      );
    }

    return this.props.children;
  }
}
