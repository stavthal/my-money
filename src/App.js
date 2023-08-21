import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

//Hooks
import { useAuthContext } from "./hooks/useAuthContext";

//Components
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    authIsReady && (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home}>
              {!user && <Redirect to="/login" />}
            </Route>
            <Route path="/login" component={Login}>
              {user && <Redirect to="/" />}
            </Route>
            <Route path="/signup" component={Signup}>
              {user && <Redirect to="/" />}
            </Route>
            <Route path="*" component={() => <h1>Error 404.Not found</h1>} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  );
}

export default App;
