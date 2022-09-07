import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import ResponsiveAppBar from '../../src/ResponsiveAppBar';
import { Grid } from '@mui/material';
import BiethdayPickers from '../../src/Birthpicker';
import { useForm } from 'react-hook-form';


export default function Me() {
  const handleUploadClick = async (e) => {
    console.log(e.target.files[0])
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
  }

  const { register, handleSubmit } = useForm();
  const submit = (data) => {
    console.log(data);
  };
    
  
  return (
    <>
      <ResponsiveAppBar />
        <div
          style={{
            padding: 30
          }}
          align="center"
          display="flex">
          <label htmlFor="upload-button" style={{ border: "1px solid #222", borderRadius: 10, padding: 10, cursor: "pointer" }}>
            <input
              accept="image/*"
              id="upload-button"
              type="file"
              onChange={handleUploadClick}
              hidden
            />
            ファイル選択
        </label>
        </div>

        <div>
      <h1>プロフィール</h1>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <label htmlFor="actressName">女優名</label>
          <input
            autoComplete="off"
            {...register("actressName")}
            type="text"
            name="actressName"
            id="actressName"
          />
        </div>

        <div>
          <label htmlFor="realName">本名</label>
          <input
            autoComplete="off"
            {...register("realName")}
            type="text"
            name="realName"
            id="realName"
          />
        </div>

        <div>
          <label htmlFor="height">身長</label>
          <input
            autoComplete="off"
            {...register("height")}
            type="text"
            name="height"
            id="height"
          />
        </div>

        <div>
          <label htmlFor="weight">体重</label>
          <input
            autoComplete="off"
            {...register("weight")}
            type="text"
            name="weight"
            id="weight"
          />
        </div>

        <div>
          <label htmlFor="clothesSize">服のサイズ</label>
          <input
            autoComplete="off"
            {...register("clothesSize")}
            type="text"
            name="clothesSize"
            id="clothesSize"
          />
        </div>

        <div>
          <label htmlFor="shoesSize">靴のサイズ</label>
          <input
            autoComplete="off"
            {...register("shoesSize")}
            type="text"
            name="shoesSize"
            id="shoesSize"
          />
        </div>

        <div>
          <label htmlFor="bustSize">バストサイズ</label>
          <input
            autoComplete="off"
            {...register("bustSize")}
            type="text"
            name="bustSize"
            id="bustSize"
          />
        </div>

        <div>
          <label htmlFor="bustTopSize">バストトップ</label>
          <input
            autoComplete="off"
            {...register("bustTopSize")}
            type="text"
            name="bustTopSize"
            id="bustTopSize"
          />
        </div>

        <div>
          <label htmlFor="bustUnderSize">バストアンダー</label>
          <input
            autoComplete="off"
            {...register("bustUnderSize")}
            type="text"
            name="bustUnderSize"
            id="bustUnderSize"
          />
        </div>

        <div>
          <label htmlFor="westSize">ウエスト</label>
          <input
            autoComplete="off"
            {...register("westSize")}
            type="text"
            name="westSize"
            id="westSize"
          />
        </div>

        <div>
          <label htmlFor="hipSize">ヒップサイズ</label>
          <input
            autoComplete="off"
            {...register("hipSize")}
            type="text"
            name="hipSize"
            id="hipSize"
          />
        </div>

        <div>
          <label htmlFor="blood">血液型</label>
          <input
            autoComplete="off"
            {...register("blood")}
            type="text"
            name="blood"
            id="blood"
          />
        </div>
        <button>プロフィール作成</button>
      </form>
    </div>
    </>
    )
  }
