import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import ResponsiveAppBar from '../../src/ResponsiveAppBar';
import * as UserTypes from '../../types/userTypes';
import * as Api from '../../utils/api'
import Copyright from '../../src/Copyright';
import CheckBoxList from '../../src/CheckBoxList';
import getConfig from "next/config"
import  { useState, useEffect } from "react"
import { useForm } from 'react-hook-form';
import { Select,MenuItem } from "@material-ui/core";



export default function Me() {
  const handleUploadClick = async (e) => {
    console.log(e.target.files[0])
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
  }

  const { register, handleSubmit, formState: { errors },} = useForm();
  const submit = (data) => {
    console.log(data);
  
    // プロフィール更新
    updateProfile(data);
  };
  
  
  // 更新データ作成
	const createPostData = (originalData, formData) => {
		let data = UserTypes.ActorData.CopyInstance(originalData);
		// User
		data.User.Id = originalData.User.Id;
		data.User.Name = originalData.User.Name;
		data.User.Password = originalData.Password;
		data.User.Open = originalData.User.Open;
		data.User.Type = originalData.User.Type;
		data.User.IsAdmin = originalData.User.IsAdmin;
		data.User.IsDeleted = originalData.User.IsDeleted;
		// Profile
		data.Profile.ActressName = originalData.Profile.ActressName;
		data.Profile.RealName = originalData.Profile.RealName;
		data.Profile.Birthday = originalData.Profile.Birthday;
		data.Profile.BloodType = originalData.Profile.BloodType;
		data.Profile.Height = originalData.Profile.Height;
		data.Profile.Weight = originalData.Profile.Weight;
		data.Profile.ClothesSize = originalData.Profile.ClothesSize;
		data.Profile.ShoesSize = originalData.Profile.ShoesSize;
		data.Profile.BreastSize = originalData.Profile.BreastSize;
		data.Profile.BreastTopSize = originalData.Profile.BreastTopSize;
		data.Profile.BreastUnderSize = originalData.Profile.BreastUnderSize;
		data.Profile.WaistSize = originalData.Profile.WaistSize;
		data.Profile.HipSize = originalData.Profile.HipSize;
		// PlayCondition
    data.PlayCondition1.Honban = originalData.PlayCondition1.Honban;
		data.PlayCondition1.Gomunashi = originalData.PlayCondition1.Gomunashi;
		data.PlayCondition1.Nakadashi = originalData.PlayCondition1.Nakadashi;
		data.PlayCondition1.Ferachio = originalData.PlayCondition1.Ferachio;
    data.PlayCondition1.Iramachio = originalData.PlayCondition1.Iramachio;
    
    data.Profile.ActressName = formData.ActressName;
		data.Profile.RealName = formData.RealName;
		// data.Profile.Birthday = originalData.Profile.Birthday;
		data.Profile.BloodType = Number(formData.BloodType);
		data.Profile.Height = Number(formData.Height);
		data.Profile.Weight = Number(formData.Weight);
		data.Profile.ClothesSize = Number(formData.ClothesSize);
		data.Profile.ShoesSize = Number(formData.ShoesSize);
		data.Profile.BreastSize = Number(formData.BreastSize);
		data.Profile.BreastTopSize = Number(formData.BreastTopSize);
		data.Profile.BreastUnderSize = Number(formData.BreastUnderSize);
		data.Profile.WaistSize = Number(formData.WaistSize);
    data.Profile.HipSize = Number(formData.HipSize);
    
    data.PlayCondition1.Honban = Number(formData.honban);
    data.PlayCondition1.Gomunashi = Number(formData.gomunashi);
		data.PlayCondition1.Nakadashi = Number(formData.nakadashi);
		data.PlayCondition1.Ferachio = Number(formData.ferachio);
    data.PlayCondition1.Iramachio = Number(formData.iramachio);
    
		console.log(data);
		return data;
  }
  
  // プロフィール更新
  const updateProfile = (formData) => {
    const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
    const apiContext = {
      apiRootUrl: publicRuntimeConfig.NEXT_PUBLIC_SELF_API_URL,
    }
    const id = 1;
    	Api.GetActorProfile(apiContext, id)
			.then(getResult => {
				console.log("GetActorProfile is done!");
				//console.log(getResult);
				const postData = createPostData(getResult.userData,formData);
				Api.UpdateActorProfile(apiContext, { userId: id, userData: postData })
					.then(updateResult => {
						console.log("UpdateActorProfile is done!");
						console.log(updateResult);
					});
			});
  }
  //checkboxのvalueリスト
const checkLists = [
  "できる",
  "できない",
  "要相談",
]

//checkboxコンポーネント
const CheckBox = ({id, value, checked, onChange}) => {
  return (
    <input
      id={id}
      type="checkbox"
      name="inputNames"
      checked={checked}
      onChange={onChange}
      value={value}
    />
  )
}

  const CheckBoxList = () => {

    //checkedItemsは初期値を空のオブジェクトにする
    const [checkedItems, setCheckedItems] = useState({})
    //ひとつでもcheckedになっている場合にのみ送信ボタンを表示させたいので、全体のStateを監視する
    const [isBtnHide, setIsBtnHide] = useState(true)
    const { register, handleSubmit, formState: { errors }, } = useForm();
    useEffect(() => {
      //checkedItemsが空では無い場合、送信ボタンを表示させる
      Object.keys(checkedItems).length && setIsBtnHide(false)
      //すべてのcheckedItemの値がfalseの場合に送信ボタンを表示させる
      setTimeout(() => {
        if (
          Object.values(checkedItems).every(checkedItem => {
            return checkedItem === false
          })
        ) {
          setIsBtnHide(true)
        }
      }, 100);
    }, [checkedItems])

    //   const handleChange = e => {
    // //checkedItemsのstateをセット
    //     setCheckedItems({
    //       ...checkedItems,
    //       [e.target.id]: e.target.checked
    //     })
    //     console.log('checkedItems:', checkedItems)
    //   }

    //   const dataSendBtn = e => {
    // //既定のイベントをキャンセルさせる
    //     e.preventDefault()
    // //送信ボタンを押したタイミングで、checkedItemsオブジェクトのvalueがtrueのkeyのみを配列にしてconsoleに表示させる
    //     const dataPushArray = Object.entries(checkedItems).reduce((pre,[key, value])=>{
    //       value && pre.push(key)
    //       return pre
    //     },[])
    //     console.log("dataPushArray:", dataPushArray)
    //   }

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
        </div>

        <div>
      <h1>プロフィール</h1>
      <form onSubmit={handleSubmit(submit)}>
        <div style={{marginBottom: "20px"}}>
          <label htmlFor="ActressName">女優名</label>
          <input
            autoComplete="off"
            {...register("ActressName" , { required: true })}
            type="text"
            name="ActressName"
            id="ActressName"
          />
            {errors.ActressName && <div>女優名を入力してください</div>}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="RealName">本名</label>
          <input
            autoComplete="off"
            {...register("RealName", { required: true })}
            type="text"
            name="RealName"
            id="RealName"
          />
          {errors.RealName && <div>本名を入力してください</div>}  
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="Height">身長</label>
          <input
            autoComplete="off"
            {...register("Height", { required: true })}
            type="text"
            name="Height"
            id="Height"
          />
          {errors.Height && <div>身長を入力してください</div>}  
        </div>

        <div>
          <label htmlFor="Weight">体重</label>
          <input
            autoComplete="off"
            {...register("Weight", { required: true })}
            type="text"
            name="Weight"
            id="Weight"
          />
          {errors.Weight && <div>体重を入力してください</div>}  
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="ClothesSize">服のサイズ</label>
          <select {...register('ClothesSize', { required: true })}>
            <option value="">選択...</option>
            <option value="0">SS</option>
            <option value="1">S</option>
            <option value="2">M</option>
            <option value="3">L</option>
            <option value="4">2L</option>
            <option value="5">3L</option>
            <option value="6">4L</option>
            <option value="7">5L</option> 
            <option value="8">6L</option>
            <option value="9">7L</option>
            <option value="10">8L</option>
            <option value="11">9L</option>
            <option value="12">10L</option>
				</select>
          {errors.ClothesSize && <div>服のサイズを入力してください</div>}    
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="ShoesSize">靴のサイズ</label>
          <input
            autoComplete="off"
            {...register("ShoesSize", { required: true })}
            type="text"
            name="ShoesSize"
            id="ShoesSize"
          />
          {errors.ShoesSize && <div>靴のサイズを入力してください</div>}   
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="BreastSize">バストサイズ</label>
          <select {...register('BreastSize', { required: true })}>
            <option value="">選択...</option>
            <option value="0">A</option>
            <option value="1">B</option>
            <option value="2">C</option>
            <option value="3">D</option>
            <option value="4">E</option>
            <option value="5">F</option>
            <option value="6">G</option>
            <option value="7">H</option> 
            <option value="8">I</option>
            <option value="9">J</option>
            <option value="10">K</option>
            <option value="11">L</option>
            <option value="12">M</option>
            <option value="13">N</option>  
				</select>
          {errors.BreastSize && <div>バストサイズを入力してください</div>}   
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="BreastTopSize">バストトップ</label>
          <input
            autoComplete="off"
            {...register("BreastTopSize", { required: true })}
            type="text"
            name="BreastTopSize"
            id="BreastTopSize"
          />
          {errors.BreastTopSize && <div>バストトップサイズを入力してください</div>}   
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="BreastUnderSize">バストアンダー</label>
          <input
            autoComplete="off"
            {...register("BreastUnderSize", { required: true })}
            type="text"
            name="BreastUnderSize"
            id="BreastUnderSize"
          />
          {errors.BreastUnderSize && <div>バストアンダーサイズを入力してください</div>} 
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="WaistSize">ウエスト</label>
          <input
            autoComplete="off"
            {...register("WaistSize", { required: true })}
            type="text"
            name="WaistSize"
            id="WaistSize"
          />
          {errors.WaistSize && <div>ウェストサイズを入力してください</div>}   
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="HipSize">ヒップサイズ</label>
          <input
            autoComplete="off"
            {...register("HipSize", { required: true })}
            type="text"
            name="HipSize"
            id="HipSize"
          />
          {errors.HipSize && <div>ヒップサイズを入力してください</div>}   
        </div>

        {/* <div>
          <label htmlFor="blood">血液型</label>
          <input
            autoComplete="off"
            {...register("blood", { required: true })}
            type="text"
            name="blood"
            id="blood"
          />
        </div> */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="BloodType">血液型</label>
          <select {...register('BloodType', { required: true })}>
            <option value="">選択...</option>
            <option value="0">A</option>
            <option value="1">B</option>
            <option value="2">O</option>
            <option value="3">AB</option>    
				</select>
          {errors.BloodType && <div>血液型を入力してください</div>}   
        </div>  
          {/* <CheckBoxList/> */}
        {/* </form>
     <form onSubmit={handleSubmit(submit)}> */}
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
      </div>
      <Copyright/>
    </>
    )
  }
