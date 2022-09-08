import Link from "next/link";
import CheckBoxList from "../src/CheckBoxList";

  
export default function Home({ }) {
  return (
    <>
      <CheckBoxList/>
      <Link href='user/me' >Me</Link> 
      </>
  );
}
