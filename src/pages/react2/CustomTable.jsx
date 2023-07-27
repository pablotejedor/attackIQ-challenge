import { useState } from 'react';
import {
     Table,
     TableBody,
     TableCell,
     TableContainer,
     TableHead,
     TableRow,
     TablePagination,
     Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { mockedData } from '../../mock/mockedData';

const columns = [
     { id: 'idn', label: 'IDN' },
     { id: 'fullName', label: 'Full name' },
     { id: 'gender', label: 'Gender' },
     { id: 'actions', label: 'Actions' },
];

export default function CustomTable() {
     const [data, setData] = useState(mockedData);
     const [page, setPage] = useState(0);
     const [rowsPerPage, setRowsPerPage] = useState(5);

     const handleChangePage = (_, page) => {
          setPage(page);
     };

     const handleChangeRowsPerPage = (event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
     };

     const slicedData = data.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
     );

     const handleDelete = (id) => {
          setData(data.filter((item) => item.idn !== id));
     };

     const navigate = useNavigate();

     return (
          <>
               <TableContainer>
                    <Table>
                         <TableHead>
                              <TableRow>
                                   {columns.map((column) => (
                                        <TableCell key={column.id}>
                                             {column.label}
                                        </TableCell>
                                   ))}
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {slicedData.map((person) => (
                                   <TableRow
                                        key={`${person.idn}${person.name}`}
                                   >
                                        <TableCell>{person.idn}</TableCell>
                                        <TableCell>{`${person.name} ${person.middleName} ${person.lastName}`}</TableCell>
                                        <TableCell>{person.gender}</TableCell>
                                        <TableCell>
                                             <Button
                                                  size="small"
                                                  variant="outlined"
                                                  sx={{ margin: '0 0.5rem' }}
                                                  onClick={() =>
                                                       navigate(
                                                            `edit/${person.idn}`
                                                       )
                                                  }
                                             >
                                                  Edit
                                             </Button>
                                             <Button
                                                  size="small"
                                                  variant="outlined"
                                                  sx={{ margin: '0 0.5rem' }}
                                                  onClick={() =>
                                                       handleDelete(person.idn)
                                                  }
                                             >
                                                  Delete
                                             </Button>
                                        </TableCell>
                                   </TableRow>
                              ))}
                         </TableBody>
                    </Table>
               </TableContainer>

               <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
               />
          </>
     );
}
