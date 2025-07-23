import React from 'react';
import profileImg from '../assets/profile.png';
import { useLoaderData } from 'react-router-dom';

export default function RecipeDetails() {
    const recipe = useLoaderData();

    // **FIXED**: If the loader returns null (e.g., recipe not found), display an error message.
    if (!recipe) {
        return (
            <div className='outer-container'>
                <h3 className='title' style={{ textAlign: 'center', marginTop: '2rem' }}>
                    Recipe Not Found
                </h3>
                <p style={{ textAlign: 'center' }}>
                    The recipe you are looking for does not exist or could not be loaded.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className='outer-container'>
                <div className='profile'>
                    <img src={profileImg} width="50px" height="50px" alt="author profile" />
                    {/* Add a check for email before rendering */}
                    <h5>{recipe.email || 'Anonymous'}</h5>
                </div>
                <h3 className='title'>{recipe.title}</h3>
                <img src={`http://localhost:4000/images/${recipe.coverImage}`} width="220px" height="200px" alt={recipe.title} />
                <div className='recipe-details'>
                    <div className='ingredients'>
                        <h4>Ingredients</h4>
                        <ul>
                            {/* Add a check to ensure ingredients is an array */}
                            {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0
                                ? recipe.ingredients.map((item, index) => <li key={index}>{item}</li>)
                                : <li>No ingredients listed.</li>
                            }
                        </ul>
                    </div>
                    <div className='instructions'>
                        <h4>Instructions</h4>
                        {/* Add a check for instructions */}
                        <span>{recipe.instructions || 'No instructions provided.'}</span>
                    </div>
                </div>
            </div>
        </>
    );
}
// import React from 'react'
// import profileImg from '../assets/profile.png'
// import food from '../assets/foodRecipe.png'
// import { useLoaderData } from 'react-router-dom'

// export default function RecipeDetails() {
//     const recipe=useLoaderData()
//     console.log(recipe)
//   return (
//    <>
//     <div className='outer-container'>
//         <div className='profile'>
//             <img src={profileImg} width="50px" height="50px"></img>
//             <h5>{recipe.email}</h5>
//         </div>
//         <h3 className='title'>{recipe.title}</h3>
//         <img src={`http://localhost:4000/images/${recipe.coverImage}`} width="220px" height="200px"></img>
//         <div className='recipe-details'>
//             <div className='ingredients'><h4>Ingredients</h4><ul>{recipe.ingredients.map(item=>(<li>{item}</li>))}</ul></div>
//             <div className='instructions'><h4>Instructions</h4><span>{recipe.instructions}</span></div>
//         </div>
//     </div>
//    </>
//   )
// }
