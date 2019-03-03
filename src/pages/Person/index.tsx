// modules
import * as React from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router';
import { History, Location } from 'history';

// system
import * as request from 'system/request';

// custom
import action, { getPerson, receivePerson, failPerson } from './actions';
import PersonFull from 'markups/Complex/PersonFull';

// assets
import './assets/styles.scss';


const mapIDToPath: any = {
  '1': '/NJp5LKXIL',
  '2': '/VyCcjY7IU',
  '3': '/E1CostQU8',
  '4': '/Ey92jKQ8I',
  '5': '/EypasKXIU',
  '6': '/VkP0oY7LU',
  '7': '/4k1yhF7UI',
  '8': '/Ekxl3F7U8'
};

type PersonProps = {
  className?: string;
  match: match<{id: string}>;
  location: Location;
  history: History;
  data: any;
  loading: boolean;
  fetchPerson: (id: string) => any;
};

class Person extends React.Component<PersonProps> {
  componentDidMount() {
    const { fetchPerson, match: { params: { id } } } = this.props;
    
    fetchPerson(id);
  }

  render () {
    const { loading, data } = this.props;
    
    return loading ? (
      <div>loading...++</div>
    ) : (
      <PersonFull data={data} />
    );
  }
}

const mapStateToProps = (state: any) => {

  return {
    data: state.person.data,
    loading: state.person.loading,
  };
};
const mapDispatchToProps = (dispatch: React.Dispatch<action>) => {

  return {
    fetchPerson: async (id: string) => {
      try {
        dispatch(getPerson());
        const res = await request.get(mapIDToPath[id]);
        dispatch(receivePerson(res[0]));
      } catch (e) {
        dispatch(failPerson(e));
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Person);