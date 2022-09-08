
import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Copyright from '../src/Copyright';
import MakerResponsiveAppBar from '../src/MakerResponsiveAppBar'
import Checkbox from '../src/check';
import Layout from '../components/Layout';
import Result from '../components/Result';
import Grid from '@mui/material/Grid';




export default function sarch({ }) {
  return (
<>
    <Container>
      <MakerResponsiveAppBar />
      <Box align='center'> 
       <Grid container spacing={2}>
        <Grid item xs={4}>
        <Checkbox /> 
        </Grid>
        <Grid item xs={8}>
          <Result />
        </Grid>
      </Grid>
        <Layout />
        <Copyright />
      </Box>
      </Container>
</>
  );
}