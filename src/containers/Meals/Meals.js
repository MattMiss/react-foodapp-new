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

    const cancelSavePromptHandler = () => {
        setSavePrompt(false);
    }

    const continueSavePromptHandler = () => {
        console.log(storedMealChoice);
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
                            <button onClick={cancelSavePromptHandler}> Cancel</button>
                            <button onClick={continueSavePromptHandler}> Save</button>
                        </center>   
                    </div>
                </div>
            </Modal>
            {/* <ItemDiv padding={'0.8em'}>
                Recent Meals
                <hr />
                <RecentMeals items={storedMeals} clicked={meal => recentMealClickHandler(meal)}/>
            </ItemDiv> */}
            <ItemDiv>
                Recent Meals
                <RecentSlideList items={storedMeals} mealChoice={storedMealChoice} promptSave={() => {setSavePrompt(true)}} clicked={meal => recentMealClickHandler(meal)}/>
            </ItemDiv>
            <ItemDiv padding={'0.8em'}>
                {mealChoiceTitle}
                <SingleDayMeals mealChoice={storedMealChoice} addItemHandler={addItemHandler} deleteItemHandler={item => deleteItemChoiceHandler(item)}/>
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