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
          { label: 'IDN', isSortable: true, id: 'idn' },
          {
               label: 'Full name',
               isSortable: true,
               id: 'name',
          },
          {
               label: 'Gender',
               isSortable: true,
               id: 'gender',
          },
          {
               label: 'Actions',
               isSortable: false,
               id: null,
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
                                        handleClickSort(column.id);
                                   }
                              }}
                         >
                              <Stack
                                   direction={'row'}
                                   alignItems={'center'}
                                   justifyContent={'start'}
                              >
                                   {column.label}
                                   {getIcon(column.id)}
                              </Stack>
                         </TableCell>
                    ))}
               </TableRow>
          </TableHead>
     );
}
