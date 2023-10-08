import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";
import "./App.scss";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Heading: {
      baseStyle: {
        fontFamily: "Inter",
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <ChakraProvider theme={theme}>
    <RouterProvider router={router} />
  </ChakraProvider>,
);
