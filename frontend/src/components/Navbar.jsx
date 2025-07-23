import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import InputForm from './InputForm';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // **FIX 1**: Correctly determine the initial login state.
  // `!!token` converts the token string (or null) to a true boolean.
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));

  // This effect will re-check the login status whenever you navigate
  // or when the localStorage might have changed after login/logout.
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLogin(!!localStorage.getItem("token"));
    };

    // Listen for changes to localStorage from other tabs
    window.addEventListener('storage', handleStorageChange);
    
    // Also check on component mount/update
    handleStorageChange();

    // Cleanup listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Safely parse user data to prevent crashes
  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Failed to parse user data from localStorage:", error);
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLogin(false);
    navigate("/"); // Redirect to home page after logout
  };

  const handleLinkClick = (e, path) => {
    if (!isLogin) {
      // If user is not logged in, prevent navigation and open login modal
      e.preventDefault();
      setIsOpen(true);
    } else {
      // If logged in, proceed with navigation
      navigate(path);
    }
  };

  return (
    <>
      <header>
        <h2>Food Blog</h2>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          {/* **FIX 2**: Links now always point to the correct path. The onClick handler manages access. */}
          <li>
            <a href="/myRecipe" onClick={(e) => handleLinkClick(e, '/myRecipe')}>
              My Recipe
            </a>
          </li>
          <li>
            <a href="/favRecipe" onClick={(e) => handleLinkClick(e, '/favRecipe')}>
              Favourites
            </a>
          </li>
          <li>
            {/* **FIX 3**: Simplified Login/Logout button logic */}
            <p className='login' onClick={isLogin ? handleLogout : () => setIsOpen(true)} style={{ cursor: 'pointer' }}>
              {isLogin ? "Logout" : "Login"}
              {isLogin && user?.email ? ` (${user.email})` : ""}
            </p>
          </li>
        </ul>
      </header>
      {isOpen && <Modal onClose={() => setIsOpen(false)}><InputForm setIsOpen={() => { setIsOpen(false); setIsLogin(true); }} /></Modal>}
    </>
  );
}

// import React, { useEffect, useState } from 'react'
// import Modal from './Modal'
// import InputForm from './InputForm'
// import { NavLink } from 'react-router-dom'

// export default function Navbar() {
//   const [isOpen,setIsOpen]=useState(false)
//   let token=localStorage.getItem("token")
//   const [isLogin,setIsLogin]=useState(token ? false : true)
//   let user=JSON.parse(localStorage.getItem("user"))

//   useEffect(()=>{
//     setIsLogin(token ? false : true)
//   },[token])

//   const checkLogin=()=>{
//     if(token){
//       localStorage.removeItem("token")
//       localStorage.removeItem("user")
//       setIsLogin(true)

//     }
//     else{
//       setIsOpen(true)
//     }
//   }

//   return (
//     <>
//         <header>
//             <h2>Food Blog</h2>
//             <ul>
//                 <li><NavLink to="/">Home</NavLink></li>
//                 <li onClick={()=>isLogin && setIsOpen(true)}><NavLink to={ !isLogin ? "/myRecipe" : "/"}>My Recipe</NavLink></li>
//                 <li onClick={()=>isLogin && setIsOpen(true)}><NavLink to={ !isLogin ? "/favRecipe" : "/"}>Favourites</NavLink></li>
//                 <li onClick={checkLogin}><p className='login'>{ (isLogin)? "Login": "Logout" }{user?.email ? `(${user?.email})` : ""}</p></li>
//             </ul>
//         </header>
//        { (isOpen) && <Modal onClose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></Modal>}
//     </>
//   )
// }
