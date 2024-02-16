import Header from '../Header/Header'
import { Outlet, useLocation } from 'react-router-dom'

const Layout = () => {
  const { pathname } = useLocation()

  return (
    <div className="app-wrapper">
      {pathname !== '/auth' && <Header />}

      <main className="main">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
