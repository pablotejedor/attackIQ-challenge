import { useState, useRef } from 'react';

export default function React1Page() {
     const [errorMessages, setErrorMessages] = useState([]);
     const passwordInput = useRef(null);
     const passwordConfirmInput = useRef(null);

     const isFormValid = () => {
          const password = passwordInput.current?.value;
          const confirmPassword = passwordConfirmInput.current?.value;

          let errors = [];

          if (password?.length < 8 || password?.length > 32) {
               errors.push('Password must be between 8 and 32 characters.');
          }

          const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;
          if (!password?.match(passwordRegex)) {
               errors.push('Password must contain both letters and numbers.');
          }

          if (password !== confirmPassword) {
               errors.push('Passwords do not match.');
          }

          setErrorMessages(errors);
     };

     const handleClearFields = () => {
          passwordInput.current.value = '';
          passwordConfirmInput.current.value = '';
     };

     const handleSubmit = (event) => {
          event.preventDefault();

          alert('Password changed successfully!');

          event.target.reset();
          setErrorMessages([]);
     };

     return (
          <div className="form-container">
               <h2>Change Password Form</h2>
               <form onSubmit={handleSubmit}>
                    <div>
                         <label htmlFor="password">New password:</label>
                         <input
                              type="password"
                              id="password"
                              ref={passwordInput}
                              onChange={() => isFormValid()}
                              required
                         />
                    </div>
                    <div>
                         <label htmlFor="confirmPassword">
                              New password confirmation:
                         </label>
                         <input
                              type="password"
                              id="confirmPassword"
                              ref={passwordConfirmInput}
                              onChange={() => isFormValid()}
                              required
                         />
                    </div>
                    {errorMessages.length > 0 && (
                         <div className="form-errors-container">
                              {errorMessages.map((error, index) => (
                                   <p className="error-message" key={index}>
                                        {error}
                                   </p>
                              ))}
                         </div>
                    )}

                    <div className="form-buttons-container">
                         <button
                              type="click"
                              onClick={() => handleClearFields()}
                         >
                              Clear fields
                         </button>
                         <button
                              type="submit"
                              disabled={errorMessages.length > 0}
                         >
                              Change Password
                         </button>
                    </div>
               </form>
          </div>
     );
}
