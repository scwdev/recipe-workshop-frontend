import React, { useState } from "react"

const Form = (props) => {
    const [ formData, setFormData ] = useState(props.selectedRecipe)

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        if (Array.isArray(formData[name]) === true) {
            const newArr = [...formData[name]]
            newArr.splice(event.target.index, 1, value)
            setFormData({ ...formData, [name]: newArr})
        } else {
            setFormData({ ...formData, [name]: value})
        }
    }

    //TODO formData._id doesn't exist when submitting a post route... needs a solve...
    const handleSubmit = async (event) => {
        event.preventDefault()
        props.handleSubmit(formData)
        if (formData._id !== undefined) {
            props.history.push(`/${formData.name}/${formData._id}`)
        } else {
            props.history.push(`/`)
        }
    }

    const addIngredient = () => {
        setFormData({...formData, "ingredients": [...formData["ingredients"], ""]})
    }

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Title" type="text" name="name" value={formData.name} onChange={handleChange} /> <br/>
            <input placeholder="Description" type="url" name="img" value={formData.img} onChange={handleChange} /> <br/>
            <input placeholder="image url" type="text" name="description" value={formData.description} onChange={handleChange} /><br/>
            {formData.ingredients.map((i, x) => (
                <input placeholder="ingredient" index={x} type="text" name="ingredients" value={i} onChange={handleChange} />
            ))}
            <input type="button" name="add-ingredient" value="add ingredient" onClick={addIngredient}/>
            <input type="submit"/>
        </form>
    )
}

export default Form