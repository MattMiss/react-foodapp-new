import React, { Fragment, Component } from 'react';

import Modal from '../../../UI/Modal/Modal';
import CategoryGrid from './CategoryGrid/CategoryGrid';
import Servings from '../FoodCreator/Servings/Servings';
import ServingCreator from '../FoodCreator/Servings/ServingCreator/ServingCreator';
import styled from 'styled-components';
import Directions from './Directions/Directions';
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

class RecipeCreator extends Component {
    
    state = {
        saving: false,
        selectCategory: false,
        loadingCat: false,
        category: null,
        servings: [{
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
        }]
    }

    handleSubmit = (event) => {
        event.preventDefault(); 
        console.log(event);
    }

    categoryHandler = () => {
        this.setState({selectCategory: true});
    }

    categorySelectedHandler = (cat) => {
        this.setState({category: cat, selectCategory: false})
    }

    chooseCatCancelHandler = () => {
        this.setState({selectCategory: false});
    }

    render(){

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


        const title = this.props.show ? <div>
            <h2>Add a Recipe</h2>
        </div> : null;

        const category = this.state.category ? <span>{this.state.category}</span> : <span>Choose a Category</span>

        // only show the creator is props.show is true
        const recipeCreator = this.props.show ? <RecipeCreatorDiv>
            <form onSubmit={this.handleSubmit}>
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
                        {category}
                    </div>
                    <div className="col-2">
                        <button 
                            type="button" 
                            className="btn btn-primary btn-sm" 
                            id="description"
                            onClick={this.categoryHandler}>{this.state.category === null ? 'Choose' : 'Change'}</button> 
                    </div>  
                </div> 

                <hr />
                <div>
                    <h5>Servings</h5>
                </div>
                
                {<Servings servings={this.state.servings}/>}
                <ServingCreator show={true} saveServingHandler={serving => this.saveServingHandler(serving)} errorHandler={this.servingErrorHandler}/>

                
                <div>
                    <span onClick={this.servingHandler}>{!this.state.addServing ? 'Add Serving' : 'Cancel'}</span>
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

        return (
            <Fragment>
                <Modal show={this.state.selectCategory} modalClosed={this.chooseCatCancelHandler}>
                    <CategoryGrid selected={cat => this.categorySelectedHandler(cat)}/>
                </Modal>
                <Modal show={this.state.servingError} modalClosed={this.servingErrorCancelHandler}>
                    <p>Error</p>
                </Modal>
                {title}
                {recipeCreator}
            </Fragment>
        );
    }
    
    
};

export default RecipeCreator;