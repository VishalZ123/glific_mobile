import { GET_COLLECTIONS } from '../../graphql/queries/Collection';

const mockGroups = {
  id: '1',
  label: 'test group',
  messages: "No messages",
};

const mockMessages = {
  id: '1',
  body: 'test message',
};

export const GET_COLLECTIONS_MOCK = [
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
            messages: mockMessages,
          },
        ],
      },
    },
  },
];
