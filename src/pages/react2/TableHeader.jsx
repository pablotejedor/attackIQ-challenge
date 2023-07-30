import { useState } from 'react';
import { TableCell, TableHead, TableRow, Stack } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useSort from '../../hooks/useSort';

export default function TableHeader() {
     const [sortBy, setSortBy] = useState(null);
     const [sortType, setSortType] = useState(null);

     useSort(sortBy, sortType);

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

     const handleClickSort = (column) => {
          setSortBy(column);

          if (sortType === 'asc') {
               setSortType('desc');
          } else {
               setSortType('asc');
          }
     };

     return (
          <TableHead>
               <TableRow>
                    {columns.map((column) => (
                         <TableCell
                              sx={{
                                   cursor: column.isSortable && 'pointer',
                              }}
                              key={column.id}
                              onClick={() => {
                                   if (column.isSortable) {
                                        handleClickSort(column.sortName);
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
     );
}
