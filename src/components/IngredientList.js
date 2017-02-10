import React from 'react'
import Ingredient from './Ingredient'

const IngredientList = (props) => {
  <div className="panel-body">
    <h3>Ingredients</h3>
    <ul className="list-group">
      {props.ingredients.map(function(ingredient){
        return <Ingredient ingredient={ingredient} />
      })}
    </ul>
      <EditButton toggleForm={props.toggleForm} />
      <DeleteButton deleteRecipe={props.deleteRecipe} recipeNameStr={props.recipeName}/>
    {props.showForm && <EditForm recipeNameStr={props.recipeName} ingredientsStrList={props.ingredients} handleIngredientChange={props.handleIngredientChange}
/>}
  </div>
}

export default IngredientList