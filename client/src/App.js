import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Categories from './Pages/Categories';
import Login from './Pages/Login';
import Register from './Pages/Register';
import LogOut from './Pages/LogOut';
import Profile from './Pages/Profile';
import Details from './Pages/Details';
import Edit from './Pages/Edit';
import CreateSell from './Pages/CreateSell';
import CreateArticle from './Pages/CreateArticle';
import EditProfile from './Pages/EditProfile';
import Error404 from './Pages/Error404';
import Messages from './Pages/Messages'
import Cart from './components/Cart/Cart'
import Home from './Pages/Home';
import Checkout from './Pages/Checkout';
import Blog from './Pages/Blog';
import Transport from './Pages/Transport';
import ArticleDetails from './Pages/ArticleDetails';

function App() {

   return (
      <>
         <Header />
         <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/admin" exact component={Home} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/checkout" exact component={Checkout} />
            <Route path="/blog" exact component={Blog} />
            <Route path="/categories" exact component={Categories} />
            <Route path="/transport" exact component={Transport} />
            <Route path="/categories/:category" exact component={Categories} />
            <Route path="/categories/:category/:id/details" component={Details} />
            <Route path="/blog/:blog/:id/details" component={ArticleDetails} />
            <Route path="/categories/:category/:id/edit" component={Edit} />
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/register" exact component={Register} />
            <Route path="/auth/logout" exact render={LogOut} />
            <Route path='/add-product' exact component={CreateSell} />;
            <Route path='/add-article' exact component={CreateArticle} />;
            <Route path='/profile/:id' exact component={Profile} />;
            <Route path='/profile/:id/edit' exact component={EditProfile} />;
            <Route path='/messages' exact component={Messages} />;
            <Route path='/messages/:id' exact component={Messages} />;
            <Route component={Error404} />
         </Switch>


         <Footer />
      </>
   );
}

export default App;
