import React from 'react';

import { GitHubRepo } from 'utils/types';

type DashboardContextType = {
  repositories: GitHubRepo[];
  filteredRepositories?: GitHubRepo[];
  setFilteredRepositories: (repositories: GitHubRepo[]) => void;
  selectedRepository?: GitHubRepo;
  setSelectedRepository: (repository: GitHubRepo) => void;
  addRepository: (repository: GitHubRepo) => void;
  deleteRepository: () => void;
  filterRepositories: (text: string) => void;
  orderRepositories: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  searchText: string;
  setSearchText: (text: string) => void;
  isFiltering: boolean;
  setIsFiltering: (isFiltering: boolean) => void;
};

export const DashboardContext = React.createContext<DashboardContextType>({
  repositories: [],
  filteredRepositories: [],
  setFilteredRepositories: () => console.log('setFilteredRepositories'),
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
  setSelectedRepository: () => console.log('setSelectedRepository'),
  addRepository: () => console.log('addRepository'),
  deleteRepository: () => console.log('deleteRepository'),
  filterRepositories: () => console.log('filterRepositories'),
  orderRepositories: () => console.log('orderRepositories'),
  searchText: '',
  setSearchText: () => console.log('setSearchText'),
  isFiltering: false,
  setIsFiltering: () => console.log('setIsFiltering'),
});
