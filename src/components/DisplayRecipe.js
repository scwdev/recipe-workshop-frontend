import React from "react"
import { Link } from "react-router-dom"

const DisplayRecipe = (props) => {

    const id = props?.match.params.id
    const recipe = props?.recipes.find(({ _id }) => (_id === id))

    if ( recipe !== props.selectedRecipe) {
        props.setSelectedRecipe(recipe)
    }

    const handleDelete = () => {
        console.log(id)
        props.handleDelete(id)
    }

    console.log(props)
    return (
        <div>
            <h2>{recipe?.name}</h2>
            <p>{recipe?.description}</p>
            <ul>{recipe?.ingredients.map((i) => (<li>{i}</li>))}</ul>
            <Link to={`${props.match.url}/update`}>
                <button>Edit</button>
            </Link>
            <Link to="/">
                <button onClick={handleDelete}>Delete</button>
            </Link>
        </div>
    )
}

export default DisplayRecipe