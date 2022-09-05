import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Copyright from '../src/Copyright';
import ResponsiveAppBar from '../src/ResponsiveAppBar';


export default function edit() {
    return (
    <Container maxWidth="max"> 
        <ResponsiveAppBar/>
        <Typography variant="h4" component="h1" gutterBottom>
        </Typography>
        <Button variant="contained"  noLinkStyle href="/">
        HOME
        </Button>
        <Copyright />
    </Container>
  );
}