import ReactDOM from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import "primereact/resources/themes/lara-light-cyan/theme.css"
import { Provider } from "react-redux"
import { store } from "./redux/store.ts"
import { BrowserRouter } from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
