import { useTheme } from '@emotion/react';
import RRMasonry, { ResponsiveMasonry } from 'react-responsive-masonry';

export default function Masonry({ children }) {
  const { breakpoints, spacing } = useTheme();

  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{
        [breakpoints.values.xs]: 4,
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
