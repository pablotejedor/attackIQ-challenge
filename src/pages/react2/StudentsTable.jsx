import { useState, useContext, useMemo } from 'react';
import {
     Table,
     TableBody,
     TableCell,
     TableContainer,
     TableHead,
     TableRow,
     TablePagination,
     Button,
     Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TableContext from '../../context/tableContext';
import useSort from '../../hooks/useSort';
import Search from './Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function StudentsTable() {
     const { tableData, setTableData } = useContext(TableContext);
     const [page, setPage] = useState(0);
     const [rowsPerPage, setRowsPerPage] = useState(5);
     const [sortBy, setSortBy] = useState(null);
     const [sortType, setSortType] = useState(null);
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

     useSort(sortBy, sortType);

     const handleClickSort = (column) => {
          setSortBy(column);

          if (sortType === 'asc') {
               setSortType('desc');
          } else {
               setSortType('asc');
          }
     };

     const getIcon = (column) => {
          if (sortBy === column && sortType === 'asc') {
               return <KeyboardArrowUpIcon />;
          }

          if (sortBy === column && sortType === 'desc') {
               return <KeyboardArrowDownIcon />;
          }

          return null;
     };

     const columns = [
          { id: 'idn', label: 'IDN', isSortable: true, sortName: 'idn' },
          {
               id: 'fullName',
               label: 'Full name',
               isSortable: true,
               sortName: 'name',
          },
          {
               id: 'gender',
               label: 'Gender',
               isSortable: true,
               sortName: 'gender',
          },
          {
               id: 'actions',
               label: 'Actions',
               isSortable: false,
               sortName: null,
          },
     ];

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
                         <TableHead>
                              <TableRow>
                                   {columns.map((column) => (
                                        <TableCell
                                             sx={{
                                                  cursor:
                                                       column.isSortable &&
                                                       'pointer',
                                             }}
                                             key={column.id}
                                             onClick={() => {
                                                  if (column.isSortable) {
                                                       handleClickSort(
                                                            column.sortName
                                                       );
                                                  }
                                             }}
                                        >
                                             <Stack
                                                  direction={'row'}
                                                  alignItems={'center'}
                                                  justifyContent={'start'}
                                             >
                                                  {column.label}
                                                  {getIcon(column.sortName)}
                                             </Stack>
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
