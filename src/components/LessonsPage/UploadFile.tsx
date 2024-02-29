import React from 'react'
import {
  ItemTemplateOptions,
  FileUploadSelectEvent,
  FileUploadUploadEvent,
  FileUploadHeaderTemplateOptions,
  FileUpload as UploadComponent,
  FileUploadHandlerEvent,
} from 'primereact/fileupload'
import { Tag } from 'primereact/tag'
import { Toast } from 'primereact/toast'
import { IoClose } from 'react-icons/io5'
import { Button } from 'primereact/button'
import { Tooltip } from 'primereact/tooltip'
import { IoImageOutline } from 'react-icons/io5'
import { ProgressBar } from 'primereact/progressbar'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { FaRegFile as FileIcon } from 'react-icons/fa'
import { FaRegImages as SelectFilesIcon } from 'react-icons/fa'
import { useAppDispatch } from '../../redux/store'
import { uploadFile } from '../../redux/reservedLessons/reservedLessonsAsyncActions'

interface IUploadFileProps {
  lessonId: number
}

const UploadFile: React.FC<IUploadFileProps> = ({ lessonId }) => {
  const dispatch = useAppDispatch()

  const toast = React.useRef<Toast | null>(null)
  const [totalSize, setTotalSize] = React.useState(0)
  const [totalFilesCount, setTotalFilesCount] = React.useState(0)
  const fileUploadRef = React.useRef<UploadComponent | null>(null)

  const onTemplateSelect = (e: FileUploadSelectEvent) => {
    let _totalSize = totalSize
    let files = e.files

    Object.keys(files).forEach((key) => {
      _totalSize += files[key as any].size || 0
    })

    setTotalSize(_totalSize)
  }

  const onTemplateUpload = async (e: FileUploadHandlerEvent) => {
    if (!toast.current) return

    let _totalSize = 0

    e.files.forEach((file: File) => {
      _totalSize += file.size || 0
    })

    setTotalSize(_totalSize)
    toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' })

    Promise.allSettled(
      e.files.map(async (file: File) => {
        const formData = new FormData()
        formData.append('file', file)

        await dispatch(uploadFile({ file: formData, lessonId }))
      })
    )
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
    const value = totalSize / 200000
    const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B'

    return (
      <div
        className={className}
        style={{
          backgroundColor: 'transparent',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          {chooseButton}
          {uploadButton}
          {cancelButton}
        </div>
        <div>
          <span>{formatedValue} / 20 MB</span>
          <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
        </div>
      </div>
    )
  }

  const itemTemplate = (file: any, props: ItemTemplateOptions) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {file.objectURL ? (
            <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
          ) : (
            <FileIcon size={100} />
          )}
          <span
            style={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left',
              marginLeft: '16px',
            }}
          >
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag value={props.formatSize} severity="warning" style={{ marginLeft: '26px' }} />
        <Button
          type="button"
          icon={<IoClose />}
          style={{ marginLeft: 'auto' }}
          className="p-button-outlined p-button-rounded p-button-danger ml-auto"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    )
  }

  const emptyTemplate = () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <div style={{ padding: '30px', borderRadius: '50%', backgroundColor: '#f9fafb' }}>
          <IoImageOutline size={100} color="#d1d5db" />
        </div>
        <span style={{ fontSize: '1.2em', margin: '30px 0', color: '#6b7280' }}>Перетягніть файл сюди</span>
      </div>
    )
  }

  const chooseOptions = {
    icon: <SelectFilesIcon />,
    iconOnly: true,
    className: 'custom-choose-btn p-button-rounded p-button-outlined',
  }
  const uploadOptions = {
    icon: <AiOutlineCloudUpload />,
    iconOnly: true,
    className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined',
  }
  const cancelOptions = {
    icon: <IoClose />,
    iconOnly: true,
    className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined',
  }

  return (
    <div>
      <Toast ref={toast}></Toast>

      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

      <UploadComponent
        ref={fileUploadRef}
        name="demo[]"
        // url={`uploads/${lessonId}`}
        multiple
        // accept="image/*"
        maxFileSize={20000000}
        customUpload={true}
        // onUpload={(e) => onTemplateUpload(e)}
        uploadHandler={onTemplateUpload}
        onSelect={onTemplateSelect}
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
