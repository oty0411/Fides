import React from 'react';
import { useForm } from 'react-hook-form';
import Button from './Button';


 User = {
    name: string,
    realname: string,
    profile: string,
}

const CreateAccount = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();
    
    const submit = (data) => {
        console.log(data);
    }
    return (
        <div className='container'>
            <h1>アカウント作成</h1>

            <form onSubmit={handleSubmit(submit)} >
            <div>
                    <label className='block mb-0.5' htmlFor="name">
                        名前
                    </label>
                <input
                    {...register('name', {
                required: '必須入力です',
                })}
                    id="name"
                    name="name"
                    type="text"
                    />
                    {errors.name && <p>errors.name?.message</p>}
            </div>

            <div>
                <label htmlFor="realame">本名</label>
                <input {...register('realname',{
                required: '必須入力です',
                })}
                    id="realname"
                    name="realname"
                type="text" 
                    />
            </div>
            <div>
                <label htmlFor="profile">プロフィール</label>
                <textarea {...register('profile', {
                required: '必須入力です',
                   maxLength: {
                        value: 255,
                        message:'最大255文字です'
                }
            })}
                        id="profile"
                        name="plofile"
                    />
                </div>
         <Button>送信</Button>
                </form>
        </div>

    );
};

export default CreateAccount