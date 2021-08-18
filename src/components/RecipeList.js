import React from "react"
import { Link } from "react-router-dom"

const RecipeList = (props) => {
    const recipes = props.recipes.map( item => ( item ))

    return( 
        <ul className="recipe-list" >
            {recipes.map(( item, index ) => (
                <Link to={ `/${item.name}/${ item._id }` }>
                    <li className="recipe-link" key={ item._id }
                    style={{backgroundImage: `url(${item.img})`}}>{ item.name }</li>
                </Link>
            ))}
        </ul>
    )
}

export default RecipeList