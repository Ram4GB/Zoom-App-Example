import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";
import "./App.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>,
);
