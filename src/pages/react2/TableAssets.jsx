import { Button, Stack } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Search from './Search';

export default function TableAssets() {
     const navigate = useNavigate();

     return (
          <Stack direction="row" alignItems={'center'} spacing={4}>
               <Button
                    size="small"
                    variant="outlined"
                    onClick={() => navigate('create')}
                    sx={{ height: '30px' }}
               >
                    Add new student +
               </Button>
               <Search />
          </Stack>
     );
}
