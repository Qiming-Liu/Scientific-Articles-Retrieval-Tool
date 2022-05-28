import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, CardHeader, Container, Divider, Grid } from '@mui/material';
import { MeshQuery } from '@services/Public';
import PropertyList from '@components/PropertyList';
import PropertyListItem from '@components/PropertyList/item';
import SynonymsList from '@components/SynonymsList';
import TreeInfoAccordion from '@components/TreeInfoAccordion';
import SeeAlsoList from '@components/SeeAlsoList';

const Search = () => {
  const router = useRouter();
  const { keyword } = router.query;
  const [meshData, setMeshData] = React.useState(undefined);
  useEffect(() => {
    const getMesh = async () => {
      await MeshQuery(keyword).then((data) => {
        setMeshData(data.data);
      });
    };
    if (keyword) {
      getMesh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  return (
    <Container maxWidth="xl">
      <Grid container direction="row" spacing={3}>
        <Grid item xs={12} sx={{ pl: 2 }}>
          <Card>
            <CardHeader title="Graph" />
            <Divider />
            <iframe
              height={500}
              width="100%"
              title="Graph"
              frameBorder="0"
              src={`/graph.html?keyword=${keyword}`}
              style={{
                display: 'block',
                border: 'none',
              }}
            />
          </Card>
        </Grid>

        {meshData && (
          <>
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
                  <PropertyListItem
                    align="Synonyms"
                    divider
                    label="Synonyms"
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
                      <TreeInfoAccordion
                        data={meshData.treeInfo}
                        keyword={keyword}
                      />
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
          </>
        )}
      </Grid>
    </Container>
  );
};

export default Search;
