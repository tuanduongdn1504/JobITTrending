import { pick, keyBy } from 'lodash';
import { PRIMARY_KEY } from './actions';

export const convertRequestParams = (type, params, resource) => {
  switch (type) {
    case 'GET_ALL':
      return query;
    case 'GET_BY_ID':
      break;
    case 'DELETE':
    case 'EDIT':
    case 'CREATE':
    default:
      return {};
  }
  return {};
};

export const convertResponseData = (type, response) => {
  switch (type) {
    case 'GET_ALL':
      return {
        data: keyBy(response.results, PRIMARY_KEY),
        ids: response.results.map(data => data[PRIMARY_KEY]),
        total: response.total
      };
    case 'GET_BY_ID':
    case 'EDIT':
    case 'CREATE':
      return { ...response };
    case 'DELETE':
    default:
      return response;
  }
};
