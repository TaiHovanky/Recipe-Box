import React from 'react'

export default class DeleteButton extends React.Component{

  handleDelete(e) {
    var toBeDeleted = this.props.recipeNameStr;
    this.props.deleteRecipe(toBeDeleted);
  }

  render() {
    return <button 
      className="btn btn-danger col-md-5 col-md-offset-2" 
      onClick={ () => this.handleDelete() }>
      Delete
      </button>
  }
};