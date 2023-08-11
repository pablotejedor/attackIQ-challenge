import { useState, useRef } from 'react';

export default function React1Page() {
     const [errorMessages, setErrorMessages] = useState([]);
     const passwordInput = useRef(null);
     const passwordConfirmInput = useRef(null);

     const validateForm = () => {
          const password = passwordInput.current?.value;
          const confirmPassword = passwordConfirmInput.current?.value;

          const bannedPasswords = ['Password1234', '4tt4ck1q', 'contraseña1'];

          const errors = [];

          if (password?.length < 8 || password?.length > 32) {
               errors.push('Password must be between 8 and 32 characters.');
          }

          const passwordRegex = /^(?=.*[ñA-Za-z])(?=.*\d)[ñA-Za-z\d]+$/;
          if (!password?.match(passwordRegex)) {
               errors.push('Password must contain both letters and numbers.');
          }

          if (password !== confirmPassword) {
               errors.push('Passwords do not match.');
          }

          if (bannedPasswords.includes(password)) {
               errors.push('You cannot use this password');
          }

          setErrorMessages(errors);
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
                    <div className="input-container">
                         <label htmlFor="password">New password:</label>
                         <input
                              className="input-custom"
                              type="password"
                              id="password"
                              ref={passwordInput}
                              onChange={() => validateForm()}
                              required
                         />
                    </div>
                    <div className="input-container">
                         <label htmlFor="confirmPassword">
                              New password confirmation:
                         </label>
                         <input
                              className="input-custom"
                              type="password"
                              id="confirmPassword"
                              ref={passwordConfirmInput}
                              onChange={() => validateForm()}
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
                         <button className="button-custom" type="reset">
                              CLEAR FIELDS
                         </button>
                         <button
                              className="button-custom"
                              type="submit"
                              disabled={
                                   errorMessages.length > 0 ||
                                   !passwordInput.current?.value ||
                                   !passwordConfirmInput.current?.value
                              }
                         >
                              CHANGE PASSWORD
                         </button>
                    </div>
               </form>
          </div>
     );
}
