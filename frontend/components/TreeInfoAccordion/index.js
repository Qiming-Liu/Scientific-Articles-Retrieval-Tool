import React from 'react';
import NextLink from 'next/link';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

const SingleTIA = ({ tree }) => {
  return (
    <Accordion
      disableGutters
      elevation={0}
      expanded
      onChange={() => {}}
      sx={{ m: -1, p: 0 }}
    >
      <AccordionSummary sx={{ m: -1 }}>
        <NextLink href={`/search/keyword/${tree.name}`} passHref>
          <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="body2"
            color="text.primary"
          >{`${tree.id} | ${tree.name}`}</Typography>
        </NextLink>
      </AccordionSummary>
      {tree.child && (
        <AccordionDetails sx={{ m: 0, pt: 0, pb: 0.5 }}>
          <SingleTIA tree={tree.child} />
        </AccordionDetails>
      )}
    </Accordion>
  );
};

const TreeInfoAccordion = ({ data, keyword }) => {
  if (!data) {
    return null;
  }
  console.log(data);
  const treeList = [];
  Object.keys(data).forEach((item) => {
    const tree = data;
    tree[item].forEach((element, index) => {
      if (index === 0) {
        tree[item][index].child = {
          id: item,
          name: keyword,
        };
      } else {
        tree[item][index].child = tree[item][index - 1];
      }
    });
    treeList.push(tree[item][tree[item].length - 1]);
  });
  return (
    <>
      {treeList.map((tree) => (
        <SingleTIA tree={tree} />
      ))}
    </>
  );
};

export default TreeInfoAccordion;
