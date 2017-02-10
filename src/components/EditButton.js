import React from 'react'

export default class EditButton extends React.Component{

  handleToggle() {
    this.props.toggleForm();
  }

  render() {
    return <button className="btn btn-success col-md-5" onClick={ () => this.handleToggle() }>Edit</button>
  }
};