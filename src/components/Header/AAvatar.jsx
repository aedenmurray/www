import { Link } from 'wouter';
import { Avatar, Badge, styled } from '@mui/material';
import { useEffect, useState } from 'react';

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

export default function AAvatar({ size = 40, bsize = 8, src, small }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.fetchPriority = 'high';
    img.decoding = 'sync';
    img.src = src;

    img.onload = () =>
      setLoaded(true);
  }, [src]);

  return (
    <Link href="~/">
      <StyledBadge
        size={bsize}
        variant="dot"
        overlap="circular"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Avatar
          sx={{
            width: size,
            height: size,
            '& img': {
              transition: 'filter 0.5s ease',
              filter: !loaded
                ? 'blur(0.5rem)'
                : 'blur(0)',
            },
          }}
          src={!loaded ? small : src}
          alt="Aeden Murray"
        />
      </StyledBadge>
    </Link>
  );
}
