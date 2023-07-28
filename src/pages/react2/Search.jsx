import { Button, Modal, Stack } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import TableContext from '../../context/tableContext';
import { capitalizeFirstLetter } from '../../helpers/capitalizeFirstLetter';
import { useNavigate } from 'react-router-dom';

export default function Search() {
     const { tableData, setTableData } = useContext(TableContext);
     const [searchResults, setSearchResults] = useState([]);

     const [open, setOpen] = useState(false);
     const handleOpen = () => setOpen(true);
     const handleClose = () => setOpen(false);

     const handleSubmit = ({ searchTerm, searchBy }) => {
          const trimmedSearchTerm = searchTerm.trim();
          const term =
               searchBy === 'idn'
                    ? parseInt(trimmedSearchTerm, 10)
                    : capitalizeFirstLetter(trimmedSearchTerm);

          typeof term === 'number'
               ? setSearchResults(
                      tableData.filter((person) => person[searchBy] === term)
                 )
               : setSearchResults(
                      tableData.filter((person) =>
                           person[searchBy].includes(term)
                      )
                 );

          handleOpen();
     };

     const handleDelete = (id) => {
          setTableData(tableData.filter((item) => item.idn !== id));
     };

     const navigate = useNavigate();

     return (
          <>
               <Formik
                    initialValues={{
                         searchTerm: '',
                         searchBy: 'name',
                    }}
                    validate={(values) => {
                         const errors = {};
                         if (!values.searchTerm) {
                              errors.searchTerm = 'Search term cannot be empty';
                         }
                         return errors;
                    }}
                    onSubmit={handleSubmit}
               >
                    {({ errors, touched }) => (
                         <Form>
                              <Stack
                                   direction="row"
                                   alignItems={'center'}
                                   spacing={2}
                              >
                                   <Stack>
                                        <Field
                                             id="search"
                                             name="searchTerm"
                                             placeholder={
                                                  errors.searchTerm &&
                                                  touched.searchTerm
                                                       ? errors.searchTerm
                                                       : 'Write a search term and hit search button'
                                             }
                                        />
                                   </Stack>
                                   <Stack>
                                        <Field
                                             id="searchBy"
                                             as="select"
                                             name="searchBy"
                                        >
                                             <option value="idn">IDN</option>
                                             <option value="name">Name</option>
                                             <option value="middleName">
                                                  Middle name
                                             </option>
                                             <option value="lastName">
                                                  Last name
                                             </option>
                                             <option value="gender">
                                                  Gender
                                             </option>
                                        </Field>
                                   </Stack>
                                   <Button
                                        size="small"
                                        variant="outlined"
                                        type="submit"
                                   >
                                        Search
                                   </Button>
                              </Stack>
                         </Form>
                    )}
               </Formik>
               <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
               >
                    <Stack
                         alignItems={'start'}
                         justifyContent={'center'}
                         sx={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              width: 400,
                              bgcolor: '#fff',
                              border: '2px solid #000',
                              boxShadow: 24,
                              p: 4,
                         }}
                    >
                         {searchResults.length > 0 ? (
                              searchResults.map((result) => (
                                   <Stack
                                        direction={'row'}
                                        spacing={4}
                                        alignItems={'center'}
                                        justifyContent={'space-between'}
                                        width={'100%'}
                                        sx={{ borderBottom: '1px solid #000' }}
                                   >
                                        <p>{result.idn}</p>
                                        <p>
                                             {result.name} {result.middleName}{' '}
                                             {result.lastName}
                                        </p>

                                        <Stack direction={'row'} spacing={1}>
                                             <Button
                                                  size="small"
                                                  variant="outlined"
                                                  onClick={() =>
                                                       navigate(
                                                            `edit/${result.idn}`
                                                       )
                                                  }
                                             >
                                                  Edit
                                             </Button>
                                             <Button
                                                  size="small"
                                                  variant="outlined"
                                                  onClick={() => {
                                                       handleDelete(result.idn);
                                                       handleClose();
                                                  }}
                                             >
                                                  Delete
                                             </Button>
                                        </Stack>
                                   </Stack>
                              ))
                         ) : (
                              <h3>No search results</h3>
                         )}
                    </Stack>
               </Modal>
          </>
     );
}
