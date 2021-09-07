const button = document.getElementById('find');
const container = document.getElementById('container');

button.addEventListener('click', ()=> {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
		.then(response => response.json())
		.then(response => {
		getMeal(response.meals[0]);
	});
});

const getMeal = (meal) => {
	const ingredients = [];
	for(let i=1; i<=20; i++) {
		if(meal[`strIngredient${i}`]) {
			ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
		} else {
			break;
		}
	}
  	const newInnerHTML = `
		<div>
			<div class="header">
				<div>
					<h4>${meal.strMeal}</h4>
					<img src="${meal.strMealThumb}" alt="Meal Image">
				</div>
        ${meal.strYoutube ? `
		      	<div>
			      <h5>Video Recipe</h5>
					<div>
						<iframe width="420" height="315"
						src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
						</iframe>
					</div>
       			</div>
	  		</div>
        	<div class="info">
				  ${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
				  ${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
				  ${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
				  <h5>Ingredients:</h5>
				  <ul>
					  ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
				  </ul>
			</div>
			<div class="inst">
				<p>${meal.strInstructions}</p>
			</div>
		</div>` : ''}
	`;
	
	container.innerHTML = newInnerHTML;
}