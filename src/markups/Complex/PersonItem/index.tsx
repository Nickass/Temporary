import * as React from 'react';

// assets
import './style.scss';
import { Link } from 'react-router-dom';
import book from 'system/book';
import { LocationDescriptor } from 'history';

type Props = {
  item: any;
  to: LocationDescriptor;
};
type State = {};

class PersonItem extends React.Component<Props, State> {

  render() {
    const {
      to,
      item: {
        registered,
        picture,
        age,
        balance,
        isActive,
        name: {
          first,
          last
        }
      }
    } = this.props;

    return (
      <Link className={`person-item${isActive?' person-item--active':''}`} to={to}>
        <div className="person-item__header">
          <div className="person-item__name">{first} {last}</div>
          <div className="person-item__registry">{registered}</div>
        </div>
        <div className="person-item__figure">
          <img className="person-item__img" src={picture} alt={`Person ${first} ${last}`} />
        </div>
        <div className="person-item__info">
          <div className="person-item__age">
            Age: 
            <span className="person-item__age-val">
              {age}
            </span>
          </div>
          <div className="person-item__balance">
            Balance: 
            <span className="person-item__balance-val">
              $ {balance}
            </span>
          </div>
        </div>
      </Link>
    );
  }
}

export default PersonItem;