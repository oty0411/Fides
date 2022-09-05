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
      <li>
      身長:<input />cm
      体重:<input/>kg
      服のサイズ:<input/>号
      靴のサイズ:<input/>cm
      バスト:<input/>カップ
      バスト・トップ:<input/>cm
      バスト・アンダー:<input/>cm
      ウエスト:<input/>cm
      ヒップ:<input/>cm
      血液型:<input />型
      </li>
      
      
    </Box>
  );
}
