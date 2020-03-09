import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-food';
import ItemList from '../../components/FoodRecipes/ItemList/ItemList';
import * as actionTypes from '../../store/actions';



const Main = ({storedFood, storedRecipes, onRetrieveFood, onRetrieveRecipes}) => {


    //const [foodItems, setFoodItems] = useState([]);

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

    const foodAndRecipes = [...storedFood, ...storedRecipes];

    return (
        <div>
            <ItemList items={foodAndRecipes} clicked={item => foodRecipeClicked(item)}/>
            {/* <AddItemDiv 
                showFood = {() => this.showFoodCreatorHandler()}
                showRecipe = {() => this.showRecipeCreatorHandler()}/>
            <FoodCreator show={this.state.showFood} loadFood={() => this.reload()}/>   
            <RecipeCreator show={this.state.showRecipe} loadFood={() => this.reload()}/>            
            <hr />
            <FoodList items={this.props.storedFood} clicked={(foodItem) => this.foodClickedHandler(foodItem)}/>                 */}
        </div>
    );
    
}

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