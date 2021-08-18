import React from "react"
import { Link } from "react-router-dom"

const DisplayRecipe = (props) => {

    const id = props?.match.params.id
    const recipe = props?.recipes.find(({ _id }) => (_id === id))

    if ( recipe !== props.selectedRecipe) {
        props.setSelectedRecipe(recipe)
    }

    const handleDelete = () => {
        if (window.confirm("Are you sure?")) {
            props.handleDelete(id)
            props.history.push('/')
        }
    }

    return (
        <div className="display-recipe" >
            <h2>{recipe?.name}</h2>
            <p>{recipe?.description}</p>
            <ul>{recipe?.ingredients.map((i) => (<li>{i}</li>))}</ul>
            <img src={recipe?.img} height="250px"/>
            <button onClick={() => {props.history.push(`${props.match.url}/update`)}} className="button" id="edit" >
                Edit
            </button>
            <button onClick={handleDelete} className="button" id="delete">
                Delete
            </button>
        </div>
    )
}

export default DisplayRecipe