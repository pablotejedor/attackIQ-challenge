import { useState, useContext } from 'react';
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
import TableContext from '../../context/tableContext';

export default function CustomTable() {
     const { tableData, setTableData } = useContext(TableContext);
     const [page, setPage] = useState(0);
     const [rowsPerPage, setRowsPerPage] = useState(5);

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

     const slicedData = tableData.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
     );

     const navigate = useNavigate();

     const columns = [
          { id: 'idn', label: 'IDN' },
          { id: 'fullName', label: 'Full name' },
          { id: 'gender', label: 'Gender' },
          { id: 'actions', label: 'Actions' },
     ];

     return (
          <>
               <TableContainer>
                    <Button
                         size="small"
                         variant="outlined"
                         onClick={() => navigate('create')}
                    >
                         New +
                    </Button>
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
                    count={tableData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
               />
          </>
     );
}
