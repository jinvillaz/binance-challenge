import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import { Navbar } from './components/navbar';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box height="100vh" display="flex" flexDirection="column">
        <Router>
          <Navbar />
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
