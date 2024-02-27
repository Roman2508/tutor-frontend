import React from "react"
import cn from "classnames"
import { useSelector } from "react-redux"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { Message } from "primereact/message"
import { InputNumber } from "primereact/inputnumber"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import { useAppDispatch } from "../../redux/store"
import { authSelector } from "../../redux/auth/authSlice"
import styles from "../../pages/TutorPage/TutorPage.module.scss"
import { createLesson, updateLesson } from "../../redux/lessons/lessonsAsyncActions"
import AutoCompleteLessons from "../../components/ui/AutoCompleteLessons/AutoCompleteLessons"
import { ILessonModalData } from "../../pages/TutorPage/TutorPage"
import { InputText } from "primereact/inputtext"
import { lessonsList } from "../ui/AutoCompleteLessons/lessonsList"

export interface ILessonFormFilds {
  name: string
  price: number
  duration: number
  theme?: string
}

interface ILessonModalProps {
  lessonModalData: ILessonModalData
  setLessonModalData: React.Dispatch<React.SetStateAction<ILessonModalData>>
}

const LessonModal: React.FC<ILessonModalProps> = ({ lessonModalData, setLessonModalData }) => {
  const dispatch = useAppDispatch()

  const { auth } = useSelector(authSelector)

  const modalTitle =
    lessonModalData.modalType === "create" ? "Створити новий урок" : "Оновити новий урок"

  const {
    control,
    setValue,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<ILessonFormFilds>({
    mode: "onBlur",
  })

  const onSubmit: SubmitHandler<ILessonFormFilds> = async (data) => {
    try {
      if (!auth) return

      if (lessonModalData.modalType === "create") {
        dispatch(createLesson({ ...data, tutor: auth.id }))
      }

      if (lessonModalData.modalType === "update") {
        dispatch(updateLesson({ ...data, id: lessonModalData.modalData.id }))
      }

      setLessonModalData((prev) => ({ ...prev, modalVisible: false }))
    } catch (error) {
      // @ts-ignore
      console.error(error.message)
    } finally {
      setValue("name", "")
      setValue("price", 1)
      setValue("duration", 20)
      setValue("theme", "")
    }
  }

  React.useEffect(() => {
    if (lessonModalData.modalType === "update") {
      setValue("name", lessonModalData.modalData.name)
      setValue("price", lessonModalData.modalData.price)
      setValue("duration", lessonModalData.modalData.duration)
      setValue("theme", lessonModalData.modalData.theme)
    }
  }, [lessonModalData.modalType, lessonModalData.modalVisible])

  return (
    <Dialog
      header={modalTitle}
      style={{ width: "360px" }}
      visible={lessonModalData.modalVisible}
      onHide={() => setLessonModalData((prev) => ({ ...prev, modalVisible: false }))}
    >
      <div>
        <form className={styles["create-lesson-form"]} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Вкажіть назву уроку",
            }}
            render={({ field }) => {
              return (
                <div className={styles.input}>
                  <label>Предмет:</label>
                  <AutoCompleteLessons
                    {...field}
                    placeholder="Ім'я"
                    lessonsList={lessonsList}
                    className={cn({ "p-invalid": errors.name })}
                    onSelect={(e) => setValue("name", e.value.label)}
                    onChange={(e) => setValue("name", e.target.value)}
                  />
                  {errors.name && (
                    <Message
                      severity="error"
                      style={{ width: "300px" }}
                      text={errors.name?.message}
                    />
                  )}
                </div>
              )
            }}
          />

          <Controller
            name="theme"
            control={control}
            rules={{
              minLength: { value: 3, message: "Мінімальна довжина теми - 3 символа" },
              maxLength: { value: 200, message: "Максимальна довжина теми - 200 символів" },
            }}
            render={({ field }) => {
              return (
                <div className={styles.input}>
                  <label>Тема уроку (не обов'язково)</label>

                  <InputText
                    {...field}
                    style={{ width: "100%" }}
                    value={getValues("theme")}
                    className={cn({ "p-invalid": errors.theme })}
                    // @ts-ignore
                    onChange={(e) => setValue("theme", e.value)}
                  />

                  {errors.theme && (
                    <Message
                      severity="error"
                      style={{ width: "300px" }}
                      text={errors.theme?.message}
                    />
                  )}
                </div>
              )
            }}
          />

          <Controller
            name="price"
            control={control}
            rules={{
              min: { value: 1, message: "Мінімальна ціна за урок 1 грн" },
              max: { value: 3000, message: "Максимальна ціна за урок 3000 грн" },
              required: "Вкажіть ціну за один урок",
            }}
            render={({ field }) => {
              return (
                <div className={styles.input}>
                  <label>Ціна за урок, грн</label>

                  <InputNumber
                    {...field}
                    useGrouping={false}
                    style={{ width: "100%" }}
                    value={getValues("price")}
                    className={cn({ "p-invalid": errors.price })}
                    // @ts-ignore
                    onChange={(e) => setValue("price", e.value)}
                  />

                  {errors.price && (
                    <Message
                      severity="error"
                      style={{ width: "300px" }}
                      text={errors.price?.message}
                    />
                  )}
                </div>
              )
            }}
          />

          <Controller
            name="duration"
            control={control}
            rules={{
              min: { value: 20, message: "Мінімальна тривалість уроку 20 хв" },
              max: { value: 240, message: "Максимальна тривалість уроку 4 год" },
              required: "Вкажіть тривалість уроку",
            }}
            render={({ field }) => {
              return (
                <div className={styles.input}>
                  <label>Тривалість уроку, хв</label>

                  <InputNumber
                    {...field}
                    useGrouping={false}
                    style={{ width: "100%" }}
                    value={getValues("duration")}
                    className={cn({ "p-invalid": errors.duration })}
                    // @ts-ignore
                    onChange={(e) => setValue("duration", e.value)}
                  />

                  {errors.duration && (
                    <Message
                      severity="error"
                      style={{ width: "300px" }}
                      text={errors.duration?.message}
                    />
                  )}
                </div>
              )
            }}
          />

          <Button label="Створити" type="submit" className={styles.button} />
        </form>
      </div>
    </Dialog>
  )
}

export default LessonModal
