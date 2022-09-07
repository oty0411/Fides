import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

export default function ComposedTextField() {
  const [actressName, setName] = React.useState('');
  const [realName, Name] = React.useState('');

  const handleChange = (event) => {
    console.log(event)
    setName(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
          autoComplete="off"
          align="center"
    >
      <FormControl>
        <InputLabel htmlFor="component-outlined"> 女優名</InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={actressName}
          onChange={handleChange}
          label="actressName"
        />
          </FormControl>
         <FormControl>
        <InputLabel htmlFor="component-outlined">本名</InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={realName}
          onChange={handleChange}
          label="realName"
        />
      </FormControl>
  
    </Box>
  );
}