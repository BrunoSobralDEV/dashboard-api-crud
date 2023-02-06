import { Routes, Route } from 'react-router-dom';

import { Dashboard } from './pages/Dashboard';
import { RandomUsers } from './pages/RandomUsers';
import { RandomDogs } from './pages/RandomDogs';
import { Customers } from './pages/Customers';
import { Http } from './pages/Http';
import { SignIn } from './pages/SignIn';

export function Router() {
  return(
    <Routes>
      <Route path='/' element={<SignIn />} />
      <Route path='dashboard' element={<Dashboard />}>
        <Route path='' element={<RandomUsers />} />
        <Route path='httpapi' element={<Http />} />
        <Route path='randomdogs' element={<RandomDogs />} />
        <Route path='customers' element={<Customers />} />
      </Route>
    </Routes>
  );
}