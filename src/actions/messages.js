import { FETCH_DATA_SUCCESS } from '../constants/action-types';


export const MensajeRecibido = data => (
  {
    type: FETCH_DATA_SUCCESS,
    data
  }
);