import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from '../axios-food';
import ItemList from '../components/FoodRecipes/ItemList/ItemList';
import Modal from '../components/UI/Modal';
import FoodCreator from '../components/FoodRecipes/Creators/FoodCreator';
import RecipeCreator from '../components/FoodRecipes/Creators/RecipeCreator';
import ChooseItem from '../components/FoodRecipes/Creators/ChooseItem';
//import ServingCreator from '../components/FoodRecipes/Creators/ServingCreator';
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
    const [editingItem, setEditingItem] = useState(false);
    const [itemEditing, setItemEditing] = useState(null);
    //const [addServing, setAddServing] = useState(false);


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

    // Called when an item from foodList is clicked
    const foodRecipeClicked = (item) => {
        console.log('clicked', item);
    };

    // Called when add new food/recipe btn is clicked (setNewFoodRecipe)
    // Should pop up the modal with Food and Recipe buttons (setChooseItem)
    const newFoodRecipeHandler = () => {
        setNewFoodRecipe(true);
        setChooseItem(true);
    };

    // Cancels the new choice if modal background is clicked
    const cancelNewFoodRecipe = () => {
        setChooseItem(false);
        setEditingItem(false);
        setItemEditing(null);
        setNewFoodRecipe(false);
        setShowFoodCreator(false);
        setShowRecipeCreator(false);
    };

    // Called when either Food btn or Recipe btn is chosen
    // after setChooseItem opens the modal
    // Modal stays open but changes to either food or recipe creator
    const foodOrRecipeChosen = (itemType) => {
        //console.log(item);
        if(itemType === 'food'){
            setShowFoodCreator(true);
        }else {
            setShowRecipeCreator(true);
        }
        setChooseItem(false);
    }

    // Called if the back btn is clicked from either the
    // foodCreator or recipeCreator. It brings the chooseItem
    // back up within the modal but keeps it open. 
    const backHandler = () => {
        console.log("editingItem", editingItem)
        setShowFoodCreator(false);
        setShowRecipeCreator(false);
        if (editingItem){
            setEditingItem(false);
            setItemEditing(null);
        }else{
            setChooseItem(true);
        }
    };

    // const showAddServingHandler = () => {
    //     //used for ServingCreator (outside modal version)
    //     //setAddServing(prev => !prev);
    // }

    const editItemHandler = (item) => {
        console.log("item editing", item)
        if (item.type === 'recipe'){
            setShowRecipeCreator(true);
        }else {
            setShowFoodCreator(true);
        } 
        setEditingItem(true);
        setChooseItem(false);
        setItemEditing(item)
    };
    

    const foodAndRecipes = [...storedFood, ...storedRecipes]; 

    return (
        <div>
            <Modal show={newFoodRecipe || editingItem} modalClosed={cancelNewFoodRecipe}> 
                <ChooseItem show={chooseItem} clicked={item => foodOrRecipeChosen(item)} />
                {showFoodCreator ? <FoodCreator showCreator={showFoodCreator} backHandler={backHandler} initialItem={itemEditing} /> : null}
                {showRecipeCreator ? <RecipeCreator showCreator={showRecipeCreator} backHandler={backHandler} /> : null}
            </Modal>
            <ItemDiv>
                <AddBtn onClick={newFoodRecipeHandler}> Add food / recipe</AddBtn>
            </ItemDiv>
            <ItemList items={foodAndRecipes} clicked={item => foodRecipeClicked(item)} editItem={editItemHandler}/>
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