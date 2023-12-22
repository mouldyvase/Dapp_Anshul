// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import { useNavigate, useParams } from 'react-router-dom';
// import '../css/PopupForm.css';

// const PopupForm = () => {
//   const { id } = useParams();



//   return (
//     <>
//       <header className='header'>
//         <div>
//           HEALTH APP
//         </div>
//       </header>

//       <main>
//         <div class="Loginbox">
//           <div class="Loginpage">
//             <h2 class="Loginheading">Registration Page</h2>
//           </div>
//           <div>
//             <form   >
//               <div class="Names">
                
//                 <label for="Email">Email:</label>
//                 <div>
//                   <input type="email" class="usertextboxsize" value={Email} id="Email" name="Email" placeholder="Enter your Email"
//                     onChange={(e) => {
//                       setEmail(e.target.value)
//                       setIsValidEmail(validator.isEmail(Email));
//                     }} required />
//                   {isValidEmail && Email.length > 0 && (
//                     <span style={{ color: 'green' }}>&#x2714;</span>
//                   )}
//                   <br />
//                 </div>
//               </div>
//               <div class="Names">
//                 {!isValidPassword && Password.length > 0 && (
//                   <span style={{ color: 'red' }}>
//                     Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character.
//                   </span>
//                 )}
//                 <label for="password">Password:</label>
//                 <div>
//                   <input type="password" class="pwdtextboxsize" value={Password} id="password" name="pwd"
//                     placeholder="Enter your password" onChange={(e) => {
//                       setpass(e.target.value);
//                       setIsValidPassword(validatePassword(e.target.value));
//                     }} required />

//                   {isValidPassword && Password.length > 0 && (
//                     <span style={{ color: 'green' }}>&#x2714;</span>
//                   )} <br /><br />
//                 </div>
//               </div>
//               <div class="Submitbtn">
//                 <Button type='submit' style={{ marginRight: "10%" }}>Login</Button>
//               </div>
//             </form>

//           </div>
//         </div>
//       </main>
//     </>
//   );
// };

// export default PopupForm;
