import React from "react"
import cn from "classnames"
import { Card } from "primereact/card"
import { useSelector } from "react-redux"
import { Button } from "primereact/button"
import { Message } from "primereact/message"
import { Dropdown } from "primereact/dropdown"
import { useNavigate } from "react-router-dom"
import { Password } from "primereact/password"
import { InputText } from "primereact/inputtext"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import { useAppDispatch } from "../../redux/store"
import { authSelector } from "../../redux/auth/authSlice"
import { LoadingStatusTypes } from "../../redux/appTypes"
import styles from "../../pages/AuthPage/AuthPage.module.scss"
import { authRegister } from "../../redux/auth/authAsyncActions"
import { emailPattern } from "./emailPattern"

interface IAuthFilds {
  name: string
  email: string
  password: string
  userRole: "tutor" | "student"
}

interface IRegisterFormProps {
  setAuthType: React.Dispatch<React.SetStateAction<"login" | "register">>
}

const RegisterForm: React.FC<IRegisterFormProps> = ({ setAuthType }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { loadingStatus } = useSelector(authSelector)

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IAuthFilds>({
    mode: "onBlur",
  })

  const onSubmit: SubmitHandler<IAuthFilds> = async (data) => {
    try {
      const { payload } = await dispatch(authRegister(data))

      // @ts-ignore
      if (payload.user) {
        navigate("/")
      }
    } catch (error) {}
  }

  return (
    <Card className={styles.content}>
      <h4 style={{ margin: 0, fontSize: "24px" }}>Реєстрація в Tutor</h4>

      <p>
        Зареєструйтеся, щоб брати уроки або викладати онлайн та заробляти у зручний для вас час.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Вкажіть своє ім'я" }}
          render={({ field }) => {
            return (
              <div>
                <InputText
                  autoFocus
                  {...field}
                  placeholder="Ім'я"
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

        <Controller
          name="password"
          control={control}
          rules={{
            required: "Вкажіть свій пароль",
            minLength: { message: "Довжина паролю має бути більше 6 символів", value: 6 },
          }}
          render={({ field }) => {
            return (
              <div>
                <InputText
                  {...field}
                  placeholder="Пароль"
                  className={cn(styles.input, {
                    "p-invalid": errors.email,
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

        <Controller
          name="userRole"
          control={control}
          rules={{ required: "Вкажіть свою роль" }}
          render={({ field }) => {
            return (
              <div>
                <Dropdown
                  {...field}
                  optionLabel="name"
                  placeholder="Ваша роль"
                  style={{ width: "100%", textAlign: "left", marginBottom: "20px" }}
                  className={cn({
                    "p-invalid": errors.email,
                  })}
                  options={[
                    { name: "Студент", value: "student" },
                    { name: "Репетитор", value: "tutor" },
                  ]}
                />

                {errors.userRole && (
                  <Message
                    severity="error"
                    style={{ width: "100%", marginBottom: "20px" }}
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
          className={styles["full-size-button"]}
          disabled={loadingStatus === LoadingStatusTypes.LOADING}
        />
      </form>

      <p>
        Уже є обліковий запис?
        <br />
        <span onClick={() => setAuthType("login")} className={styles.link}>
          Увійдіть
        </span>
      </p>
    </Card>
  )
}

export default RegisterForm
