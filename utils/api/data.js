// #region API Response
/**
 * レスポンスコード
 * @enum {number}
 */
export const ResponseCode = {
	OK: 200,
	NG: 401,
}
// #endregion API Response

// #region API Error code
/** 
 * API エラーコード
*/
export const ErrorCode = {
  Success: 0,
	Error: 1,
}

/** 
 * API エラーサブコード
*/
export const ErrorSubCode = {
  None: 0,
  Error: 1,
  DuplicateUser: 2, // ユーザ重複
  UserLoginFail: 3, // ユーザログイン失敗
  NotFoundUserData: 4, // ユーザーデータなし
}

/**
 * API実行結果格納クラス
 */
export class Result{
  // エラーコード(ErrorCode型)
	Code;
  // サブコード(ErrorSubCode型)
  SubCode;
  // コンストラクタ
  constructor() {
    this.Code = ErrorCode.Success;
    this.SubCode = ErrorSubCode.None;
  }
}
// #endregion API Error code

// #region API Request Param
// #endregion API Request Param