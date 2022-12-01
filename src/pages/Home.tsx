import { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { OrderIcon } from '../components/order-icon';
import {
  BOOK,
  BUY,
  OPTIONS,
  SELL,
  SHOW_ALL,
  SHOW_PART,
  SIZES,
  SUBSCRIBE_MESSAGE,
  URL_WEB_SOCKET,
} from '../constants';
import { Order } from '../model/Order';
import { OrderSize } from '../model/OrderSize';
import { LastOrder } from '../components/last-order';
import { OrderTable } from '../components/order-table';

export const Home = () => {
  const theme = useTheme();
  const [active, setActive] = useState<string>(BOOK);
  const [numOfItems, setNumOfItems] = useState<number>(SHOW_PART);
  const [size, setSize] = useState<OrderSize>(SIZES[0]);
  const sizes: OrderSize[] = [...SIZES];
  const [checked, setChecked] = useState<boolean>(true);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [buyOrder, setBuyOrder] = useState<Order[]>([]);
  const [sellOrder, setSellOrder] = useState<Order[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleAction = (type: string) => {
    setActive(type);
    let itemsToShow = SHOW_PART;
    if (type !== BOOK) {
      itemsToShow = SHOW_ALL;
    }
    setNumOfItems(itemsToShow);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const data = event.target.value as unknown as OrderSize;
    setSize(data);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const addOrderToList = useCallback(
    (data: any, buy: boolean) => {
      const price = parseFloat(data.p);
      const quantity = parseFloat(data.q);
      const order: Order = {
        id: uuidv4(),
        price,
        quantity,
        total: price * quantity,
        buy,
      };
      const orderList = buy ? [...sellOrder] : [...buyOrder];
      if (orderList.length >= 38) {
        orderList.shift();
      }
      setLastOrder(order);
      orderList.push(order);
      if (buy) {
        setBuyOrder(orderList);
      } else {
        setSellOrder(orderList);
      }
    },
    [buyOrder, sellOrder]
  );

  useEffect(() => {
    const wsClient = new WebSocket(URL_WEB_SOCKET);
    wsClient.onopen = () => {
      setWs(wsClient);
      wsClient.send(JSON.stringify(SUBSCRIBE_MESSAGE));
    };
    wsClient.onclose = () => console.log('ws closed');
    return () => {
      wsClient.close();
    };
  }, []);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (evt) => {
        const order = JSON.parse(evt.data);
        if (order && order.p) {
          addOrderToList(order, order.m);
        }
      };
    }
  }, [ws, addOrderToList]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: 'rgb(22, 26, 30)',
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        color: theme.palette.text.disabled,
      }}
    >
      <Grid
        container
        direction="column"
        sx={{
          border: 'solid 1px gray',
          width: '420px',
        }}
      >
        <Grid
          item
          sx={{
            height: '45px',
          }}
        >
          <Grid container>
            <Grid item xs={6} textAlign="left">
              <OrderIcon
                title="Order Book"
                type="book"
                active={active === BOOK}
                onClick={() => handleAction(BOOK)}
              />
              <OrderIcon
                title="Buy Order"
                type="buy"
                active={active === BUY}
                onClick={() => handleAction(BUY)}
              />
              <OrderIcon
                title="Sell Order"
                type="sell"
                active={active === SELL}
                onClick={() => handleAction(SELL)}
              />
            </Grid>
            <Grid item xs={6} textAlign="right">
              <FormControl size="small" sx={{ width: 80 }}>
                <Select
                  labelId="size"
                  id="size"
                  value={size as any}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& .Mui-focused': {
                        borderColor: 'none',
                      },
                    },
                  }}
                >
                  {sizes.map((item) => {
                    return (
                      <MenuItem
                        key={item.key}
                        value={item as any}
                        sx={{
                          '&.Mui-selected': {
                            color: theme.palette.info.contrastText,
                          },
                        }}
                      >
                        {item.key}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl sx={{ width: '50px' }}>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVert />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  {OPTIONS.map((option) => (
                    <MenuItem key={option} onClick={handleClose}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checked}
                            onChange={handleChangeCheck}
                            sx={{
                              '&.Mui-checked': {
                                color: theme.palette.info.contrastText,
                              },
                            }}
                          />
                        }
                        label={option}
                      />
                    </MenuItem>
                  ))}
                </Menu>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <Table aria-label="Headers" size="small">
            <TableHead>
              <TableRow
                sx={{
                  '& th': { border: 0, color: theme.palette.text.disabled },
                }}
              >
                <TableCell sx={{ width: '130px' }}>Price(BUSD)</TableCell>
                <TableCell align="right" sx={{ width: '130px' }}>
                  Amount(BTC)
                </TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
          </Table>
          {(active === BOOK || active === SELL) && (
            <OrderTable
              data={sellOrder}
              numOfItems={numOfItems}
              active={active}
              size={size}
              color={theme.palette.info.dark}
              title="Sell Order"
            />
          )}
          {active !== SELL && lastOrder && <LastOrder lastOrder={lastOrder} />}
          {(active === BOOK || active === BUY) && (
            <OrderTable
              data={sellOrder}
              numOfItems={numOfItems}
              active={active}
              size={size}
              color={theme.palette.info.main}
              title="Buy Order"
            />
          )}
          {active === SELL && lastOrder && <LastOrder lastOrder={lastOrder} />}
        </Grid>
      </Grid>
    </Box>
  );
};
