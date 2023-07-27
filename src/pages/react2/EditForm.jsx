import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TableContext from '../../context/tableContext';

export default function EditForm() {
     const { id } = useParams();

     const { tableData, setTableData } = useContext(TableContext);

     const navigate = useNavigate();

     const handleSubmit = () => {
          const rowToEdit = tableData.find(
               (row) => row.idn === parseInt(id, 10)
          );

          const arrayCopy = [...tableData];

          const index = arrayCopy.indexOf(rowToEdit);

          arrayCopy[index] = {
               idn: 38900622,
               name: 'Pablo',
               middleName: 'Andrés',
               lastName: 'Tejedor',
               gender: 'Male',
          };

          setTableData(arrayCopy);
          navigate('/react2');
     };

     return (
          <div>
               EditForm {id}{' '}
               <button onClick={() => handleSubmit()}>Edit</button>
          </div>
     );
}
