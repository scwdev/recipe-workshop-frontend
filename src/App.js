import './App.css';
import { useState, useEffect } from "react"
import { Route, Link, Switch } from "react-router-dom"

import RecipeList from "./components/RecipeList"
import DisplayRecipe from './components/DisplayRecipe';
import Form from './components/Form'

function App() {

  const dbUrl = "https://recipe-workshop.herokuapp.com/recipes"

  const recipeTemplate = {
    name: "",
    description: "",
    ingredients: [""],
    url: "",
  }

  const [ recipes, setRecipes ] = useState([])
  const [ selectedRecipe, setSelectedRecipe ] = useState(recipeTemplate)

  const getRecipes = async () => {
    const response = await fetch( dbUrl + "/" )
    const data = await response.json()
    setRecipes( data.recipes )
  }

  const handleUpdate = async (request) => {
    const response = await fetch( dbUrl + "/" + request._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    })
    getRecipes()
  }

  const handleCreate = async (request) => {
    await fetch( dbUrl, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    })
    getRecipes()
  }

  const handleDelete = async (request) => {
    await fetch( dbUrl + "/" + request, {
      method: "delete"})
    getRecipes()
  }

  useEffect( () => { getRecipes() }, [] )

  return (
    <div className="App">
      React App
      <RecipeList recipes={recipes} />
      <Link to="/newrecipe">
        <button>
          Add New Recipe!
        </button>
      </Link>
      <Switch>
        <Route exact path="/:name/:id" render={(routerProps) => 
          <DisplayRecipe {...routerProps} dbUrl={dbUrl} recipes={recipes}
          setSelectedRecipe={setSelectedRecipe}
          selectedRecipe={selectedRecipe}
          handleDelete={handleDelete}/>}
        />
         <Route path="/:name/:id/update" render={(routerProps) => 
          <Form {...routerProps} dbUrl={dbUrl} recipes={recipes}
          selectedRecipe={selectedRecipe}
          handleSubmit={handleUpdate}/>}
        />
        <Route path="/newrecipe" render={(routerProps) => 
          <Form {...routerProps} dbUrl={dbUrl} recipes={recipes}
          selectedRecipe={recipeTemplate}
          handleSubmit={handleCreate}/>}
        />
      </Switch>

    </div>
  );
}

export default App;
