import React, { ProviderProps, ReactElement } from 'react';
import { render } from '@testing-library/react';

import { HomeContext, HomeContextType } from 'contexts/home/home.context';
import {
  SearchBarContext,
  SearchBarContextType,
} from 'contexts/search-bar/search-bar.context';

/**
 * A custom render to setup providers. Extends regular
 * render options with `providerProps` to allow injecting
 * different scenarios to test with.
 *
 * @see https://testing-library.com/docs/react-testing-library/setup#custom-render
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const customRender = (
  ui: ReactElement,
  {
    homeProviderProps,
    searchBarProviderProps,
    ...renderOptions
  }: {
    homeProviderProps: ProviderProps<HomeContextType>;
    searchBarProviderProps: ProviderProps<SearchBarContextType>;
  }
) => {
  return render(
    <HomeContext.Provider {...homeProviderProps}>
      <SearchBarContext.Provider {...searchBarProviderProps}>
        {ui}
      </SearchBarContext.Provider>
    </HomeContext.Provider>,
    renderOptions
  );
};

export * from '@testing-library/react';
export { customRender as render };
