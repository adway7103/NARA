// import { Outlet } from "react-router-dom";
// import { useState, useEffect } from "react";

// function App() {
//   const [theme, setTheme] = useState(
//     localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
//   );

//   useEffect(() => {
//     const element = document.documentElement;
//     if (theme === "dark") {
//       element.classList.add("dark");
//     } else {
//       element.classList.remove("dark");
//     }
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   return (
//     <div>
//       <button
//         onClick={toggleTheme}
//         className="w-10 h-10 leading-10 text-2xl rounded-full m-1 text-white bg-gray-800 dark:bg-gray-200">
//         <ion-icon name={theme === "light" ? "sunny" : "moon"}></ion-icon>
//       </button>
//       <Outlet />
//     </div>
//   );
// }
// export default App;

import { Outlet } from "react-router-dom";
function App() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
export default App;

// import { ThemeProvider } from "./contexts/theme";
// import { useEffect, useState } from "react";
// const[themeMode,setThemeMode]=useState('light')
// const darkTheme=()=>{
//   setThemeMode('dark')
// }
// const lightTheme=()=>{
//   setThemeMode('light')
// }

// useEffect(()=>{
//   document.querySelector('html').classList.remove('dark',"light")
//   document.querySelector('html').classList.add(themeMode)
// },[themeMode])
