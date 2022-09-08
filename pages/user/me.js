import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import ResponsiveAppBar from '../../src/ResponsiveAppBar';
import { useForm } from 'react-hook-form';
import * as UserTypes from '../../types/userTypes';
import * as Api from '../../utils/api'
import Copyright from '../../src/Copyright';



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
    // POSTするプロフィールデータの作成
    const postData = createPostData(new UserTypes.ActorData(), data);
    // プロフィール更新
    updateProfile(postData);
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

		console.log(data);
		return data;
  }
  
  // プロフィール更新
  const updateProfile = (postData) => {
    const apiContext/*ApiContext*/ = {
      apiRootUrl: process.env.NEXT_PUBLIC_SELF_API_URL,
    }
    //console.log(postData);
    // TODO:ユーザIDを取得する必要がある
		Api.UpdateActorProfile(apiContext, { userId: 1, userData: postData })
			.then(updateResult => {
				console.log("UpdateActorProfile is done!");
				console.log(updateResult);
			});
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
          <button>プロフィール作成</button>
   
        </form>
        
      </div>
      <Copyright/>
    </>
    )
  }
