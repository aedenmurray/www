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

function Card({ href, children }) {
  if (href) {
    return (
      <MuiCard>
        <MuiCardActionArea href={href}>
          <CardContentFlex>
            {children}
          </CardContentFlex>
        </MuiCardActionArea>
      </MuiCard>
    );
  }

  return (
    <MuiCard>
      <CardContentFlex>
        {children}
      </CardContentFlex>
    </MuiCard>
  );
}

Card.Header = CardHeader;
Card.Description = CardDescription;
export default Card;
