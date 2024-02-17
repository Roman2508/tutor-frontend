import React from "react"
import cn from "classnames"
import { Card } from "primereact/card"
import { Ripple } from "primereact/ripple"
import { Divider } from "primereact/divider"
import { FaRegFile as FileIcon } from "react-icons/fa"
import { FaRegFilePdf as PdfFileIcon } from "react-icons/fa6"
import { FaRegFileWord as WordFileIcon } from "react-icons/fa"
import { FaRegFileImage as ImageFileIcon } from "react-icons/fa"
import { FaRegFilePowerpoint as PowerpointFileIcon } from "react-icons/fa6"

import styles from "./FullLessonPage.module.scss"
import Avatar from "../../components/ui/Avatar/Avatar"
import UploadFile from "../../components/LessonsPage/UploadFile"
import { Button } from "primereact/button"

const FullLessonPage = () => {
  const files = [
    { id: 1, name: "File name", icon: <FileIcon size={50} /> },
    { id: 1, name: "File name File name File name ", icon: <PdfFileIcon size={50} /> },
    { id: 1, name: "File name File name ", icon: <WordFileIcon size={50} /> },
    { id: 1, name: "File name", icon: <PowerpointFileIcon size={50} /> },
    { id: 1, name: "File name File name ", icon: <ImageFileIcon size={50} /> },
  ]

  return (
    <div className={styles.container}>
      <Card>
        <div className={styles.wrapper}>
          <div className={styles.col}>
            <Avatar size="large" shape="square" />
          </div>

          <div className={cn(styles.col, styles["main-content"])}>
            <h4 className={styles["user-name"]}>Boris Johnson</h4>

            <p className={styles["lesson-name"]}>Англійська мова</p>
            <p className={styles["lesson-theme"]}>Unit 4 Develop your Vocabulary pp. 100</p>
          </div>

          <div className={styles.col}>
            <div className={styles.s}>
              <div className={styles["status-wrapper"]}>
                <div className={styles.badge}></div>
                <p className={styles.status}>Заплановано</p>
              </div>

              <p className={styles.date}>17.02.2024</p>
            </div>

            <a className={styles.link} href="https://meet.google.com/uge-cwpv-aug" target="_blank">
              <Button label="Посилання на онлайн-урок" outlined />
            </a>
            {/* <a className={styles.link} href="https://meet.google.com/uge-cwpv-aug" target="_blank">
              Посилання на онлайн-урок
            </a> */}
          </div>
        </div>

        <Divider />

        <div className={styles.files}>
          {files.map((el) => (
            <div className={styles.file} key={el.id} title={`Завантажити: ${el.name}`}>
              {el.icon}
              <p>File name</p>
              <Ripple
                /* @ts-ignore */
                pt={{
                  root: { style: { background: "rgba(75, 175, 80, 0.3)" } },
                }}
              />
            </div>
          ))}
        </div>

        <Divider />

        <UploadFile />
      </Card>
    </div>
  )
}

export default FullLessonPage
