import React from 'react'
import cn from 'classnames'
import { Card } from 'primereact/card'
import { useSelector } from 'react-redux'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'
import { Password } from 'primereact/password'
import { InputText } from 'primereact/inputtext'
import { FileUpload } from 'primereact/fileupload'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import styles from './SettingsPage.module.scss'
import Avatar from '../../components/ui/Avatar/Avatar'
import { InputTextarea } from 'primereact/inputtextarea'
import { authSelector } from '../../redux/auth/authSlice'
import { emailPattern } from '../../components/AuthPage/emailPattern'
import { useAppDispatch } from '../../redux/store'
import { updateStudent, updateTutor } from '../../redux/auth/authAsyncActions'

interface IFormFilds {
  name: string
  email: string
  password: string
  description?: string
}

const SettingsPage = () => {
  const toast = React.useRef(null)

  const dispatch = useAppDispatch()

  const { auth } = useSelector(authSelector)

  const onUpload = () => {
    // @ts-ignore
    toast?.current?.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' })
  }

  const {
    control,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormFilds>({
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<IFormFilds> = async (data) => {
    if (!auth) return

    if (auth.userRole === 'tutor') {
      dispatch(updateTutor({ ...data, id: auth.id }))
    }

    if (auth.userRole === 'student') {
      dispatch(updateStudent({ ...data, id: auth.id }))
    }
  }

  React.useEffect(() => {
    if (!auth) return

    setValue('name', auth.name)
    setValue('email', auth.email)
    setValue('description', auth.description)
  }, [auth])

  if (!auth) return

  return (
    <div className={styles.container}>
      <Card>
        <h3 className={styles['main-title']}>Налаштування профілю</h3>

        <div className={styles['photo']}>
          <div className={styles['photo-col']}>
            <p>Фото профілю</p>
            <Avatar size="large" src={auth.avatarUrl} />
          </div>

          <div className={styles['photo-col']}>
            <span>Макс. розмір – 2 МБ</span>
            <span>Формат JPG або PNG</span>

            <FileUpload
              mode="basic"
              name="demo[]"
              url="/api/upload"
              accept="image/*"
              style={{ marginTop: '10px' }}
              chooseLabel="Завантажити інше фото"
              maxFileSize={2000000}
              onUpload={onUpload}
            />
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Вкажіть своє ім'я",
            }}
            render={({ field }) => {
              return (
                <div>
                  <InputText
                    autoFocus
                    {...field}
                    placeholder="Ім'я"
                    className={cn(styles.input, {
                      'p-invalid': errors.name,
                    })}
                  />
                  {errors.name && (
                    <Message
                      severity="error"
                      style={{ width: '100%', marginBottom: '20px' }}
                      text={errors.name?.message}
                    />
                  )}
                </div>
              )
            }}
          />

          <br />

          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Вкажіть свою ел. пошту',
              pattern: { value: emailPattern, message: 'Невірний формат пошти' },
            }}
            render={({ field }) => {
              return (
                <div>
                  <InputText
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

          <br />

          <Controller
            name="password"
            control={control}
            rules={{
              minLength: { message: 'Довжина паролю має бути більше 6 символів', value: 6 },
            }}
            render={({ field }) => {
              return (
                <div>
                  <Password
                    {...field}
                    toggleMask
                    placeholder="Пароль"
                    className={cn(styles['input-password'], {
                      'p-invalid': errors.password,
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

          {auth.userRole === 'tutor' && (
            <Controller
              name="description"
              control={control}
              rules={{
                minLength: { message: 'Довжина паролю має бути більше 6 символів', value: 6 },
              }}
              render={({ field }) => {
                return (
                  <div>
                    <InputTextarea
                      {...field}
                      rows={5}
                      cols={30}
                      placeholder="Опис"
                      className={cn(styles['input-password'], {
                        'p-invalid': errors.description,
                      })}
                      style={{ resize: 'vertical', maxHeight: '400px', minHeight: '100px' }}
                    />
                    {errors.description && (
                      <Message
                        severity="error"
                        style={{ width: '100%', marginBottom: '20px' }}
                        text={errors.description?.message}
                      />
                    )}
                  </div>
                )
              }}
            />
          )}

          <Button label="Зберегти зміни" type="submit" style={{ marginTop: '20px' }} />
        </form>
      </Card>
    </div>
  )
}

export default SettingsPage
