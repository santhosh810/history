import {Component} from "react"
import { BrowserRouter  ,Route,Switch} from "react-router-dom"
import SignInPage from "./component/SignInPage"
import LogInPage from "./component/LogInPage"

import './App.css';

class App extends Component{
    render(){
        return (
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={SignInPage} />
              <Route exact path="/login" component={LogInPage} />
            </Switch>
          </BrowserRouter>
        );
    }
}

export default App;
