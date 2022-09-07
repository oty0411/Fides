import { useForm, SubmitHandler } from 'react-hook-form'
import * as UserTypes from '../../types/userTypes';
import * as Api from '../../utils/api'
import Link from 'next/link'

export default function App() {
	const { register, handleSubmit, formState: { errors }, } = useForm/*<UserTypes.LoginParams>*/()
	const onSubmit/*SubmitHandler<UserTypes.LoginParams>*/ = (data) => {
		//console.log(data);
    const apiContext/*ApiContext*/ = {
      apiRootUrl: process.env.SELF_API_URL || 'http://localhost:3000/api',
    }
		Api.Login(apiContext, data)
			.then(result => {
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
				<input {...register('Password', { required: true })} placeholder="名字" />
				{errors.Password && <div>パスワードを入力してください</div>}
				<input type="submit" />
			</form>
		</>
	)
}