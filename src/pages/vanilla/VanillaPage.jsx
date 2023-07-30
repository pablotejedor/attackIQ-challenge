import { Button, Stack, Typography } from '@mui/material';
import React from 'react';

export default function VanillaPage() {
     const items = [
          {
               label: 'Repo',
               url: 'https://github.com/pablotejedor/vanilla-exercise',
          },
          {
               label: 'Deploy',
               url: 'https://vanilla-exercise.vercel.app/',
          },
     ];

     return (
          <>
               <Typography variant='h4'>Vanilla</Typography>
               <Stack direction={'row'} spacing={5}>
                    {items.map(({ label, url }) => (
                         <Button
                              href={url}
                              target="_blank"
                              size="large"
                              variant="outlined"
                              key={url}
                         >
                              {label}
                         </Button>
                    ))}
               </Stack>
          </>
     );
}
