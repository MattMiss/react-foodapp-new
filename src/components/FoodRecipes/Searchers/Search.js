import React, { useState } from 'react';
import useInputForm from '../useInputForm';
import { InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
import FoodRecipeResult from '../Searchers/SearchResults/FoodRecipeResult';
import {searchFood, searchRecipe, getRecipe, getFood} from './FatSecret';
import axios from 'axios';

const Search = (props) => {

    const [foodSearchResults, setFoodSearchResults] = useState(null);
    const [recipeSearchResults, setRecipeSearchResults] = useState(null);
    const [foodGetResult, setFoodGetResult] = useState(null);
    const [recipeGetResult, setRecipeGetResult] = useState(null);


    const searchHandler = () => { 
        console.log("Searching Item");
        if (props.isRecipe){
            searchRecipe(fields.searchName).then(result => {
                if(result.data.recipes){
                    setRecipeSearchResults(result.data.recipes.recipe);
                }
            }) 
        }else{
            searchFood(fields.searchName).then(result => {
                if(result.data.foods){
                    setFoodSearchResults(result.data.foods.food);
                }
            }) 
        }
         
    };

    const searchGetHandler = (type, itemID) => {
        console.log("Getting Item");
        if (type === 'food'){
            getFood(itemID).then(result => {
                if(result.data.food){
                    setFoodGetResult(result.data.food);
                }
                console.log(result)
            })
        }else {
            getRecipe(itemID).then(result => {
                if(result.data.recipe){
                    setRecipeGetResult(result.data.recipe);
                }
                console.log(result)
            })
        }
    };

    const {fields, handleInputChange, handleSubmit} = useInputForm(searchHandler);

    const foodList = foodSearchResults ? foodSearchResults.map(result => {
        //console.log(result);
        return <FoodRecipeResult key={result.food_id} item={result} isFood={true} clicked={() => searchGetHandler('food', result.food_id)}/>
    }) : null;

    const recipeList = recipeSearchResults ? recipeSearchResults.map(result => {
        //console.log(result)
        return <FoodRecipeResult key={result.recipe_id} item={result} isFood={false} clicked={() => searchGetHandler('recipe', result.recipe_id)}/>
    }) : null;

    
    return(
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <InputGroup size="sm">
                    <label htmlFor="searchName" className="form-label col-sm-3 px-1">{props.isRecipe ? 'Search Recipe' : 'Search Food'}</label>
                    <FormControl
                        placeholder="Search"
                        aria-label=""
                        id="searchName"
                        onChange={handleInputChange}
                        />
                    </InputGroup>
                </div>
                <button type="submit">Search</button>
            </form>
            <Container>
                {foodList}
                {recipeList}
            </Container>
        </>
        
    )
};

export default Search;