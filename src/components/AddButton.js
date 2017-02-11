import React from 'react'

export default class AddButton extends React.Component{
  
  handleToggle() {
    this.props.toggleAddForm();
  }

  render() {
    return (
      <button className='btn btn-default col-md-6 col-md-offset-3' 
        onClick={() => this.handleToggle()}>
        Add Recipe
      </button>
    );
  }
};