import constant, { PERSONS_REQUEST, PERSONS_SUCCESS, PERSONS_FAILURE } from './constants';


type action = {
  type: constant,
  payload?: any
};

export const getPersons = () => {
  return {
    type: PERSONS_REQUEST
  }
}

export const receivePersons = (users: any) => {
  return {
    type: PERSONS_SUCCESS,
    payload: users
  }
}

export const failPersons = (error: any) => {
  return {
    type: PERSONS_FAILURE,
    payload: error
  }
}

export default action;