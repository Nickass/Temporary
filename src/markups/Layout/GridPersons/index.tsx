import * as React from 'react';
import { createSelector, defaultMemoize } from 'reselect';

// assets
import './style.scss';

type Props = {
  children: any;
};
type State = {
  sortType: string;
}

class GridPersons extends React.Component<Props, State> {
  state = {
    sortType: 'older',
  };

  handleSort = (e: any) => {
    this.setState({sortType: e.target.value});
  }

  getSortParamsFromType(type: string) {
    switch (type) {
      case 'older':
        return {
          by: 'age',
          order: 'dec'
        }
      case 'younger':
        return {
          by: 'age',
          order: 'enc'
        }
      case 'poorer': 
        return {
          by: 'balance',
          order: 'enc'
        }
      default:
      case 'richer': 
        return {
          by: 'balance',
          order: 'dec'
        }
    }
  }
  
  sortItems = defaultMemoize<(items: any[], type: string)=>any[]>(
    (items, type) => items.sort((prevItem: any, nextItem: any) => {
      const { by, order } = this.getSortParamsFromType(type);
      const pv = prevItem.props.item[by];
      const nv = nextItem.props.item[by];
      const prevNum = parseFloat(pv);
      const nextNum = parseFloat(nv);
      const prev = Number.isNaN(prevNum) ? pv : prevNum;
      const next = Number.isNaN(prevNum) ? nv : nextNum;
      
      if (prev > next) {
        return order === 'enc' ? 1 : -1;
      } else if (prev < next) {
        return order === 'enc' ? -1 : 1;
      } else {
        return 0;
      }
    })
  );
  
  render() {
    const { children } = this.props;
    const { sortType } = this.state;
    const items = this.sortItems(children, sortType);
    
    return (
      <div className="grid">
        <select className="grid__sort" onChange={this.handleSort} value={sortType}>
          <option value="older">old -> young</option>
          <option value="younger">young -> old</option>
          <option value="poorer">poor -> rich</option>
          <option value="richer">rich -> poor</option>
        </select>
        <div className="grid__list">
          {items.map(Item => (
            <Item.type {...Item.props} key={Item.key} ref={Item.ref}/>
          ))}
        </div>
      </div>
    );
  }
}

export default GridPersons;