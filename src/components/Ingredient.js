import React from 'react'

export default class Ingredient extends React.Component {
  render() {
    return (
      <li className="list-group-item">
        {this.props.ingredient}
      </li>
    )
  }
};