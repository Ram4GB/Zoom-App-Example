import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";
import "./index.scss";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Heading: {
      baseStyle: {
        fontFamily: "Inter",
      },
    },
    Link: {
      baseStyle: {
        color: "#2962ff",
        textDecoration: "none",
        _hover: {
          textDecoration: "none",
        },
      },
    },
  },
  colors: {
    "zlight-grey": "#5f6368",
    zlink: "#2962ff",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <ChakraProvider theme={theme} toastOptions={{ defaultOptions: { position: "top", isClosable: true } }}>
    <RouterProvider router={router} />
  </ChakraProvider>,
);
