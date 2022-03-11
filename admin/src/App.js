import logo from "./logo.svg";
import "./App.css";
import { Admin, Resource, EditGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { UserList } from './components/users';
import { RolesList, RolesCreate } from './components/roles';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import Dashboard from './components/Dashboard';
import authProvider from './utils/authProvider';
import dataProvider from './utils/dataProvider';
import NotFound from './components/NotFound';

function App() {
  return (
    <Admin catchAll={NotFound} dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
      <Resource name="posts" list={RolesList} edit={EditGuesser} create={RolesCreate} icon={PostIcon} />
      <Resource name="users" list={UserList} icon={UserIcon} />
    </Admin>
  );
}

export default App;
