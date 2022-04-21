/* eslint-disable no-restricted-syntax */
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Divider,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const startsWithAny = (string) => {
  const prefixes = [
    'which',
    'what',
    'whose',
    'who',
    'whom',
    'where',
    'whither',
    'whence',
    'when',
    'how',
    'why',
    'whether',
  ];
  for (const prefix of prefixes) {
    if (string.startsWith(prefix)) return true;
  }
  return false;
};

const endsWithAny = (string) => {
  const suffixes = ['.', '!', '?'];
  for (const suffix of suffixes) {
    if (string.endsWith(suffix)) return true;
  }
  return false;
};

const Index = () => {
  const router = useRouter();
  const [keyword, setKeyword] = React.useState('');
  return (
    <Container maxWidth="md">
      <Grid container direction="column" alignItems="center">
        <Box sx={{ mt: '20vh' }}>
          <Image src="/main.svg" height="200" width="200" />
        </Box>
        <Box
          component="form"
          sx={{ width: '100%' }}
          onSubmit={(event) => {
            event.preventDefault();
            if (keyword === '') {
              return;
            }
            setKeyword(keyword.toLowerCase());
            // check whether it is a sentence
            // 1. word count > 3 or 2.end with .!? or 3.stat with question words
            if (
              keyword.split(' ').length > 3 ||
              startsWithAny(keyword) ||
              endsWithAny(keyword)
            ) {
              router.push({
                pathname: `/search/sentence/${keyword}`,
              });
            } else {
              router.push({
                pathname: `/search/keyword/${keyword}`,
              });
            }
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            label="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton type="submit" sx={{ p: 1 }}>
                    <SearchIcon />
                  </IconButton>
                  <Divider sx={{ height: 28, m: 1 }} orientation="vertical" />
                </InputAdornment>
              ),
            }}
            sx={{ mt: '5vh' }}
            focused
            onChange={(event) => setKeyword(event.target.value)}
          />
        </Box>
      </Grid>
    </Container>
  );
};

export default Index;
