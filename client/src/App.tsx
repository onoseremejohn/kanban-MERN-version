import { useGlobalContext } from "./AppContext";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Header from "./Components/Header";
import Overlay from "./Components/Overlay";
import Sidebar from "./Components/Sidebar";
import MainBoard from "./Components/MainBoard";
import { ShowSidebar } from "./assets/Icons";
import SocialLinks from "./Components/SocialLinks";
import Private from "./Components/Private";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Error from "./pages/Error";

const Dashboard = () => {
  const { sidebarOpen, sidebar = () => {} } = useGlobalContext() || {};

  return (
    <>
      <Header />
      <MainBoard />
      <Sidebar />
      <button
        type="button"
        className={sidebarOpen ? "show-sidebar open" : "show-sidebar close"}
        onClick={() => {
          sidebar("open");
        }}
      >
        <ShowSidebar />
      </button>
      <SocialLinks />
      <Overlay />
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={
          <Private>
            <Dashboard />
          </Private>
        }
      />
      <Route path="/landing" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
);

export default () => {
  return <RouterProvider router={router} />;
};
