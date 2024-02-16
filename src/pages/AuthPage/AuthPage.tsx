import React from "react"
import cn from "classnames"
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { Password } from "primereact/password"
import { InputText } from "primereact/inputtext"

import styles from "./AuthPage.module.scss"
import { Link } from "react-router-dom"

const AuthPage = () => {
  const [authType, setAuthType] = React.useState<"login" | "register/student" | "register/tutor">(
    "login"
  )

  return (
    <div className={styles.wrapper}>
      {authType === "login" ? (
        <Card className={cn(styles.content)}>
          <h4 style={{ margin: 0, fontSize: "24px" }}>Вхід в Tutor</h4>

          <p>Увійдіть, щоб смотреть фото и видео ваших друзей.</p>

          <InputText placeholder="Ел. пошта" className={styles.input} />

          <br />

          <Password placeholder="Пароль" className={styles.input} toggleMask />

          <Button label="Увійти" className={styles["full-size-button"]} />

          <div className={styles["divider-wrapper"]}>
            <div className={styles.divider} />
            <p style={{ padding: "0 8px" }}>або</p>
            <div className={styles.divider} />
          </div>

          <InputText placeholder="Увійти за допомогою Google" style={{ width: "100%" }} />

          <p>
            Немає облікового запису?{" "}
            <span onClick={() => setAuthType("register/student")} className={styles.link}>
              Зареєструйтесь як учень
            </span>
            <br />
            <span onClick={() => setAuthType("register/tutor")} className={styles.link}>
              Зареєструйтесь як репетитор
            </span>
          </p>
        </Card>
      ) : (
        <Card className={styles.content}>
          <h4 style={{ margin: 0, fontSize: "24px" }}>Реєстрація в Tutor</h4>

          {authType === "register/student" ? (
            <p>Зареєструйтеся, щоб брати уроки</p>
          ) : (
            <p>Викладайте онлайн. Заробляйте у зручний для вас час.</p>
          )}

          <InputText placeholder="Ім'я" className={styles.input} />

          <br />

          <InputText placeholder="Ел. пошта" className={styles.input} />

          <br />

          <Password placeholder="Пароль" className={styles.input} toggleMask />

          <Button label="Зареєструватись" className={styles["full-size-button"]} />

          <div className={styles["divider-wrapper"]}>
            <div className={styles.divider} />
            <p style={{ padding: "0 8px" }}>або</p>
            <div className={styles.divider} />
          </div>

          <InputText
            placeholder="Зарегистрируватись за допомогою Google"
            className={styles.input}
          />

          <p>
            Уже є обліковий запис?{" "}
            <span onClick={() => setAuthType("login")} className={styles.link}>
              Увійти
            </span>
          </p>
        </Card>
      )}
    </div>
  )
}

export default AuthPage
