import './App.scss';
import WindowManager from './utils/WindowManager';
import NavDrawer from './components/nav-drawer/NavDrawer';
import GlobalStates from './utils/GlobalStates';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <GlobalStates>
      <WindowManager>
        <div className="App">
          <div className='App--background' />
          <NavDrawer />
          <Outlet />
        </div>
      </WindowManager>
    </GlobalStates>
  );
}

export default App;
