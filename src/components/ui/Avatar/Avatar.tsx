import cn from "classnames"
import React, { CSSProperties } from "react"
import { CiUser as UserIcon } from "react-icons/ci"
import { Avatar as AvatarComponent } from "primereact/avatar"

import styles from "./Avatar.module.scss"

interface IAvatarProps {
  size?: "large" | "small"
  shape?: "circle" | "square"
  sx?: CSSProperties
  src?: string
}

const Avatar: React.FC<IAvatarProps> = ({ size = "small", shape = "square", src = "", sx = {} }) => {
  return (
    <AvatarComponent
      shape={shape}
      image={src}
      icon={<UserIcon size={size === "small" ? 30 : 50} color="#fff" />}
      className={cn(styles.avatar, styles[size])}
    />
  )
}

export default Avatar
