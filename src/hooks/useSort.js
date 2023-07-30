import { useContext, useEffect } from 'react';
import TableContext from '../context/tableContext';

export default function useSort(sortBy, sortType) {
     const { setTableData } = useContext(TableContext);

     const sortAsc = () => {
          setTableData((prev) =>
               [...prev].sort((a, b) => {
                    if (a[sortBy] > b[sortBy]) {
                         return 1;
                    }
                    if (a[sortBy] < b[sortBy]) {
                         return -1;
                    }

                    return 0;
               })
          );
     };

     const sortDesc = () => {
          setTableData((prev) =>
               [...prev].sort((a, b) => {
                    if (a[sortBy] < b[sortBy]) {
                         return 1;
                    }
                    if (a[sortBy] > b[sortBy]) {
                         return -1;
                    }

                    return 0;
               })
          );
     };

     useEffect(() => {
          if (sortType === 'asc') {
               return sortAsc();
          }

          if (sortType === 'desc') {
               return sortDesc();
          }
     }, [sortBy, sortType]);
}
