import Head from 'next/head';
import { Chart } from '@/component/chart';
import { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css';
import Header from '@/component/header'; // Header 컴포넌트를 가져옵니다

export default function Home() {
  const [data, setData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [arrowIcon, setArrowIcon] = useState('🔽');

  useEffect(() => {
    fetch('http://localhost:8000/info/info')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('데이터 가져오기 오류:', error));
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setArrowIcon(arrowIcon === '🔽' ? '🔼' : '🔽');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Shell</title>
      </Head>
      <Header data={data} toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} arrowIcon={arrowIcon} />
      <main className={styles.main}>
        <div className={styles.charts}>
          {data ? (
            <>
              <Chart dataKey="cpu" />
              <Chart dataKey="mem" />
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </main>
    </div>
  );
}
