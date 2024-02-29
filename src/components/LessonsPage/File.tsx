import React from "react"
import { toast } from "react-toastify"
import { Ripple } from "primereact/ripple"
import { FaRegFile as FileIcon } from "react-icons/fa"
import { FaRegFilePdf as PdfFileIcon } from "react-icons/fa6"
import { FaRegFileWord as WordFileIcon } from "react-icons/fa"
import { FaRegFileImage as ImageFileIcon } from "react-icons/fa"
import { FaRegFileExcel as ExcelFileIcon } from "react-icons/fa"
import { MdOutlineDeleteOutline, MdOutlineDownload } from "react-icons/md"
import { FaRegFilePowerpoint as PowerpointFileIcon } from "react-icons/fa6"

import { filesAPI } from "../../api/api"
import styles from "./LessonsPage.module.scss"
import { useAppDispatch } from "../../redux/store"
import { AuthType } from "../../redux/auth/authTypes"
import { FileType } from "../../redux/reservedLessons/reservedLessonsTypes"
import { deleteFile } from "../../redux/reservedLessons/reservedLessonsAsyncActions"

interface IFileProps {
  file: FileType
  auth: AuthType
  setTutorFiles: React.Dispatch<React.SetStateAction<FileType[]>>
  setStudentFiles: React.Dispatch<React.SetStateAction<FileType[]>>
}

const fileTypes = [
  {
    types: ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/svg"],
    icon: <ImageFileIcon size={50} />,
  },
  { types: ["application/pdf"], icon: <PdfFileIcon size={50} /> },
  {
    types: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
    icon: <WordFileIcon size={50} />,
  },
  {
    types: ["application/vnd.openxmlformats-officedocument.presentationml.presentation"],
    icon: <PowerpointFileIcon size={50} />,
  },
  {
    types: ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
    icon: <ExcelFileIcon size={50} />,
  },
  { types: [], icon: <FileIcon size={50} /> },
]

const File: React.FC<IFileProps> = ({ file, auth, setTutorFiles, setStudentFiles }) => {
  const dispatch = useAppDispatch()

  const fileType = fileTypes.find((el) => {
    const findedType = el.types.some((t) => t === file.mimetype)

    return findedType
  })

  const downloadFile = async (filename: string) => {
    try {
      const { data } = await filesAPI.download(filename)
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", filename)
      document.body.appendChild(link)
      link.click()
    } catch (error) {
      console.log(error)
      toast.error("Помилка при завантаженні файла")
    }
  }

  const onDeleteFiles = async () => {
    if (window.confirm("Ви дійсно хочете видалити файл?")) {
      try {
        const { payload } = await dispatch(deleteFile({ filename: file.filename, fileId: file.id }))
        const filename = (payload as { id: number; filename: string }).filename
        setTutorFiles((prev) => prev.filter((el) => el.filename !== filename))
        setStudentFiles((prev) => prev.filter((el) => el.filename !== filename))
      } catch (error) {}
    }
  }

  return (
    <div className={styles.file} title={`Завантажити: ${file.originalName}`}>
      {fileType ? fileType.icon : fileTypes[5].icon}
      <p className={styles["file-name"]}>{file.originalName}</p>
      <div className={styles["file-controls"]}>
        <div className={styles["file-controls-icon"]} onClick={() => downloadFile(file.filename)}>
          <MdOutlineDownload size={25} />
          <Ripple
            /* @ts-ignore */
            pt={{
              root: { style: { background: "rgba(0, 0, 0, 0.2)" } },
            }}
          />
        </div>

        {auth.userRole === file.authorRole && (
          <div className={styles["file-controls-icon"]} onClick={onDeleteFiles}>
            <MdOutlineDeleteOutline size={25} />
            <Ripple
              /* @ts-ignore */
              pt={{
                root: { style: { background: "rgba(0, 0, 0, 0.2)" } },
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default File
