import { Stack, Chip } from '@mui/material';
import { Tag } from '@mui/icons-material';

export default function Tags({ tags }) {
  return (
    <Stack
      direction="row"
      spacing={0.5}
    >
      {tags.map((tag) => (
        <Chip
          key={tag}
          label={tag}
          size="small"
          icon={<Tag />}
        />
      ))}
    </Stack>
  );
}
