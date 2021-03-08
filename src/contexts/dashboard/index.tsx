import React from 'react';

import { GitHubRepo } from 'utils/types';

type DashboardContextType = {
  repositories: GitHubRepo[];
  addRepository: (repository: GitHubRepo) => void;
  selectedRepository?: GitHubRepo;
  setSelectedRepository: (repository: GitHubRepo) => void;
  deleteRepository: () => void;
  orderRepositories: (e: any) => void;
};

export const DashboardContext = React.createContext<DashboardContextType>({
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
  orderRepositories: () => console.log('Just for start'),
});
