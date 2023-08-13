import { Button, Stack } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import TableContext from '../../context/tableContext';
import SearchModal from './SearchModal';

export default function Search() {
     const { tableData } = useContext(TableContext);
     const [searchResults, setSearchResults] = useState([]);

     const [open, setOpen] = useState(false);
     const handleOpen = () => setOpen(true);
     const handleClose = () => setOpen(false);

     const handleSubmit = ({ searchTerm }) => {
          const term = searchTerm.trim().toLowerCase();

          setSearchResults(
               tableData.filter((person) => {
                    const fullName =
                         `${person.idn} ${person.name} ${person.middleName} ${person.lastName}`.toLowerCase();

                    return fullName.includes(term);
               })
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
                                   alignItems={'flex-end'}
                                   spacing={2}
                              >
                                   <Field
                                        className="input-custom search"
                                        id="search"
                                        name="searchTerm"
                                        placeholder={
                                             errors.searchTerm &&
                                             touched.searchTerm
                                                  ? errors.searchTerm
                                                  : 'Write a search term and hit search button'
                                        }
                                   />

                                   <Button
                                        size="small"
                                        variant="outlined"
                                        type="submit"
                                        sx={{ height: '30px' }}
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
