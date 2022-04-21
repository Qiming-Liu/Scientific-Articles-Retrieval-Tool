import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Card, CardHeader, Container, Divider, Grid } from '@mui/material';
import { MeshQuery } from '@services/Public';
import PropertyList from '@components/PropertyList';
import PropertyListItem from '@components/PropertyList/item';
import SynonymsList from '@components/SynonymsList';
import TreeInfoAccordion from '@components/TreeInfoAccordion';
import SeeAlsoList from '@components/SeeAlsoList';

const Search = () => {
  const router = useRouter();
  const { keyword } = router.query;
  const [meshData, setMeshData] = React.useState([]);
  useEffect(() => {
    const getMesh = async () => {
      const { data } = await MeshQuery(keyword);
      setMeshData(data);
    };
    getMesh();
  }, [keyword]);

  return (
    <Container maxWidth="xl">
      <Grid container direction="row" spacing={3}>
        <Grid item xs={6} sx={{ pl: 2 }}>
          <Card>
            <CardHeader title={keyword} />
            <Divider />
            <PropertyList>
              <PropertyListItem
                align="ID"
                divider
                label="ID"
                value={meshData.id}
              />
              <PropertyListItem
                align="Description"
                divider
                label="Description"
                value={meshData.desc}
              />
            </PropertyList>
          </Card>
        </Grid>
        <Grid item xs={6} sx={{ pl: 2 }}>
          <Card>
            <CardHeader title="Graph" />
            <Divider />
            <Box sx={{ height: 500, backgroundColor: '#000' }} />
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card>
            <CardHeader title="Synonyms" />
            <Divider />
            <PropertyList>
              <PropertyListItem
                align="Synonyms"
                divider
                value={<SynonymsList data={meshData.synonyms} />}
              />
            </PropertyList>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardHeader title="Tree Info" />
            <Divider />
            <PropertyList>
              <PropertyListItem
                align="Tree Info"
                divider
                value={
                  <TreeInfoAccordion data={meshData.treeInfo} name={keyword} />
                }
              />
              <PropertyListItem
                align="See Also"
                divider
                label="See Also"
                value={<SeeAlsoList data={meshData.seealso} />}
              />
            </PropertyList>
          </Card>
        </Grid>
        <Grid item xs={6} sx={{ pl: 2 }}>
          <Card>
            <CardHeader title="Sentences" />
            <Divider />
            <Box sx={{ height: 500, backgroundColor: '#fff' }} />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Search;
