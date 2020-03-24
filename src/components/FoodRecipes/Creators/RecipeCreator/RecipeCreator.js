import React, { Fragment, useState } from 'react';

import Modal from '../../../UI/Modal/Modal';
import CategoryGrid from './CategoryGrid/CategoryGrid';
import Servings from '../FoodCreator/Servings/Servings';
import Search from '../../Searchers/Search';
import styled from 'styled-components';
import Directions from './Directions/Directions';
import { Container, Row, Col } from 'react-bootstrap';
//import axios from '../../../axios-food';

  
const RecipeCreatorDiv = styled.div`
    margin: 20px auto;
    padding: 10px 10px 20px 10px;
    width: 95%;
    font-size: 12px;
    border: 1px 1px #eee;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    max-width: 800px;
`;

const BtnDiv = styled.div`
    text-align: center;
    font-size: 1.2em;
    background-color: #00a5ff;
    color: white;
    margin-top: 10px;
    border-radius: 3px;
    padding: 5px;

    &:hover {
        cursor: pointer;
        background-color: #182955;
        color: #00a5ff;
    }
`;


const testServings = [{
    servingSize: "123",
    servingSizeDesc: "ty",
    metricSize: "12",
    metricSizeDesc: "g",
    nutrients: {
        calcium: "786",
        calories: "123",
        carbs: "954",
        cholesterol: "1567",
        fat: "774",
        fiber: "28",
        iron: "26",
        monoFat: "945",
        polyFat: "14",
        potassium: "346",
        protein: "865",
        saturatedFat: "234",
        sodium: "563",
        sugars: "346",
        vitaminA: "2457",
        vitaminC: "457",
    }
}];

const RecipeCreator = (props) => {

    const [saving, setSaving] = useState(false);
    const [servings, setServings] = useState(testServings);
    const [selectCategory, setSelectCategory] = useState(false);
    const [loadingCat, setLoadingCat] = useState(false);
    const [category, setCategory] = useState(null);
    const [addServing, setAddServing] = useState(false);
    const [servingError, setServingError] = useState(null);
    const [searchRecipe, setSearchRecipe] = useState(false);




    const handleSubmit = (event) => {
        event.preventDefault(); 
        console.log(event);
    }

    const categoryHandler = () => {
        setSelectCategory(true);    
    }

    const categorySelectedHandler = (cat) => {
        setCategory(cat);
        setSelectCategory(false);
    }

    const chooseCatCancelHandler = () => {
        setSelectCategory(false);
    }

    // let foodSummary = null;

    // if (this.state.currentFood){
    //     foodSummary = <FoodSummary 
    //         food={this.state.currentFood}
    //         foodSaveCancelled ={this.foodSaveCancelHandler}
    //         foodSaveContinued = {this.foodSaveContinueHandler}/>
    // }

    // if (this.state.loading) {
    //     foodSummary = <Spinner />
    // }


    const saveServingHandler = (serving) => {
        const newServing = {
            "servingSize" : serving.servingSize,
            "servingSizeDesc" : serving.servingSizeDesc,
            "metricSize" : serving.metricSize,
            "metricSizeDesc" : serving.metricSizeDesc,
            "nutrients" : {
                "calcium" : serving.calcium,
                "calories" : serving.calories,
                "carbs" : serving.totalCarbs,
                "cholesterol" : serving.cholesterol,
                "fat" : serving.totalFat,
                "fiber" : serving.fiber,
                "iron" : serving.iron,
                "mono-unsat-fat" : serving.monoFat,
                "poly-unsat-fat" : serving.polyFat,
                "potassium" : serving.potassium,
                "protein" : serving.protein,
                "sat-fat" : serving.saturatedFat,
                "sodium" : serving.sodium,
                "sugars" : serving.sugars,
                "vitamin-a" : serving.vitaminA,
                "vitamin-c" : serving.vitaminC
            }           
        }
        console.log(newServing)
        // //Add new serving to old servings array
        const allServings = [servings, newServing]

        setServings(allServings)
    };

    const servingErrorHandler = () => {
        setServingError(true);
    };

    const servingErrorCancelHandler = () => {
        setServingError(false);
    };

    const searchRecipeHandler = () => {
        setSearchRecipe(prev => !prev);
    }

    const title = props.show ? <div>
        <h2>Add a Recipe</h2>
    </div> : null;

    const searchBtnDiv = props.show ? <BtnDiv onClick={searchRecipeHandler}>
        <Container>
            <Row>
                <Col>
                    Search Online
                </Col>
            </Row>
        </Container>
    </BtnDiv> : null;

    const servingsContainer = servings.length > 0 ? <Servings servings={servings} /> : null
    const categoryChosen = category ? <span>{category}</span> : <span>Choose a Category</span>

    // only show the creator is props.show is true
    const recipeCreator = props.show ? <RecipeCreatorDiv>
        <form onSubmit={handleSubmit}>
            <div className=" row align-items-center my-2"> 
                <label htmlFor="recipeName" className="form-label col-sm-2">Recipe Name</label>
                <div className="col">
                    <input type="text" className="form-control" id="recipeName"/> 
                </div>  
            </div>
            <div className=" row align-items-center"> 
                <label htmlFor="description" className="form-label col-sm-2">Description</label>
                <div className="col">
                    <input type="text" className="form-control" id="description"/> 
                </div>  
            </div>  
            <div className=" row my-2"> 
                <div className="col">
                    <div className="row align-items-center">
                        <label htmlFor="servings" className="form-label col">Servings</label>
                        <div className="col">
                            <input type="text" className="form-control" id="servings"/> 
                        </div> 
                    </div>
                </div>
                <div className="col">
                    <div className="row align-items-center">
                        <label htmlFor="prepTime" className="form-label col">Prep Time</label>
                        <div className="col">
                            <input type="text" className="form-control" id="prepTime"/> 
                        </div>
                    </div>    
                </div>
                <div className="col">
                    <div className="row align-items-center">
                        <label htmlFor="cookTime" className="form-label col">Cook Time</label>
                        <div className="col">
                            <input type="text" className="form-control" id="cookTime"/> 
                        </div>
                    </div> 
                </div>    
            </div>
            <div className=" row align-items-center justify-content-center"> 
                <label htmlFor="category" className="form-label col-sm-2">Category</label>
                <div className="col-4">
                    {categoryChosen}
                </div>
                <div className="col-2">
                    <button 
                        type="button" 
                        className="btn btn-primary btn-sm" 
                        id="description"
                        onClick={categoryHandler}>{category === null ? 'Choose' : 'Change'}</button> 
                </div>  
            </div> 

            <hr />
            <div>
                <h5>Servings</h5>
            </div>
            
            {servingsContainer}
            {/* <ServingCreator show={true} saveServingHandler={serving => saveServingHandler(serving)} errorHandler={servingErrorHandler}/> */}

            <div className="row">
                <div className="col">
                    <BtnDiv onClick={props.addServ}>
                        {!addServing ? 'Add Serving' : 'Cancel'}
                    </BtnDiv>
                </div>
            </div>
        
            <hr />

            <span>Directions</span>
            <Directions />

            <hr />

            <div className=" row align-items-center my-2">   
                <label htmlFor="notes" className="form-label col">Notes</label> 
            </div>
            <div className=" row-8 align-items-center my-2"> 
                <textarea type="text" className="form-control" id="notes" rows="4"></textarea> 
            </div>

            <button className="btn btn-sm btn-block btn-success mt-4" type='submit'>Save Recipe</button>
        </form>
    </RecipeCreatorDiv> : null;

    const backButtons = props.show ? <button className="btn btn-sm btn-block btn-danger" type='button' onClick={props.backHandler}>Back</button> : null;

    return (
        <Fragment>
            <Modal show={selectCategory} modalClosed={chooseCatCancelHandler}>
                <CategoryGrid selected={cat => categorySelectedHandler(cat)}/>
            </Modal>
            <Modal show={servingError} modalClosed={servingErrorCancelHandler}>
                <p>Error</p>
            </Modal>
            <Modal show={searchRecipe} modalClosed={searchRecipeHandler}>
                <Search isRecipe={true}/>
            </Modal>
            {title}
            {searchBtnDiv}
            {recipeCreator}
            {backButtons}
        </Fragment>
    );
    
    
};

export default RecipeCreator;