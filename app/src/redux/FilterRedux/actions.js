import { makeActionCreator, makeConstantCreator } from '../../utils/reduxUtils';

export const FilterTypes = makeConstantCreator('SET_FILTER');
export const setFilter = data => makeActionCreator(FilterTypes.SET_FILTER, { data });

export default { setFilter };
