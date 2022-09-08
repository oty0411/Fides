import { useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form'
import * as UserTypes from '../../types/userTypes';
import * as Api from '../../utils/api'
import Link from 'next/link'
import getConfig from "next/config"

export default function App() {
	const { register, handleSubmit, formState: { errors }, } = useForm/*<{id: number}>*/();
	
	const onSubmit/*SubmitHandler<{id: number}>*/ = (data) => {
		//console.log(data);
    const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
    const apiContext = {
      apiRootUrl: publicRuntimeConfig.NEXT_PUBLIC_SELF_API_URL,
		}
		updateActorProfile(apiContext, data.id);
	}

	// データ更新
	const updateActorProfile = (apiContext, id) => {
		Api.GetActorProfile(apiContext, id)
			.then(getResult => {
				console.log("GetActorProfile is done!");
				//console.log(getResult);
				const postData = createPostData(getResult.userData);
				Api.UpdateActorProfile(apiContext, { userId: id, userData: postData })
					.then(updateResult => {
						console.log("UpdateActorProfile is done!");
						console.log(updateResult);
					});
			});
	}

	// 更新データ作成
	const createPostData = (originalData) => {
		let data = UserTypes.ActorData.CopyInstance(originalData);
		// User
		data.User.Id = originalData.User.Id;
		data.User.Name = originalData.User.Name;
		data.User.Password = "abcdefg1234";
		data.User.Open = originalData.User.Open;
		data.User.Type = originalData.User.Type;
		data.User.IsAdmin = true;
		data.User.IsDeleted = originalData.User.IsDeleted;
		// Profile
		data.Profile.ActressName = "佐倉絆";
		data.Profile.RealName = "本間絆";
		data.Profile.Birthday = new Date(2020 / 3 / 9);
		data.Profile.BloodType = UserTypes.BloodType.AB;
		data.Profile.Height = 165;
		data.Profile.Weight = 50;
		data.Profile.ClothesSize = UserTypes.ClothesSizeType.S;
		data.Profile.ShoesSize = 24;
		data.Profile.BreastSize = UserTypes.BreastSizeType.D;
		data.Profile.BreastTopSize = 90;
		data.Profile.BreastUnderSize = 75;
		data.Profile.WaistSize = 50;
		data.Profile.HipSize = 85;
		// PlayCondition
		data.PlayCondition1.Honban = UserTypes.PlayConditionChoice.OK;
		data.PlayCondition1.Gomunashi = UserTypes.PlayConditionChoice.OK;
		data.PlayCondition1.Nakadashi = UserTypes.PlayConditionChoice.NG;
		data.PlayCondition1.Ferachio = UserTypes.PlayConditionChoice.OK;
		data.PlayCondition1.Iramachio = UserTypes.PlayConditionChoice.NEGOTIABLE;

		//console.log(data);
		return data;
	}

	return (
		<>
			<Link href="/">
        <a>戻る</a>
      </Link>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input {...register('id', { required: true })} placeholder="ID" />
				{errors.id && <div>IDを入力してください</div>}
				<input type="submit" />
			</form>
		</>
	)
}