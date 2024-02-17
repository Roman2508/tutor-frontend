import React from "react"
import { TabMenu } from "primereact/tabmenu"
import styles from "./Header.module.scss"
import { useLocation, useNavigate } from "react-router-dom"

const Header = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [activeIndex, setActiveIndex] = React.useState(0)

  const items = [
    { label: "Репетитори", link: "/" },
    { label: "Календар", link: "/calendar" },
    { label: "Повідомлення", link: "/messages/" },
    { label: "Уроки", link: "/lessons" },
    { label: "Налаштування", link: "/settings" },
  ]

  React.useEffect(() => {
    items.forEach((el, index) => {
      if (el.link === pathname) {
        setActiveIndex(index)
      }
    })
  }, [])

  return (
    <div className={styles.header}>
      <TabMenu
        model={items}
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
