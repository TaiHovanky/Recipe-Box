var globalRecArr = [{name: "Bacon Mac & Cheese", ingredients: ["macaroni noodles", "parmesan", "cheddar", "bacon"]}, {name: "Spaghetti and Meatballs", ingredients: ["spaghetti noodles", "tomato sauce", "ground beef"]}];

var App = React.createClass({
  getInitialState: function(){
    return {
      recipeArr: globalRecArr
    };
  },
  updateRecipes: function(update){
    updateRec(update);
    this.setState({
      recipeArr: globalRecArr
    })
  },
  render: function(){
    
    return (
      <div>
        <RecipesList recipes={this.state.recipeArr} handleIngredientChange={this.updateRecipes}/>
      </div>
    )
  }
});

var updateRec = function(updatedObj){
  updatedObj.ingredients = updatedObj.ingredients.split(",");
  var found = false;
  for(var i = 0; i<globalRecArr.length; i++){
    if(globalRecArr[i].name === updatedObj.name){
      globalRecArr[i] = updatedObj;
      found = true;
      return;
    }
  }
  if(!found){
    globalRecArr.push(updatedObj);
  }
}

var RecipesList = React.createClass({
  render: function(){
    var ingredientChange = this.props.handleIngredientChange;
    //console.log(ingredChange);
    return (
      <div>
        <ul>
          {this.props.recipes.map(function(recipe, ingredChange){
            return <Recipe recipe={recipe} handleIngredientChange={ingredientChange}/>
          })}
        </ul>
      </div> 
    )
  }
});

var Recipe = React.createClass({
  getInitialState: function(){
    return {
      showIngedients: false,
      showEditForm: false
    }
  },
  showRecipe: function(e){
    e.preventDefault();
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
      <div>
        <h2 onClick={this.showRecipe.bind(this)}>{this.props.recipe.name}</h2>
        {this.state.showIngredients && <IngredientList recipeName={this.props.recipe.name} ingredients={this.props.recipe.ingredients} handleIngredientChange={this.props.handleIngredientChange} showForm={this.state.showEditForm} toggleForm={this.showEdits.bind(this)}/>}
      </div>
    )
  }
});

var IngredientList = React.createClass({
  render: function(){
    return (
      <div>
        <h3>Ingredients</h3>
        <ul>
          {this.props.ingredients.map(function(ingredient){
            return <Ingredient ingredient={ingredient} />
          })}
        </ul>
        <EditButton toggleForm={this.props.toggleForm} />
        {this.props.showForm && <EditForm recipeNameStr={this.props.recipeName} ingredientsStrList={this.props.ingredients} handleIngredientChange={this.props.handleIngredientChange}
/>}
      </div>
    )
  }
});

var Ingredient = React.createClass({
  render: function(){
    return (
      <div>
        {this.props.ingredient}
      </div>
    )
  }
});

var EditButton = React.createClass({
  handleToggle: function(e){
    e.preventDefault();
    this.props.toggleForm();
  },
  render: function(){
    return <button class="btn" onClick={this.handleToggle.bind(this)}>Edit</button>
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
    //{this.props.recipeNameStr} //{this.props.ingredientsStrList}
    return (
      <div>
        <form onSubmit={this.changeRecipe.bind(this)}>
          <label><strong>Recipe</strong>
            <input type="text" className="form-control" ref="nameStr" defaultValue={this.props.recipeNameStr}></input>
          </label>
          <label><strong>Ingredients</strong>
            <input type="text" className="form-control" ref="ingredientStr" defaultValue={this.props.ingredientsStrList}></input>
            <input type="submit" className="btn" value="Save Edits"></input>
          </label>
        </form>
      </div>
    )
  }
});

ReactDOM.render(<App />, document.getElementById('app'));