import React, { useState, useEffect } from 'react';
import useInputForm from '../useInputForm';
import { InputGroup, FormControl, Container } from 'react-bootstrap';
import FoodRecipeResult from './FoodRecipeResult';
import FoodRecipeFullResult from './FoodRecipeFullResult';
import {searchFood, searchRecipe, getRecipe, getFood} from './FatSecret';



const Search = (props) => {

    const [foodSearchResults, setFoodSearchResults] = useState([]);
    const [recipeSearchResults, setRecipeSearchResults] = useState([]);
    const [foodSearchDivs, setFoodSearchDivs] = useState(null);
    const [recipeSearchDivs, setRecipeSearchDivs] = useState(null);
    const [itemGetResult, setItemGetResult] = useState(null);
    const [showSearchArea, setShowSearchArea] = useState(true);


    const searchHandler = () => { 
        setFoodSearchResults([]);
        setRecipeSearchResults([]);

        if (props.isRecipe){
            searchRecipe(fields.searchName).then(result => {
                if(result.data.recipes.recipe){
                    setRecipeSearchResults(result.data.recipes.recipe);
                }
            }) 
        }else{
            searchFood(fields.searchName).then(result => {
                console.log(result)
                if(result.data && result.data.foods.food){
                    
                    setFoodSearchResults(result.data.foods.food);
                }
            }) 
        }
         
    };

    const searchGetHandler = (type, itemID) => {
        if (type === 'food'){
            getFood(itemID).then(result => {
                if(result.data.food){
                    setItemGetResult(result.data.food);
                    setShowSearchArea(false);
                }
                console.log(result)
            })
        }else {
            getRecipe(itemID).then(result => {
                if(result.data.recipe){
                    setItemGetResult(result.data.recipe);
                    setShowSearchArea(false);
                }
                console.log(result)
            })
        }
    };

    const {fields, handleInputChange, handleSubmit} = useInputForm(searchHandler);

    useEffect(()=> {
        const foodList = foodSearchResults.map(result => {
            //console.log(result);
            return <FoodRecipeResult key={result.food_id} item={result} isFood={true} clicked={() => searchGetHandler('food', result.food_id)}/>
        });
        setFoodSearchDivs(foodList);
    }, [foodSearchResults]);

    useEffect(()=> {
        const recipeList = recipeSearchResults.map(result => {
            //console.log(result)
            return <FoodRecipeResult key={result.recipe_id} item={result} isFood={false} clicked={() => searchGetHandler('recipe', result.recipe_id)}/>
        });
        setRecipeSearchDivs(recipeList);
    }, [recipeSearchResults]);

    useEffect(() => {
        setFoodSearchResults([]);
        setRecipeSearchResults([]);
        setShowSearchArea(true);
    },[props.clear])

    const selectItemHandler = (item) => {
        props.chosenItem(item);
        setFoodSearchResults([]);
        setRecipeSearchResults([]);
    };

    const cancelItemHandler = (item) => {
        setShowSearchArea(true);
    };

    const searchAreaDiv = showSearchArea ? 
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
                {foodSearchDivs}
                {recipeSearchDivs}
            </Container>
    </> : null;
    
    const foodRecipeFull = showSearchArea ? null : <FoodRecipeFullResult item={itemGetResult} chosenItem = {item => selectItemHandler(item)} cancelHandler={cancelItemHandler}/>;

    return(<>
            {searchAreaDiv} 
            {foodRecipeFull}
        </>   
    )
};

export default Search;