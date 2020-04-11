import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from '../axios-food';
import ItemList from '../components/FoodRecipes/ItemList/ItemList';
import Modal from '../components/UI/Modal';
import FoodCreator from '../components/FoodRecipes/Creators/FoodCreator';
import RecipeCreator from '../components/FoodRecipes/Creators/RecipeCreator';
import ChooseItem from '../components/FoodRecipes/Creators/ChooseItem';
import ServingCreator from '../components/FoodRecipes/Creators/ServingCreator';
import styled from 'styled-components';
import * as actionTypes from '../store/actions';


const ItemDiv = styled.div`
    margin: 1em auto;
    width: 50%;
    height: 80px;  
    min-width: 300px;
    text-align: center;
    padding: 1em;

`;

const AddBtn = styled.button`
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
    color: #00a5ff;
    border: 2px solid #00a5ff;
    border-radius: 3px;

    &:hover {
        background-color: #182955;
        color: #00a5ff;
        cursor: pointer;
    }

`;

const Main = React.memo(({storedFood, storedRecipes, onRetrieveFood, onRetrieveRecipes}) => {

    const [newFoodRecipe, setNewFoodRecipe] = useState(false);
    const [chooseItem, setChooseItem] = useState(false);
    const [showFoodCreator, setShowFoodCreator] = useState(false);
    const [showRecipeCreator, setShowRecipeCreator] = useState(false);
    const [addServing, setAddServing] = useState(false);


    useEffect(() => {
        axios.get('https://react-food-app-3532b.firebaseio.com/food-items.json')
        .then(response => { 
           onRetrieveFood(response.data);
           //console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        });

        axios.get('https://react-food-app-3532b.firebaseio.com/recipe-items.json')
        .then(response => { 
           onRetrieveRecipes(response.data);
           //console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        });
    },[onRetrieveFood, onRetrieveRecipes]);

    const foodRecipeClicked = (item) => {
        console.log('clicked', item);
    };

    const newFoodRecipeHandler = () => {
        setNewFoodRecipe(true);
        setChooseItem(true);
    };

    const cancelNewFoodRecipe = () => {
        setNewFoodRecipe(false);
        setShowFoodCreator(false);
        setShowRecipeCreator(false);

    };

    const foodOrRecipeChosen = (item) => {
        //console.log(item);
        if(item === 'food'){
            setShowFoodCreator(true);
        }else {
            setShowRecipeCreator(true);
        }
        setChooseItem(false);

    }
    const backHandler = () => {
        setChooseItem(true);
        setShowFoodCreator(false);
        setShowRecipeCreator(false);
    };

    const showAddServingHandler = () => {
        //used for ServingCreator (outside modal version)
        //setAddServing(prev => !prev);
    }
    

    const foodAndRecipes = [...storedFood, ...storedRecipes]; 

    return (
        <div>
            <Modal show={newFoodRecipe} modalClosed={cancelNewFoodRecipe}> 
                <ChooseItem show={chooseItem} clicked={item => foodOrRecipeChosen(item)} />
                <FoodCreator showCreator={showFoodCreator} backHandler={backHandler} />
                <RecipeCreator show={showRecipeCreator} backHandler={backHandler} addServ={showAddServingHandler}/>
            </Modal>
            <ItemDiv>
                <AddBtn onClick={newFoodRecipeHandler}> Add food / recipe</AddBtn>
            </ItemDiv>
            <ItemList items={foodAndRecipes} clicked={item => foodRecipeClicked(item)}/>
        </div>
    );
    
})

const mapStateToProps = state => {
    return {
        storedFood: state.foodResults,
        storedRecipes: state.recipeResults
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onRetrieveFood: (result) => dispatch({type: actionTypes.RETRIEVE_FOOD, result: result}),
        onRetrieveRecipes: (result) => dispatch({type: actionTypes.RETRIEVE_RECIPES, result: result}),
        onStoreResult: (result) => dispatch({type: actionTypes.STORE_RESULT, result: result}),
        onDeleteResult: (id) => dispatch({type: actionTypes.DELETE_RESULT, resultElId: id})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);