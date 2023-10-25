import { Box, CssBaseline, CssVarsProvider } from "@mui/joy";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Documents } from "./Documents";

const queryClient = new QueryClient();

function App() {
  return (
    <CssVarsProvider defaultMode="system">
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Box>
          <Documents />
        </Box>
      </QueryClientProvider>
    </CssVarsProvider>
  );
}

export default App;
