import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import MeetingPage from "./pages/MeetingPage";
import NotFoundPage from "./pages/NotFoundPage";
import PreviewPage from "./pages/PreviewPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout fullscreen={["/meeting"]} />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
      {
        path: "/meeting",
        element: <MeetingPage />,
      },
      {
        path: "/preview",
        element: <PreviewPage />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default router;
