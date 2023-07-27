import React, { useContext } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import TableContext from '../../context/tableContext';
import { Button, Stack } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';

export default function EditForm() {
     const { tableData, setTableData } = useContext(TableContext);
     const { id } = useParams();
     const rowToEdit = tableData.find((row) => row.idn === parseInt(id, 10));

     const navigate = useNavigate();

     const fields = [
          {
               name: 'idn',
               label: 'IDN',
               type: 'number',
          },
          {
               name: 'name',
               label: 'Name',
               type: 'text',
          },
          {
               name: 'middleName',
               label: 'Middle Name',
               type: 'text',
          },
          {
               name: 'lastName',
               label: 'Last Name',
               type: 'text',
          },
     ];

     const { pathname } = useLocation();

     const isCreationForm = pathname === '/react2/create';

     const handleSubmitEdition = (values) => {
          const arrayCopy = [...tableData];

          const index = arrayCopy.indexOf(rowToEdit);

          arrayCopy[index] = values;

          setTableData(arrayCopy);
          navigate('/react2');
     };

     const handleSubmitCreation = (values) => {
          setTableData((prev) => [values, ...prev]);
          navigate('/react2');
     };

     return (
          <Stack
               alignItems="center"
               justifyContent="center"
               sx={{ width: '100%', height: '100vh' }}
               spacing={5}
          >
               <h3>{isCreationForm ? 'Create' : 'Edit'} Form</h3>
               <Formik
                    onSubmit={
                         isCreationForm
                              ? handleSubmitCreation
                              : handleSubmitEdition
                    }
                    initialValues={
                         isCreationForm
                              ? {
                                     idn: '',
                                     name: '',
                                     middleName: '',
                                     lastName: '',
                                     gender: '',
                                }
                              : rowToEdit
                    }
                    validate={(values) => {
                         const errors = {};

                         if (!values.idn) {
                              errors.idn = 'IDN required';
                         }

                         if (
                              tableData.some(
                                   (row) =>
                                        row.idn === values.idn &&
                                        values.idn !== rowToEdit?.idn
                              ) &&
                              !isCreationForm
                         ) {
                              errors.idn = 'IDN must be unique';
                         }

                         if (
                              tableData.some((row) => row.idn === values.idn) &&
                              isCreationForm
                         ) {
                              errors.idn = 'IDN must be unique';
                         }

                         if (!values.name) {
                              errors.name = 'Name required';
                         }

                         if (!values.lastName) {
                              errors.lastName = 'Lastname required';
                         }

                         if (!values.gender) {
                              errors.gender = 'Gender required';
                         }

                         return errors;
                    }}
               >
                    {({ isValid }) => (
                         <Form>
                              <Stack
                                   alignItems="start"
                                   justifyContent="center"
                                   spacing={2}
                              >
                                   {fields.map((field) => (
                                        <Stack
                                             alignItems="start"
                                             justifyContent="center"
                                             key={field.name}
                                             spacing={1}
                                        >
                                             <label htmlFor={field.name}>
                                                  {field.label}
                                             </label>
                                             <Field
                                                  name={field.name}
                                                  type={field.type}
                                                  id={field.name}
                                             />
                                             <ErrorMessage
                                                  className="error-message"
                                                  name={field.name}
                                                  component="div"
                                             />
                                        </Stack>
                                   ))}

                                   <Stack
                                        alignItems="start"
                                        justifyContent="center"
                                        spacing={1}
                                   >
                                        <label htmlFor={'gender'}>Gender</label>
                                        <Field
                                             name="gender"
                                             id="gender"
                                             as="select"
                                        >
                                             <option defaultValue>
                                                  Select gender
                                             </option>
                                             <option value={'Male'}>
                                                  Male
                                             </option>
                                             <option value={'Female'}>
                                                  Female
                                             </option>
                                             <option value={'Other'}>
                                                  Other
                                             </option>
                                        </Field>
                                        <ErrorMessage
                                             className="error-message"
                                             name="gender"
                                             component="div"
                                        />
                                   </Stack>
                                   <Button
                                        disabled={!isValid}
                                        type="submit"
                                        size="small"
                                        variant="outlined"
                                   >
                                        {isCreationForm ? 'Create' : 'Edit'}
                                   </Button>
                              </Stack>
                         </Form>
                    )}
               </Formik>
          </Stack>
     );
}
