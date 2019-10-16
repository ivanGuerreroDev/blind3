import { SET_DATA_REGISTER } from '../constants/action-types';


export const setDataRegistro = data => (
  {
    type: SET_DATA_REGISTER,
    data: data.input,
    value: data.value
  }
);