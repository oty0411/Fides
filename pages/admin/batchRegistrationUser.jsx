import { useForm, SubmitHandler } from 'react-hook-form'
import * as UserTypes from '../../types/userTypes';
import * as Api from '../../utils/api'
import Link from 'next/link'
import getConfig from "next/config"
import { Password } from '@mui/icons-material';

export default function RegistrarionForm(){
	
	const targetUsers = createTargerUsers();
	const { handleSubmit } = useForm();
	const onSubmit = (data) => {

		const { publicRuntimeConfig } = getConfig();
    const apiContext = {
      apiRootUrl: publicRuntimeConfig.NEXT_PUBLIC_SELF_API_URL,
		}

		targetUsers.forEach(item => {
			const postData = {
				Name: item.userName,
				Password: item.password,
				Type: UserTypes.UserType.Actor,
				IsAdmin: 0,
				IsDelete: 0,
			}
			Api.RegistrationUser(apiContext, postData)
			.then(result => {
				if (result.result.Code == UserTypes.AppErrorCode.Success) {
					Api.GetActorProfile(apiContext, result.userData.Id)
					.then(getResult => {
						console.log("GetActorProfile is done!");
						//console.log(getResult);
						const postData = createPostData(result.userData.Id, getResult.userData, item);
						Api.UpdateActorProfile(apiContext, { userId: result.userData.Id, userData: postData })
							.then(updateResult => {
								console.log("UpdateActorProfile is done!");
								console.log(updateResult);
							});
			});
				}
				console.log(result);
			})
		})
		console.log("API processing done.");
	}

	// 更新データ作成
	const createPostData = (id, originalData, targetData) => {
		let data = UserTypes.ActorData.CopyInstance(originalData);
		// User
		data.User.Id = id;
		data.User.Name = targetData.userName;
		data.User.Password = targetData.password;
		data.User.Open = originalData.User.Open;
		data.User.Type = originalData.User.Type;
		data.User.IsAdmin = true;
		data.User.IsDeleted = originalData.User.IsDeleted;
		// Profile
		data.Profile.ActressName = targetData.actressName;
		data.Profile.RealName = targetData.realName;
		data.Profile.Birthday = new Date(2020 / 3 / 9);
		data.Profile.BloodType = UserTypes.BloodType.AB;
		data.Profile.Height = 165;
		data.Profile.Weight = 50;
		data.Profile.ClothesSize = UserTypes.ClothesSizeType.M;
		data.Profile.ShoesSize = 24;
		data.Profile.BreastSize = UserTypes.BreastSizeType.F;
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
				<input type="submit" />
			</form>
		</>
	)

	// 追加する
	function createTargerUsers() {
		let array = new Array();
		const baseUserName = "fidesUser";
		const basePassword = "password";
		const baseActressName = "ジーズさくら";
		const baseRealName = "アカデミーのりこ";

		for (let index = 0; index < 30; index++){
			array.push({
				userName: baseUserName + String(index),
				password: basePassword,
				actressName: baseActressName + String(index) + "号",
				realName: baseRealName + String(index) + "号",
			});
		}
		console.log(array);
		return array;
	}
}