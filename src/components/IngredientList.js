import React from 'react'
import Ingredient from './Ingredient'
import EditButton from './EditButton'
import DeleteButton from './DeleteButton'
import EditForm from './EditForm'

export default class IngredientList extends React.Component {

  render() {
    console.log('this', this)
    return (<div className="panel-body">
    <h3>Ingredients</h3>
    <ul className="list-group">
      {this.props.ingredients.map(function(ingredient){
        return <Ingredient ingredient={ingredient} />
      })}
    </ul>
      <EditButton toggleForm={this.props.toggleForm} />
      <DeleteButton 
        deleteRecipe={this.props.deleteRecipe} 
        recipeNameStr={this.props.recipeName}/>
      {this.props.showForm && <EditForm 
        recipeNameStr={this.props.recipeName} 
        ingredientsStrList={this.props.ingredients} 
        handleIngredientChange={this.props.handleIngredientChange}/>}
    </div>)
  }
}