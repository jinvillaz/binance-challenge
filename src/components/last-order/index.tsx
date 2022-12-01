import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Grid, useTheme } from '@mui/material';
import { FC } from 'react';
import { Order } from '../../model/Order';

interface LastOrderProps {
  lastOrder: Order;
}
export const LastOrder: FC<LastOrderProps> = ({ lastOrder }) => {
  const theme = useTheme();

  return (
    <Grid container sx={{ paddingLeft: '12px', paddingRight: '15px' }}>
      <Grid item xs={4} textAlign="left">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            fontSize: '20px',
            color: lastOrder.buy
              ? theme.palette.info.main
              : theme.palette.info.dark,
            width: '120px',
          }}
        >
          {lastOrder.price}
          {lastOrder.price && lastOrder.buy && (
            <ArrowUpward fontSize="small" />
          )}
          {lastOrder.price && !lastOrder.buy && (
            <ArrowDownward fontSize="small" />
          )}
        </div>
      </Grid>
      <Grid item xs textAlign="left" sx={{ paddingTop: '10px' }}>
        {lastOrder.price && <>$ {lastOrder.price}</>}
      </Grid>
      <Grid item xs textAlign="right" sx={{ paddingTop: '10px' }}>
        {lastOrder && 'More'}
      </Grid>
    </Grid>
  );
};
