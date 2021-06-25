import './App.css';
import { Route, Switch, BrowserRouter,Redirect} from 'react-router-dom';
import {AuthContext} from "./context/signinContext";
import { useContext } from 'react';//we need to use this in routing after add the other context
import SignIn from './components/usersComponents/users/signIn';
import Table from "./components/usersComponents/students/table";



function App() {
  const context=useContext(AuthContext);
  return (
  <>
  <BrowserRouter>
  <Switch>
    <Route exact path='/'>
    <div>welcome </div>
    </Route>
    <Route exact path='/table'>
    {
        !context.loggedIn?<Redirect to="/signin"/>:<Table/>
      }
     
    </Route>
    <Route exact path='/signin'>
      {
        !context.loggedIn?<SignIn/>:<Redirect to="/table"/>
      }
    
    </Route>
  </Switch>
  </BrowserRouter>
  </>
  )
}

export default App;
