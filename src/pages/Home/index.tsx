// modules
import * as React from 'react';
import { connect } from 'react-redux';

// system
import book from 'system/book';
import * as request from 'system/request';


// custom
import GridPersons from 'markups/Layout/GridPersons';
import PersonItem from 'markups/Complex/PersonItem';
import { getPersons, receivePersons, failPersons } from './actions';


type HomeProps = {
  fetchPersons: () => any;
  persons: any[];
};

type State = {}

class Home extends React.Component<HomeProps, State> {
  componentDidMount() {
    const { fetchPersons } = this.props;
    fetchPersons();
  }

  render () {
    const { persons } = this.props;

    return (
      <GridPersons>
        {persons.map((item, i) => (
          <PersonItem key={item.id} item={item} to={book.home.item(item.id)}/>
        ))}
      </GridPersons>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    persons: state.home.persons
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchPersons: async () => {
      try {
        dispatch(getPersons());
        dispatch(receivePersons(await request.get('/EyZ_EBXLU')));
      } catch (e) {
        dispatch(failPersons(e));
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);