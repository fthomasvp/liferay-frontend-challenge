import React from 'react';
import { Link } from 'react-router-dom';

import ClayLayout from '@clayui/layout';
import ClayEmptyState from '@clayui/empty-state';

import AnimatedSatellite from 'assets/images/animated_satellite.gif';

const NotFoundPage = () => {
  return (
    <ClayLayout.ContainerFluid view>
      <ClayEmptyState
        description="Looks like you are trying to access a page that does not exist"
        imgProps={{
          alt: 'satellite moving up and down',
          title: 'page not found',
        }}
        imgSrc={AnimatedSatellite}
        title="404 - Page not found"
      >
        <Link to="/">
          <p>Go to Home page</p>
        </Link>
      </ClayEmptyState>
    </ClayLayout.ContainerFluid>
  );
};

export default NotFoundPage;
