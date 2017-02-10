import React from 'react'

export default class EditForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      ingredientStr: this.props.ingredientsStrList.join(", ")
    }
  }

  changeRecipe() {
    var recipeObj = {
      name: this.refs.nameStr.value,
      ingredients: this.refs.ingredientStr.value
    };
    this.props.handleIngredientChange(recipeObj);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.changeRecipe.bind(this)} className="form-horizontal">
          <div className="form-group recipeName">
            <label className="col-md-offset-1"><h4>Recipe</h4></label>
            <input type="text"  
              ref="nameStr" 
              className="form-control" 
              defaultValue={this.props.recipeNameStr}></input>
          </div>
          <div className="form-group">
            <label className="col-md-offset-1"><h4>Ingredients</h4></label>
            <input type="text"  
              ref="ingredientStr" 
              className="form-control" 
              defaultValue={this.props.ingredientsStrList}>
            </input>
            <input 
              type="submit" 
              className="btn btn-success editSubmit col-md-6 col-md-offset-3" 
              value="Save Edits">
            </input>
          </div>
        </form>
      </div>
    )
  }
}