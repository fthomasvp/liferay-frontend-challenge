import React from 'react';

import { GitHubRepo } from 'utils/types';

type DashboardContext = {
  repositories: GitHubRepo[];
  addRepository: (repository: GitHubRepo) => void;
};

export const GitHubContext = React.createContext<DashboardContext>({
  repositories: [],
  addRepository: () => console.log('Just for start'),
});
