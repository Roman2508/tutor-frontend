import React from "react"
import cn from "classnames"
import { Card } from "primereact/card"
import { Menu } from "primereact/menu"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"
import { BsThreeDots } from "react-icons/bs"

import styles from "./MessagesPage.module.scss"
import Avatar from "../../components/ui/Avatar/Avatar"
import Message from "../../components/MessagesPage/Message"

const MessagesPage = () => {
  const items = Array(10).fill({
    label: "Nick Name",
    icon: (
      <div style={{ marginRight: "10px" }}>
        <Avatar shape={"circle"} />
      </div>
    ),
  })

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Card className={styles.contacts}>
          <h4 style={{ margin: 0 }}>Контакти:</h4>

          <div className={styles["contacts-wrapper"]}>
            <Menu model={items} style={{ width: "100%" }} />
          </div>
        </Card>

        <Card className={cn(styles.chat)} style={{ padding: "0 !important" }}>
          <div className={styles["chat-top"]}>
            <div className={styles["chat-top-data"]}>
              <Avatar shape="circle" />
              <h4 style={{ margin: 0 }}>Nick Name</h4>
            </div>

            <div className={styles["chat-top-actions"]}>
              <Button size="small" style={{ padding: "4px" }}>
                <BsThreeDots size={24} />
              </Button>
            </div>
          </div>

          <Divider />

          <Message />
        </Card>
      </div>
    </div>
  )
}

export default MessagesPage
