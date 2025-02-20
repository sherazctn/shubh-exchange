import './i18n';
import 'swiper/css';
import "./index.css";
import 'swiper/css/pagination';

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Toaster } from "react-hot-toast";
import AuthCheck from "./components/AuthCheck/AuthCheck";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Toaster />
        <AuthCheck>
          <App />
        </AuthCheck>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
