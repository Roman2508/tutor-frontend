import React from 'react'
import { TabMenu } from 'primereact/tabmenu'
import styles from './Header.module.scss'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { authSelector } from '../../redux/auth/authSlice'

const Header = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { auth } = useSelector(authSelector)

  const [activeIndex, setActiveIndex] = React.useState(0)
  const [tabs, setTabs] = React.useState([
    { label: 'Репетитори', link: '/' },
    { label: 'Календар', link: '/calendar' },
    { label: 'Повідомлення', link: '/messages/' },
    { label: 'Уроки', link: '/lessons' },
    { label: 'Налаштування', link: '/settings' },
  ])

  React.useEffect(() => {
    tabs.forEach((el, index) => {
      if (el.link === pathname) {
        setActiveIndex(index)
      }
    })
  }, [auth])

  React.useEffect(() => {
    if (auth && auth.userRole === 'tutor') {
      const tutorPageTab = { label: 'Мій профіль', link: `/tutor/me/${auth.id}` }
      setTabs((prev) => [...prev, tutorPageTab])
    }
  }, [auth])

  return (
    <div className={styles.header}>
      <TabMenu
        model={tabs}
        activeIndex={activeIndex}
        onTabChange={(e) => {
          setActiveIndex(e.index)
          // @ts-ignore
          navigate(e.value.link)
        }}
      />
    </div>
  )
}

export default Header
