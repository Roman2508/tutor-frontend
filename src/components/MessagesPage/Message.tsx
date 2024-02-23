import React from "react"
import dayjs from "dayjs"
import cn from "classnames"
import { io } from "socket.io-client"
import { Button } from "primereact/button"
import { InputTextarea } from "primereact/inputtextarea"

import styles from "./MessagesPage.module.scss"

const Message = () => {
  const ref = React.useRef<HTMLDivElement>(null)

  const [messages, setMessages] = React.useState<any[]>([])
  const [text, setText] = React.useState("")
  const socket = io("http://localhost:7777")

  React.useEffect(() => {
    socket.on("connect", () => {
      console.log("connect")
      fetch("http://localhost:7777/messages/1")
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setMessages(data)
        })
        .catch((err) => console.error(err))
    })

    return () => {
      socket.off()
    }
  }, [])

  React.useEffect(() => {
    if (messages.length) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      })
    }
  }, [messages.length])

  const message = {
    text: text,
    userRole: "tutor",
    sender: 1,
    dialog: 1,
  }

  const sendMessage = (message: any) => {
    socket.emit("sendMessage", message)
  }

  //Слушаем событие recMessage, чтобы получать сообщения, отправленные пользователями
  socket.on("recMessage", (message: any) => {
    // @ts-ignore // fix dublicating messages
    socket.on("connection", setMessages(messages))

    setMessages((prev) => {
      console.log(prev, message)
      return [...prev, message]
    })
  })

  return (
    <div className={styles.wrapper}>
      <div className={styles.messages}>
        {
          /* Array(10)
          .fill(null) */
          messages.map((message, index) => (
            <div
              className={cn(styles["message-wrapper"], {
                [styles["own-comment"]]:
                  index === 1 || index === 3 || index === 5 || index === 7 || index === 9,
              })}
              key={index}
            >
              <div
                className={cn(styles.message, {
                  [styles["own-comment"]]:
                    index === 1 || index === 3 || index === 5 || index === 7 || index === 9,
                })}
              >
                <b style={{ fontSize: "14px" }}>{message.sender.name}</b>
                <br />
                {message.text}
              </div>
              <span className={styles["send-at"]}>
                {dayjs(message.sendAt).format("DD.MM.YYYY - hh:mm:ss")}
              </span>
            </div>
          ))
        }

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
