import { ExposureTwoTone } from '@mui/icons-material';
import * as DBModels from '@prisma/client'

// APIコンテキスト
export class ApiContext{
  // API root URL(string)
	apiRootUrl
}

/** 
 * エラーコード
*/
export const AppErrorCode = {
  Success: 0,
	Error: 1,
}

/** 
 * エラーサブコード
*/
export const AppErrorSubCode = {
  None: 0,
  Error: 1,
  DuplicateUser: 2, // ユーザ重複
  UserLoginFail: 3, // ユーザログイン失敗
  NotFoundUserData: 4, // ユーザーデータなし
}

/**
 * 処理実行結果格納クラス
 */
export class AppResult{
  // エラーコード (AppErrorCode)
  Code;
  // サブコード (AppErrorSubCode)
  SubCode;
  // コンストラクタ
  constructor() {
    this.Code = AppErrorCode.Success;
    this.SubCode = AppErrorSubCode.None;
  }
}

// #region Data from Backside
/**
 * 女優データアイテムID
 */
// export const ActorDataItemId = {
//   Id:                 0,
//   Name:               1,
//   Password:           2,
//   Open:               3,
//   Type:               4,
//   IsAdmin:            5,
//   IsDeleted:          6,
//   ActressName:        100,
//   RealName:           101,
//   Birthday:           102,
//   BloodType:          103,
//   Height:             104,
//   Weight:             105,
//   ClothesSize:        106,
//   ShoesSize:          107,
//   BreastSize:         108,
//   BreastTopSize:      109,
//   BreastUnderSize:    110,
//   WaistSize:          111,
//   HipSize:            112,
//   Honban:             200,
//   Gomunashi:          201,
//   Nakadashi:          202,
//   Ferachio:           203,
//   Iramachio:          204,
// }
export const ActorDataItemId = {
  Id:                 "Id",
  Name:               "Name",
  Password:           "Password",
  Open:               "Open",
  Type:               "Type",
  IsAdmin:            "IsAdmin",
  IsDeleted:          "IsDeleted",
  ActressName:        "ActressName",
  RealName:           "RealName",
  Birthday:           "Birthday",
  BloodType:          "BloodType",
  Height:             "Height",
  Weight:             "Weight",
  ClothesSize:        "ClothesSize",
  ShoesSize:          "ShoesSize",
  BreastSize:         "BreastSize",
  BreastTopSize:      "BreastTop",
  BreastUnderSize:    "BreastUnder",
  WaistSize:          "WaistSize",
  HipSize:            "HipSize",
  Honban:             "Honban",
  Gomunashi:          "Gomunashi",
  Nakadashi:          "Nakadashi",
  Ferachio:           "Ferachio",
  Iramachio:          "Iramachio",
}

/**
 * 女優(データアイテム)サーチタイプ
 */
export const ActorSearchType = {
  FullMatch:          0,  // 完全一致
  Match:              1,  // 部分一致
  Range:              2,  // レンジ
}

/**
 * ユーザータイプ
 */
export const UserType = {
  // 女優
  Actor: 0,
  // メーカー
  Marker: 1,
}
/**
 * 血液型
 */
export const BloodType = {
  A: 0,
  B: 1,
  O: 2,
  AB: 3,
}
/**
 * 洋服サイズ
 */
export const ClothesSizeType = {
  SS: 0,
  S: 1,
  M: 2,
  L: 3,
  L2 :4,
  L3: 5,
  L4: 6,
  L5: 7,
  L6: 8,
  L7: 9,
  L8: 10,
  L9: 11,
  L10: 12,
}
/**
 * バストサイズ
 */
export const BreastSizeType = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7,
  I: 8,
  J: 9,
  K: 10,
  L: 11,
  M: 12,
  N: 13,
}
/**
 * プレイ条件選択肢
 */
export const PlayConditionChoice = {
  NG: 0,
  OK: 1,
  NEGOTIABLE: 2,
}

/** 
 * ユーザデータ
*/
export class UserData {

  constructor() {
    // ID
    this.Id = 0;
    // Name
    this.Name = "";
    // Password
    this.Password = "";
    // 公開フラグ
    this.Open = false;
    // ユーザータイプ
    this.Type = UserType.Actor;
    // 管理者
    this.IsAdmin = false;
    // 削除フラグ
    this.IsDeleted = false;
  }
  
  // DB取得データをセット
  SetData(data){
    if (data == null) { return }
    this.Id = data.id;
    this.Name = data.name;
    this.Password = data.password;
    this.Open = data.open ? true : false;
    this.Type = data.type;
    this.IsAdmin = data.is_admin ? true : false;
    this.IsDeleted = data.is_deleted ? true : false;
  }
}
/**
 * ログインリクエストパラメータ
 */
export class LoginParams {
  constructor() {
   // ユーザー名
   this.Name = "";
   // パスワード
   this.Password = ""; 
  }
}
/**
 * 女優プロフィールデータ
 */
export class ActorProfileData {
  constructor(){
    // 女優名(string型)
    this.ActressName = "";
    // 本名(string型)
    this.RealName = "";
    // 誕生日(Date型)
    this.Birthday = new Date();
    // 血液型(BloodType型)
    this.BloodType = BloodType.A;
    // 身長(cm)(number型)
    this.Height = 0;
    // 体重(kg)(number型)
    this.Weight = 0;
    // 服サイズ
    this.ClothesSize = ClothesSizeType.S;
    // 靴サイズ(cm)(number型)
    this.ShoesSize = 0;
    // バストサイズ(cm)(BreastSizeType型)
    this.BreastSize = BreastSizeType.A;
    // バストトップサイズ(cm)(number型)
    this.BreastTopSize = 0;
    // バストアンダーサイズ(cm)(number型)
    this.BreastUnderSize = 0;
    // ウェストサイズ(cm)(number型)
    this.WaistSize = 0;
    // ヒップサイズ(cm)(number型)
    this.HipSize = 0;
  }
  // ダミーデータ作成
  static CreateDummyData(){
    let instance = new ActorProfileData();
    instance.ActressName = "ジーズ花子";
    instance.RealName = "アカデミー桜";
    instance.Birthday = new Date(2000,1,1);
    instance.BloodType = BloodType.A;
    instance.Height = 155;
    instance.Weight = 43;
    instance.ClothesSize = ClothesSizeType.S;
    instance.ShoesSize = 22;
    instance.BreastSize = BreastSizeType.C;
    instance.BreastTopSize = 80;
    instance.BreastUnderSize = 75;
    instance.WaistSize = 60;
    instance.HipSize = 80;
    return instance;
  }
  // DB取得データをセット
  SetData(data){
    if (data == null) { return }
    this.ActressName = data.actress_name;
    this.RealName = data.real_name;
    this.Birthday = data.birthday;
    this.BloodType = data.blood_type;
    this.Height = data.height;
    this.Weight = data.weight;
    this.ClothesSize = data.clothes_size;
    this.ShoesSize = data.shoes_size;
    this.BreastSize = data.breast_size;
    this.BreastTopSize = data.breast_top;
    this.BreastUnderSize = data.breast_under;
    this.WaistSize = data.waist_size;
    this.HipSize = data.hip_size;
  }
}
/**
 * プレイ条件１
 */
export class PlayCondition1Data {
  constructor() {
    // 本番(PlayConditionChoice型)
    this.Honban = PlayConditionChoice.NG;
    // ゴムなし(PlayConditionChoice型)
    this.Gomunashi = PlayConditionChoice.NG;
    // 中だし(PlayConditionChoice型)
    this.Nakadashi = PlayConditionChoice.NG;
    // フェラチオ(PlayConditionChoice型)
    this.Ferachio = PlayConditionChoice.NG;
    // イラマチオ(PlayConditionChoice型)
    this.Iramachio = PlayConditionChoice.NG;
  }
  // ダミーデータ作成
  static CreateDummyData(){
    let instance = new PlayCondition1Data();
    instance.Honban = PlayConditionChoice.NG;
    instance.Gomunashi = PlayConditionChoice.NG;
    instance.Nakadashi = PlayConditionChoice.NG;
    instance.Ferachio = PlayConditionChoice.NG;
    instance.Iramachio = PlayConditionChoice.NG;
    return instance;
  }
  // DB取得データをセット
  SetData(data){
    if (data == null) { return }
    this.Honban = data.honban;
    this.Gomunashi = data.gomunashi;
    this.Nakadashi = data.nakadashi;
    this.Ferachio = data.ferachio;
    this.Iramachio = data.iramachio;
  }
}

/**
 * 女優ユーザーデータ
 */
export class ActorData {
  constructor() {
    // ユーザーデータ(UserData型)
    this.User = new UserData();
    // プロフィールデータ(ActorProfileData型)
    this.Profile = new ActorProfileData();
    // プレイ条件１(PlayCondition1Data型)
    this.PlayCondition1 = new PlayCondition1Data();
  }

  // コピーコンストラクタ
  static CopyInstance(src) {
    let data = new ActorData();
    data.User.SetData(src.User);
    data.Profile.SetData(src.Profile);
    data.PlayCondition1.SetData(src.PlayCondition1);
    return data;
  }
}
// #endregion Data from Backside