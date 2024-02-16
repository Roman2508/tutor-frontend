import React from "react"
import cn from "classnames"
import { Button } from "primereact/button"
import { InputTextarea } from "primereact/inputtextarea"

import styles from "./MessagesPage.module.scss"

const Message = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.messages}>
        {Array(10)
          .fill(null)
          .map((_, index) => (
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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed cumque nam enim,
                architecto rerum doloremque.
              </div>
            </div>
          ))}
      </div>

      <div className={styles["sent-message"]}>
        <InputTextarea
          rows={4}
          style={{ width: "100%" }}
          placeholder="Написати повідомлення"
          autoResize
        />
        <div style={{ textAlign: "end" }}>
          <Button>Відправити</Button>
        </div>
      </div>
    </div>
  )
}

export default Message
