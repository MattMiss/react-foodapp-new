import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from '../axios-food';
//import RecentMeals from '../../components/Meals/MealList/RecentMeals';
import RecentSlideList from '../components/Meals/RecentSlideList';
import SingleDayMeals from '../components/Meals/SingleDayMeals';
import Modal from '../components/UI/Modal';
import ItemList from '../components/FoodRecipes/ItemList/ItemList';
import CalendarPicker from '../components/Calendar/CalendarPicker';
import * as actionTypes from '../store/actions';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const ItemDiv = styled.div`
    margin: 1em auto;
    width: 85%;  
    min-width: 300px;
    text-align: center;
    border: 2px solid #ccc;
    border-radius: 3px;
    padding: ${props => props.padding};

    @media (min-width: 720px) {
        width: 700px;
    }
`;

const DateChoiceBtn = styled.button`
    height: 100%;
    width: 100%;
    text-align: center;
    color: #00a5ff;
    border: 2px solid #00a5ff;
    border-radius: 3px;
    padding: 5px;

    &:hover {
        background-color: #182955;
        color: #00a5ff;
        cursor: pointer;
    }

`;

const Meals = ({storedFood, storedRecipes, storedMeals, storedMealChoice, 
    onRetrieveFood, onRetrieveRecipes, onRetrieveMeals, onMealChoice, 
    onAddMeal, onRemoveMeal, onCancelMealEdit}) => {

    const [addItem, setAddItem] = useState(false);
    const [savePrompt, setSavePrompt] = useState(false);
    const [showRecentMeals, setShowRecentMeals] = useState(true);

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

    const recentMealHandler = () => {
        if (!showRecentMeals){
            setShowRecentMeals(true);
        }  
    }

    const calanderHandler = () => {
        if (showRecentMeals){
            setShowRecentMeals(false);
        }
    }

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
        // const newMeal = {
        //     meals: [],
        //     nutrientTotals: {
        //         calcium: 0,
        //         calories: 0,
        //         carbs: 0,
        //         cholesterol: 0,
        //         fat: 0,
        //         fiber: 0,
        //         iron: 0,
        //         monoFat: 0,
        //         polyFat: 0,
        //         potassium: 0,
        //         protein: 0,
        //         saturatedFat: 0,
        //         sodium: 0,
        //         sugars: 0,
        //         transFat: 0,
        //         vitaminA: 0,
        //         vitaminC: 0
        //     },
        //     id: '03-08-2020'
        // }
        //onMealChoice(newMeal);
        //
        // setChooseDate(true);
    };

    const cancelMealSaveHandler = () => {
       onCancelMealEdit(); 
    };

    const ModalAdded = (props) => {
        console.log("Modal added in " + props.name);
        return null;
    } 
    console.log(storedMealChoice)
    const foodAndRecipes = [...storedFood, ...storedRecipes];
    const mealChoiceTitle = storedMealChoice.meal ? storedMealChoice.meal.id : '';

    const date = new Date();
    const todaysDate = {day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear()};
    

    return(
        <div>
            <Modal show={addItem} modalClosed={addItemHandler}>
                <ItemList items={foodAndRecipes} clicked={item => addItemChoiceHandler(item)}/>
                <ModalAdded name="Item List Modal added in [Meals.js]"/>
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
                <ModalAdded name="Save Prompt Modal added in [Meals].js]"/>
            </Modal>

            {/* <Modal show={chooseDate} modalClosed={chooseDateCancelHandler}>
                
            </Modal> */}

            {/* <ItemDiv padding={'0.8em'}>
                Recent Meals
                <hr />
                <RecentMeals items={storedMeals} clicked={meal => recentMealClickHandler(meal)}/>
            </ItemDiv> */}

            <ItemDiv>
                <Container>
                    <Row className="my-2">
                        <Col className="px-1">
                            <DateChoiceBtn onClick={recentMealHandler}>RECENT MEALS</DateChoiceBtn>
                        </Col>
                        <Col className="px-1">
                            <DateChoiceBtn onClick={calanderHandler}>CHOOSE DATE</DateChoiceBtn>
                        </Col>
                    </Row>
                </Container>

                <RecentSlideList 
                    show={showRecentMeals}
                    items={storedMeals} 
                    mealChoice={storedMealChoice} 
                    promptSave={item => startSavePrompt(item)} 
                    clicked={meal => recentMealClickHandler(meal)}
                    addNewDate={() => addNewDateHandler()}/>
                    
                 <CalendarPicker 
                    show={!showRecentMeals}
                    currentDate={date}
                    items={storedMeals} 
                    clicked={meal => recentMealClickHandler(meal)}/>
            </ItemDiv>

            {/* <ItemDiv padding={'0.4em'}>
                  <CalendarPicker 
                    currentDate={date}
                    items={storedMeals} 
                    clicked={meal => recentMealClickHandler(meal)}/>

            </ItemDiv> */}

            <ItemDiv padding={'0.8em'}>
                {mealChoiceTitle}
                <SingleDayMeals 
                    mealChoice={storedMealChoice} 
                    addItemHandler={addItemHandler} 
                    deleteItemHandler={item => deleteItemChoiceHandler(item)}
                    cancelMealSave={cancelMealSaveHandler}/>
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
        onCancelMealEdit: () => dispatch({type:actionTypes.CANCEL_MEAL_EDIT}),
        onMealChoice: (chc) => dispatch({type: actionTypes.MEAL_CHOICE, choice: chc})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Meals);