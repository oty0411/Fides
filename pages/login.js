import { useEffect, useState } from "react";
import * as UserTypes from "../types/userTypes"
import * as Api from "../utils/api"
import getConfig from "next/config"
import { useRouter } from "next/router";

function LoginApp() {
  const initialValues = { username: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErros, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loginFail, setloginFail] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    // console.log(e.target.name);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    
    // フォーム入力データをAPI引数の形へ成型
    const data = { Name: formValues.username, Password: formValues.password };
    // ログイン
    login(data);
  };

  // ログイン
  const login = (loginInfo) => {

    const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
    const apiContext = {
      apiRootUrl: publicRuntimeConfig.NEXT_PUBLIC_SELF_API_URL,
		}
    //console.log(loginInfo);
		Api.Login(apiContext, loginInfo)
			.then(result => {
        console.log(result);
        if (result.result.Code == UserTypes.AppErrorCode.Success) {
          // 認証PASS
          console.log("========Auth Pass=======");
          if (result.userData.Type === UserTypes.UserType.Actor) {
            router.replace("/user/me");
          } else {
            router.replace("/search");
          }
        } else {
          // 認証NG
          setloginFail(true);
          console.log("========Auth Fail=======");
        }
			})
  }

  useEffect(() => {
    //console.log(formErros);
    //エラーなしでかつ送信されているなら。
    if (Object.keys(formErros).length === 0 && isSubmit) {
      //console.log(formValues);
    } else {
    }
  }, [formErros]);

  //バリデーションチェック
  const validate = (values) => {
    const errors = {};
    //半角英数字のみ(空文字OK)
    const regex =
      /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    //valueが空ならerrrosの配列に入れる。
    if (!values.username) {
      errors.username = "ユーザー名を入力してください。";
    }
    if (!values.password) {
      errors.password = "パスワードを入力してください。";
    } else if (values.password.length < 4) {
      errors.password = "4文字以上15文字以下のパスワードを入力してください";
    } else if (values.password.length > 15) {
      errors.password = "4文字以上15文字以下のパスワードを入力してください";
    }
    return errors;
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <h1>ログイン</h1>
        <hr />
        <div className="uiForm">
          <div className="formField">
            <label>ユーザー名</label>
            <input
              type="text"
              name="username"
              placeholder="ユーザー名"
              value={formValues.username}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <p className="errorMsg">{formErros.mailAddress}</p>

          <div className="formField">
            <label>パスワード</label>
            <input
              type="text"
              name="password"
              placeholder="パスワード"
              value={formValues.password}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <p className="errorMsg">{formErros.password}</p>
          <button className="submitButton">ログイン</button>
          {Object.keys(formErros).length == 0 && isSubmit && loginFail && (
            <div className="msgOk">ログインに失敗しました</div>
          )}
        </div>
      </form>
    </div>
  );
}

export default LoginApp;