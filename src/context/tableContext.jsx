import { createContext, useEffect, useMemo, useState } from 'react';
import { mockedData } from '../mock/mockedData';

const TableContext = createContext(null);

export const TableContextProvider = ({ children }) => {
     const [tableData, setTableData] = useState(mockedData);

     const [searchResults, setSearchResults] = useState(tableData);

     useEffect(() => {
          setSearchResults(tableData);
     }, [tableData]);

     const values = useMemo(
          () => ({
               tableData,
               setTableData,
               searchResults,
               setSearchResults,
          }),
          [tableData, searchResults]
     );

     return (
          <TableContext.Provider value={values}>
               {children}
          </TableContext.Provider>
     );
};

export default TableContext;
