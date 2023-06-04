import { TGitHubRepo } from 'features/github';
import { createContext, useContext } from 'react';

export type THomeContext = {
  repositories: TGitHubRepo[];
  // setRepositories: Dispatch<SetStateAction<TGitHubRepo[]>>;
  setRepositories: (repos: TGitHubRepo[]) => void;
  isStarred: boolean;
  setIsStarred: (isStarred: boolean) => void;
};

export const HomeContext = createContext<THomeContext | undefined>(undefined);

export const useHomeContext = () => {
  const home = useContext(HomeContext);

  if (!home) {
    throw new Error('useHomeContext must be used with a HomeContext');
  }

  return home;
};
