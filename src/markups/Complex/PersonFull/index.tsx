import * as React from 'react';

// assets
import './style.scss';
import { Link } from 'react-router-dom';
import book from 'system/book';

type Props = {
  data: any;
};
type State = {};

class PersonFull extends React.Component<Props, State> {
  render() {
    const {
      data: {
        registered,
        picture,
        about,
        age,
        phone,
        address,
        company,
        balance,
        name: {
          first,
          last
        }
      }
    } = this.props;

    return (
      <div className="person-full">
        <div className="person-full__main">
          <div className="person-full__header">
            <div className="person-full__name">{first} {last}</div>
            <Link className="person-full__back" to={book.home.root()}>Back</Link>
          </div>
          <div className="person-full__info">
            <div className="person-full__item">
              <span className="person-full__key">Date of registration</span>
              <span className="person-full__val">{registered}</span>
            </div>
            <div className="person-full__item">
              <span className="person-full__key">Age</span>
              <span className="person-full__val">{age}</span>
            </div>
            <div className="person-full__item">
              <span className="person-full__key">Phone</span>
              <span className="person-full__val">{phone}</span>
            </div>
            <div className="person-full__item">
              <span className="person-full__key">Address</span>
              <span className="person-full__val">{address}</span>
            </div>
            <div className="person-full__item">
              <span className="person-full__key">Company</span>
              <span className="person-full__val">{company}</span>
            </div>
            <div className="person-full__item">
              <span className="person-full__key">Balance</span>
              <span className="person-full__val">{balance}</span>
            </div>
          </div>
        </div>
        <div className="person-full__figure">
          <img className="person-full__img" src={picture} alt={`Person ${first} ${last}`} />
        </div>
        <div className="person-full__about">
          {about.split(/\n/).map((paragraph: any, key: number) => (
            <p key={key}>{paragraph}</p>
          ))}
        </div>
      </div>
    );
  }
}

export default PersonFull;