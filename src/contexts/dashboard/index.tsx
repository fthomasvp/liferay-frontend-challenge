import React from 'react';

import { GitHubRepo, Filter } from 'utils/types';

type DashboardContextType = {
  repositories: GitHubRepo[];
  filteredRepositories?: GitHubRepo[];
  setFilteredRepositories: React.Dispatch<React.SetStateAction<GitHubRepo[]>>;
  selectedRepository?: GitHubRepo;
  setSelectedRepository: React.Dispatch<
    React.SetStateAction<GitHubRepo | undefined>
  >;
  addRepository: (repository: GitHubRepo) => void;
  deleteRepository: () => void;
  favorRepository: (repository: GitHubRepo) => void;
  filterRepositories: (filter: Filter) => void;
  orderRepositories: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  isFiltering: boolean;
  setIsFiltering: React.Dispatch<React.SetStateAction<boolean>>;
  starIcon: boolean;
  setStarIcon: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DashboardContext = React.createContext<DashboardContextType>({
  repositories: [],
  filteredRepositories: [],
  setFilteredRepositories: () => null,
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
    isFavored: false,
  },
  setSelectedRepository: () => null,
  addRepository: () => null,
  deleteRepository: () => null,
  filterRepositories: () => null,
  orderRepositories: () => null,
  isFiltering: false,
  setIsFiltering: () => null,
  favorRepository: () => null,
  starIcon: true,
  setStarIcon: () => null,
});
