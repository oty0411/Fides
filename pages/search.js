
import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Copyright from '../src/Copyright';
import MakerResponsiveAppBar from '../src/MakerResponsiveAppBar'
import Checkboxes from '../src/check';
import Layout from '../components/Layout';
import { Button, Input } from '@mui/material';




export default function sarch({ }) {
  return (

    <Container>
      <MakerResponsiveAppBar />
      <Box align='center'> 
       <Input/>
        <Checkboxes /> 
        <Layout />
        <Copyright />
      </Box>
      </Container>

  );
}