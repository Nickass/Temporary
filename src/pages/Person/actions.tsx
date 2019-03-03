import { PERSON_REQUEST, PERSON_SUCCESS, PERSON_FAILURE } from './constants';

type action = {
  type: string,
  payload?: any
};

export const getPerson = () => {
  return {
    type: PERSON_REQUEST
  }
};

export const receivePerson = (person: any) => {
  return {
    type: PERSON_SUCCESS,
    payload: person
  }
};

export const failPerson = (err: any) => {
  return {
    type: PERSON_FAILURE,
    payload: err
  }
};

export default action;