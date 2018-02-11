import React from 'react';
import axios from 'axios';
import moment from 'moment';
import numeral from 'numeral';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.fetchData = this.fetchData.bind(this);
    this.fetchGDAXTicker = this.fetchGDAXTicker.bind(this);
    this.fetchBitstampTicker = this.fetchBitstampTicker.bind(this);
  }

  componentDidMount() {
    window.setInterval(this.fetchData, 5000);
  }

  fetchData() {
    this.fetchGDAXTicker();
    this.fetchBitstampTicker();
  }

  fetchGDAXTicker() {
    axios
      .get('https://api.gdax.com/products/BTC-USD/ticker')
      .then((response) => {
        this.setState({ gdax: response.data });
      })
      .catch((err) => { console.log(err) });
  }
  
  fetchBitstampTicker() {
    axios
      .get('https://www.bitstamp.net/api/v2/ticker/btcusd')
      .then((response) => {
        this.setState({ bitstamp: response.data });
      })
      .catch((err) => { console.log(err) });
  }

  renderGDAX() {
    let content;

    if (this.state.gdax) {
      let time = moment(this.state.gdax.time).format('MM/DD/YYYY @ HH:mm:ss');
      let price = numeral(this.state.gdax.price).format('$0,0.00')
      content = (
        <div>
          <h1>GDAX price</h1>
          <h4>{time}</h4>
          <p>{price}</p>
        </div>
      )
    }

    return content;
  }
  
  renderBitstamp() {
    let content;

    if (this.state.bitstamp) {
      let time = moment.unix(this.state.bitstamp.timestamp).format('MM/DD/YYYY @ HH:mm:ss');
      let price = numeral(this.state.bitstamp.last).format('$0,0.00')
      content = (
        <div>
          <h1>Bitstamp price</h1>
          <h4>{time}</h4>
          <p>{price}</p>
        </div>
      )
    }

    return content;
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
