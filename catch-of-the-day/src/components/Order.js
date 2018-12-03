import React from 'react';
import {formatPrice} from "../helpers";
import {TransitionGroup, CSSTransition} from 'react-transition-group';

class Order extends React.Component {
  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === 'available';

    if (!fish) return null;

    if (!isAvailable) {
      return (
        <CSSTransition classNames="order" key={key} timeout={{enter: 350, exit: 350}}>
          <li key={key}>
            Sorry {fish ? fish.name : 'fish'} is no longer available.
          </li>
        </CSSTransition>
      )
    }
    return (
      <CSSTransition classNames="order" key={key} timeout={{enter: 250, exit: 250}}>
        <li key={key}>
          {count} lbs {fish.name}
          {formatPrice(count * fish.price)}
          <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
        </li>
      </CSSTransition>
    )
  };

  render() {
    const orderIDs = Object.keys(this.props.order);
    const total = orderIDs.reduce((total, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      if (isAvailable) {
        return total + (count * fish.price);
      }
      return total;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIDs.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    )
  }
}

export default Order;