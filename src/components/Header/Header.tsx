import cn from 'classnames'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import styles from './Header.module.scss'
import { authSelector } from '../../redux/auth/authSlice'

const Header = () => {
  const { pathname } = useLocation()
  const { auth } = useSelector(authSelector)

  if (!auth) return

  const tabs = [
    { label: 'Репетитори', link: '/' },
    { label: 'Календар', link: '/calendar' },
    { label: 'Повідомлення', link: '/messages/' },
    { label: 'Уроки', link: '/lessons' },
    { label: 'Налаштування', link: '/settings' },
    { label: 'Мій профіль', link: `/tutor/me/${auth.id}` },
  ]

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles['nav-list']}>
          {tabs.map((el) => {
            if (el.label === 'Мій профіль' && auth.userRole !== 'tutor') {
              return
            }

            return (
              <li className={styles['nav-item']} key={el.label}>
                <Link
                  className={cn(styles['nav-link'], {
                    [styles.active]: el.link === pathname,
                  })}
                  to={el.link}
                >
                  {el.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}

export default Header
