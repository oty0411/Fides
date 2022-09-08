import { useForm, SubmitHandler } from 'react-hook-form'
import * as UserTypes from '../../types/userTypes';
import * as Api from '../../utils/api'
import Link from 'next/link'
import getConfig from "next/config"

export default function RegistrarionForm(){
	const { register, handleSubmit, formState: { errors }, } = useForm();
	const onSubmit = (data) => {
		//console.log(data)
		const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
    const apiContext = {
      apiRootUrl: publicRuntimeConfig.NEXT_PUBLIC_SELF_API_URL,
		}
		Api.RegistrationUser(apiContext, data)
			.then(result => {
				console.log("API processing done.");
				console.log(result);
			})
	}
	return (
		<>
			<Link href="/">
        <a>戻る</a>
      </Link>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input {...register('Name', { required: true })} placeholder="名前" />
				{errors.Name && <div>名前を入力してください</div>}
				<input {...register('Password', { required: true })} placeholder="パスワード" />
				{errors.Password && <div>パスワードを入力してください</div>}
				<select {...register('Type', { required: true })}>
					<option value="">選択...</option>
					<option value="0">女優</option>
					<option value="1">メーカー</option>
				</select>
				{errors.Type && <div>ユーザタイプを選択してください</div>}
				<select {...register('IsAdmin', { required: true })}>
					<option value="">選択...</option>
					<option value="0">なし</option>
					<option value="1">あり</option>
				</select>
				{errors.IsAdmin && <div>管理者権限を選択してください</div>}
				<select {...register('IsDeleted', { required: true })}>
					<option value="">選択...</option>
					<option value="0">なし</option>
					<option value="1">削除</option>
				</select>
				{errors.IsDeleted && <div>ユーザ削除状態を選択してください</div>}
				<input type="submit" />
			</form>
		</>
	)
}