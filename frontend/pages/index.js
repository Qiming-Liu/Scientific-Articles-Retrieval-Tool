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
            router.push({
              pathname: `/search/${keyword}`,
            });
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
