import * as UserTypes from '../../types/userTypes';
import * as Data from './data'
import { ErrorCodeTranslator } from './errorCodeTranslator';

/**
 * APIリクエストタイプ
 */
export const ApiRequestType = {
  GET: 0,
  POST: 1,
}

// APIリクエストを行うfetch関数のラッパーメソッド
/**
 * @param resource 送信先パス
 * @param init 初期化オプション
 */
export const ApiRequestFetcher = async (
  // RequestInfo型
	resource,
	// ApiRequestType型
	type,
	// any型
  params,
) => {
  // RequestInit型
  let init;
  if (params != null) {
    init = {
      method: (type == ApiRequestType.GET) ? 'GET':'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }
  }
  else {
    init = {
      method: (type == ApiRequestType.GET) ? 'GET':'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  }
  console.log("address start");
  console.log(resource);
  console.log("address end");
  const res = await fetch(resource, init)

  if (!res.ok) {
    const errorRes = await res.json()
    const error = new Error(
      errorRes.message ?? 'APIリクエスト中にエラーが発生しました',
    )

    throw error
  }

  return res.json()
}

/**
 * ユーザ登録API（新規追加）
 * @param context APIコンテキスト
 * @param params 登録するユーザ情報
 * @returns 新規追加した商品
 */
export const RegistrationUser = async (
  // ApiContext型
	context,
	// UserTypes.UserData型
  params,
) => {
  const address = `${context.apiRootUrl.replace(/\/$/g, '')}/users/registration`;
  console.log("API Start:[/users/registration]");
  const apiResult = await ApiRequestFetcher(address, ApiRequestType.POST, params);
  console.log("API End:[/users/registration]");
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.result),
    userData: apiResult.userData,
  };
}

/**
 * ログイン
 * @param context 
 * @param params 
 * @returns 
 */
export const Login = async (
  // ApiContext型
	context,
	// UserTypes.LoginParams型
  params,
) => {
  const address = `${context.apiRootUrl.replace(/\/$/g, '')}/auth/login`;
  console.log("API Start:[/auth/login]");
  const apiResult = await ApiRequestFetcher(address, ApiRequestType.POST, params);
  console.log("API End:[/auth/login]");
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.result),
    userData: apiResult.userData
  };
}

/**
 * 女優プロフィール取得
 * @param context 
 * @param params 
 * @returns 
 */
export const GetActorProfile = async (
  // ApiContext型
	context,
  // number型
	params,
) => {
  const address = `${context.apiRootUrl.replace(/\/$/g, '')}/users/getActorProfile`;
  console.log("API Start:[/users/getActorProfile]");
  const apiResult = await ApiRequestFetcher(address, ApiRequestType.POST, params);
  console.log("API End:[/users/getActorProfile]");
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.result),
    userData: apiResult.userData,
  };
}

/**
 * 女優プロフィール更新
 * @param context 
 * @param params 
 * @returns 
 */
export const UpdateActorProfile = async (
  // ApiContext型
	context,
  // { number, ActorData }型
	params,
) => {
  const address = `${context.apiRootUrl.replace(/\/$/g, '')}/users/updateActorProfile`;
  console.log("API Start:[/users/updateActorProfile]");
  const apiResult = await ApiRequestFetcher(address, ApiRequestType.POST, params);
  console.log("API End:[/users/updateActorProfile]");
  return ErrorCodeTranslator.ToAppResult(apiResult.result);
}

/**
 * 女優リスト取得
 * @param context 
 * @param params 
 * @returns 
 */
export const GetActorsList = async (
  // ApiContext型
	context,
) => {
  const address = `${context.apiRootUrl.replace(/\/$/g, '')}/users/getActorsList`;
  console.log("API Start:[/users/getActorsList]");
  const apiResult = await ApiRequestFetcher(address, ApiRequestType.POST, null);
  console.log("API End:[/users/getActorsList]");
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.result),
    userDatas: apiResult.userDatas,
  };
}

/**
 * 女優検索
 * @param context 
 * @param params 
 * @returns 
 */
export const SearchActors = async (
  // ApiContext型
	context,
  // Object型
	params,
) => {
  const address = `${context.apiRootUrl.replace(/\/$/g, '')}/users/searchActors`;
  console.log("API Start:[/users/searchActors]");
  const apiResult = await ApiRequestFetcher(address, ApiRequestType.POST, params);
  console.log("API End:[/users/searchActors]");
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.result),
    userDatas: apiResult.userDatas,
  };
}


