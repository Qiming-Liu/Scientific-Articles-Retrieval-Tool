import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import NextLink from 'next/link';
import { AppBar, Box, Toolbar, useMediaQuery } from '@mui/material';

const Logo = styled.div`
  margin-top: -25px;
  margin-left: 48%;
  transform: translateX(-50%);
`;

const NavbarRoot = styled(AppBar)(() => ({
  backgroundColor: '#ffffff',
  boxShadow: 'none',
}));

const Navbar = () => {
  const mobileDevice = !useMediaQuery('(min-width:600px)');
  if (mobileDevice) {
    return (
      <NavbarRoot>
        <Toolbar
          disableGutters
          sx={{
            height: 60,
            left: 0,
            pl: 3,
          }}
        >
          <NextLink href="/" passHref>
            <Box
              sx={{
                cursor: 'pointer',
                mt: '2px',
                ml: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              <Image src="/logo.png" height="35" width="35" alt="logo" />
            </Box>
          </NextLink>
        </Toolbar>
      </NavbarRoot>
    );
  }
  return (
    <NavbarRoot>
      <Toolbar
        disableGutters
        sx={{
          height: 60,
          left: 0,
          pl: 3,
          pr: mobileDevice ? 3 : 5,
        }}
      >
        <NextLink href="/" passHref>
          <Box sx={{ cursor: 'pointer' }}>
            <Image src="/logo.png" height="35" width="35" alt="logo" />
          </Box>
        </NextLink>
        <Logo>
          <NextLink href="/" passHref>
            <h1
              style={{
                fontFamily: 'Quicksand, sans-serif',
                fontSize: '2rem',
                color: '#222429',
                marginBottom: '0',
                cursor: 'pointer',
              }}
            >
              {process.env.NEXT_PUBLIC_WEBSITE_NAME}.
            </h1>
          </NextLink>
        </Logo>
      </Toolbar>
    </NavbarRoot>
  );
};

export default Navbar;
