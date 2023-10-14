import { useState } from 'react';
import styles from '@/styles/Home.module.css';

const Header = ({ data, toggleMenu, isMenuOpen, arrowIcon }) => {
  return (
    <div>
        <header className={styles.sidebar}>
            <h1 className='title pt-5 pl-5 pb-5  no-drag' onClick={toggleMenu}>
                {data ? data.hostname : 'Loading...'} {arrowIcon}
            </h1>
            {isMenuOpen && (
                <div className={styles.menu}>
                <p>Shell</p>
                </div>
            )}
        </header>
    </div>
  );
};

export default Header;
