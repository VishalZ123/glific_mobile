import { gql } from '@apollo/client';

export const SAVED_SEARCH_QUERY = gql`
  query savedSearches($filter: SavedSearchFilter!, $opts: Opts) {
    savedSearches(filter: $filter, opts: $opts) {
      id
      shortcode
      label
      isReserved
      args
    }
  }
`;
