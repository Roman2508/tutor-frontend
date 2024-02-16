import React from "react"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import { Rating } from "primereact/rating"
import { Button } from "primereact/button"
import { InputTextarea } from "primereact/inputtextarea"

interface IAddReviewsModalProps {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const AddReviewsModal: React.FC<IAddReviewsModalProps> = ({ visible, setVisible }) => {
  const [rating, setRating] = React.useState(0)

  return (
    <Dialog
      header="Залишити відгук"
      visible={visible}
      style={{ width: "360px" }}
      onHide={() => setVisible(false)}
    >
      <b>Відгук:</b>
      <br />
      {/* <InputText placeholder="Відгук" style={{ width: "100%" }} /> */}
      <InputTextarea rows={4} style={{ width: "100%" }} autoResize />

      <b style={{ marginTop: "20px", display: "block" }}>Рейтинг:</b>
      <Rating
        onChange={(e) => setRating(Number(e.value))}
        value={rating}
        cancel={false}
        stars={5}
      />

      <Button
        label="Відправити"
        onClick={() => setVisible(false)}
        style={{ marginTop: "20px", width: "100%" }}
      />
    </Dialog>
  )
}

export default AddReviewsModal
