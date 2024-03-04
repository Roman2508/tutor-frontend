import React from "react"
import dayjs from "dayjs"
import cn from "classnames"
import { io } from "socket.io-client"
import { Button } from "primereact/button"
import { InputTextarea } from "primereact/inputtextarea"

import styles from "./MessagesPage.module.scss"
import { useAppDispatch } from "../../redux/store"
import { getMessages } from "../../redux/dialogs/dialogsAsyncActions"
import LoadingSpinner from "../ui/LoadingSpinner/LoadingSpinner"
import { useSelector } from "react-redux"
import { addMessage, dialogsSelector } from "../../redux/dialogs/dialogsSlice"

interface IMessageProps {
  openDialogId: number | null
  user: { id: number; name: string; userRole: "tutor" | "student" }
}

const Message: React.FC<IMessageProps> = ({ openDialogId, user }) => {
  const dispatch = useAppDispatch()

  const ref = React.useRef<HTMLDivElement>(null)

  const { messages } = useSelector(dialogsSelector)

  const [text, setText] = React.useState("")

  const socket = io(import.meta.env.VITE_API_URL || "http://localhost:7777")

  React.useEffect(() => {
    if (!openDialogId) return

    socket.on("connect", () => {
      console.log("connect")
      dispatch(getMessages(openDialogId))
    })

    return () => {
      socket.off()
    }
  }, [openDialogId])

  React.useEffect(() => {
    if (messages && messages.length) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      })
    }
  }, [messages])

  const message = {
    dialog: openDialogId,
    userRole: user.userRole,
    text: text,
    sender: { id: user.id, name: user.name },
  }

  const sendMessage = (message: any) => {
    socket.emit("sendMessage", message)
    setText("")
  }

  // Слушаем событие recMessage, чтобы получать сообщения, отправленные пользователями
  socket.on("recMessage", (message: any) => {
    if (message.dialog.id !== openDialogId) return
    // @ts-ignore
    socket.on("connection", dispatch(addMessage(message)))
  })

  return (
    <div className={styles.wrapper}>
      <div className={styles.messages}>
        {messages ? (
          messages.map((message) => {
            const sender = message.senderTutor ? message.senderTutor : message.senderStudent

            return (
              <div
                className={cn(styles["message-wrapper"], {
                  [styles["own-comment"]]: sender.id === user.id && sender.name === user.name,
                })}
                key={message.id}
              >
                <div
                  className={cn(styles.message, {
                    [styles["own-comment"]]: sender.id === user.id && sender.name === user.name,
                  })}
                >
                  <b style={{ fontSize: "14px" }}>{sender.name}</b>
                  <br />
                  <p style={{ textAlign: "justify", margin: 0 }}>{message.text}</p>
                </div>
                <span className={styles["send-at"]}>
                  {dayjs(message.sendAt).format("DD.MM.YYYY - hh:mm:ss")}
                </span>
              </div>
            )
          })
        ) : (
          <LoadingSpinner />
        )}

        <div ref={ref} />
      </div>

      <div className={styles["sent-message"]}>
        <InputTextarea
          rows={3}
          style={{ width: "100%" }}
          placeholder="Написати повідомлення"
          onChange={(e) => setText(e.target.value)}
          value={text}
          autoResize
        />
        <div style={{ textAlign: "end" }}>
          <Button onClick={() => sendMessage(message)} disabled={!text}>
            Відправити
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Message
