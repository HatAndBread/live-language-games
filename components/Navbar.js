import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import { useUser } from '../lib/hooks';

function Navbar() {
  const user = useUser();
  const linksRef = useRef(null);
  const burgerRef = useRef(null);
  const [navOut, setNavOut] = useState(false);

  useEffect(() => {
    const handleClickAnywhere = (e) => {
      if (burgerRef.current && !burgerRef.current.contains(e.target)) {
        linksRef.current.style.right = '-100vw';
        setNavOut(false);
      }
    };

    document.addEventListener('click', handleClickAnywhere);
    return () => {
      document.removeEventListener('click', handleClickAnywhere);
    };
  }, []);

  const hamburgerClick = (e) => {
    if (navOut) {
      linksRef.current.style.right = '-100vw';
      setNavOut(false);
    } else {
      linksRef.current.style.right = '0vw';
      setNavOut(true);
    }
  };
  return (
    <div>
      <nav className={styles.Nav}>
        <ul className={styles.Links} ref={linksRef}>
          <li>
            <Link href="/">🏠Home</Link>
          </li>
          <li>
            <Link href="/about">❓About</Link>
          </li>
          <li>{user ? <Link href="/api/logout">👋Logout</Link> : <Link href="/login">🔑Login</Link>}</li>
          {!user && (
            <li>
              <Link href="/login">✏️Signup</Link>
            </li>
          )}
        </ul>
        <div className={styles.VeganBurger} ref={burgerRef} onClick={hamburgerClick}>
          <div className={styles.slice}></div>
          <div className={styles.slice_two}></div>
          <div className={styles.slice_three}></div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
