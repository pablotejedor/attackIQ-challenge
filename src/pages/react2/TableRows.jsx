import { useContext } from 'react';
import { TableBody, TableCell, TableRow, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TableContext from '../../context/tableContext';

export default function TableRows({ slicedData }) {
     const { tableData, setTableData } = useContext(TableContext);
     const navigate = useNavigate();

     const handleDelete = (id) => {
          setTableData(tableData.filter((item) => item.idn !== id));
     };

     return (
          <TableBody>
               {slicedData.map((person) => (
                    <TableRow key={`${person.idn}${person.name}`}>
                         <TableCell>{person.idn}</TableCell>
                         <TableCell>{`${person.name} ${person.middleName} ${person.lastName}`}</TableCell>
                         <TableCell>{person.gender}</TableCell>
                         <TableCell>
                              <Button
                                   size="small"
                                   variant="outlined"
                                   sx={{ margin: '0 0.5rem' }}
                                   onClick={() =>
                                        navigate(`edit/${person.idn}`)
                                   }
                              >
                                   Edit
                              </Button>
                              <Button
                                   size="small"
                                   variant="outlined"
                                   sx={{ margin: '0 0.5rem' }}
                                   onClick={() => handleDelete(person.idn)}
                              >
                                   Delete
                              </Button>
                         </TableCell>
                    </TableRow>
               ))}
          </TableBody>
     );
}
