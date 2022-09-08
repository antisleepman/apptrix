import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import RequireAuth from "./auth/RequireAuth";
import { Mainpage } from "./pages/Mainpage";
import { Taskspage } from "./pages/Taskspage";
import { Timesheets } from "./pages/Timesheets";
import { TimesheetsProject } from "./components/TimesheetsProject";


function App() {
  const token = localStorage.getItem('accesstoken')
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        {/* Публичные пути */}
        <Route path='login' element={<Login/>}/> 
        {/* Приватные пути */}
        <Route element={<RequireAuth/>}>
          <Route path="/" element={<Mainpage/>}/>
          <Route path="Tasks" element={<Taskspage/>}/>
          <Route path="Timesheets" element={<Timesheets/>}/>
          <Route path="TimesheetsProject/:id"   element={<TimesheetsProject/>} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
