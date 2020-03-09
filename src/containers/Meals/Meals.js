import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-food';
import RecentMeals from '../../components/Meals/MealList/RecentMeals';
import RecentSlideList from '../../components/Meals/MealList/RecentSlideList';
import SingleDayMeals from '../../components/Meals/SingleDayMeals/SingleDayMeals';
import Modal from '../../components/UI/Modal/Modal';
import ItemList from '../../components/FoodRecipes/ItemList/ItemList';
import * as actionTypes from '../../store/actions';
import styled from 'styled-components';

const ItemDiv = styled.div`
    margin: 1em auto;
    width: 80%;  
    min-width: 300px;
    text-align: center;
    border: 2px solid #ccc;
    border-radius: 3px;
    padding: ${props => props.padding};

    @media (min-width: 720px) {
        width: 700px;
    }
`;


const Meals = ({storedFood, storedRecipes, storedMeals, storedMealChoice, 
    onRetrieveFood, onRetrieveRecipes, onRetrieveMeals, onMealChoice, 
    onAddMeal, onRemoveMeal}) => {

    const [addItem, setAddItem] = useState(false);
    const [savePrompt, setSavePrompt] = useState(false);
    const [chooseDate, setChooseDate] = useState(false);

    useEffect(() => {
        // Load Meals
        axios.get('https://react-food-app-3532b.firebaseio.com/meal-items.json')
        .then(response => { 
            onRetrieveMeals(response.data);
            console.log(response.data)
            //this.props.onMealChoice
        })
        .catch(error => {
            //this.setState({error: true});
        });

    },[onRetrieveMeals]);

    useEffect(() => {
        // Load Meals
        axios.get('https://react-food-app-3532b.firebaseio.com/food-items.json')
        .then(response => { 
            onRetrieveFood(response.data);
        })
        .catch(error => {
            //this.setState({error: true});
        });

    },[onRetrieveFood]);

    useEffect(() => {
        // Load Meals
        axios.get('https://react-food-app-3532b.firebaseio.com/recipe-items.json')
        .then(response => { 
            onRetrieveRecipes(response.data);
        })
        .catch(error => {
            //this.setState({error: true});
        });

    },[onRetrieveRecipes]);

    const recentMealClickHandler = (meal) => {
        console.log(meal)
        onMealChoice(meal);
    }

    const addItemHandler = () => {
        setAddItem(!addItem)
    }

    const addItemChoiceHandler = (item) => {

        onAddMeal(item, storedMealChoice);
        setAddItem(!addItem)
    }

    const deleteItemChoiceHandler = (item) => {
        onRemoveMeal(item, storedMealChoice);
    }

    const startSavePrompt = (item) => {
        setSavePrompt(true);
        console.log(item)
    }

    const cancelPromptHandler = () => {
        setSavePrompt(false);
    }

    const cancelSavePromptHandler = () => {
        setSavePrompt(false);

    }

    const continueSavePromptHandler = () => {
        console.log(storedMealChoice.meal.id);
        console.log(storedMealChoice.meal)
        const saveID = storedMealChoice.meal.id;
        const saveChoice = {
            meals: storedMealChoice.meal.meals,
            nutrientTotals: storedMealChoice.meal.nutrientTotals
        }
        console.log(saveChoice)

        axios.put('https://react-food-app-3532b.firebaseio.com/meal-items/' + saveID + '.json', saveChoice)
        .then(response => { 
            console.log(response)
            setSavePrompt(false);
        })
        .catch(error => {
            //this.setState({error: true});
        });
    }

    const addNewDateHandler = () => {
        console.log("NEW")
        const newMeal = {
            meals: [],
            nutrientTotals: {
                calcium: 0,
                calories: 0,
                carbs: 0,
                cholesterol: 0,
                fat: 0,
                fiber: 0,
                iron: 0,
                monoFat: 0,
                polyFat: 0,
                potassium: 0,
                protein: 0,
                saturatedFat: 0,
                sodium: 0,
                sugars: 0,
                transFat: 0,
                vitaminA: 0,
                vitaminC: 0
            },
            id: '03-08-2020'
        }
        //onMealChoice(newMeal);

        setChooseDate(true);
    };

    const chooseDateCancelHandler = () => {
        setChooseDate(false);
    }

    const foodAndRecipes = [...storedFood, ...storedRecipes];
    const mealChoiceTitle = storedMealChoice ? storedMealChoice.id : '';

    return(
        <div>
            <Modal show={addItem} modalClosed={addItemHandler}>
                <ItemList items={foodAndRecipes} clicked={item => addItemChoiceHandler(item)}/>
            </Modal>
            <Modal show={savePrompt} modalClosed={cancelSavePromptHandler}>
                <div>
                    <center>Save Meal?</center>
                    <div>
                        <center>
                            <button onClick={cancelPromptHandler}> Cancel</button>
                            <button onClick={cancelSavePromptHandler}> Don't Save</button>
                            <button onClick={continueSavePromptHandler}> Save</button>
                        </center>   
                    </div>
                </div>
            </Modal>

            <Modal show={chooseDate} modalClosed={chooseDateCancelHandler}>
                
            </Modal>

            {/* <ItemDiv padding={'0.8em'}>
                Recent Meals
                <hr />
                <RecentMeals items={storedMeals} clicked={meal => recentMealClickHandler(meal)}/>
            </ItemDiv> */}

            <ItemDiv>
                Recent Meals
                <RecentSlideList 
                    items={storedMeals} 
                    mealChoice={storedMealChoice} 
                    promptSave={item => startSavePrompt(item)} 
                    clicked={meal => recentMealClickHandler(meal)}
                    addNewDate={() => addNewDateHandler()}/>
            </ItemDiv>

            <ItemDiv padding={'0.8em'}>
                {mealChoiceTitle}
                <SingleDayMeals 
                    mealChoice={storedMealChoice} 
                    addItemHandler={addItemHandler} 
                    deleteItemHandler={item => deleteItemChoiceHandler(item)}/>
            </ItemDiv>
            

            
            {/* <DatePicker onChangeDate={this.onChangeDateHandler} date={this.props.storedMealChoice}/>
                <AllMealsPicker show={this.state.changeDate} meals={this.props.storedMeals} choice={this.dayChoiceHandler}/>
                <DayMealsViewer meal={this.props.storedMealChoice} foodList={this.props.storedFood} newChoice={(choice, meal) => {this.addChoiceHandler(choice, meal)}}/>
            */}
        </div> 
        

    );
    
}

const mapStateToProps = state => {
    return {
        storedMeals: state.mealResults,
        storedFood: state.foodResults,
        storedRecipes: state.recipeResults,
        storedMealChoice: state.mealChoice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onRetrieveMeals: (result) => dispatch({type: actionTypes.RETRIEVE_MEALS, result: result}),
        onRetrieveFood: (result) => dispatch({type: actionTypes.RETRIEVE_FOOD, result: result}),
        onRetrieveRecipes: (result) => dispatch({type: actionTypes.RETRIEVE_RECIPES, result: result}),
        onAddMeal: (chc, ml) => dispatch({type:actionTypes.ADD_MEAL, choice: chc, meal: ml}),
        onRemoveMeal: (chc, ml) => dispatch({type:actionTypes.REMOVE_MEAL, choice: chc, meal: ml}),
        onMealChoice: (chc) => dispatch({type: actionTypes.MEAL_CHOICE, choice: chc})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Meals);