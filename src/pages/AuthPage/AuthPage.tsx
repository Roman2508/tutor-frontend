import React from "react"

import styles from "./AuthPage.module.scss"
import LoginForm from "../../components/AuthPage/LoginForm"
import RegisterForm from "../../components/AuthPage/RegisterForm"

const AuthPage = () => {
  const [authType, setAuthType] = React.useState<"login" | "register">("login")

  return (
    <div className={styles.wrapper}>
      {authType === "login" ? (
        <LoginForm setAuthType={setAuthType} />
      ) : (
        <RegisterForm setAuthType={setAuthType} />
      )}
    </div>
  )
}

export default AuthPage
