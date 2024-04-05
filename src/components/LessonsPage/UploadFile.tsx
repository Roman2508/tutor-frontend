import React from "react"
import {
  ItemTemplateOptions,
  FileUploadSelectEvent,
  FileUploadHandlerEvent,
  FileUpload as UploadComponent,
  FileUploadHeaderTemplateOptions,
} from "primereact/fileupload"
import { Tag } from "primereact/tag"
import { toast } from "react-toastify"
import { IoClose } from "react-icons/io5"
import { Button } from "primereact/button"
import { Tooltip } from "primereact/tooltip"
import { IoImageOutline } from "react-icons/io5"
import { ProgressBar } from "primereact/progressbar"
import { AiOutlineCloudUpload } from "react-icons/ai"
import { FaRegFile as FileIcon } from "react-icons/fa"
import { FaRegImages as SelectFilesIcon } from "react-icons/fa"

import { useAppDispatch } from "../../redux/store"
import { AuthType } from "../../redux/auth/authTypes"
import { FileType } from "../../redux/reservedLessons/reservedLessonsTypes"
import { uploadFile } from "../../redux/reservedLessons/reservedLessonsAsyncActions"
import { transliterateCyrillicToLatin } from "../../helpers/transliterateCyrillicToLatin"

interface IUploadFileProps {
  auth: AuthType
  lessonId: number
  totalFilesCount: { tutor: number; student: number }
  setTutorFiles: React.Dispatch<React.SetStateAction<FileType[]>>
  setStudentFiles: React.Dispatch<React.SetStateAction<FileType[]>>
}

const UploadFile: React.FC<IUploadFileProps> = ({
  auth,
  lessonId,
  totalFilesCount,
  setTutorFiles,
  setStudentFiles,
}) => {
  const dispatch = useAppDispatch()

  const [totalSize, setTotalSize] = React.useState(0)
  const fileUploadRef = React.useRef<UploadComponent | null>(null)

  const onBeforeSelect = (e: FileUploadSelectEvent) => {
    let files = e.files

    const allFilesCount = totalFilesCount[auth.userRole] + files.length

    if (allFilesCount > 4) {
      toast.error("Можна завантажити максимум 5 файлів")
      return false
    }
  }

  const onTemplateSelect = (e: FileUploadSelectEvent) => {
    let files = e.files
    let _totalSize = totalSize

    Object.keys(files).forEach((key) => {
      _totalSize += files[key as any].size || 0
    })

    setTotalSize(_totalSize)
  }

  const onTemplateUpload = async (e: FileUploadHandlerEvent) => {
    if (!fileUploadRef.current) return

    let _totalSize = 0

    e.files.forEach((file: File) => {
      _totalSize += file.size || 0
    })

    setTotalSize(_totalSize)

    await Promise.allSettled(
      e.files.map(async (file: File) => {
        // Rename file
        const _file = new File([file], transliterateCyrillicToLatin(file.name), { type: file.type })

        const formData = new FormData()
        formData.append("file", _file)

        const { payload } = await dispatch(uploadFile({ file: formData, lessonId }))

        if ((payload as FileType).authorRole === "tutor") {
          setTutorFiles((prev) => [...prev, payload as FileType])
        } else {
          setStudentFiles((prev) => [...prev, payload as FileType])
        }
      })
    )

    fileUploadRef.current.clear()
  }

  const onTemplateRemove = (file: File, callback: any) => {
    setTotalSize(totalSize - file.size)
    callback()
  }

  const onTemplateClear = () => {
    setTotalSize(0)
  }

  const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
    const { className, chooseButton, uploadButton, cancelButton } = options
    const value = totalSize / 50000
    const formatedValue =
      fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : "0 B"

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          {chooseButton}
          {uploadButton}
          {cancelButton}
        </div>
        <div>
          <span>{formatedValue} / 5 MB</span>
          <ProgressBar
            value={value}
            showValue={false}
            style={{ width: "10rem", height: "12px" }}
          ></ProgressBar>
        </div>
      </div>
    )
  }

  const itemTemplate = (file: any, props: ItemTemplateOptions) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {file.objectURL ? (
            <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
          ) : (
            <FileIcon size={100} />
          )}
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              marginLeft: "16px",
            }}
          >
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag value={props.formatSize} severity="warning" style={{ marginLeft: "26px" }} />
        <Button
          type="button"
          icon={<IoClose />}
          style={{ marginLeft: "auto" }}
          className="p-button-outlined p-button-rounded p-button-danger ml-auto"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    )
  }

  const emptyTemplate = () => {
    return (
      <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <div style={{ padding: "30px", borderRadius: "50%", backgroundColor: "#f9fafb" }}>
          <IoImageOutline size={100} color="#d1d5db" />
        </div>
        <span style={{ fontSize: "1.2em", margin: "30px 0", color: "#6b7280" }}>
          Перетягніть файл сюди
        </span>
      </div>
    )
  }

  const chooseOptions = {
    icon: <SelectFilesIcon />,
    iconOnly: true,
    className: "custom-choose-btn p-button-rounded p-button-outlined",
  }
  const uploadOptions = {
    icon: <AiOutlineCloudUpload />,
    iconOnly: true,
    className: "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
  }
  const cancelOptions = {
    icon: <IoClose />,
    iconOnly: true,
    className: "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
  }

  return (
    <div>
      {/* <Toast ref={toast}></Toast> */}

      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

      <UploadComponent
        name="demo[]"
        ref={fileUploadRef}
        customUpload={true}
        maxFileSize={5000000}
        uploadHandler={onTemplateUpload}
        onSelect={onTemplateSelect}
        onBeforeSelect={onBeforeSelect}
        onError={onTemplateClear}
        onClear={onTemplateClear}
        headerTemplate={headerTemplate}
        itemTemplate={itemTemplate}
        emptyTemplate={emptyTemplate}
        chooseOptions={chooseOptions}
        uploadOptions={uploadOptions}
        cancelOptions={cancelOptions}
      />
    </div>
  )
}

export default UploadFile
