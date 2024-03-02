import { ProgressSpinner } from "primereact/progressspinner"

const LoadingSpinner = () => {
  return (
    <div
      style={{
        height: "75vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ProgressSpinner strokeWidth="4" style={{ width: "50px", height: "50px" }} />
    </div>
  )
}

export default LoadingSpinner
