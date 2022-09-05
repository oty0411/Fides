// import React from 'react';
// import Button from '../components/Button';
// import { useForm } from 'react-hook-form';


// type User = {
//     name: string;
//     realname: string;
//     profile: string;
// }

// const CreateAccount = () => {
//     const { register, handleSubmit } = useForm<User>();
    
//     const submit = (data:User) => {
//         console.log(data);
//     }
//     return (
//         <div>
//             <h1>アカウント作成</h1>
//             <form onSubmit={handleSubmit(submit)}>
//             <div>
//                 <label htmlFor="name">名前</label>
//                 <input
//                     {...register('name', {
//                 　required: '必須入力です',
//                 })}
//                     id="name"
//                     name="name"
//                     type="text"
//                 />
//             </div>

//             <div>
//                 <label htmlFor="realame">本名</label>
//                 <input {...register('realname',{
//                 required: '必須入力です',
//                 })}
//                     id="realname"
//                     name="realname"
//                 type="text" 
//                     />
//             </div>
//             <div>
//                 <label htmlFor="profile">プロフィール</label>
//                 <textarea {...register('profile', {
//                     required: '必須入力です'
//                     MaxLength: {
//                         value: 255,
//                         message:'最大２５５文字です'
//                 }
//             })}
//                         id="profile"
//                         name="plofile"
//                     />
//                 </div>
//          <Button></Button>
//                 </form>
//         </div>

//     );
// };

// export default CreateAccount