import React, { useContext } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Link } from "react-router-dom"
import DashBoard from "./Components/DashBoard/DashBoard";
import { GlobalVariable } from "./Components/GlobalApp/Globalapp";
import Home from "./Components/Home/Home";
import SignIn from "./Components/LogIn/Login"
import Header from "./Components/HeaderNav/Header"


function App() {
  return (
    <GlobalVariable>

      <Router>
        {/* <Header /> */}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signIn" exact component={SignIn} />
          <Route path="/dash" exact component={DashBoard} />
        </Switch>

      </Router>
    </GlobalVariable>
  );
}

export default App;