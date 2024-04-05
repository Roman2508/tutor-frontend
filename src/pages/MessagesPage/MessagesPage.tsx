import React from "react"
import cn from "classnames"
import { Card } from "primereact/card"
import { useSelector } from "react-redux"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"
import { Link, useParams } from "react-router-dom"
import { MdDeleteOutline as DeleteIcon } from "react-icons/md"

import styles from "./MessagesPage.module.scss"
import { useAppDispatch } from "../../redux/store"
import Error from "../../components/ui/Error/Error"
import Avatar from "../../components/ui/Avatar/Avatar"
import { authSelector } from "../../redux/auth/authSlice"
import { LoadingStatusTypes } from "../../redux/appTypes"
import Message from "../../components/MessagesPage/Message"
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner"
import { clearMessages, dialogsSelector } from "../../redux/dialogs/dialogsSlice"
import { deleteDialog, getDialogs } from "../../redux/dialogs/dialogsAsyncActions"

const MessagesPage = () => {
  const params = useParams()

  const dispatch = useAppDispatch()

  const { auth } = useSelector(authSelector)
  const { dialogs, loadingStatus } = useSelector(dialogsSelector)

  const [activeDalog, setActiveDialog] = React.useState({ name: "", avatarUrl: "", id: 0 })

  const onOpenDialog = () => {
    if (!dialogs || !auth || !params.id) return
    const activeDialog = dialogs.find((el) => el.id === Number(params.id))
    const role = auth.userRole === "tutor" ? "student" : "tutor"
    if (activeDialog) {
      setActiveDialog({
        name: activeDialog[role].name,
        avatarUrl: activeDialog[role].avatarUrl,
        id: activeDialog.id,
      })
    }
  }

  const onDeleteDialog = () => {
    if (!auth) return
    if (window.confirm("Ви дійсно хочете видалити діалог?")) {
      dispatch(deleteDialog({ id: activeDalog.id, userRole: auth.userRole }))
    }
  }

  React.useEffect(() => {
    if (!auth) return
    dispatch(getDialogs({ id: auth.id, userRole: auth.userRole }))
  }, [auth])

  React.useEffect(() => {
    dispatch(clearMessages())
    onOpenDialog()
  }, [params, dialogs])

  if (loadingStatus === LoadingStatusTypes.ERROR) {
    return <Error />
  }

  if (!auth) return

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Card className={styles.contacts}>
          <h4 style={{ margin: 0 }}>Контакти:</h4>

          <div className={styles["contacts-wrapper"]}>
            {dialogs ? (
              dialogs.map((dialog) => {
                const role = auth.userRole === "tutor" ? "student" : "tutor"

                return (
                  <Link
                    className={cn(styles["dialog-item"], {
                      [styles.active]: Number(params.id) === dialog.id,
                    })}
                    style={{ textDecoration: "none", color: "black" }}
                    to={`/messages/${dialog.id}`}
                    key={dialog.id}
                  >
                    <Avatar shape={"circle"} src={dialog[role].avatarUrl} />
                    <p className={styles["dialog-name"]}>{dialog[role].name}</p>
                  </Link>
                )
              })
            ) : (
              <LoadingSpinner />
            )}
          </div>
        </Card>

        <Card className={cn(styles.chat)} style={{ padding: "0 !important" }}>
          {params.id ? (
            <>
              <div className={styles["chat-top"]}>
                <div className={styles["chat-top-data"]}>
                  <Avatar shape="circle" src={activeDalog.avatarUrl} />
                  <h4 style={{ margin: 0 }}>{activeDalog.name}</h4>
                </div>

                <div className={styles["chat-top-actions"]}>
                  <Button
                    outlined
                    size="small"
                    severity="danger"
                    title="Видалити діалог"
                    onClick={onDeleteDialog}
                    style={{ padding: "5px" }}
                  >
                    <DeleteIcon size={24} />
                  </Button>
                </div>
              </div>

              <Divider />

              <Message
                openDialogId={Number(params.id)}
                user={{
                  id: auth.id,
                  name: auth.name,
                  userRole: auth.userRole,
                }}
              />
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <h4>Виберіть кому хочете написати</h4>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default MessagesPage
