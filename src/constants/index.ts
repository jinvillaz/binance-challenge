export const BOOK = 'book';
export const BUY = 'buy';
export const SELL = 'sell';
export const SIZES = [
  { key: '0.01', fixed: 2, factor: 1, totalFixed: 5 },
  { key: '0.1', fixed: 1, factor: 10, totalFixed: 4 },
  { key: '1', fixed: 0, factor: 100, totalFixed: 3 },
  { key: '10', fixed: 0, factor: 1000, totalFixed: 2 },
  { key: '50', fixed: 0, factor: 5000, totalFixed: 1 },
  { key: '100', fixed: 0, factor: 100000, totalFixed: 0 },
];
export const OPTIONS = ['Display Avg.&Sum'];
export const URL_WEB_SOCKET = 'wss://stream.binance.com:9443/ws';
export const SUBSCRIBE_MESSAGE = {
  method: 'SUBSCRIBE',
  params: ['btcbusd@aggTrade'],
  id: 1,
};
export const SHOW_PART = 19;
export const SHOW_ALL = 38;
