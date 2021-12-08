/* eslint-disable react-hooks/exhaustive-deps */
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import { ThemeProvider } from './ThemeContext';


function App() {
  // const [navBanners, setNavbanners] = useState([]);
  // const  {currentUser,setCurrentUser } = useTheme();

  const navBanners = [
    { path: 'home', component: <Home /> },
    { path: 'signup', component: <Signup /> },
    { path: 'login', component: <Login /> },
  ];

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch('http://localhost:3033/navbanners');
  //     const data = await response.json();
  //     console.log(data);
  //     setNavbanners((prev) => [...prev, ...data]);
  //   })();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <ThemeProvider>
      <Router>
        <div className='App'>
          <Navbar navBanners={navBanners} />
          <Routes>
            {navBanners.map((banner, index) => (
              <Route
                path={banner.path === 'home' ? '/' : banner.path}
                element={banner.component}
                key={index}
              />
            ))}
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
