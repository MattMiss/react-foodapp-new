import * as actionTypes from '../actions';

const initialState = {
    foodResults: [],
    recipeResults: [],
    mealResults: [],
    mealChoice: {
        meal: null,
        editing: false
    }
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.RETRIEVE_FOOD:

            let foodArray = Object.keys(action.result).map(result => {
                // Add the ID(firebaseID) to the foodItem
                let withID = {
                    ...action.result[result],
                    id: result,
                    type: 'food'
                }
                return withID;
            })
            return {
                ...state,
                foodResults: foodArray    
            }
            case actionTypes.RETRIEVE_RECIPES:

                let recipeArray = Object.keys(action.result).map(result => {
                    // Add the ID(firebaseID) to the foodItem
                    let withID = {
                        ...action.result[result],
                        id: result,
                        type: 'recipe'
                    }
                    return withID;
                })
                return {
                    ...state,
                    recipeResults: recipeArray    
                }
        case actionTypes.RETRIEVE_MEALS:

            let mealsArray = Object.keys(action.result).map(result => {
                // Add the ID(firebaseID) to the foodItem
                let withID = {
                    ...action.result[result],
                    id: result
                }
                return withID;
            })
            return {
                ...state,
                mealResults: mealsArray,
                mealChoice: {
                    meal: mealsArray[0],
                    editing: false
                }  
            }
        case actionTypes.MEAL_CHOICE: 

            return {
                ...state,
                mealChoice: {
                    meal: action.choice,
                    editing: false
                }
            }
        case actionTypes.ADD_MEAL:

            let newState = {...state}   //dont mutate original state
            newState = JSON.parse(JSON.stringify(newState));    //creates copy not reference
            
            console.log(action.choice)

            const newMeal = { 
                calories: action.choice.servings[0].nutrients.calories,
                name: action.choice.name,
                servSize: action.choice.servings[0].servingSize,
                servSizeDesc: action.choice.servings[0].servingSizeDesc
            }

            let tmpMls = null;
            let updatedMeal = null;

            Object.keys(newState.mealResults).map(mealItem => {
                console.log("action meal id", action.meal.meal.id)
                console.log("state meal results it id", newState.mealResults[mealItem].id)
                if (action.meal.meal.id === newState.mealResults[mealItem].id){
                    console.log("TRUEEEEE")
                    tmpMls = [...newState.mealResults[mealItem].meals, newMeal];

                    const stateNutAmt = newState.mealResults[mealItem].nutrientTotals;
                    const addNutAmt = action.choice.servings[0].nutrients;

                    const newNutrients = {
                        calcium: stateNutAmt.calcium + Number(addNutAmt.calcium),
                        calories: stateNutAmt.calories + Number(addNutAmt.calories),
                        carbs: stateNutAmt.carbs + Number(addNutAmt.carbs),
                        cholesterol: stateNutAmt.cholesterol + Number(addNutAmt.cholesterol),
                        fat: stateNutAmt.fat + Number(addNutAmt.fat),
                        fiber: stateNutAmt.fiber + Number(addNutAmt.fiber),
                        iron: stateNutAmt.iron + Number(addNutAmt.iron),
                        monoFat: stateNutAmt.monoFat + Number(addNutAmt.monoFat),
                        polyFat: stateNutAmt.polyFat + Number(addNutAmt.polyFat),
                        potassium: stateNutAmt.potassium + Number(addNutAmt.potassium),
                        protein: stateNutAmt.protein + Number(addNutAmt.protein),
                        saturatedFat: stateNutAmt.saturatedFat + Number(addNutAmt.saturatedFat),
                        sodium: stateNutAmt.sodium + Number(addNutAmt.sodium),
                        sugars: stateNutAmt.sugars + Number(addNutAmt.sugars),
                        vitaminA: stateNutAmt.vitaminA + Number(addNutAmt.vitaminA),
                        vitaminC: stateNutAmt.vitaminC + Number(addNutAmt.vitaminC)
                    
                    }


                    updatedMeal = {
                        meals: tmpMls,
                        nutrientTotals: newNutrients,
                        id: newState.mealResults[mealItem].id
                    }
                    newState.mealResults[mealItem] = updatedMeal;

                    newState.mealChoice = {
                        meal: updatedMeal,
                        editing: true
                    }
                    console.log(newState)
                }

                return true;
            });
            return newState
        case actionTypes.REMOVE_MEAL:

            let newRemoveState = {...state}   //dont mutate original state
            newRemoveState = JSON.parse(JSON.stringify(newRemoveState));    //creates copy not reference

            Object.keys(newRemoveState.mealResults).forEach(mealItem => {
                if (action.meal.meal.id === newRemoveState.mealResults[mealItem].id){
            
                    const filteredMeals = newRemoveState.mealResults[mealItem].meals.filter(meal => {
                        return (JSON.stringify(meal) !== JSON.stringify(action.choice))    
                        
                    });
                    newRemoveState.mealResults[mealItem].meals = filteredMeals;

                    let itemUsed = null;
                
                    newRemoveState.foodResults.forEach(item => {
                        if (item.name === action.choice.name){
                            itemUsed = item;
                        }
                    }) 
                    // Check recipeResults if item wasn't a food
                    if (itemUsed === null)   {
                        newRemoveState.recipeResults.forEach(item => {
                            if (item.name === action.choice.name){
                                itemUsed = item;
                            }
                        })  
                    }                                                                                                  

                    const stateNutAmt = newRemoveState.mealResults[mealItem].nutrientTotals;
                    const removeNutAmt = itemUsed.servings[0].nutrients;

                    const newNutrients = {
                        calcium: stateNutAmt.calcium - Number(removeNutAmt.calcium),
                        calories: stateNutAmt.calories - Number(removeNutAmt.calories),
                        carbs: stateNutAmt.carbs - Number(removeNutAmt.carbs),
                        cholesterol: stateNutAmt.cholesterol - Number(removeNutAmt.cholesterol),
                        fat: stateNutAmt.fat - Number(removeNutAmt.fat),
                        fiber: stateNutAmt.fiber - Number(removeNutAmt.fiber),
                        iron: stateNutAmt.iron - Number(removeNutAmt.iron),
                        monoFat: stateNutAmt.monoFat - Number(removeNutAmt.monoFat),
                        polyFat: stateNutAmt.polyFat - Number(removeNutAmt.polyFat),
                        potassium: stateNutAmt.potassium - Number(removeNutAmt.potassium),
                        protein: stateNutAmt.protein - Number(removeNutAmt.protein),
                        saturatedFat: stateNutAmt.saturatedFat - Number(removeNutAmt.saturatedFat),
                        sodium: stateNutAmt.sodium - Number(removeNutAmt.sodium),
                        sugars: stateNutAmt.sugars - Number(removeNutAmt.sugars),
                        vitaminA: stateNutAmt.vitaminA - Number(removeNutAmt.vitaminA),
                        vitaminC: stateNutAmt.vitaminC - Number(removeNutAmt.vitaminC)
                    
                    }

                    const updatedMeal = {
                        meals: newRemoveState.mealResults[mealItem].meals,
                        nutrientTotals: newNutrients,
                        id: newRemoveState.mealResults[mealItem].id
                    }

                    console.log(updatedMeal)
                    
                    newRemoveState.mealResults[mealItem] = updatedMeal;
                    newRemoveState.mealChoice = {
                        meal: updatedMeal,
                        editing: true
                    }
                }

            });

            return newRemoveState;
        default:
    }

    return state;
};

export default reducer;