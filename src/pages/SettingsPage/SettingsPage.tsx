import React from "react"
import cn from "classnames"
import { Card } from "primereact/card"
import { useSelector } from "react-redux"
import { Button } from "primereact/button"
import { Message } from "primereact/message"
import { Password } from "primereact/password"
import { useNavigate } from "react-router-dom"
import { InputText } from "primereact/inputtext"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload"

import styles from "./SettingsPage.module.scss"
import { useAppDispatch } from "../../redux/store"
import Error from "../../components/ui/Error/Error"
import Avatar from "../../components/ui/Avatar/Avatar"
import { InputTextarea } from "primereact/inputtextarea"
import { LoadingStatusTypes } from "../../redux/appTypes"
import { authSelector, logout } from "../../redux/auth/authSlice"
import { emailPattern } from "../../components/AuthPage/emailPattern"
import { transliterateCyrillicToLatin } from "../../helpers/transliterateCyrillicToLatin"
import { updateStudent, updateTutor, uploadAvatar } from "../../redux/auth/authAsyncActions"

interface IFormFilds {
  name: string
  email: string
  password: string
  description?: string
}

const SettingsPage = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { auth, loadingStatus } = useSelector(authSelector)

  const onUpload = async (event: FileUploadHandlerEvent) => {
    const file = event.files[0]
    const _file = new File([file], transliterateCyrillicToLatin(file.name), { type: file.type })

    const formData = new FormData()
    formData.append("file", _file)

    await dispatch(uploadAvatar(formData))
  }

  const {
    control,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormFilds>({
    mode: "onBlur",
  })

  const onSubmit: SubmitHandler<IFormFilds> = async (data) => {
    if (!auth) return

    if (auth.userRole === "tutor") {
      dispatch(updateTutor({ ...data, id: auth.id }))
    }

    if (auth.userRole === "student") {
      dispatch(updateStudent({ ...data, id: auth.id }))
    }
  }

  const onLogout = () => {
    if (window.confirm("Ви дійсно хочете вийти з акаунта?")) {
      dispatch(logout())
      navigate("/auth")
    }
  }

  React.useEffect(() => {
    if (!auth) return

    setValue("name", auth.name)
    setValue("email", auth.email)
    setValue("description", auth.description)
  }, [auth])

  if (loadingStatus === LoadingStatusTypes.ERROR) {
    return <Error />
  }

  if (!auth) return

  return (
    <div className={styles.container}>
      <Card>
        <h3 className={styles["main-title"]}>Налаштування профілю</h3>

        <div className={styles["photo"]}>
          <div className={styles["photo-col"]}>
            <p>Фото профілю</p>
            <Avatar size="large" src={auth.avatarUrl} />
          </div>

          <div className={styles["photo-col"]}>
            <span>Макс. розмір – 2 МБ</span>
            <span>Формат JPG або PNG</span>

            <FileUpload
              mode="basic"
              name="demo[]"
              // url="/api/upload"
              customUpload={true}
              uploadHandler={onUpload}
              accept="image/*"
              // onUpload={onUpload}
              maxFileSize={2000000}
              style={{ marginTop: "10px" }}
              chooseLabel="Завантажити інше фото"
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
                      "p-invalid": errors.name,
                    })}
                  />
                  {errors.name && (
                    <Message
                      severity="error"
                      style={{ width: "100%", marginBottom: "20px" }}
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
              required: "Вкажіть свою ел. пошту",
              pattern: { value: emailPattern, message: "Невірний формат пошти" },
            }}
            render={({ field }) => {
              return (
                <div>
                  <InputText
                    {...field}
                    placeholder="Ел. пошта"
                    className={cn(styles.input, {
                      "p-invalid": errors.email,
                    })}
                  />
                  {errors.email && (
                    <Message
                      severity="error"
                      style={{ width: "100%", marginBottom: "20px" }}
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
              minLength: { message: "Довжина паролю має бути більше 6 символів", value: 6 },
            }}
            render={({ field }) => {
              return (
                <div>
                  <Password
                    {...field}
                    toggleMask
                    placeholder="Пароль"
                    className={cn(styles["input-password"], {
                      "p-invalid": errors.password,
                    })}
                  />
                  {errors.password && (
                    <Message
                      severity="error"
                      style={{ width: "100%", marginBottom: "20px" }}
                      text={errors.password?.message}
                    />
                  )}
                </div>
              )
            }}
          />

          {auth.userRole === "tutor" && (
            <Controller
              name="description"
              control={control}
              rules={{
                minLength: { message: "Довжина паролю має бути більше 6 символів", value: 6 },
              }}
              render={({ field }) => {
                return (
                  <div>
                    <InputTextarea
                      {...field}
                      rows={5}
                      cols={30}
                      placeholder="Опис"
                      className={cn(styles["input-password"], {
                        "p-invalid": errors.description,
                      })}
                      style={{ resize: "vertical", maxHeight: "400px", minHeight: "100px" }}
                    />
                    {errors.description && (
                      <Message
                        severity="error"
                        style={{ width: "100%", marginBottom: "20px" }}
                        text={errors.description?.message}
                      />
                    )}
                  </div>
                )
              }}
            />
          )}

          <Button label="Зберегти зміни" type="submit" style={{ marginTop: "20px" }} />

          <Button
            outlined
            type="button"
            severity="danger"
            onClick={onLogout}
            label="Вийти з акаунта"
            style={{ marginTop: "20px" }}
          />
        </form>
      </Card>
    </div>
  )
}

export default SettingsPage
