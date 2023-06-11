import React, { Component, ErrorInfo, ReactNode } from 'react';

import ClayEmptyState from '@clayui/empty-state';
import ClayLayout from '@clayui/layout';

import AnimatedSatellite from 'assets/images/animated_satellite.gif';

interface IProps {
  children?: ReactNode;
}

interface IState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<IProps, IState> {
  public state: IState = {
    hasError: false,
  };

  public static getDerivedStateFromError(_error: Error): IState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('[ErrorBoundary][error]', error);
    console.log('[ErrorBoundary][errorInfo]', JSON.stringify(errorInfo));
  }

  public render() {
    if (this.state.hasError) {
      return (
        <ClayLayout.ContainerFluid view>
          <ClayEmptyState
            description="Please try to refresh the page"
            imgProps={{
              alt: 'Satellite moving up and down',
              title: 'error',
            }}
            imgSrc={AnimatedSatellite}
            title="Oops! Something went wrong"
          />
        </ClayLayout.ContainerFluid>
      );
    }

    return this.props.children;
  }
}
