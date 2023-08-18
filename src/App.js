import { BrowserRouter, Route, Switch } from "react-router-dom";

//Components
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="*" component={() => <h1>Error 404.Not found</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
