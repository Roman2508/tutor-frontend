import React from "react"
import { FileUpload } from "primereact/fileupload"

import styles from "./SettingsPage.module.scss"
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import Avatar from "../../components/ui/Avatar/Avatar"
import { InputText } from "primereact/inputtext"
import { Password } from "primereact/password"

const SettingsPage = () => {
  const toast = React.useRef(null)

  const onUpload = () => {
    // @ts-ignore
    toast?.current?.show({ severity: "info", summary: "Success", detail: "File Uploaded" })
  }

  return (
    <div className={styles.container}>
      <Card>
        <h3 className={styles["main-title"]}>Налаштування профілю</h3>

        <div className={styles["photo"]}>
          <div className={styles["photo-col"]}>
            <p>Фото профілю</p>
            <Avatar size="large" />
          </div>

          <div className={styles["photo-col"]}>
            <span>Макс. розмір – 2 МБ</span>
            <span>Формат JPG або PNG</span>

            <FileUpload
              mode="basic"
              name="demo[]"
              url="/api/upload"
              accept="image/*"
              style={{ marginTop: "10px" }}
              chooseLabel="Завантажити інше фото"
              maxFileSize={2000000}
              onUpload={onUpload}
            />
          </div>
        </div>

        <div className={styles.form}>
          <InputText placeholder="Ім'я" />

          <br />

          <InputText placeholder="Ел. пошта" />

          <br />

          <Password placeholder="Пароль" className={styles["input-password"]} toggleMask />

          <Password
            placeholder="Повторити пароль"
            className={styles["input-password"]}
            toggleMask
          />

          <Button label="Зберегти зміни" style={{ marginTop: "20px" }} />
        </div>
      </Card>
    </div>
  )
}

export default SettingsPage
