import { Avatar, Badge, styled } from '@mui/material';
import { Link } from 'wouter';
import me from './me.jpg';

const StyledBadge = styled(Badge, {
  shouldForwardProp: (prop) => prop !== 'size',
})(({ theme, size }) => ({
  '& .MuiBadge-badge': {
    color: '#44b700',
    backgroundColor: '#44b700',
    boxShadow: `0 0 0 ${size / 4}px ${theme.palette.background.paper}`,
    borderRadius: '100%',
    height: size,
    width: size,
    '&::after': {
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      position: 'absolute',
      animation: 'ripple 3s infinite ease-in-out',
      border: '3px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function AAvatar({ size = 40, bsize = 8 }) {
  return (
    <Link href="~/">
      <StyledBadge
        size={bsize}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        overlap="circular"
        variant="dot"
      >
        <Avatar
          sx={{ width: size, height: size }}
          src={me}
        />
      </StyledBadge>
    </Link>
  );
}
