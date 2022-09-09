
// import * as React from 'react';
// import Container from '@mui/material/Container';
// import Box from '@mui/material/Box';
// import Copyright from '../src/Copyright';
// import MakerResponsiveAppBar from '../src/MakerResponsiveAppBar'
// import Checkbox from '../src/check';
// import Layout from '../components/Layout';
// import Result from '../components/Result';
// import Grid from '@mui/material/Grid';




// export default function sarch({ }) {
//   return (
// <>
//     <Container>
//       <MakerResponsiveAppBar />
//       <Box align='center'> 
//        <Grid container spacing={2}>
//         <Grid item xs={4}>
//         <Checkbox /> 
//         </Grid>
//         <Grid item xs={8}>
//           <Result />
//         </Grid>
//       </Grid>
//         <Layout />
//         <Copyright />
//       </Box>
//       </Container>
// </>
//   );
// }

import { useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form'
import * as UserTypes from '../types/userTypes';
import * as Api from '../utils/api'
import Link from 'next/link'
import getConfig from "next/config"
import { Select,MenuItem } from "@material-ui/core";

export default function App() {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const submit = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(submit)}>
      <div>
        <label htmlFor="honban" style={{ marginRight: "30px" }}>
          本番
        </label>
        <Select　{...register("honban")} name="honban" id="honban">
          <MenuItem value={1}>できる</MenuItem>
          <MenuItem value={0}>できない</MenuItem>
          <MenuItem value={2}>要相談</MenuItem>
        </Select>  
      </div>

      <div>
        <label htmlFor="gomunashi" style={{ marginRight: "30px" }}>
          ゴムなし
        </label>
        <Select {...register("gomunashi")} name="gomunashi" id="gomunashi">
          <MenuItem value={1}>できる</MenuItem>
          <MenuItem value={0}>できない</MenuItem>
          <MenuItem value={2}>要相談</MenuItem>
        </Select>
      </div>

      <div>
        <label htmlFor="nakadashi" style={{ marginRight: "30px" }}>
          中出し
        </label>
        <Select {...register("nakadashi")} name="nakadashi" id="nakadashi">
          <MenuItem value={1}>できる</MenuItem>
          <MenuItem value={0}>できない</MenuItem>
          <MenuItem value={2}>要相談</MenuItem>
        </Select>
      </div>

      <div>
        <label htmlFor="ferachio" style={{ marginRight: "30px" }}>
          フェラチオ
        </label>
        <Select {...register("ferachio")} name="ferachio" id="ferachio">
          <MenuItem value={1}>できる</MenuItem>
          <MenuItem value={0}>できない</MenuItem>
          <MenuItem value={2}>要相談</MenuItem>
        </Select>
      </div>

      <div>
        <label htmlFor="iramachio" style={{ marginRight: "30px" }}>
          イマラチオ
        </label>
        <Select {...register("iramachio")} name="iramachio" id="iramachio">
          <MenuItem value={1}>できる</MenuItem>
          <MenuItem value={0}>できない</MenuItem>
          <MenuItem value={2}>要相談</MenuItem>
        </Select>
      </div>
      <button type="submit" variant="outlined">
        作成
      </button>
    </form>
  )
	
  const handleClickEvent = () => {
    //console.log(data);
    const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
    const apiContext = {
      apiRootUrl: publicRuntimeConfig.NEXT_PUBLIC_SELF_API_URL,
    }
    const conditon = createSearchCondition();
    Api.SearchActors(apiContext, conditon)
      .then(result => {
        console.log(result);
      })
  }

	// create search condition
// 	const createSearchCondition = () => {
// 		let condition = Array();
// 		condition.push({
// 			id: UserTypes.ActorDataItemId.Honban,
// 			type: UserTypes.ActorSearchType.FullMatch,
// 			value: UserTypes.ActorSearchType.,
// 			option: {},
// 		});
// 		condition.push({
// 			id: UserTypes.ActorDataItemId.Gomunashi,
// 			type: UserTypes.ActorSearchType.FullMatch,
// 			value: UserTypes.ActorSearchType.'formから取ってきた値',
// 			option: {},
// 		});
// 		condition.push({
// 			id: UserTypes.ActorDataItemId.Nakadashi,
// 			type: UserTypes.ActorSearchType.FullMatch,
// 			value: UserTypes.ActorSearchType.'formから取ってきた値',
// 			option: {},
// 		});
// 		condition.push({
// 			id: UserTypes.ActorDataItemId.Ferachio,
// 			type: UserTypes.ActorSearchType.FullMatch,
// 			value: UserTypes.ActorSearchType./* formから取ってきた値 */,
// 			option: {},
// 		});
// 		condition.push({
// 			id: UserTypes.ActorDataItemId.Iramachio,
// 			type: UserTypes.ActorSearchType.FullMatch,
// 			value: UserTypes.ActorSearchType./* formから取ってきた値 */,
// 			option: {},
// 		});
// 		console.log(condition);
// 		return condition;
// 	} 

// 	return (
// 		<>
// 			<Link href="/">
//         <a>戻る</a>
//       </Link>
// 			<br />
// 			<button onClick={handleClickEvent}>一覧取得</button>
// 		</>
// 	)
}