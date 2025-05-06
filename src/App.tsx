
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Toaster } from "./components/ui/sonner";
import ProjectDetail from "./pages/ProjectDetail";
import Resume from "./pages/Resume";
import Coursework from "./pages/Coursework";
import CareerPlan from "./pages/CareerPlan";
import Experience from "./pages/Experience";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <NotFound />,
  },
  {
    path: "/projects/:projectId",
    element: <ProjectDetail />,
  },
  {
    path: "/resume",
    element: <Resume />,
  },
  {
    path: "/coursework",
    element: <Coursework />,
  },
  {
    path: "/career-plan",
    element: <CareerPlan />,
  },
  {
    path: "/experience",
    element: <Experience />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
