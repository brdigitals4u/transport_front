import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { AppWrapper } from "./components/common/PageMeta";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { SnackbarCloseButton } from "./components/SnackbarCloseButton";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { store } from "./store/store";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppWrapper>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <SnackbarProvider
              action={(key) => (
                <SnackbarCloseButton key={key as unknown as string} />
              )}
              autoHideDuration={2000}
              // open={true}
              //persist={true}
              maxSnack={1}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              hideIconVariant
            >
              <App />
            </SnackbarProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </AppWrapper>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
