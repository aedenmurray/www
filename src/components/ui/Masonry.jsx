import { useTheme } from '@emotion/react';
import RRMasonry, { ResponsiveMasonry } from 'react-responsive-masonry';

export default function Masonry({ children }) {
  const { breakpoints, spacing } = useTheme();

  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{
        [breakpoints.values.xs]: 1,
        [breakpoints.values.sm]: 2,
        [breakpoints.values.md]: 3,
        [breakpoints.values.lg]: 4,
        [breakpoints.values.xl]: 5,
      }}
    >
      <RRMasonry
        gutter={spacing(1)}
      >
        {children}
      </RRMasonry>
    </ResponsiveMasonry>
  );
}
