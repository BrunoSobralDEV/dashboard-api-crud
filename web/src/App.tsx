import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'
import { Customers } from './pages/Customers';
import { Dashboard } from './pages/Dashboard';
import { RandomUsers } from './pages/RandomUsers'
import { Http } from './pages/Http'
import { RandomDogs } from './pages/RandomDogs'
import { SignIn } from './pages/SignIn';
import { Router } from './Router';

function App() {
return (
    // <RandomUsers />  
    // <Http />  
    // <RandomDogs />
    // <Customers />
    <Router />
    // <SignIn />
  )
}

export default App
