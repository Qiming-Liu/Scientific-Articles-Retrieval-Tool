import React from 'react';
import { List } from '@mui/material';

const PropertyList = (props) => {
  const { children } = props;

  return <List disablePadding>{children}</List>;
};

export default PropertyList;
