import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';



export default function BiethdayPickers() {
    return (

      <Stack component="form"
     noValidate spacing={3}>
          <TextField
        id="date"
        label="生年月日"
        type="date"
        defaultValue="2000-01-01"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}/>
            </Stack>

  );
}

