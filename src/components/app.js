import React from 'react';
import ReactDOM from 'react-dom';
import RecipesList from './RecipesList'
import AddButton from './AddButton'
import AddForm from './AddForm'

var globalRecArr = [
  {name: "Bacon Mac & Cheese", ingredients: ["macaroni noodles", "parmesan", "cheddar", "bacon"]},
  {name: "Spaghetti and Meatballs", ingredients: ["spaghetti noodles", "tomato sauce", "ground beef"]}
];

var App = React.createClass({
  getInitialState: function(){
    return {
      recipeArr: globalRecArr,
      showAdd: false
    };
  },
  updateRecipes: function(update){
    updateRec(update);
    this.setState({
      recipeArr: globalRecArr
    });
  },
  deleteRecipe: function(deleted){
    deleteRec(deleted);
    this.setState({
      recipeArr: globalRecArr
    });
  },
  toggleAdd: function(){
    this.setState({
      showAdd: !this.state.showAdd
    });
  },
  render: function(){
    return (
      <div>
        <RecipesList recipes={this.state.recipeArr} 
          handleIngredientChange={this.updateRecipes} 
          deleteRecipe={this.deleteRecipe}/>
        <AddButton toggleAddForm={this.toggleAdd}/>
        {this.state.showAdd && <AddForm handleRecipeAdd={this.updateRecipes} />}
      </div>
    )
  }
});

var updateRec = function(updatedObj){
  updatedObj.ingredients = updatedObj.ingredients.split(",");
  for(var i = 0; i<globalRecArr.length; i++){
    if(globalRecArr[i].name === updatedObj.name){
      globalRecArr[i] = updatedObj;
      return;
    }
  }
  globalRecArr.push(updatedObj);
}

var deleteRec = function(deleted){
  for(var i = 0; i<globalRecArr.length; i++){
    if(globalRecArr[i].name === deleted){
      globalRecArr.splice(i, 1);
      return;
    }
  }
};

ReactDOM.render(<App />, document.getElementById('app'));