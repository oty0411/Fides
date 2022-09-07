// import Layout from '../../components/Layout';
// import Container from '@mui/material/Container';
// import Box from '@mui/material/Box';
// import Copyright from '../../src/Copyright';
// import ResponsiveAppBar from '../../src/ResponsiveAppBar'
// import Input from '../../src/imputbox'
// import Icon from '../../src/icon'
// import Question from '../../src/Question';
// import BirthdayPicker from '../../src/Birthpicker';
// import Button from '../../components/Button';
// import Checkboxes from '../../src/check';
import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import ResponsiveAppBar from '../../src/ResponsiveAppBar';
import { Grid } from '@mui/material';
import BiethdayPickers from '../../src/Birthpicker';



// export default function Me({ }) {
//   return (
//     <Container>
//     <ResponsiveAppBar />
//     <Box align='center'>
//     <Layout home >  
//           <Icon />
//           <Input />
//         </Layout>
//         <BirthdayPicker/>
//         <Question />
//         <Checkboxes />
//         <Button></Button>
//         <Copyright />
//       </Box>
//       </Container>
//   );
// }


export default function Images() {
  const handleUploadClick = async (e) => {
    console.log(e.target.files[0])
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
  }


//   const [actressName,realName,hight,weight,clothes_size,shoes_size,bust_size,bust_topsize,
// bust_undersize,west_size,hip_size,blood,setName] = React.useState('');


  // const handleChange = (event) => {
  //     console.log(event)
  //     // setName(event.target.value);
  //   }
    

      //   try {
      //     await axios.post(`アップロード先エンドポイント`,
      //       formData
      //     );
      //   } catch (e) {
      //     console.error(e);
      //   }
    
  
  const submit = (data) => {
    console.log(data)
  }

    return (
      <>
        <ResponsiveAppBar />
     
        <div
          style={{
            padding: 30
          }}
         align="center"
          display="flex">
          <label htmlFor="upload-button" style={{ border: "1px solid #222", borderRadius: 10, padding: 10, cursor: "pointer" }}>
            <input
              accept="image/*"
              id="upload-button"
              type="file"
              onChange={handleUploadClick}
              hidden
            />
            ファイル選択
          </label>

        </div >
      
        
        
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1 },
          }}
          noValidate
          autoComplete="off"
          align="center"
          justifyContent="center"
          m='3'
        >
          <form onSubmit={submit}>
          <p>プロフィール</p>
          <FormControl >
            <InputLabel htmlFor="component-outlined"> 女優名</InputLabel>
            <OutlinedInput
              id="component-outlined"
              // value={actressName}
              // onChange={handleChange}
              label="actressName"
              name="actressName"
            />
            
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="component-outlined">本名</InputLabel>
            <OutlinedInput
              id="component-outlined"
              // value={realName}
              // onChange={handleChange}
              label="realName"
            />
          </FormControl>
          <Grid
            sx={{
               '& > :not(style)': { m: 1 },
         display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          p: 2,
          m: 5,
        }}>
            <FormControl>
            <InputLabel htmlFor="component-outlined">身長</InputLabel>
            <OutlinedInput
              id="component-outlined"
              // value={hight}
              // onChange={handleChange}
              label="hight"
            />
          </FormControl>
              <FormControl>
            <InputLabel htmlFor="component-outlined">体重</InputLabel>
            <OutlinedInput
              id="component-outlined"
              // value={weight}
              // onChange={handleChange}
              label="weight"
            />
          </FormControl>
           <FormControl>
            <InputLabel htmlFor="component-outlined">服のサイズ</InputLabel>
            <OutlinedInput
              id="component-outlined"
              // value={clothes_size}
              // onChange={handleChange}
              label="clothes_size"
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="component-outlined">靴のサイズ</InputLabel>
            <OutlinedInput
              id="component-outlined"
              // value={shoes_size}
              // onChange={handleChange}
              label="shoes_size"
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="component-outlined">バストサイズ</InputLabel>
            <OutlinedInput
              id="component-outlined"
              // value={bust_size}
              // onChange={handleChange}
              label="bust_size"
            />
          </FormControl>
            <FormControl>
            <InputLabel htmlFor="component-outlined">バストトップ</InputLabel>
            <OutlinedInput
              id="component-outlined"
              // value={bust_topsize}
              // onChange={handleChange}
              label="bust_topsize"
            />
          </FormControl>
              <FormControl>
            <InputLabel htmlFor="component-outlined">バストアンダー</InputLabel>
            <OutlinedInput
              id="component-outlined"
              // value={bust_undersize}
              // onChange={handleChange}
              label="bust_undersize"
            />
          </FormControl>
           <FormControl>
            <InputLabel htmlFor="component-outlined">ウエスト</InputLabel>
            <OutlinedInput
              id="component-outlined"
              // value={west_size}
              // onChange={handleChange}
              label="west_size"
            />
          </FormControl>
               <FormControl>
            <InputLabel htmlFor="component-outlined">バストトップ</InputLabel>
            <OutlinedInput
              id="component-outlined"
              // value={bust_topsize}
              // onChange={handleChange}
              label="bust_topsize"
            />
          </FormControl>
              <FormControl>
            <InputLabel htmlFor="component-outlined">ヒップサイズ</InputLabel>
            <OutlinedInput
              id="component-outlined"
              // value={hip_size}
              // onChange={handleChange}
              label="hip_size"
            />
          </FormControl>
           <FormControl>
            <InputLabel htmlFor="component-outlined">血液型</InputLabel>
            <OutlinedInput
              id="component-outlined"
              // value={blood}
              // onChange={handleChange}
              label="blood"
            />
            </FormControl>
            </Grid>
            <button>送信</button>
          </form>
          </Box>
          
      </>
    );
  }
