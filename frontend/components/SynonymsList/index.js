import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

const SynonymsList = ({ data }) => {
  if (!data) {
    return null;
  }
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', m: -1 }}>
      {data.map((item) => (
        <ListItem alignItems="flex-start" sx={{ p: 0.2 }}>
          <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {`${item.term_id} | ${item.term_name}`}
          </Typography>
        </ListItem>
      ))}
    </List>
  );
};

export default SynonymsList;
