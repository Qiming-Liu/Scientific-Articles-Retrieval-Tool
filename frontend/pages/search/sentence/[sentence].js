import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, CardHeader, Container, Divider, Grid } from '@mui/material';
import { EmbedQuery } from '@services/Public';
import PropertyList from '@components/PropertyList';
import PropertyListItem from '@components/PropertyList/item';
import SentenceAccordion from '@components/SentenceAccordion';

const Search = () => {
  const router = useRouter();
  const { sentence } = router.query;
  const [loading, setLoading] = React.useState(false);
  const [embedData, setEmbedData] = React.useState([]);
  useEffect(() => {
    const getMesh = async () => {
      setLoading(true);
      const { data } = await EmbedQuery(10, sentence);
      setEmbedData(data);
      setLoading(false);
    };
    getMesh();
  }, [sentence]);

  return (
    <Container maxWidth="xl">
      <Grid container direction="row" spacing={3}>
        <Grid item xs={12} sx={{ pl: 2 }}>
          <Card>
            <CardHeader title={sentence} />
            <Divider />
            <PropertyList>
              <PropertyListItem
                align="Answers"
                divider
                label="Answers"
                value={
                  loading ? (
                    'Loading...'
                  ) : (
                    <SentenceAccordion data={embedData} sentence={sentence} />
                  )
                }
              />
            </PropertyList>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Search;
