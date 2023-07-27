import { Stack } from '@mui/material';
import CustomTable from './CustomTable';

export default function React2Page() {
     return (
          <Stack
               alignItems="center"
               justifyContent="center"
               sx={{ width: '100%', height: '100vh' }}
          >
               <h1>Table</h1>
               <CustomTable />
          </Stack>
     );
}
