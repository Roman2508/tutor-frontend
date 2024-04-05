import { TbFaceIdError } from "react-icons/tb"

const Error = () => {
  return (
    <div
      style={{
        height: "75vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TbFaceIdError size={60} />
      <h3 style={{ margin: 0 }}>Помилка</h3>
    </div>
  )
}

export default Error
