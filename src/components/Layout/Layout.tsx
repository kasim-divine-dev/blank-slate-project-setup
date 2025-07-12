
import React, { useState } from 'react';
import CustomCursor from '../Cursor/CustomCursor';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <CustomCursor />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main className="font-boska relative overflow-x-hidden bg-black min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
