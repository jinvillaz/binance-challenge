import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  useTheme,
} from '@mui/material';
import { FC } from 'react';
import { BOOK } from '../../constants';
import { Order } from '../../model/Order';
import { OrderSize } from '../../model/OrderSize';

interface OrderTableProps {
  data: Order[];
  numOfItems: number;
  active: string;
  size: OrderSize;
  color: string;
  title?: string;
}

export const OrderTable: FC<OrderTableProps> = ({
  data,
  numOfItems,
  active,
  size,
  color,
  title = 'table',
}) => {
  const theme = useTheme();

  return (
    <TableContainer
      sx={{
        height: active === BOOK ? '380px' : '90%',
        overflow: 'hidden',
      }}
    >
      <Table aria-label={title} size="small">
        <TableBody>
          {data.slice(-numOfItems).map((row) => (
            <TableRow
              key={row.id}
              sx={{
                '& td': {
                  border: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                },
              }}
            >
              <TableCell
                align="left"
                sx={{ color, width: '130px' }}
              >
                {row.price.toFixed(size.fixed)}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  color: theme.palette.text.disabled,
                  width: '130px',
                }}
              >
                {(row.quantity * size.factor).toFixed(5)}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  color: theme.palette.text.disabled,
                }}
              >
                {(row.total * size.factor).toFixed(size.totalFixed)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
