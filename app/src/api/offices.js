import { post, get, patch } from './utils';

export async function getOfficeTypesApi() {
  return get('/officeTypes');
}
export async function getOfficesByOfficeTypeId(data) {
  return get(`/officeTypes/${data.OfficeTypeId}/offices`);
}

export async function getOfficesApi() {
  return get('/offices');
}
export async function getProceduresByOfficeId(data) {
  return get(`/offices/${data.OfficeId}/procedures`);
}

export async function getProceduresApi() {
  return get('/procedures');
}
