import React from 'react';
// import NextLink from 'next/link';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Highlighter from 'react-highlight-words';

const SentenceAccordion = ({ data, sentence }) => {
  const [expanded, setExpanded] = React.useState(0);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (!data) {
    return null;
  }

  return (
    <>
      {data.map((item, index) => (
        <Accordion
          disableGutters
          elevation={0}
          expanded={expanded === index}
          onChange={handleChange(index)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ width: '10%', flexShrink: 0 }}>
              {`Top ${index + 1}`}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {item.score}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Highlighter
              searchWords={sentence.split(' ')}
              autoEscape
              textToHighlight={item.data}
              highlightStyle={{
                background: 'none',
                padding: 0,
                color: 'red',
                fontWeight: 'bold',
              }}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default SentenceAccordion;
