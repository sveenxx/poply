import styles from './index.module.css';
import { type NextPage } from 'next';
import Head from 'next/head';
import { toast, Toaster } from 'poply';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Poply</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Poply</h1>
          <button
            onClick={() =>
              toast.success(Math.random().toString(5).substring(10), {
                duration: 5000,
                position: 'bottom-center',
              })
            }
          >
            Show
          </button>
          <div className={styles.cardRow}></div>
        </div>
      </main>
      <Toaster />
    </>
  );
};

export default Home;
