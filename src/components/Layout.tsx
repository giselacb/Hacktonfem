import { Outlet } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <main className="main-content">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Layout;

