import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import React1Page from './pages/React1/React1Page';
import React2Page from './pages/React2/React2Page';
import VanillaPage from './pages/vanilla/VanillaPage';
import { Stack, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { TableContextProvider } from './context/tableContext';
import EditForm from './pages/react2/EditForm';

function App() {
     return (
          <ThemeProvider theme={theme}>
               <TableContextProvider>
                    <Stack
                         alignItems="center"
                         justifyContent="center"
                         sx={{ width: '100vw', height: '100vh' }}
                         spacing={5}
                    >
                         <BrowserRouter>
                              <Routes>
                                   <Route
                                        exact
                                        path="/"
                                        element={<HomePage />}
                                   />
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
                                        path="/react2/edit/:id"
                                        element={<EditForm />}
                                   />
                                   <Route
                                        exact
                                        path="/react2/create"
                                        element={<EditForm />}
                                   />
                                   <Route
                                        exact
                                        path="/vanilla"
                                        element={<VanillaPage />}
                                   />
                              </Routes>
                         </BrowserRouter>
                    </Stack>
               </TableContextProvider>
          </ThemeProvider>
     );
}

export default App;
