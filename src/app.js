import React from 'react';
import ReactDOM from 'react-dom';

var globalRecArr = [{name: "Bacon Mac & Cheese", ingredients: ["macaroni noodles", "parmesan", "cheddar", "bacon"]}, {name: "Spaghetti and Meatballs", ingredients: ["spaghetti noodles", "tomato sauce", "ground beef"]}];

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
        <RecipesList recipes={this.state.recipeArr} handleIngredientChange={this.updateRecipes} deleteRecipe={this.deleteRecipe}/>
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

var RecipesList = function(props){
    var ingredientChange = props.handleIngredientChange;
    var deleteRec = props.deleteRecipe;
    return (
        <ul>
          {props.recipes.map(function(recipe, ingredChange){
            return <Recipe recipe={recipe} handleIngredientChange={ingredientChange} deleteRecipe={deleteRec}/>
          })}
        </ul>
    );
}

var Recipe = React.createClass({
  getInitialState: function(){
    return {
      showIngedients: false,
      showEditForm: false
    }
  },
  showRecipe: function(e){
    this.setState({
      showIngredients: !this.state.showIngredients
    });
  },
  showEdits: function(){
    this.setState({
      showEditForm: !this.state.showEditForm
    });
  },
  render: function(){
    return (
      <div className="panel panel-info">
        <h2 className="panel-heading" onClick={this.showRecipe}>{this.props.recipe.name}</h2>
        {this.state.showIngredients && <IngredientList recipeName={this.props.recipe.name} ingredients={this.props.recipe.ingredients} handleIngredientChange={this.props.handleIngredientChange} showForm={this.state.showEditForm} toggleForm={this.showEdits} deleteRecipe={this.props.deleteRecipe}/>}
      </div>
    )
  }
});

var IngredientList = function(props){
    return (
      <div className="panel-body">
        <h3>Ingredients</h3>
        <ul className="list-group">
          {props.ingredients.map(function(ingredient){
            return <Ingredient ingredient={ingredient} />
          })}
        </ul>
          <EditButton toggleForm={props.toggleForm} />
          <DeleteButton deleteRecipe={props.deleteRecipe} recipeNameStr={props.recipeName}/>
        {props.showForm && <EditForm recipeNameStr={props.recipeName} ingredientsStrList={props.ingredients} handleIngredientChange={props.handleIngredientChange}
/>}
      </div>
    );
};

var Ingredient = function(props){
    return (
      <li className="list-group-item">
        {props.ingredient}
      </li>
    );
};

var EditButton = React.createClass({
  handleToggle: function(e){
    e.preventDefault();
    this.props.toggleForm();
  },
  render: function(){
    return <button className="btn btn-success col-md-5" onClick={this.handleToggle}>Edit</button>
  }
});

var DeleteButton = React.createClass({
  handleDelete: function(e){
    var toBeDeleted = this.props.recipeNameStr;
    this.props.deleteRecipe(toBeDeleted);
  },
  render: function(){
    return <button className="btn btn-danger col-md-5 col-md-offset-2" onClick={this.handleDelete}>Delete</button>
  }
});

var EditForm = React.createClass({
  getInitialState: function(){
    return {
      ingredientStr: this.props.ingredientsStrList.join(", ")  
    }
  },
  changeRecipe: function(e){
    e.preventDefault();
    var recipeObj = {
      name: this.refs.nameStr.value,
      ingredients: this.refs.ingredientStr.value
    };
    this.props.handleIngredientChange(recipeObj);
  },
  render: function(){
    return (
      <div>
        <form onSubmit={this.changeRecipe.bind(this)} className="form-horizontal">
          <div className="form-group recipeName">
            <label className="col-md-offset-1"><h4>Recipe</h4></label>
            <input type="text"  ref="nameStr" className="form-control" defaultValue={this.props.recipeNameStr}></input>
          </div>
          <div className="form-group">
            <label className="col-md-offset-1"><h4>Ingredients</h4></label>
            <input type="text"  ref="ingredientStr" className="form-control" defaultValue={this.props.ingredientsStrList}></input>
            <input type="submit" className="btn btn-success editSubmit col-md-6 col-md-offset-3" value="Save Edits"></input>
          </div>
        </form>
      </div>
    )
  }
});

var AddButton = React.createClass({
  handleToggle: function(e){
    this.props.toggleAddForm();
  },
  render: function(){
    return (
      <button className='btn btn-default col-md-6 col-md-offset-3' onClick={this.handleToggle}>Add Recipe</button>
    );
  }
});

var AddForm = React.createClass({
  handleSave: function(e){
    e.preventDefault();
    var newRecipeObj = {
      name: this.refs.newRecipeName.value,
      ingredients: this.refs.newRecIngredients.value
    };
    this.props.handleRecipeAdd(newRecipeObj);
    this.refs.newForm.reset();
  },
  render: function(){
    return (
      <div className="addForm">
        <form onSubmit={this.handleSave.bind(this)} ref="newForm" className="form-horizontal">
          <label className="col-md-offset-1"><h4>Recipe</h4></label>
            <input type="text" className="form-control" ref="newRecipeName"></input>
          <label className="col-md-offset-1"><h4>Ingredients</h4></label>
            <input type="text" className="form-control" ref="newRecIngredients"></input>
            <input type="submit" className="btn btn-success col-md-6 col-md-offset-3" value="Save"></input>  
        </form>
      </div>
    );  
  }
});

ReactDOM.render(<App />, document.getElementById('app'));