import { BrowserRouter, Route, Routes } from 'react-router-dom';
 import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ManagerDashboard from './pages/ManagerDashboard'; 
import NewGoal from './pages/NewGoal';
import AlertBox from './pages/components/AlertBox';
import Protected from './Protected';
function App() {
    return (      
       <BrowserRouter>
            <Routes>
                < Route path='/' element={<Login />} />
                < Route path='/dashboard' element={<Protected><Dashboard /></Protected>} />
                < Route path='/manager-dashboard' element={<ManagerDashboard />} />
                < Route path='/NewGoal' element={<NewGoal />} />
                < Route path='/alertbox' element={<AlertBox/> } />
           </Routes>
      </BrowserRouter>
    );
}

export default App;