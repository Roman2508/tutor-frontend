import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "primereact/resources/themes/lara-light-cyan/theme.css"

import "./index.css"
import App from "./App.tsx"
import { Provider } from "react-redux"
import { store } from "./redux/store.ts"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
