import { Link } from "@mui/material";
import Head from "next/head";
import styles from "./layout.module.css";

const name = "NAKAKU";
export const siteTitle = "AVdatabase";

function Layout({ children, home }) {
    return (
        <div className={styles.container}>
            <Head>
                <title></title>
                <link href="/favicon.ico" />
            </Head>
            <header className={styles.header}></header>
            <main>{children}</main>
        </div>
    );
}
export default Layout;