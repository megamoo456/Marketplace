
import "./App.css";
import { Admin, Resource } from "react-admin";
import { UserList, UserCreate ,UserEdit} from './components/users';
import { RoleList, RolesCreate, RoleEdit } from './components/role';
import { ProductList } from './components/product';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import authProvider from './utils/authProvider';
import dataProvider from './utils/dataProvider';
import NotFound from './components/NotFound';
import MyLoginPage from './pages/login';




function App() {
  return (
    <Admin loginPage={MyLoginPage} catchAll={NotFound}  authProvider={authProvider} dataProvider={dataProvider}>
      <Resource name="products" list={ProductList} />
      <Resource name="user" list={UserList} icon={UserIcon} create={UserCreate} edit={UserEdit}/> 
      <Resource name="role" list={RoleList} icon={PostIcon} create={RolesCreate} edit={RoleEdit} /> 
    </Admin>
  );
}

export default App;
