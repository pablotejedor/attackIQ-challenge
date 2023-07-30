import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import React1Page from './pages/React1/React1Page';
import React2Page from './pages/React2/React2Page';
import VanillaPage from './pages/vanilla/VanillaPage';
import { Stack, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { TableContextProvider } from './context/tableContext';
import StudentsForm from './pages/react2/StudentsForm';

function App() {
     const routes = [
          {
               path: '/',
               element: <HomePage />,
          },
          {
               path: '/react1',
               element: <React1Page />,
          },
          {
               path: '/react2',
               element: <React2Page />,
          },
          {
               path: '/react2/edit/:id',
               element: <StudentsForm />,
          },
          {
               path: '/react2/create',
               element: <StudentsForm />,
          },
          {
               path: '/vanilla',
               element: <VanillaPage />,
          },
     ];

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
                                   {routes.map(({ path, element }) => (
                                        <Route
                                             exact
                                             path={path}
                                             element={element}
                                             key={path}
                                        />
                                   ))}
                              </Routes>
                         </BrowserRouter>
                    </Stack>
               </TableContextProvider>
          </ThemeProvider>
     );
}

export default App;
