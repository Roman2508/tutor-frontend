import React from 'react'
import cn from 'classnames'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import { InputText } from 'primereact/inputtext'
import { SubmitHandler, useForm } from 'react-hook-form'

import styles from './AuthPage.module.scss'
import { Link } from 'react-router-dom'
import LoginForm from '../../components/AuthPage/LoginForm'

type AuthFildsType = {}
type RegisterFildsType = {}

const AuthPage = () => {
  const [authType, setAuthType] = React.useState<
    'login/student' | 'login/tutor' | 'register/student' | 'register/tutor'
  >('login/student')

  return (
    <div className={styles.wrapper}>
      {authType.includes('login') ? (
        <LoginForm setAuthType={setAuthType} authType={authType} />
      ) : (
        <Card className={styles.content}>
          <h4 style={{ margin: 0, fontSize: '24px' }}>Реєстрація в Tutor</h4>

          {authType === 'register/student' ? (
            <p>Зареєструйтеся, щоб брати уроки</p>
          ) : (
            <p>Викладайте онлайн. Заробляйте у зручний для вас час.</p>
          )}

          <InputText placeholder="Ім'я" className={styles.input} />

          <br />

          <InputText placeholder="Ел. пошта" className={styles.input} />

          <br />

          <Password placeholder="Пароль" className={styles.input} toggleMask />

          <Button label="Зареєструватись" className={styles['full-size-button']} />

          {/* <div className={styles['divider-wrapper']}>
            <div className={styles.divider} />
            <p style={{ padding: '0 8px' }}>або</p>
            <div className={styles.divider} />
          </div>

          <InputText placeholder="Зарегистрируватись за допомогою Google" className={styles.input} /> */}

          <p>
            Уже є обліковий запис?
            <br />
            <span onClick={() => setAuthType('login/student')} className={styles.link}>
              Увійти як студент
            </span>
            <br />
            <span onClick={() => setAuthType('login/tutor')} className={styles.link}>
              Увійти як репетитор
            </span>
          </p>
        </Card>
      )}
    </div>
  )
}

export default AuthPage
