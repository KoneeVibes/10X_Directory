import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Authentication } from './page/authentication';
import { UsersPage } from './page/users';
import { RouteProtector } from './config/routeProtector';
import { OpportunitiesPage } from './page/opportunities';
import { AddOpportunityPage } from './page/opportunities/addopportunity';
import { EditOpportunityPage } from './page/opportunities/editopportunity';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Authentication />} />
        <Route path='/opportunities' element={<OpportunitiesPage />} />
        <Route path='/addopportunity' element={<AddOpportunityPage />} />
        <Route path='/editopportunity/:id' element={<EditOpportunityPage />} />
        <Route element={<RouteProtector allowedRoles={['Super Admin', 'Admin', 'Support']} />}>
          <Route path="/users" element={<UsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
