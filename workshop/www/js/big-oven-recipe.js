var renderSingleRecipe = function(data) {
  currentRecipe = new Recipe(data);
  for(i = 0; i < data.Ingredients.length; i ++){
    currentRecipe.ingredients.push(new Ingredient(data.Ingredients[i]));
  };
  
  var instructions = data.Instructions.split(/\s{2,}/).filter(Boolean);
  for(i = 0; i < instructions.length; i ++){
    currentRecipe.instructions.push(new Instruction(instructions[i]));
  };
  
  var userId = window.localStorage.getItem("sessionId")
  if (userId) {
    currentRecipe.userId = userId;
  }
  
  renderPage('#recipe-show', '.content-container', currentRecipe)
  $('span.stars').stars();
  
  renderAppend('#ingredients-template', '.recipe', {ingredients: currentRecipe.ingredients})
  renderAppend('#instructions-template', '.recipe', {instructions: currentRecipe.instructions})
  
  window.scrollTo(0, 0);
  window.sessionStorage.setItem("recipeResult", $('.content-container').html());
  
  return instructions;
}
