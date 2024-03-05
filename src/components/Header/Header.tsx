import React from "react"
import cn from "classnames"
import { Menu } from "primereact/menu"
import { useSelector } from "react-redux"
import { RxHamburgerMenu } from "react-icons/rx"
import { OverlayPanel } from "primereact/overlaypanel"
import { Link, useLocation, useNavigate } from "react-router-dom"

import logo from "../../assets/logo.png"
import styles from "./Header.module.scss"
import Avatar from "../ui/Avatar/Avatar"
import { useAppDispatch } from "../../redux/store"
import { authSelector, logout } from "../../redux/auth/authSlice"

const Header = () => {
  const dispatch = useAppDispatch()

  const mobileMenu = React.useRef<OverlayPanel | null>(null)

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { auth } = useSelector(authSelector)

  if (!auth) return

  const tabs = [
    { label: "Репетитори", link: "/" },
    { label: "Календар", link: "/calendar" },
    { label: "Повідомлення", link: "/messages/" },
    { label: "Уроки", link: "/lessons" },
    { label: "Налаштування", link: "/settings" },
    { label: "Мій профіль", link: `/tutor/me/${auth.id}` },
  ]

  const onLogout = () => {
    if (window.confirm("Ви дійсно хочете вийти з акаунта?")) {
      dispatch(logout())
      navigate("/auth")
    }
  }

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="logo" />
      </Link>

      <nav className={styles.nav}>
        <ul className={styles["nav-list"]}>
          {tabs.map((el) => {
            if (el.label === "Мій профіль" && auth.userRole !== "tutor") {
              return
            }

            return (
              <li className={styles["nav-item"]} key={el.label}>
                <Link
                  className={cn(styles["nav-link"], {
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

        <button
          className={styles.burger}
          onClick={(e) => mobileMenu.current && mobileMenu.current.toggle(e)}
        >
          <RxHamburgerMenu size={24} />
        </button>
        <OverlayPanel ref={mobileMenu} className={styles["mobule-menu-wrapper"]}>
          <ul className={styles["mobile-nav-list"]}>
            {tabs.map((el) => {
              if (el.label === "Мій профіль" && auth.userRole !== "tutor") {
                return
              }

              return (
                <li
                  className={styles["mobile-nav-item"]}
                  onClick={(e) => mobileMenu.current && mobileMenu.current.toggle(e)}
                  key={el.label}
                >
                  <Link
                    className={cn(styles["mobile-nav-link"], {
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
        </OverlayPanel>
      </nav>

      <div className={styles["user"]} onClick={onLogout}>
        <p>{auth.name}</p>
        <Avatar
          size="small"
          shape="circle"
          src={auth.avatarUrl}
          sx={{ height: "40px", width: "40px" }}
        />
      </div>
    </header>
  )
}

export default Header
