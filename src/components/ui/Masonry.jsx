import { useTheme, Fade } from '@mui/material';
import RMasonry, { ResponsiveColumns } from 'rmasonry';

export default function Masonry({ children }) {
  const { breakpoints, spacing } = useTheme();

  return (
    <Fade in>
      <div>
        <ResponsiveColumns
          breakpoints={{
            [breakpoints.values.xs]: 1,
            [breakpoints.values.sm]: 2,
            [breakpoints.values.md]: 3,
            [breakpoints.values.lg]: 4,
          }}
        >
          <RMasonry gap={spacing(1)}>
            {children}
          </RMasonry>
        </ResponsiveColumns>
      </div>
    </Fade>
  );
}
