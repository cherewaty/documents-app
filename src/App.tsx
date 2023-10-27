import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  redirect,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "./Layout";
import { DocumentsIndex } from "./pages/DocumentsIndex";
import { DocumentShow } from "./pages/DocumentShow";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={
        <Layout>
          <Outlet />
        </Layout>
      }
    >
      <Route
        index
        loader={async () => {
          return redirect("/documents");
        }}
      />
      <Route path="documents">
        <Route index element={<DocumentsIndex />} />
        <Route path=":documentId" element={<DocumentShow />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <CssVarsProvider defaultMode="system">
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </CssVarsProvider>
  );
}

export default App;
