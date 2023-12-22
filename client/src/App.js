
import React from 'react';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';


import Client_signup from './components/client_signup';
import Client_login from './components/client_login';
import Client_dashboard from './components/client_dashboard';
import PopupForm from './components/PopupForm';

function App() {

	
return (
	<Router>
	{/* <Navbar /> */}
	
	<Routes>
		<Route exact path='/'  element={<Client_signup/>} />
		<Route export path='/login' element={<Client_login/>}/>
        <Route export path='/dash' element={<Client_dashboard/>} />
	    {/* <Route export path='/register/:id' element={<PopupForm/>} /> */}

	</Routes>
	</Router>
);
}

export default App;
