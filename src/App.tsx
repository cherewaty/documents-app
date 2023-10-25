import { Box, CssBaseline, CssVarsProvider, Typography } from "@mui/joy";

function App() {
  return (
    <CssVarsProvider defaultMode="system">
      <CssBaseline />
      <Box>
        <Typography>Hello World</Typography>
      </Box>
    </CssVarsProvider>
  );
}

export default App;
