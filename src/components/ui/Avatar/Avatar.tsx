import React, { CSSProperties } from 'react'
import { CiUser as UserIcon } from 'react-icons/ci'
import { Avatar as AvatarComponent } from 'primereact/avatar'

import styles from './Avatar.module.scss'

interface IAvatarProps {
  size?: 'large' | 'small'
  sx?: CSSProperties
}

const Avatar: React.FC<IAvatarProps> = ({ size = 'small', sx = {} }) => {
  return (
    <AvatarComponent
      style={{ width: `${size} !important`, height: `${size} !important`, ...sx }}
      icon={<UserIcon size={40} color="#fff" />}
      className={styles.avatar}
    />
  )
}

export default Avatar
