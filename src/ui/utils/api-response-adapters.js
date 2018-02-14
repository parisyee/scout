function bitstamp(data) {
  return {
    name: 'Bitstamp',
    price: data.last,
    time: new Date(data.timestamp*1000).toISOString(),
  }
}

function gdax(data) {
  return {
    name: 'GDAX',
    price: data.price,
    time: data.time,
  }
}

export {
  bitstamp,
  gdax,
}
