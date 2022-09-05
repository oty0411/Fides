import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function RowAndColumnSpacing() {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={6}>
          <Item>身長</Item>
        </Grid>
        <Grid xs={6}>
          <Item>cm</Item>
        </Grid>
        <Grid xs={6}>
          <Item>体重</Item>
        </Grid>
        <Grid xs={6}>
          <Item>kg</Item>
              </Grid>
        <Grid xs={6}>
        <Item>服のサイズ</Item>
        </Grid>
        <Grid xs={6}>
          <Item>号</Item>
        </Grid>
        <Grid xs={6}>
          <Item>靴のサイズ</Item>
        </Grid>
        <Grid xs={6}>
          <Item>cm</Item>
              </Grid>
                  <Grid xs={6}>
        <Item>バスト</Item>
        </Grid>
        <Grid xs={6}>
          <Item>カップ</Item>
        </Grid>
        <Grid xs={6}>
          <Item>バスト・トップ</Item>
        </Grid>
        <Grid xs={6}>
          <Item>cm</Item>
              </Grid>
                 <Grid xs={6}>
          <Item>アンダー</Item>
              </Grid>
                  <Grid xs={6}>
        <Item>cm</Item>
        </Grid>
        <Grid xs={6}>
          <Item>ウエスト</Item>
        </Grid>
        <Grid xs={6}>
          <Item>cm</Item>
        </Grid>
        <Grid xs={6}>
          <Item>ヒップ</Item>
              </Grid>
                 <Grid xs={6}>
          <Item>cm</Item>
              </Grid>
                  <Grid xs={6}>
        <Item>血液型</Item>
        </Grid>
        <Grid xs={6}>
          <Item>型</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
