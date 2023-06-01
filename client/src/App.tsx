import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Private } from "./Components";
import {
  Home,
  Register,
  Landing,
  Prompt,
  AssigneeViewTask,
  Error,
} from "./pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={
          <Private>
            <Home />
          </Private>
        }
      />
      <Route path="/landing" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/task/:userId/:taskId">
        <Route index element={<Prompt />} />
        <Route path="view" element={<AssigneeViewTask />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Route>
  )
);

export default () => {
  return <RouterProvider router={router} />;
};
