import * as UserTypes from '../../../types/userTypes';
import * as Api from './../../../utils/api';
import { DBAccessor, DBAccessCode } from '../../../utils/db/databaseAccessor'

export default async function handler(
  req/*NextApiRequest*/,
  res/*NextApiResponse<{ result: Api.Result, userData: UserTypes.UserData }>*/,
) {
	// console.log("recieve request!");
	//console.log(req.body);
	DBAccessor.AuthUser(req.body)
		.then(returnCode => {
			//console.log("RetCode:" + returnCode);
			let result/*Api.Result*/ = new Api.Result();
			result.Code = returnCode.result == DBAccessCode.Success ? Api.ErrorCode.Success : Api.ErrorCode.Error;
			result.SubCode = returnCode.result == DBAccessCode.Success ? Api.ErrorSubCode.None : Api.ErrorSubCode.Error;
			if (result.Code == Api.ErrorCode.Success && !returnCode.pass) {
				result.Code = Api.ErrorCode.Error;
				result.SubCode = Api.ErrorSubCode.UserLoginFail;
			}
			res.status(Api.ResponseCode.OK).json({
				result: result,
				userData: returnCode.userData,
			});
		});
}
