/**
 * Prismaを使用したDBアクセスライブラリ
 */

import { PrismaClient, User, ActorProfile, PlayCondition1 } from '@prisma/client'
import * as UserTypes from '../../types/userTypes'
import * as DBTypes from './data'

// DBアクセス時のエラーコード
export const DBAccessCode = {
	Success: 0,
	Error: 1,
}

export class DBAccessor{	
	// #region Fields
	// prisma(PrismaClient型)
	static prisma = new PrismaClient();
	// #endregion Fields
	
	// #region Public methods
	static async CreateUser(user/*UserTypes.UserData*/)/*Promise<DBAccessCode>*/ {
		let result = DBAccessCode.Success;
		let userId = 0;
		// ユーザ追加
		await DBAccessor.createUser(user)
			.then(createdUser => {
				console.log(createdUser);
				userId = createdUser.id;
			})
			.catch(error => {
				console.log(error);
				result = DBAccessCode.Error;
			})
		
		// プロフィールとプレイ条件追加(追加するユーザのタイプが女優のときだけ追加)
		if (result == DBAccessCode.Success && user.Type == UserTypes.UserType.Actor) {
			await Promise.all([
				DBAccessor.createActorProfile(userId, UserTypes.ActorProfileData.CreateDummyData()),
				DBAccessor.createPlayCondition1(userId, UserTypes.PlayCondition1Data.CreateDummyData()),
			]).catch(error => {
				console.log(error);
				result = DBAccessCode.Error;
			});
		}
		
		return result;
	}
	/**
	 * ユーザ認証
	 */
	static async AuthUser(user/*UserTypes.LoginParams*/)
		/*Promise<{ result: DBAccessCode, pass: boolean, userData: UserTypes.UserData }>*/ {
		let result = DBAccessCode.Success;
		let pass = true;
		const matchUser = await DBAccessor.prisma.user.findFirst({
			where: {
				AND: {
					name: user.Name,
					password: user.Password,
				}
			},
		})
		//console.log(user);
		//console.log(matchUser);

		// 一致ユーザのチェック
		if (matchUser == null) {
			console.log("Auth fail.");
			pass = false;
		}
		else {
			console.log("Auth pass.");
		}
		const userData = new UserTypes.UserData();
		if (user.Name !== undefined && user.Password !== undefined && user.Name !== "" && user.Password !== "") {
			userData.SetData(matchUser);
		}
		return {
			result: result,
			pass: pass,
			userData: userData,
		};
	}
	/**
	 * 女優プロフィール取得
	 */
	static async GetActorProfile(id/*number*/)
		/*:Promise<{ result: DBAccessCode, userFind: boolean, userData: UserTypes.ActorData }>*/{
		
		let result = DBAccessCode.Success;
		let userFind = false;
		let userData = new UserTypes.ActorData();
		// ユーザデータ取得
		await DBAccessor.getActorProfile(id)
			.then(data => {
				//console.log(data);
				if (data != null) {
					userFind = true;
					userData.User.SetData(data);
					userData.Profile.SetData(data.profile);
					userData.PlayCondition1.SetData(data.playCondition1);
				}
			})
			.catch(error => {
				console.log(error);
				console.log("User with the specified number does not exist.");
				userFind = false;
			})

		return {
			result: result,
			userFind: userFind,
			userData: userData,
		};
}

	/**
	 * 女優プロフィール更新
	 */
	static async UpdateActorProfile(updateData/*{ number, ActorData }型*/)/*: Promise<DBAccessCode>*/ {
		let result = DBAccessCode.Success;
		
		console.log(updateData);

		// ユーザ追加
		await DBAccessor.updateUser(updateData.userId, updateData.userData.User)
			.then(result => {
				//console.log(result);
			})
			.catch(error => {
				console.log(error);
				result = DBAccessCode.Error;
			})
		// プロフィールとプレイ条件更新(追加するユーザのタイプが女優のときだけ追加)
		if (result == DBAccessCode.Success && updateData.userData.User.Type == UserTypes.UserType.Actor) {
			await Promise.all([
				DBAccessor.updateActorProfile(updateData.userId, updateData.userData.Profile),
				DBAccessor.updatePlayCondition1(updateData.userId, updateData.userData.PlayCondition1),
			]).catch(error => {
				console.log(error);
				result = DBAccessCode.Error;
			});
		}
		
		return result;
	}

	/**
	 * 女優リスト取得
	 */
	static async GetActorsList()/*Promise<{ result: DBAccessCode, userDatas: UserTypes.ActorData[] }>*/ {
		let result = DBAccessCode.Success;
		let userDatas = new Array(); // UserTypes.ActorData[]
		// ユーザデータ取得
		await DBAccessor.getActorsList()
			.then(datas => {
				//console.log(datas);
				if (datas != null) {
					userDatas = datas.map((data) => {
						//console.log(data);
						let userData = new UserTypes.ActorData();
						userData.User.SetData(data);
						userData.Profile.SetData(data.profile);
						userData.PlayCondition1.SetData(data.playCondition1);
						//console.log(userData);
						return userData;
					});
					console.log(userDatas);
				}
			})
			.catch(error => {
				console.log(error);
				console.log("An error occurred while retrieving actress list from DB.");
			})

		return {
			result: result,
			userDatas: userDatas,
		};
	}

	/**
	 * 女優検索
	 */
	static async SearchActors(condition/*object*/)/*Promise<{ result: DBAccessCode, userDatas: UserTypes.ActorData[] }>*/{
		let result = DBAccessCode.Success;
		let userDatas = new Array(); // UserTypes.ActorData[]
		// ユーザデータ取得
		await DBAccessor.searchActors(condition)
			.then(datas => {
				//console.log(datas);
				if (datas != null) {
					userDatas = datas.map((data) => {
						//console.log(data);
						let userData = new UserTypes.ActorData();
						userData.User.SetData(data);
						userData.Profile.SetData(data.profile);
						userData.PlayCondition1.SetData(data.playCondition1);
						//console.log(userData);
						return userData;
					});
					console.log(userDatas);
				}
			})
			.catch(error => {
				console.log(error);
				console.log("An error occurred while searching the target actress from the DB.");
			})

		return {
			result: result,
			userDatas: userDatas,
		};
	}
	// #endregion Public methods

	// #region Private methods
	// create user(Private method)
	static async createUser(user/*UserTypes.UserData*/)/*Promise<User>*/{
		const createdUser = await DBAccessor.prisma.user.create({
			data: {
				name: user.Name,
				password: user.Password,
				open: user.Open ? 1 : 0,
				type: Number(user.Type),
				is_admin: user.IsAdmin ? 1 : 0,
				is_deleted: user.IsDeleted ? 1 : 0,
			}
		})
		return createdUser;
	}
	// update user data(Private method)
	static async updateUser(userId/*number*/, user/*UserTypes.UserData*/)/*Promise<User>*/{
		const updateUser = await DBAccessor.prisma.user.update({
			where: {
				// Number型で数値を渡しているつもりだがなぜか文字列として受け取られるため、Numberへキャストして渡す
				id: Number(userId),
			},
			data: {
				name: user.Name, // 変更不可とする必要があるかは要検討
				password: user.Password,
				open: user.Open ? 1 : 0,
				type: user.Type,
				is_admin: user.IsAdmin ? 1 : 0,
				is_deleted: user.IsDeleted ? 1 : 0,
			},
		})
		//console.log(updateUser);
		return updateUser;
	}
	// create actor profile
	static async createActorProfile(userId/*number*/, profile/*UserTypes.ActorProfileData*/)/*Promise<ActorProfile>*/{
		const createdProfile = await DBAccessor.prisma.actorProfile.create({
			data: {
				userId: userId,
  			actress_name: profile.ActressName,
  			real_name: profile.RealName,
  			birthday: profile.Birthday,
  			blood_type: Number(profile.BloodType),
  			height: profile.Height,
  			weight: profile.Weight,
  			clothes_size: Number(profile.ClothesSize),
  			shoes_size: profile.ShoesSize,
  			breast_size: Number(profile.BreastSize),
  			breast_top: profile.BreastTopSize,
  			breast_under: profile.BreastUnderSize,
  			waist_size: profile.WaistSize,
  			hip_size: profile.HipSize,
			},
		})
		return createdProfile;
	}
	// update user data(Private method)
	static async updateActorProfile(userId/*number*/, profile/*UserTypes.ActorProfileData*/)/*Promise<ActorProfile>*/{
		const updateProfile = await DBAccessor.prisma.actorProfile.update({
			where: {
				// Number型で数値を渡しているつもりだがなぜか文字列として受け取られるため、Numberへキャストして渡す
				userId: Number(userId),
			},
			data: {
  			actress_name: profile.ActressName,
  			real_name: profile.RealName,
  			birthday: profile.Birthday,
  			blood_type: Number(profile.BloodType),
  			height: profile.Height,
  			weight: profile.Weight,
  			clothes_size: Number(profile.ClothesSize),
  			shoes_size: profile.ShoesSize,
  			breast_size: Number(profile.BreastSize),
  			breast_top: profile.BreastTopSize,
  			breast_under: profile.BreastUnderSize,
  			waist_size: profile.WaistSize,
  			hip_size: profile.HipSize,
			},
		})
		//console.log(updateProfile);
		return updateProfile;
	}
	// create actor profile
	static async createPlayCondition1(userId/*number*/, condition/*UserTypes.PlayCondition1Data*/)/*Promise<PlayCondition1>*/{
		const createdCondition = await DBAccessor.prisma.playCondition1.create({
			data: {
				userId: userId,
				honban: condition.Honban,
				gomunashi: condition.Gomunashi,
				nakadashi: condition.Nakadashi,
				ferachio: condition.Ferachio,
				iramachio: condition.Iramachio,
			},
		})
		return createdCondition;
	}
	// update user data(Private method)
	static async updatePlayCondition1(userId/*number*/, condition/*UserTypes.PlayCondition1Data*/)/*Promise<PlayCondition1>*/{
		const updateCondition = await DBAccessor.prisma.playCondition1.update({
			where: {
				// Number型で数値を渡しているつもりだがなぜか文字列として受け取られるため、Numberへキャストして渡す
				userId: Number(userId),
			},
			data: {
				honban: condition.Honban,
				gomunashi: condition.Gomunashi,
				nakadashi: condition.Nakadashi,
				ferachio: condition.Ferachio,
				iramachio: condition.Iramachio,
			},
		})
		//console.log(updateCondition);
		return updateCondition;
	}
	// get actor data(Private method)
	static async getActorProfile(id/*number*/)
		/*Promise<(User & { profile: ActorProfile | null; playCondition1: PlayCondition1 | null; }) | null>*/{
		const matchUser = await DBAccessor.prisma.user.findFirst({
			where: {
				// Number型で数値を渡しているつもりだがなぜか文字列として受け取られるため、Numberへキャストして渡す
				id: Number(id),
			},
			include: {
				profile: true,
				playCondition1: true,
			},
		});
		return matchUser;
	}
	// get actor list(Private method)
	static async getActorsList()
		/*Promise<(User & { profile: ActorProfile | null; playCondition1: PlayCondition1 | null; }) | null>*/{
		const matchUsers = await DBAccessor.prisma.user.findMany({
			where: {
				type: Number(UserTypes.UserType.Actor),
			},
			include: {
				profile: true,
				playCondition1: true,
			},
			orderBy: {
				id: "desc"
			},
		});
		return matchUsers;
	}
	// search actors(Private method)
	static async searchActors(condition/*object*/)
		/*Promise<(User & { profile: ActorProfile | null; playCondition1: PlayCondition1 | null; }) | null>*/{
		const searchCondition = DBAccessor.createSearchCondition(condition);
		const matchUsers = await DBAccessor.prisma.user.findMany({
			where: searchCondition,
			include: {
				profile: true,
				playCondition1: true,
			},
			orderBy: {
				id: "desc"
			},
		});
		return matchUsers;
	}

	// create search condition object(Private method)
	static createSearchCondition = (condition) => {
		let obj = {};
		// obj.type = UserTypes.UserType.Actor;
		condition.map((data) => {
			if (data.type == UserTypes.ActorSearchType.Match) {
				obj[DBTypes.ActorDataItemName[data.id]] = {
					contains: data.value,
				};
			}
			else if (data.type == UserTypes.ActorSearchType.Range) {
				obj[DBTypes.ActorDataItemName[data.id]] = {
					gte: data.option.lower,
					lte: data.option.upper,
				}
			}
			else {
				obj[DBTypes.ActorDataItemName[data.id]] = data.value;
			}
		});
		console.log(obj);
		return obj;
	}
	// #endregion Private methods

	
}


