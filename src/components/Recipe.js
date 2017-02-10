import React from 'react'
import IngredientList from './IngredientList'

export default class Recipe extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showIngedients: false,
      showEditForm: false
    }
  }
      
  showRecipe(e) {
    this.setState({
      showIngredients: !this.state.showIngredients
    });
  }

  showEdits() {
    this.setState({
      showEditForm: !this.state.showEditForm
    });
  }

  render() {
    return (
      <div className="panel panel-info">
        <h2 className="panel-heading" onClick={this.showRecipe}>{this.props.recipe.name}</h2>
        {this.state.showIngredients && <IngredientList recipeName={this.props.recipe.name} ingredients={this.props.recipe.ingredients} handleIngredientChange={this.props.handleIngredientChange} showForm={this.state.showEditForm} toggleForm={this.showEdits} deleteRecipe={this.props.deleteRecipe}/>}
      </div>
    )
  }
};
