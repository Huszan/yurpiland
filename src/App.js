import './App.scss';

import WindowManager from './utils/WindowManager';
import GlobalStates from './utils/GlobalStates';
import Progression from './utils/Progression';

import NavDrawer from './components/nav-drawer/NavDrawer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <GlobalStates>
      <WindowManager>
        <Progression>
          <div className="App">
            <div className='App--background' />
            <NavDrawer />
            <Outlet />
          </div>
        </Progression>
      </WindowManager>
    </GlobalStates>
  );
}

export default App;
