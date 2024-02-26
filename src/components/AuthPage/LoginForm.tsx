import React from 'react'
import cn from 'classnames'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import { InputText } from 'primereact/inputtext'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import styles from '../../pages/AuthPage/AuthPage.module.scss'
import { Message } from 'primereact/message'
import { useAppDispatch } from '../../redux/store'
import { authLogin } from '../../redux/auth/authAsyncActions'
import { Dropdown } from 'primereact/dropdown'
import { emailPattern } from './emailPattern'
import { authSelector } from '../../redux/auth/authSlice'
import { useSelector } from 'react-redux'
import { LoadingStatusTypes } from '../../redux/appTypes'

interface IAuthFilds {
  email: string
  password: string
  userRole: 'tutor' | 'student'
}

interface ILoginFormProps {
  authType: 'login/student' | 'login/tutor' | 'register/student' | 'register/tutor'
  setAuthType: React.Dispatch<
    React.SetStateAction<'login/student' | 'login/tutor' | 'register/student' | 'register/tutor'>
  >
}

const LoginForm: React.FC<ILoginFormProps> = ({ authType, setAuthType }) => {
  const dispatch = useAppDispatch()

  const { loadingStatus } = useSelector(authSelector)

  const {
    watch,
    control,
    register,
    resetField,
    clearErrors,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<IAuthFilds>({
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<IAuthFilds> = async (data) => {
    await dispatch(authLogin(data))
  }

  return (
    <Card className={cn(styles.content)}>
      <h4 style={{ margin: 0, fontSize: '24px' }}>Увійдіть в Tutor</h4>

      <p>Увійдіть, щоб брати уроки або викладати онлайн</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Вкажіть свою ел. пошту',
            pattern: { value: emailPattern, message: 'Невірний формат пошти' },
          }}
          render={({ field, fieldState }) => {
            return (
              <div>
                <InputText
                  // {...(register('email'), { required: true })}
                  autoFocus
                  {...field}
                  placeholder="Ел. пошта"
                  className={cn(styles.input, {
                    'p-invalid': errors.email,
                  })}
                />
                {errors.email && (
                  <Message
                    severity="error"
                    style={{ width: '100%', marginBottom: '20px' }}
                    text={errors.email?.message}
                  />
                )}
              </div>
            )
          }}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: 'Вкажіть свій пароль',
            minLength: { message: 'Довжина паролю має бути більше 6 символів', value: 6 },
          }}
          render={({ field, fieldState }) => {
            return (
              <div>
                <InputText
                  {...field}
                  placeholder="Пароль"
                  className={cn(styles.input, {
                    'p-invalid': errors.email,
                  })}
                />
                {errors.password && (
                  <Message
                    severity="error"
                    style={{ width: '100%', marginBottom: '20px' }}
                    text={errors.password?.message}
                  />
                )}
              </div>
            )
          }}
        />

        <Controller
          name="userRole"
          control={control}
          rules={{ required: 'Вкажіть свою роль' }}
          render={({ field, fieldState }) => {
            return (
              <div>
                <Dropdown
                  {...field}
                  optionLabel="name"
                  placeholder="Ваша роль"
                  style={{ width: '100%', textAlign: 'left', marginBottom: '20px' }}
                  className={cn({
                    'p-invalid': errors.email,
                  })}
                  options={[
                    { name: 'Студент', value: 'student' },
                    { name: 'Репетитор', value: 'tutor' },
                  ]}
                />

                {errors.userRole && (
                  <Message
                    severity="error"
                    style={{ width: '100%', marginBottom: '20px' }}
                    text={errors.userRole?.message}
                  />
                )}
              </div>
            )
          }}
        />

        <Button
          label="Увійти"
          type="submit"
          className={styles['full-size-button']}
          disabled={loadingStatus === LoadingStatusTypes.LOADING}
        />
      </form>

      {/* <div className={styles["divider-wrapper"]}>
              <div className={styles.divider} />
              <p style={{ padding: "0 8px" }}>або</p>
              <div className={styles.divider} />
            </div>
  
            <InputText placeholder="Увійти за допомогою Google" style={{ width: "100%" }} /> */}

      <p>
        Немає облікового запису?{' '}
        <span onClick={() => setAuthType('register/student')} className={styles.link}>
          Зареєструйтесь як учень
        </span>
        <br />
        <span onClick={() => setAuthType('register/tutor')} className={styles.link}>
          Зареєструйтесь як репетитор
        </span>
      </p>
    </Card>
  )
}

export default LoginForm
