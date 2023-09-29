import './App.scss';
import NavDrawer from './components/nav-drawer/NavDrawer';
import WindowManager from './utils/WindowManager';
import Router from './Router';
import GlobalStates from './utils/GlobalStates';

function App() {
  return (
    <GlobalStates>
      <WindowManager>
        <div className="App">
          <div className='App--background' />
          <NavDrawer></NavDrawer>
          <Router />
        </div>
      </WindowManager>
    </GlobalStates>
  );
}

export default App;
