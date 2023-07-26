import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import React1Page from './pages/React1/React1Page';
import React2Page from './pages/React2/React2Page';
import VanillaPage from './pages/vanilla/VanillaPage';
import { Container, ThemeProvider } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { theme } from './theme';

function App() {
     return (
          <ThemeProvider theme={theme}>
               <Container
                    maxWidth={'100vw'}
                    disableGutters
                    sx={{
                         backgroundColor: blueGrey[100],
                         minHeight: '100vh',
                    }}
               >
                    <BrowserRouter>
                         <Routes>
                              <Route exact path="/" element={<HomePage />} />
                              <Route
                                   exact
                                   path="/react1"
                                   element={<React1Page />}
                              />
                              <Route
                                   exact
                                   path="/react2"
                                   element={<React2Page />}
                              />
                              <Route
                                   exact
                                   path="/vanilla"
                                   element={<VanillaPage />}
                              />
                         </Routes>
                    </BrowserRouter>
               </Container>
          </ThemeProvider>
     );
}

export default App;
