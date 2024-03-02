import cn from "classnames"
import { useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"

import styles from "./Header.module.scss"
import { authSelector, logout } from "../../redux/auth/authSlice"
import Avatar from "../ui/Avatar/Avatar"
import { useAppDispatch } from "../../redux/store"

const Header = () => {
  const dispatch = useAppDispatch()

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
