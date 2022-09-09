import { useState } from "react";
import { useForm } from 'react-hook-form'
import { AppBar, Toolbar } from "@material-ui/core";
import { Grid } from '@material-ui/core'
import getConfig from "next/config"
import { Select, MenuItem } from "@material-ui/core";
import * as UserTypes from '../types/userTypes';
import * as Api from '../utils/api'
import SearchResultsView from '../components/searchResultsView';
/**
 * 女優検索ページ
 * @returns 
 */
export default function App() {
  // フォーム利用
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const [ message, setMessage] = useState("");
  const [searchResult, setSearchResult] = useState(Array());

  // create search condition data
	const createSearchCondition = (formData) => {
    let condition = Array();
    // 本番
		condition.push({
			id: UserTypes.ActorDataItemId.Honban,
			type: UserTypes.ActorSearchType.FullMatch,
			value: Number(formData.honban),
			option: {},
    });
    // ゴム無し
		condition.push({
			id: UserTypes.ActorDataItemId.Gomunashi,
			type: UserTypes.ActorSearchType.FullMatch,
			value: Number(formData.gomunashi),
			option: {},
    });
    // 中だし
		condition.push({
			id: UserTypes.ActorDataItemId.Nakadashi,
			type: UserTypes.ActorSearchType.FullMatch,
			value: Number(formData.nakadashi),
			option: {},
    });
    // フェラチオ
		condition.push({
			id: UserTypes.ActorDataItemId.Ferachio,
			type: UserTypes.ActorSearchType.FullMatch,
			value: Number(formData.ferachio),
			option: {},
    });
    // イラマチオ
		condition.push({
			id: UserTypes.ActorDataItemId.Iramachio,
			type: UserTypes.ActorSearchType.FullMatch,
			value: Number(formData.iramachio),
			option: {},
		});
		console.log(condition);
		return condition;
	} 

  // フォーム送信時のイベントハンドラ
  const submit = (formData) => {
    console.log(formData); // フォーム入力データのチェック
    
    // API送信先アドレス指定
    const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
    const apiContext = {
      apiRootUrl: publicRuntimeConfig.NEXT_PUBLIC_SELF_API_URL,
    }
    // 検索条件作成
    const conditon = createSearchCondition(formData);
    // 検索実行
    Api.SearchActors(apiContext, conditon)
      .then(apiResult => {
        // 検索結果のチェック
        console.log(apiResult);
        if (apiResult.result.Code == UserTypes.AppErrorCode.Success) {
          setMessage("検索結果:" + apiResult.userDatas.length + "件");
          setSearchResult(apiResult.userDatas);
          console.log(searchResult);
        } else {
          setMessage("検索失敗");
        }
      })
  };

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#ffC0cb" }}>
        <Toolbar>
          <h1>女優検索</h1>
        </Toolbar>
      </AppBar>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={8}>
        <div>
          <h3>女優検索条件</h3>
            <form onSubmit={handleSubmit(submit)}>
              <div>
                <label htmlFor="honban" style={{ marginRight: "30px" }}>
                  本番
                </label>
                <Select {...register("honban", { required: true })} name="honban" id="honban">
                  <MenuItem value="">...選択</MenuItem>
                  <MenuItem value={1}>できる</MenuItem>
                  <MenuItem value={0}>できない</MenuItem>
                  <MenuItem value={2}>要相談</MenuItem>
                </Select>
                {errors.honban && <div>条件「本番」を指定してください</div>}    
              </div>
              <div>
                <label htmlFor="gomunashi" style={{ marginRight: "30px" }}>
                  ゴムなし
                </label>
                <Select {...register("gomunashi", { required: true })} name="gomunashi" id="gomunashi">
                  <MenuItem value={1}>できる</MenuItem>
                  <MenuItem value={0}>できない</MenuItem>
                  <MenuItem value={2}>要相談</MenuItem>
                </Select>
                {errors.gomunashi && <div>条件「ゴムなし」を指定してください</div>} 
              </div>
              <div>
                <label htmlFor="nakadashi" style={{ marginRight: "30px" }}>
                  中出し
                </label>
                <Select {...register("nakadashi", { required: true })} name="nakadashi" id="nakadashi">
                  <MenuItem value={1}>できる</MenuItem>
                  <MenuItem value={0}>できない</MenuItem>
                  <MenuItem value={2}>要相談</MenuItem>
                </Select>
                {errors.nakadashi && <div>条件「中出し」を指定してください</div>} 
              </div>
              <div>
                <label htmlFor="ferachio" style={{ marginRight: "30px" }}>
                  フェラチオ
                </label>
                <Select {...register("ferachio", { required: true })} name="ferachio" id="ferachio">
                  <MenuItem value={1}>できる</MenuItem>
                  <MenuItem value={0}>できない</MenuItem>
                  <MenuItem value={2}>要相談</MenuItem>
                </Select>
                {errors.ferachio && <div>条件「フェラチオ」を指定してください</div>} 
              </div>
              <div>
                <label htmlFor="iramachio" style={{ marginRight: "30px" }}>
                  イマラチオ
                </label>
                <Select {...register("iramachio", { required: true })} name="iramachio" id="iramachio">
                  <MenuItem value={1}>できる</MenuItem>
                  <MenuItem value={0}>できない</MenuItem>
                  <MenuItem value={2}>要相談</MenuItem>
                </Select>
                {errors.iramachio && <div>条件「イラマチオ」を指定してください</div>} 
              </div>
              <button type="submit" variant="outlined">検索</button>
            </form>
          </div>
        <div>
          <h3>検索結果</h3>
          <SearchResultsView message={message} searchResult={ searchResult } />
          </div>
        </Grid>
      </Grid>
    </>
  )
}