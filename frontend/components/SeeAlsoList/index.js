import React from 'react';
import NextLink from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

const SeeAlsoList = ({ data }) => {
  if (!data) {
    return null;
  }
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', m: -1 }}>
      {data.map((item) => (
        <ListItem alignItems="flex-start" sx={{ p: 0.2 }}>
          <NextLink href={`/search/keyword/${item.term_name}`} passHref>
            <Typography
              sx={{
                display: 'inline',
                cursor: 'pointer',
              }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {`${item.term_id} | ${item.term_name}`}
            </Typography>
          </NextLink>
        </ListItem>
      ))}
    </List>
  );
};

export default SeeAlsoList;
