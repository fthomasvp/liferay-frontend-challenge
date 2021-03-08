import React from 'react';

import { GitHubRepo } from 'utils/types';

type DashboardContext = {
  repositories: GitHubRepo[];
  addRepository: (repository: GitHubRepo) => void;
  selectedRepository?: GitHubRepo;
  setSelectedRepository: (repository: GitHubRepo) => void;
  deleteRepository: () => void;
};

export const GitHubContext = React.createContext<DashboardContext>({
  repositories: [],
  addRepository: () => console.log('Just for start'),
  selectedRepository: {
    id: 1,
    full_name: '',
    created_at: '',
    stargazers_count: 1,
    language: '',
    forks_count: 1,
    open_issues_count: 1,
    license: {
      name: '',
    },
    lastCommitAt: '',
  },
  setSelectedRepository: () => console.log('Just for start'),
  deleteRepository: () => console.log('Just for start'),
});
