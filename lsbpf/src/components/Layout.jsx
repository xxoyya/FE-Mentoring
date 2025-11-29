import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const Layout = () => {
  return (
    <>
      <Sidebar />
      <main className="content">
        <Outlet />
      </main>
    </>
  );
}

export default Layout