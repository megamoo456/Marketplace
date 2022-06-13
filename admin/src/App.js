import "./App.css";
import { Admin, Resource } from "react-admin";
import { UserList, UserCreate ,UserEdit} from './components/users';
import { RoleList, RolesCreate, RoleEdit } from './components/role';
import { BlogList, BlogsCreate, BlogEdit } from './components/blog';
import { ArticleList} from './components/article';
import { OfferList } from './components/offer';
import { ProductList } from './components/product';
import PostIcon from '@material-ui/icons/Book';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import UserIcon from '@material-ui/icons/Group';
import DescriptionIcon from '@material-ui/icons/Description';
import authProvider from './utils/authProvider';
import dataProvider from './utils/dataProvider';
import NotFound from './components/NotFound';
import MyLoginPage from './pages/login';




function App() {
  return (
    <Admin loginPage={MyLoginPage} catchAll={NotFound}  authProvider={authProvider} dataProvider={dataProvider}>
      
      <Resource name="products"  icon={BookmarksIcon} list={ProductList} />
      <Resource name="offer"  icon={LocalOfferIcon} list={OfferList} />
      <Resource name="user" list={UserList} icon={UserIcon} create={UserCreate} edit={UserEdit}/> 
      <Resource name="role" list={RoleList} icon={PostIcon} create={RolesCreate} edit={RoleEdit} /> 
      <Resource name="blog" list={BlogList} icon={RssFeedIcon} create={BlogsCreate} edit={BlogEdit} /> 
      <Resource name="article" list={ArticleList} icon={DescriptionIcon} /> 
    </Admin>
  );
}

export default App;
