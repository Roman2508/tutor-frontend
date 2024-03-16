import React from "react"
import cn from "classnames"
import { Dialog } from "primereact/dialog"
import { Button } from "primereact/button"
import { Message } from "primereact/message"
import { InputText } from "primereact/inputtext"
import { InputNumber } from "primereact/inputnumber"
import { SelectButton } from "primereact/selectbutton"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import styles from "./LessonsPage.module.scss"
import { useAppDispatch } from "../../redux/store"
import { ReservedLessonType } from "../../redux/reservedLessons/reservedLessonsTypes"
import { updateReservedLesson } from "../../redux/reservedLessons/reservedLessonsAsyncActions"

interface IReservedLessonsFilds {
  theme: string
  meetUrl: string
  price: number
  duration: number
  status: "planned" | "conducted"
}

interface EditReservedLessonPage {
  visible: boolean
  editableLesson: ReservedLessonType | null
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const EditReservedLessonPage: React.FC<EditReservedLessonPage> = ({
  visible,
  setVisible,
  editableLesson,
}) => {
  const dispatch = useAppDispatch()

  const {
    control,
    setValue,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<IReservedLessonsFilds>({
    mode: "onBlur",
  })

  const onSubmit: SubmitHandler<IReservedLessonsFilds> = async (data) => {
    try {
      if (!editableLesson) return
      dispatch(updateReservedLesson({ ...data, id: editableLesson.id }))
      setVisible(false)
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(() => {
    if (editableLesson) {
      setValue("theme", editableLesson.theme as string)
      setValue("meetUrl", editableLesson.meetUrl)
      setValue("price", editableLesson.price)
      setValue("duration", editableLesson.duration)
      setValue("status", editableLesson.status)
    }
  }, [editableLesson])

  return (
    <Dialog
      header="Редагувати урок"
      visible={visible}
      style={{ width: "360px" }}
      onHide={() => setVisible(false)}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <b>Тема уроку (не обов'язково):</b>
        <Controller
          name="theme"
          control={control}
          render={({ field }) => {
            return (
              <div>
                <InputText
                  {...field}
                  maxLength={300}
                  style={{ width: "100%" }}
                  className={cn({ "p-invalid": errors.theme })}
                />
                {errors.theme && (
                  <Message
                    severity="error"
                    style={{ width: "100%", marginBottom: "20px" }}
                    text={errors.theme?.message}
                  />
                )}
              </div>
            )
          }}
        />

        <b style={{ marginTop: "10px", display: "block" }}>Посилання на онлайн-урок:</b>
        <Controller
          name="meetUrl"
          control={control}
          rules={{ required: "Це поле - обов'язкове" }}
          render={({ field }) => {
            return (
              <div>
                <InputText
                  {...field}
                  maxLength={100}
                  style={{ width: "100%" }}
                  className={cn({ "p-invalid": errors.meetUrl })}
                />
                {errors.meetUrl && (
                  <Message
                    severity="error"
                    style={{ width: "100%", marginBottom: "20px" }}
                    text={errors.meetUrl?.message}
                  />
                )}
              </div>
            )
          }}
        />

        <b style={{ marginTop: "10px", display: "block" }}>Ціна уроку:</b>
        <Controller
          name="price"
          control={control}
          rules={{
            required: "Вкажіть ціну за один урок",
            minLength: { value: 3, message: "Мінімальна довжина теми - 3 символа" },
            maxLength: { value: 200, message: "Максимальна довжина теми - 200 символів" },
          }}
          render={({ field }) => {
            return (
              <div>
                <InputNumber
                  {...field}
                  maxLength={100}
                  useGrouping={false}
                  style={{ width: "100%" }}
                  value={getValues("price")}
                  // @ts-ignore
                  onChange={(e) => setValue("price", e.value)}
                  className={cn({ "p-invalid": errors.price })}
                />
                {errors.price && (
                  <Message
                    severity="error"
                    style={{ width: "100%", marginBottom: "20px" }}
                    text={errors.price?.message}
                  />
                )}
              </div>
            )
          }}
        />

        <b style={{ marginTop: "10px", display: "block" }}>Тривалість уроку:</b>
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
              <div>
                <InputNumber
                  {...field}
                  maxLength={100}
                  useGrouping={false}
                  style={{ width: "100%" }}
                  value={getValues("duration")}
                  // @ts-ignore
                  onChange={(e) => setValue("duration", e.value)}
                  className={cn({ "p-invalid": errors.duration })}
                />
                {errors.duration && (
                  <Message
                    severity="error"
                    style={{ width: "100%", marginBottom: "20px" }}
                    text={errors.duration?.message}
                  />
                )}
              </div>
            )
          }}
        />

        <b style={{ marginTop: "10px", display: "block" }}>Статус уроку:</b>
        <Controller
          name="status"
          control={control}
          rules={{ required: "Це поле - обов'язкове" }}
          render={({ field }) => {
            return (
              <div>
                <SelectButton
                  {...field}
                  maxLength={100}
                  //   value={value}
                  //   onChange={(e) => setValue(e.value)}
                  style={{ width: "100%" }}
                  options={[
                    { label: "Заплановано", value: "planned" },
                    { label: "Проведено", value: "conducted" },
                  ]}
                  className={cn(styles["modal-lesson-status"], { "p-invalid": errors.status })}
                />

                {errors.status && (
                  <Message
                    severity="error"
                    style={{ width: "100%", marginBottom: "20px" }}
                    text={errors.status?.message}
                  />
                )}
              </div>
            )
          }}
        />

        <Button label="Зберегти" type="submit" style={{ marginTop: "10px", width: "100%" }} />
      </form>
    </Dialog>
  )
}

export default EditReservedLessonPage
