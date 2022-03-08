import gql from 'fake-tag';
import { ENSDetails } from './fragments';
import { CLIENTS } from './client';
import {
  GetEnsDomainsQuery,
  GetEnsDomainsQueryVariables
} from './autogen/types';

const ensDomainQuery = gql`
  query GetENSDomains($limit: Int!, $addresses: [ID!]) {
    accounts(first: $limit, where: { id_in: $addresses }) {
      ...ENSDetails
    }
  }
  ${ENSDetails}
`;

export const getENSDomains = async (
  limit: number,
  addresses: string[]
): Promise<GetEnsDomainsQuery | null> => {
  const { data, error } = await CLIENTS[1]
    .query<GetEnsDomainsQuery, GetEnsDomainsQueryVariables>(ensDomainQuery, {
      limit,
      addresses
    })
    .toPromise();
  if (!data) {
    if (error) {
      throw error;
    }

    return null;
  }
  return data;
};
