import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base'
import PropTypes from 'prop-types'

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  static propTypes = {
    match: PropTypes.object
  };

  componentDidMount() {
    const {params} = this.props.match;

    const localStorageRef = localStorage.getItem(params.id);
    if (localStorageRef) this.setState({order: JSON.parse(localStorageRef)});

    this.ref = base.syncState(`${params.id}/fishes`, {
      context: this,
      state: 'fishes',
    })
  }

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.id, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {
    const fishes = {...this.state.fishes};

    fishes[`fish${Date.now()}`] = fish;

    this.setState({
      fishes,
    });
  };

  updateFish = (key, updatedFish) => {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({fishes});
  };

  deleteFish = (key) => {
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState({fishes})
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes,
    })
  };

  addToOrder = (key) => {
    const order = {...this.state.order};

    order[key] = order[key] + 1 || 1;

    this.setState({
      order,
    })
  };

  removeFromOrder = key => {
    const order = {...this.state.order};

    delete order[key];

    this.setState({
      order,
    })
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key =>
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            )
            }
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order}
               removeFromOrder={this.removeFromOrder}/>
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}
                   fishes={this.state.fishes} updateFish={this.updateFish}
                   deleteFish={this.deleteFish} storeId={this.props.match.params.id}/>
      </div>
    )
  }
}

export default App;