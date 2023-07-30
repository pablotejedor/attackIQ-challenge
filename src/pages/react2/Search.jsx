import { Button, Stack } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import TableContext from '../../context/tableContext';
import { capitalizeFirstLetter } from '../../helpers/capitalizeFirstLetter';
import SearchModal from './SearchModal';

export default function Search() {
     const { tableData } = useContext(TableContext);
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

     return (
          <>
               <SearchModal
                    open={open}
                    handleClose={handleClose}
                    searchResults={searchResults}
               />
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
                                             className="input-custom"
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
                                             className="input-custom"
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
          </>
     );
}
