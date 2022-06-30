import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";
import "./i18n";
import theme from "./theme";
import { store } from "./store/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </Suspense>
  </BrowserRouter>
);
