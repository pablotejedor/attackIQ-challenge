import { Button, Stack } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import TableContext from '../../context/tableContext';
import useDebounce from '../../hooks/useDebounce';

export default function TableAssets({ setPage }) {
     const { tableData, setSearchResults } = useContext(TableContext);
     const navigate = useNavigate();

     const handleChange = (searchTerm) => {
          if (!searchTerm) return setSearchResults(tableData);

          const term = searchTerm.trim().toLowerCase();

          setPage(0);

          setSearchResults(
               tableData.filter((person) => {
                    const fullStudentData =
                         `${person.idn} ${person.name} ${person.middleName} ${person.lastName} ${person.gender}`.toLowerCase();

                    return fullStudentData.includes(term);
               })
          );
     };

     const debouncer = useDebounce();

     return (
          <Stack direction="row" alignItems={'center'} spacing={4}>
               <Button
                    size="small"
                    variant="outlined"
                    onClick={() => navigate('create')}
                    sx={{ height: '30px' }}
               >
                    Add new student +
               </Button>
               <input
                    className="input-custom search"
                    placeholder="Write a search term"
                    type="search"
                    onChange={(event) =>
                         debouncer(() => handleChange(event.target.value), 500)
                    }
               />
          </Stack>
     );
}
