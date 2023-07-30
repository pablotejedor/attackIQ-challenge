import { Stack } from '@mui/material';
import StudentsTable from './StudentsTable';

export default function React2Page() {
     return (
          <Stack
               alignItems="center"
               justifyContent="center"
               sx={{ width: '80%', height: '100vh' }}
          >
               <h1>Students Table</h1>
               <StudentsTable />
          </Stack>
     );
}
