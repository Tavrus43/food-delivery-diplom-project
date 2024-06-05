import React, { useState } from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import MainContent from '../MainContent';

const Layout = () => {
  const [mainContent, setMainContent] = useState('');

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="w-4/5 p-4">
          <MainContent mainContent={mainContent} />
        </div>
        <Sidebar setMainContent={setMainContent} />
      </div>
    </div>
  );
};

export default Layout;
