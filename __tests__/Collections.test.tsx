import React from 'react';
import { waitFor } from '@testing-library/react-native';
import customRender from '../utils/jestRender';

import Collections from '../screens/Collections';
import { GET_COLLECTIONS } from '../graphql/queries/Collection';

const mockGroups = {
  id: '1',
  label: 'test group',
};

const mocks = [
  {
    request: {
      query: GET_COLLECTIONS,
      variables: {
        filter: { term: '', searchGroup: true },
        messageOpts: { limit: 1 },
        contactOpts: { limit: 10 },
      },
    },
    result: {
      data: {
        search: [
          {
            group: mockGroups,
          },
        ],
      },
    },
  },
];

describe('Collections Screen', () => {
  test('renders the Collections screen', async () => {
    const { getByTestId, findByText } = customRender(<Collections />, mocks);
    const searchInput = getByTestId('searchInput');
    const searchIcon = getByTestId('searchIcon');
    const filterIcon = getByTestId('filterIcon');

    await waitFor(async () => {
      expect(searchInput).toBeDefined();
      expect(searchIcon).toBeDefined();
      expect(filterIcon).toBeDefined();

      const collectionCard = await getByTestId('collectionCard');
      const testGroup = await findByText('test group');

      expect(collectionCard).toBeTruthy();
      expect(testGroup).toBeTruthy();
    });
  });
});
