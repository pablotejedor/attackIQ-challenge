import { Button, Stack } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
     const navigate = useNavigate();

     const exercises = [
          {
               name: 'React 1',
               route: '/react1',
          },
          {
               name: 'React 2',
               route: '/react2',
          },
          {
               name: 'Vanilla',
               route: '/vanilla',
          },
     ];

     return (
          <Stack
               direction="row"
               alignItems="center"
               justifyContent="center"
               spacing={10}
               sx={{ width: '100%', height: '100vh' }}
          >
               {exercises.map((item) => (
                    <Button
                         size="large"
                         variant="outlined"
                         onClick={() => navigate(`${item.route}`)}
                         key={item.route}
                    >
                         {item.name}
                    </Button>
               ))}
          </Stack>
     );
}
