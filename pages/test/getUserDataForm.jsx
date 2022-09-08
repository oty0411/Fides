import { useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form'
import * as UserTypes from '../../types/userTypes';
import * as Api from '../../utils/api'
import Link from 'next/link'
import getConfig from "next/config"

export default function App() {
	const { register, handleSubmit, formState: { errors }, } = useForm/*<{id: number}>*/();
	
	const onSubmit/*SubmitHandler<{id: number}>*/ = (data) => {
		//console.log(data);
    const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
    const apiContext = {
      apiRootUrl: publicRuntimeConfig.NEXT_PUBLIC_SELF_API_URL,
		}
		Api.GetActorProfile(apiContext, data.id)
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
				<input {...register('id', { required: true })} placeholder="ID" />
				{errors.id && <div>IDを入力してください</div>}
				<input type="submit" />
			</form>
		</>
	)
}