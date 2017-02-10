import React from 'react'
import Recipe from './Recipe'

export default class RecipesList extends React.Component {
    constructor(props){
        super(props);
    }
    
  render(){
    var ingredientChange = this.props.handleIngredientChange;
    var deleteRec = this.props.deleteRecipe;
    return (
      <ul>
      {this.props.recipes.map(function(recipe, ingredChange){
        return <Recipe recipe={recipe} handleIngredientChange={ingredientChange} deleteRecipe={deleteRec}/>
      })}
      </ul>
    );
  }
}