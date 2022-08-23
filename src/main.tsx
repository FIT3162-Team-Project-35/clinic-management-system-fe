import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "../src/store";

ReactDOM.render(
  // <React.StrictMode>
  <ChakraProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>,
  // </React.StrictMode>
  document.getElementById("root")
);
