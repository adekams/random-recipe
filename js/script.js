const mealBtn =  document.querySelector('#meal-btn').addEventListener('click', searchMeal)
const newMeal = document.querySelector('.meal')

async function randomMeal () {
    let url = 'https://themealdb.com/api/json/v1/1/random.php';
    let res = await fetch(url);
    let data = await res.json();
    console.log(data)

    let meal = data.meals[0]

    const mealIngredients = []
    for(let i=1; i <=20; i++) {
        if (meal[`strIngredient${i}`]) {
            mealIngredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
            )
        }
    }
    console.log(mealIngredients)

    food = `
        <div class="meal-description">
            <div class="meal-img">
                <img src="${meal.strMealThumb}" alt="meal image">
            </div>
            <h3 class='name center'>${meal.strMeal}</h3>
            <div class="info">
                <p>Category: ${meal.strCategory}</p>
                <p>Area: ${meal.strArea}</p>
            </div>
            <div>
                <h3>Ingredients</h3>
                <ul>
                ${mealIngredients.map(ingredient => 
                    `<li>${ingredient}</li>`
                    ).join('')}
                </ul>
            </div>
            <div>
                    <h3>Preparation/Instructions</h3>
                    <p class='instruction'>${meal.strInstructions}</p>
            </div>
            <div class='vid'>
                    <h3>Recipe Video</h3>
            <iframe src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
            </div>
        </div>
    `
    newMeal.innerHTML = food
}


// const html = document.getElementsByTagName('html')[0]
// const toggleTheme = (theme) => {
//     html.dataset.theme = theme
// }

// dark and light mode
let darkBtn =document.querySelector('.dark-mode')
let icon =document.querySelector('#icon')
darkBtn.addEventListener('click', ()=> {
    document.body.classList.toggle('dark')
    if(icon.classList.contains('fa-moon')) {
        // darkBtn.classList.remove = 'fas fa-moon'
        icon.classList = 'fas fa-sun'
        icon.style.color = 'white'
    }else {
        icon.classList = 'fas fa-moon'
        icon.style.color = '#121212'
    }
})



async function searchMeal () {
    try {
        await randomMeal()
    } catch (e) {
        console.log(e)
        document.querySelector('.error').innerHTML = "Opps! There seems to be an error. Please make sure you are connected to a working internet"
    }
}