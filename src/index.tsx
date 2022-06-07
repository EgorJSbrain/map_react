import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./i18n";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { setupStore } from "./store/store";
import { Provider } from "react-redux";

const store = setupStore();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Suspense fallback={<div>Loading...</div>}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </Suspense>
);
