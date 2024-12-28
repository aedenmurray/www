import MuiCard from '@mui/material/Card';
import MuiCardContent from '@mui/material/CardContent';
import MuiCardActionArea from '@mui/material/CardActionArea';
import { styled } from '@mui/material';

import CardHeader from './CardHeader';
import CardDescription from './CardDescription';

const CardContentFlex = styled(MuiCardContent)(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.spacing(1),
  display: 'flex',
}));

function Card({ href, children, sx }) {
  if (href) {
    return (
      <MuiCard sx={sx}>
        <MuiCardActionArea href={href}>
          <CardContentFlex>
            {children}
          </CardContentFlex>
        </MuiCardActionArea>
      </MuiCard>
    );
  }

  return (
    <MuiCard sx={sx}>
      <CardContentFlex>
        {children}
      </CardContentFlex>
    </MuiCard>
  );
}

Card.Header = CardHeader;
Card.Description = CardDescription;
export default Card;
