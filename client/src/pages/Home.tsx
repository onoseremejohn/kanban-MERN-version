import { ShowSidebar } from "../assets/Icons";
import { useGlobalContext } from "../AppContext";
import {
  Header,
  MainBoard,
  Sidebar,
  SocialLinks,
  Overlay,
} from "../Components";

const Home = () => {
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

export default Home;
