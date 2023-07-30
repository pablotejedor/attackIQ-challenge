import { useState, useContext, useMemo } from 'react';
import {
     Table,
     TableBody,
     TableCell,
     TableContainer,
     TableRow,
     TablePagination,
     Button,
     Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TableContext from '../../context/tableContext';
import Search from './Search';
import TableHeader from './TableHeader';

export default function StudentsTable() {
     const { tableData, setTableData } = useContext(TableContext);
     const [page, setPage] = useState(0);
     const [rowsPerPage, setRowsPerPage] = useState(5);

     const navigate = useNavigate();

     const handleChangePage = (_, page) => {
          setPage(page);
     };

     const handleChangeRowsPerPage = (event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
     };

     const handleDelete = (id) => {
          setTableData(tableData.filter((item) => item.idn !== id));
     };

     const slicedData = useMemo(
          () =>
               tableData.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
               ),
          [tableData, page, rowsPerPage]
     );

     return (
          <>
               <TableContainer>
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
                    <Table>
                         <TableHeader />

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
                    count={tableData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
               />
          </>
     );
}
