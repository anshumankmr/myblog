import React from 'react';
// import Link from 'next/link'; // Removed unused import
import { useRouter } from 'next/router';
import Header from './Header';

const Layout = ({ children }) => { // Removed unused 'title' prop
  const router = useRouter();
  const isRootPath = router.pathname === '/';
  
  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <Header />
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with ❤️ in India
      </footer>
    </div>
  );
};

export default Layout;
