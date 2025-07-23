import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import MainNavigation from './components/MainNavigation';
import axios from 'axios';
import AddFoodRecipe from './pages/AddFoodRecipe';
import EditRecipe from './pages/EditRecipe';
import RecipeDetails from './pages/RecipeDetails';

const getAllRecipes = async () => {
  try {
    const response = await axios.get('http://localhost:4000/recipe');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch all recipes:", error);
    return []; // Return an empty array on error
  }
};

const getMyRecipes = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return []; // Return empty if no user
    const allRecipes = await getAllRecipes();
    return allRecipes.filter(item => item.createdBy === user._id);
  } catch (error) {
    console.error("Failed to fetch my recipes:", error);
    return [];
  }
};

const getFavRecipes = () => {
  try {
    const favs = localStorage.getItem("fav");
    return favs ? JSON.parse(favs) : [];
  } catch (error) {
    console.error("Failed to fetch favorite recipes:", error);
    return [];
  }
};

// **FIXED**: This loader is now robust and handles errors gracefully.
const getRecipe = async ({ params }) => {
  try {
    const recipeResponse = await axios.get(`http://localhost:4000/recipe/${params.id}`);
    let recipe = recipeResponse.data;

    // If the recipe and its creator exist, fetch the user's email
    if (recipe && recipe.createdBy) {
      try {
        const userResponse = await axios.get(`http://localhost:4000/user/${recipe.createdBy}`);
        recipe.email = userResponse.data.email;
      } catch (userError) {
        // If user not found, assign a default email and don't crash
        recipe.email = 'Anonymous';
      }
    }
    return recipe;
  } catch (error) {
    console.error("Failed to load recipe details:", error);
    // Return null if the recipe itself isn't found
    return null;
  }
};

const router = createBrowserRouter([
  {
    path: "/", element: <MainNavigation />, children: [
      { path: "/", element: <Home />, loader: getAllRecipes },
      { path: "/myRecipe", element: <Home />, loader: getMyRecipes },
      { path: "/favRecipe", element: <Home />, loader: getFavRecipes },
      { path: "/addRecipe", element: <AddFoodRecipe /> },
      { path: "/editRecipe/:id", element: <EditRecipe /> },
      { path: "/recipe/:id", element: <RecipeDetails />, loader: getRecipe }
    ]
  }
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}
// import React from 'react'
// import './App.css'
// import {createBrowserRouter,RouterProvider} from "react-router-dom"
// import Home from './pages/Home'
// import MainNavigation from './components/MainNavigation'
// import axios from 'axios'
// import  AddFoodRecipe  from './pages/AddFoodRecipe'
// import EditRecipe from './pages/EditRecipe'
// import RecipeDetails from './pages/RecipeDetails'


// const getAllRecipes=async()=>{
//   let allRecipes=[]
//   await axios.get('http://localhost:4000/recipe').then(res=>{
//     allRecipes=res.data
//   })
//   return allRecipes
// }

// const getMyRecipes=async()=>{
//   let user=JSON.parse(localStorage.getItem("user"))
//   let allRecipes=await getAllRecipes()
//   return allRecipes.filter(item=>item.createdBy===user._id)
// }

// const getFavRecipes=()=>{
//   return JSON.parse(localStorage.getItem("fav"))
// }

// const getRecipe=async({params})=>{
//   let recipe;
//   await axios.get(`http://localhost:4000/recipe/${params.id}`)
//   .then(res=>recipe=res.data)

//   await axios.get(`http://localhost:4000/user/${recipe.createdBy}`)
//   .then(res=>{
//     recipe={...recipe,email:res.data.email}
//   })

//   return recipe
// }

// const router=createBrowserRouter([
//   {path:"/",element:<MainNavigation/>,children:[
//     {path:"/",element:<Home/>,loader:getAllRecipes},
//     {path:"/myRecipe",element:<Home/>,loader:getMyRecipes},
//     {path:"/favRecipe",element:<Home/>,loader:getFavRecipes},
//     {path:"/addRecipe",element:<AddFoodRecipe/>},
//     {path:"/editRecipe/:id",element:<EditRecipe/>},
//     {path:"/recipe/:id",element:<RecipeDetails/>,loader:getRecipe}
//   ]}
 
// ])

// export default function App() {
//   return (
//    <>
//    <RouterProvider router={router}></RouterProvider>
//    </>
//   )
// }
