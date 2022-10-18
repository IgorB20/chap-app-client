import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import ConversationRoom from "./pages/ConversationRoom";
import Home from "./pages/Home";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
        path: "/conversation-room/:username",
        element: <ConversationRoom/>,
      },
  ]);

export default function Routes(){
    return (
        <RouterProvider router={router} />
    );
}