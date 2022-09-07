import * as Api from '../../../utils/api';
import { DBAccessor, DBAccessCode } from '../../../utils/db/databaseAccessor'

export default async function handler(
  req/*NextApiRequest*/,
  res/*NextApiResponse<{ result: Api.Result, userData: UserTypes.ActorData[] }>*/,
) {
	// console.log("recieve request!");
	DBAccessor.GetActorsList()
		.then(returnCode => {
			//console.log("RetCode:" + returnCode);
			// エラーコードセット
			let result = new Api.Result();
			result.Code = returnCode.result == DBAccessCode.Success ? Api.ErrorCode.Success : Api.ErrorCode.Error;
			result.SubCode = returnCode.result == DBAccessCode.Success ? Api.ErrorSubCode.None : Api.ErrorSubCode.Error;
			res.status(Api.ResponseCode.OK).json({
				result: result,
				userDatas: returnCode.userDatas,
			});
		});
}
