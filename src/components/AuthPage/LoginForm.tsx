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
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

interface IAuthFilds {
  email: string
  password: string
  userRole: 'tutor' | 'student'
}

interface ILoginFormProps {
  setAuthType: React.Dispatch<React.SetStateAction<'login' | 'register'>>
}

const LoginForm: React.FC<ILoginFormProps> = ({ setAuthType }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { loadingStatus } = useSelector(authSelector)

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IAuthFilds>({
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<IAuthFilds> = async (data) => {
    try {
      const { payload } = await dispatch(authLogin(data))

      // @ts-ignore
      if (payload.user) {
        navigate('/')
      }
    } catch (error) {
      console.error(error)
    }
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

      <p>
        Немає облікового запису?
        <span onClick={() => setAuthType('register')} className={styles.link}>
          Зареєструйтесь
        </span>
      </p>
    </Card>
  )
}

export default LoginForm
