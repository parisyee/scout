import React from 'react';
import axios from 'axios';
import * as adapters from '../utils/api-response-adapters';
import TickerCard from './ticker-card';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.refresh = this.refresh.bind(this);
    this.fetchGDAXTicker = this.fetchGDAXTicker.bind(this);
    this.fetchBitstampTicker = this.fetchBitstampTicker.bind(this);
  }

  componentDidMount() {
    window.setInterval(this.refresh, 5000);
  }

  refresh() {
    this.fetchGDAXTicker();
    this.fetchBitstampTicker();
  }

  fetchGDAXTicker() {
    axios
      .get('https://api.gdax.com/products/BTC-USD/ticker')
      .then((response) => {
        this.setState({ gdax: adapters.gdax(response.data) });
      })
      .catch((err) => { console.log(err) });
  }
  
  fetchBitstampTicker() {
    axios
      .get('https://www.bitstamp.net/api/v2/ticker/btcusd')
      .then((response) => {
        this.setState({ bitstamp: adapters.bitstamp(response.data) });
      })
      .catch((err) => { console.log(err) });
  }

  renderGDAX() {
    if (this.state.gdax) {
      return (
        <TickerCard exchange={this.state.gdax} />
      )
    }
  }
  
  renderBitstamp() {
    if (this.state.bitstamp) {
      return(
        <TickerCard exchange={this.state.bitstamp} />
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderGDAX()}
        {this.renderBitstamp()}
      </div>
    );
  }
}
