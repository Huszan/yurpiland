import './App.scss';

import GlobalStates from './context/GlobalStates';
import Progression from './context/Progression';

import NavDrawer from './components/nav-drawer/NavDrawer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <GlobalStates>
      <Progression>
        <div className="App">
          <div className='App--background' />
          <NavDrawer />
          <Outlet />
        </div>
      </Progression>
    </GlobalStates>
  );
}

export default App;
