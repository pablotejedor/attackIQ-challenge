import React, { useContext } from 'react';
import { Button, Modal, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TableContext from '../../context/tableContext';

export default function SearchModal({ open, handleClose, searchResults }) {
     const { tableData, setTableData } = useContext(TableContext);

     const handleDelete = (id) => {
          setTableData(tableData.filter((item) => item.idn !== id));
     };

     const navigate = useNavigate();

     return (
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
                                   key={`${result.name}${result.idn}`}
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
                                                  navigate(`edit/${result.idn}`)
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
     );
}
