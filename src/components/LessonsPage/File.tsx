import React from 'react'
import { Ripple } from 'primereact/ripple'
import { FaRegFile as FileIcon } from 'react-icons/fa'
import { FaRegFilePdf as PdfFileIcon } from 'react-icons/fa6'
import { FaRegFileWord as WordFileIcon } from 'react-icons/fa'
import { FaRegFileImage as ImageFileIcon } from 'react-icons/fa'
import { FaRegFileExcel as ExcelFileIcon } from 'react-icons/fa'
import { MdOutlineDeleteOutline, MdOutlineDownload } from 'react-icons/md'
import { FaRegFilePowerpoint as PowerpointFileIcon } from 'react-icons/fa6'

import styles from './LessonsPage.module.scss'
import { FileType } from '../../redux/reservedLessons/reservedLessonsTypes'

interface IFileProps {
  file: FileType
}

const fileTypes = [
  { types: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/svg'], icon: <ImageFileIcon size={50} /> },
  { types: ['application/pdf'], icon: <PdfFileIcon size={50} /> },
  {
    types: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    icon: <WordFileIcon size={50} />,
  },
  {
    types: ['application/vnd.openxmlformats-officedocument.presentationml.presentation'],
    icon: <PowerpointFileIcon size={50} />,
  },
  { types: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'], icon: <ExcelFileIcon size={50} /> },
  { types: [], icon: <FileIcon size={50} /> },
]

const File: React.FC<IFileProps> = ({ file }) => {
  const fileType = fileTypes.find((el) => {
    const findedType = el.types.some((t) => t === file.mimetype)

    if (!findedType) ({ icon: <FileIcon size={50} /> })
    return findedType
  })

  return (
    <div className={styles.file} title={`Завантажити: ${file.originalName}`}>
      {fileType && fileType.icon}
      <p className={styles['file-name']}>{file.originalName}</p>
      <div className={styles['file-controls']}>
        <div className={styles['file-controls-icon']}>
          <MdOutlineDownload size={25} />
          <Ripple
            /* @ts-ignore */
            pt={{
              root: { style: { background: 'rgba(0, 0, 0, 0.2)' } },
            }}
          />
        </div>

        <div className={styles['file-controls-icon']}>
          <MdOutlineDeleteOutline size={25} />
          <Ripple
            /* @ts-ignore */
            pt={{
              root: { style: { background: 'rgba(0, 0, 0, 0.2)' } },
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default File
