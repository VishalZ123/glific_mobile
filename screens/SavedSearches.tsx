import React, { useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
// import { useQuery } from '@apollo/client';

import SearchBar from '../components/ui/SearchBar';
import { COLORS, SIZES } from '../constants';
// import { SAVED_SEARCH_QUERY } from '../graphql/queries/Search';

const SavedSearches = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [savedSearch, setSavedSearch] = useState([]);

  // const variables = {
  //   filter: { term: searchValue },
  //   opts: { limit: 1 },
  // };
  // const { loading, error, data } = useQuery(SAVED_SEARCH_QUERY, { variables });

  const onSearchHandler = async () => {
    try {
      if (searchValue == '') return;

      // TODO:
      console.log(searchValue);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (error) {
  //     console.log(error);
  //   }
  //   if (data) {
  //     const newSearches = data.search.map((element: any) => {
  //       return {
  //         id: element.group?.id,
  //         name: element.group?.label || 'Unknown Name',
  //       };
  //     });

  //     setSavedSearch(newSearches);
  //   }
  // }, [data, error]);

  return (
    <FlatList
      data={savedSearch}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Text>Saved Search</Text>}
      ListHeaderComponent={
        <SearchBar
          value={searchValue}
          setSearchValue={(value) => setSearchValue(value)}
          onSearch={onSearchHandler}
        />
      }
      ListEmptyComponent={<Text style={styles.emptyText}>No Saved Searches</Text>}
      stickyHeaderIndices={[0]}
      stickyHeaderHiddenOnScroll={true}
      style={styles.mainContainer}
    />
  );
};

export default SavedSearches;

const styles = StyleSheet.create({
  emptyText: {
    alignSelf: 'center',
    color: COLORS.darkGray,
    fontSize: SIZES.f14,
    fontWeight: '500',
    marginTop: SIZES.m16,
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
});
