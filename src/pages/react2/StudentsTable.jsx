import { useState, useContext, useMemo } from 'react';
import { Table, TableContainer, TablePagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TableContext from '../../context/tableContext';
import TableHeader from './TableHeader';
import TableRows from './TableRows';
import TableAssets from './TableAssets';

export default function StudentsTable() {
     const { tableData } = useContext(TableContext);
     const [page, setPage] = useState(0);
     const [rowsPerPage, setRowsPerPage] = useState(5);

     const handleChangePage = (_, page) => {
          setPage(page);
     };

     const handleChangeRowsPerPage = (event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
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
          <TableContainer>
               <TableAssets />

               <Table>
                    <TableHeader />
                    <TableRows slicedData={slicedData} />
               </Table>

               <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    component="div"
                    count={tableData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{ margin: '2rem 0' }}
               />
          </TableContainer>
     );
}
