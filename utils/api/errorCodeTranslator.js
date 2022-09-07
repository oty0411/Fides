import { AppResult, AppErrorCode, AppErrorSubCode } from "../../types/userTypes";
import { Result, ErrorCode, ErrorSubCode } from "./data";

/**
 * API実行時のエラーコードをAPP次元のエラーコードへ変換するクラス
 */
export class ErrorCodeTranslator{

	/**
	 * API実行時のエラーコードをAPP次元のコードへ変換
	 * @param code API実行時のエラーコード
	 * @returns APP次元のコード
	 */
	static ToAppResult(code/*Result型*/)/*AppResult型/*/ {
		let result = new AppResult();

		// エラー変換
		if (code.Code != ErrorCode.Success) {
			result.Code = AppErrorCode.Error;
			if (code.SubCode == ErrorSubCode.DuplicateUser) {
				result.SubCode = AppErrorSubCode.DuplicateUser;
			}
			else if (code.SubCode == ErrorSubCode.UserLoginFail) {
				result.SubCode = AppErrorSubCode.UserLoginFail;
			}
			else if (code.SubCode == ErrorSubCode.NotFoundUserData) {
				result.SubCode = AppErrorSubCode.NotFoundUserData;
			}
			else {
				result.SubCode = AppErrorSubCode.Error;
			}
		}
		return result;
	}

}