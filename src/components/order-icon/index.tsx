import { IconButton, Tooltip, useTheme } from '@mui/material';
import { BOOK, BUY } from '../../constants';

interface OrderProps {
  title: string;
  type: string;
  size?: number;
  active?: boolean;
  onClick(): void;
}

export const OrderIcon: React.FC<OrderProps> = ({
  title,
  type,
  size = 24,
  active = false,
  onClick,
}) => {
  const theme = useTheme();

  const getPathLeft = () => {
    switch (type) {
      case BOOK:
        return (
          <>
            <path d="M4 4h7v7H4V4z" fill={theme.palette.info.dark}></path>
            <path d="M4 13h7v7H4v-7z" fill={theme.palette.info.main}></path>
          </>
        );
      case BUY:
        return (
          <>
            <path d="M4 4h7v16H4V4z" fill={theme.palette.info.main}></path>
          </>
        );
      default:
        return (
          <>
            <path d="M4 4h7v16H4V4z" fill={theme.palette.info.dark}></path>
          </>
        );
    }
  };

  return (
    <Tooltip title={title}>
      <IconButton aria-label={title} sx={{ opacity: active ? 'none' : '0.5' }} onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          width={size}
          height={size}
        >
          {getPathLeft()}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13 4h7v4h-7V4zm0 6h7v4h-7v-4zm7 6h-7v4h7v-4z"
            fill={theme.palette.info.light}
          ></path>
        </svg>
      </IconButton>
    </Tooltip>
  );
};
