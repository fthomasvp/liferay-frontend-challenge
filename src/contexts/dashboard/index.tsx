import React from 'react';

import { GitHubRepo, Filter } from 'utils/types';

type DashboardContextType = {
  repositories: GitHubRepo[];
  filteredRepositories?: GitHubRepo[];
  setFilteredRepositories: (repositories: GitHubRepo[]) => void;
  selectedRepository?: GitHubRepo;
  setSelectedRepository: (repository: GitHubRepo) => void;
  addRepository: (repository: GitHubRepo) => void;
  deleteRepository: () => void;
  filterRepositories: (filter: Filter) => void;
  orderRepositories: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  searchText: string;
  setSearchText: (text: string) => void;
  isFiltering: boolean;
  setIsFiltering: (isFiltering: boolean) => void;
  favorRepository: (repository: GitHubRepo) => void;
  starIcon: boolean;
  setStarIcon: (hasStarIcon: any) => void;
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
  searchText: '',
  setSearchText: () => null,
  isFiltering: false,
  setIsFiltering: () => null,
  favorRepository: () => null,
  starIcon: true,
  setStarIcon: () => null,
});
