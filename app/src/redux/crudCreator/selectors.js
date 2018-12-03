import { createSelector } from 'reselect';
import _ from 'lodash';

const getRestData = (state, resources) => state[resources];
const getOfficesData = state => state.offices;
const getOfficeTypesData = state => state.officeTypes;
const getProceduresData = state => state.procedures;

export const getDataArr = createSelector(
  [getRestData],
  resources => {
    const { data, ids } = resources;
    return ids.map(id => data[id]);
  }
);
export const getOfficeArr = createSelector(
  [getOfficesData, getOfficeTypesData],
  (offices, officeTypes) => {
    const dataOffices = _.filter(offices.data, data => {
      return data.officeTypeId === 2;
      // return _.find(officeTypes.data, officeTypes => {
      //   return '2' === data.officeTypeId;
      // });
    });
    return dataOffices;
  }
);
export const getProcedureArr = createSelector(
  [getProceduresData, getOfficesData],
  (procedures, offices) => {
    const dataProcedures = _.filter(procedures.data, data => {
      return data.officeId === 2;
      // return _.find(officeTypes.data, officeTypes => {
      //   return '2' === data.officeTypeId;
      // });
    });
    return dataProcedures;
  }
);

export const getTotal = createSelector(
  [getRestData],
  resources => {
    const { total } = resources;
    return total;
  }
);

export const getCurrentData = createSelector(
  [getRestData],
  resources => {
    const { currentId, data } = resources;
    return data[currentId] || {};
  }
);

export const enabledLoadMore = createSelector(
  [getRestData],
  resources => {
    const { page, loading, numberOfPages } = resources;
    return !loading && page < numberOfPages;
  }
);

export const getLoading = createSelector(
  [getRestData],
  resources => {
    const { loading } = resources;
    return loading;
  }
);
