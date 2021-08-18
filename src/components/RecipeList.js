import React from "react"
import { Link } from "react-router-dom"

const RecipeList = (props) => {
    // console.log(props.recipes.recipes)
    const recipes = props.recipes.map( item => ( item ))

    return( 
        <ul>
            {recipes.map(( item, index ) => (
                <Link to={ `/${item.name}/${ item._id }` }>
                    <li key={ item._id }>{ item.name }</li>
                </Link>
            ))}
        </ul>
    )
}

export default RecipeList