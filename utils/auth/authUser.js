import getConfig from "next/config"
import * as UserTypes from "../../types/userTypes"
import * as Api from "../api"

/**
 * 認証状態
 */
class AuthUserState {

	constructor() {
		// 認証済みステート
	  this.Authenticated = false;

	  // 認証済みユーザ情報
	  this.User = new UserTypes.UserData();
	}
}

/**
 * 認証処理
 */
export class AuthUser {

	// 初期化状態
	static _intialized = false;

	// APIコンテクスト
	static _apiContext = {};

	// 認証状態
	static _state = new AuthUserState();

	/**
	 *  初期化処理
	 */
	static _intialize = () => {
		const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
    AuthUser._apiContext = {
      apiRootUrl: publicRuntimeConfig.NEXT_PUBLIC_SELF_API_URL,
		}
		AuthUser._intialized = true;
	}

	// 認証実行
	static Login = async (username, password) => {
		// 初期化処理
		if (!AuthUser._intialized) {
			AuthUser._intialize();
		}

		// 強制ログアウト実施
		AuthUser.Logout();
		
		// 認証情報オブジェクト作成
		const loginInfo = { Name: username, Password: password };
		console.log(AuthUser._apiContext);
    console.log(loginInfo);
		await Api.Login(AuthUser._apiContext, loginInfo)
			.then(result => {
        //console.log(result);
        if (result.result.Code == UserTypes.AppErrorCode.Success) {
          // 認証PASS
					console.log("========Auth Pass=======");
					// スタティックフィールドにユーザー情報コピー
					AuthUser._state.Authenticated = true;
					AuthUser._state.User = result.userData;
        } else {
          // 認証NG
					console.log("========Auth Fail=======");
					AuthUser._state.Authenticated = false;
					AuthUser._state.User = null;
        }
			})
		return {
			authenticated: AuthUser.GetAuthenticated(),
			user: AuthUser.GetAuthenticatedUser(),
		};
	}

	// 認証実行
	static Logout = () => {
		AuthUser._state.Authenticated = false;
	}

	/**
	 * 認証済み状態取得
	 */
	static GetAuthenticated = () => {
		return AuthUser._state.Authenticated;
	}

	/**
	 * 認証済みユーザ取得
	 * @returns 
	 */
	static GetAuthenticatedUser = () => {
		if (AuthUser._state.Authenticated) {
			return AuthUser._state.User;
		} else {
			return null;
		}
	}
}