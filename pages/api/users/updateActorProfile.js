import * as UserTypes from '../../../types/userTypes';
import * as Api from './../../../utils/api';
import { DBAccessor, DBAccessCode } from '../../../utils/db/databaseAccessor'

export default async function handler(
	req/*NextApiRequest*/,
	res/*NextApiResponse<{ result: Api.Result }>*/,
) {
	// console.log("recieve request!");
	// console.log(req.body);
	DBAccessor.UpdateActorProfile(req.body)
		.then(returnCode => {
			//console.log("RetCode:" + returnCode);
			let result/*Api.Result*/ = new Api.Result();
			result.Code = returnCode == DBAccessCode.Success ? Api.ErrorCode.Success : Api.ErrorCode.Error;
			result.SubCode = returnCode == DBAccessCode.Success ? Api.ErrorSubCode.None : Api.ErrorSubCode.DuplicateUser;
			res.status(Api.ResponseCode.OK).json({
				result: result
			});
		});
}
