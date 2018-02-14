import React from 'react';
import moment from 'moment';
import numeral from 'numeral';

export default function TickerCard({exchange}) {
  let time = moment(exchange.time).format('MM/DD/YYYY @ HH:mm:ss');
  let price = numeral(exchange.price).format('$0,0.00')
  
  return (
    <div>
      <h1>{exchange.name}</h1>
      <h4>{time}</h4>
      <p>{price}</p>
    </div>
  )
}
