/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */
import React, { useState } from 'react';

import styled from 'styled-components';

import Routes from './components/Routes';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Backdrop from './components/Backdrop';

const Layout = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 50px 1fr;
  grid-template-columns: auto 2fr;
  grid-template-areas:
    'header header'
    'sidebar content';
`;

function App(): JSX.Element {
  const [isSidebarOpen, setSideBarOpen] = useState(false);

  const toggleSidebar = (): void => {
    setSideBarOpen(!isSidebarOpen);
  };

  const onSidebarClicked = () => {
    if (isSidebarOpen) {
      toggleSidebar();
    }
  };

  const backdrop = isSidebarOpen ? <Backdrop onClick={toggleSidebar} /> : null;
  return (
    <Layout>
      <Header
        isSidebarOpen={isSidebarOpen}
        onMenuButtonClicked={toggleSidebar}
      />
      <Sidebar isSidebarOpen={isSidebarOpen} onLinkClicked={onSidebarClicked} />
      {backdrop}
      <Routes />
    </Layout>
  );
}

export default App;
