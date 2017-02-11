import React from 'react'

export default class AddForm extends React.Component{

  handleSave(event) {
    event.preventDefault();
    var newRecipeObj = {
      name: this.refs.newRecipeName.value,
      ingredients: this.refs.newRecIngredients.value
    };
    this.props.handleRecipeAdd(newRecipeObj);
    this.refs.newForm.reset();
  }

  render() {
    return (
      <div className="addForm">
        <form onSubmit={(event) => this.handleSave(event)} 
            ref="newForm" 
            className="form-horizontal">
          <label className="col-md-offset-1"><h4>Recipe</h4></label>
            <input type="text" 
                className="form-control" 
                ref="newRecipeName">
            </input>
          <label className="col-md-offset-1"><h4>Ingredients</h4></label>
            <input type="text" 
                className="form-control" 
                ref="newRecIngredients">
            </input>
            <input type="submit" 
                className="btn btn-success col-md-6 col-md-offset-3" 
                value="Save">
            </input>  
        </form>
      </div>
    );  
  }
};