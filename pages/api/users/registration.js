import * as UserTypes from '../../../types/userTypes';
import * as Api from './../../../utils/api';
import { DBAccessor, DBAccessCode } from '../../../utils/db/databaseAccessor'

export default async function handler(
	req/*NextApiRequest*/,
	res/*NextApiResponse<{ result: Api.Result, userData: UserTypes.UserData }>*/,
) {
	// console.log("recieve request!");
	// console.log(req.body);
	DBAccessor.CreateUser(req.body)
		.then(returnCode => {
			//console.log("RetCode:" + returnCode);
			let result/*Api.Result*/ = new Api.Result();
			result.Code = returnCode == DBAccessCode.Success ? Api.ErrorCode.Success : Api.ErrorCode.Error;
			result.SubCode = returnCode == DBAccessCode.Success ? Api.ErrorSubCode.None : Api.ErrorSubCode.DuplicateUser;
			// レスポンスにセットするユーザーデータは入力データをそのまま折り返す。
			// DBテーブル上のIDなどを上位へ返す必要がある場合はデータ挿入後にDBから読んで別途セットすること。
			res.status(Api.ResponseCode.OK).json({
				result: result,
				userData: req.body,
			});
		});
}
