import { useContext } from 'react';
import TableContext from '../../context/tableContext';
import useDebounce from '../../hooks/useDebounce';

export default function Search() {
     const { tableData, setSearchResults } = useContext(TableContext);

     const handleChange = (searchTerm) => {
          if (!searchTerm) return setSearchResults(tableData);

          const term = searchTerm.trim().toLowerCase();

          setSearchResults(
               tableData.filter((person) => {
                    const fullName =
                         `${person.idn} ${person.name} ${person.middleName} ${person.lastName} ${person.gender}`.toLowerCase();

                    return fullName.includes(term);
               })
          );
     };

     const debouncer = useDebounce();

     return (
          <input
               className="input-custom search"
               placeholder="Write a search term"
               type="search"
               onChange={(event) =>
                    debouncer(() => handleChange(event.target.value), 500)
               }
          />
     );
}
