import { createContext, useState } from 'react';
import { mockedData } from '../mock/mockedData';

const TableContext = createContext(null);

export const TableContextProvider = ({ children }) => {
     const [tableData, setTableData] = useState(mockedData);

     const values = { tableData, setTableData };

     return (
          <TableContext.Provider value={values}>
               {children}
          </TableContext.Provider>
     );
};

export default TableContext;
