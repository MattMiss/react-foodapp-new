import React, { Fragment, Component } from 'react';


import Modal from '../../../UI/Modal/Modal';
//import FoodSummary from '../FoodSummary/FoodSummary';
import ServingCreator from './Servings/ServingCreator/ServingCreator';
import Servings from './Servings/Servings';
import axios from '../../../../axios-food';
import styled from 'styled-components';


const FoodContainer = styled.div`
    margin: 20px auto;
    padding: 10px 10px 20px 10px;
    width: 95%;
    font-size: 12px;
    border: 1px 1px #eee;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    max-width: 800px;
`;


class FoodCreator extends Component {
    
    state = {
        currentFood: null,
        saving: false,
        continue: false,
        addServing: false,
        showBrand: false,
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
        },
        {
            servingSize: "5637",
            servingSizeDesc: "df",
            metricSize: "3",
            metricSizeDesc: "g",
            nutrients: {
                calcium: "678",
                calories: "3567",
                carbs: "5368",
                cholesterol: "857",
                fat: "568",
                fiber: "4654",
                iron: "234",
                monoFat: "64",
                polyFat: "12",
                potassium: "6",
                protein: "568",
                saturatedFat: "978",
                sodium: "89",
                sugars: "687",
                vitaminA: "564",
                vitaminC: "47",
            }
        }],
        currentServing: null,
        servingError: false
    }


    handleSubmit = (event) => {
        event.preventDefault(); 

        const food = {
            name : event.target.foodName.value,
            type : event.target.type.value,
            servings : this.state.servings          
        }
        if (event.target.type.value === 'brand'){
            food.brand = event.target.brandName.value;
        }

        console.log(food)

        this.setState({saving: true, currentFood: food});    
    }

    foodSaveContinueHandler = () => {
        this.setState({loading: true});

        axios.post('/food-items.json', this.state.currentFood)
            .then(response => {
                this.setState({loading: false, saving: false});
                this.loadFoods()
            })
            .catch(error => {
                this.setState({loading: false, saving: false});
            });
    }

    loadFoods() {
        this.props.loadFood();
    }

    foodSaveCancelHandler = () => {
        this.setState({saving: false});
    }

    servingHandler = () => {
        if (!this.state.addServing){
            this.setState({addServing: true});
        }else{
            this.setState({addServing: false});
        }
        
    }

    brandHandler = (props) => {
        switch (props){
            case 'generic':
                this.setState({showBrand: false});
                break;
            case 'brand':
                this.setState({showBrand: true});
                break;
            default:
        }
    };

    saveServingHandler = (serving) => {
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

        //Add new serving to old servings array
        const allServings = [...this.state.servings, newServing]

        this.setState({servings: allServings, addServing: false})
    }; 

    servingErrorHandler = () => {
        this.setState({servingError: true})
    };

    servingErrorCancelHandler = () => {
        this.setState({servingError: false})
    };

    render(){

        let foodSummary = null;

        if (this.state.currentFood){
            // foodSummary = <FoodSummary 
            //     food={this.state.currentFood}
            //     foodSaveCancelled ={this.foodSaveCancelHandler}
            //     foodSaveContinued = {this.foodSaveContinueHandler}/>
        }

      

        const title = this.props.show ? <div>
            <h2>Add a Food</h2>
        </div> : null;


        const brandContainer = this.state.showBrand ? <div className={"row"} id="brandNameContainer">
            <div className={"col-sm-6"}>

            </div>
            <div className={"col-sm-6"} >
                <div className={"row align-items-center"}>
                    <label htmlFor="brandName" className="form-label col-sm-4">Brand Name</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" id="brandName"/> 
                    </div>
                </div>
            </div>           
        </div> : null


        const servingsContainer = true ? <Servings servings={this.state.servings} /> : null

        
        // only show the creator is props.show is true
        const foodCreator = this.props.show ? <FoodContainer>
        
        <form onSubmit={this.handleSubmit}>
            <div className="form-group row align-items-center"> 
                <label htmlFor="foodName" className="form-label col-sm-2">Food Name</label>
                <div className="col-sm-4">
                    <input type="text" className="form-control" id="foodName"/> 
                </div>
                <div className={"col-sm-6"}>
                    <div className={"row align-items-center"}>
                        <label htmlFor="type" className="form-label col-sm-4">Type</label> 
                        <div className="btn-group btn-group-toggle col-sm-8" data-toggle="buttons">
                            <label className="btn btn-primary active">
                                <input type="radio" name="type" value="generic" defaultChecked onClick={() => this.brandHandler('generic')}/> Generic 
                            </label>
                            <label className="btn btn-primary">
                                <input type="radio" name="type" value="brand" onClick={() => this.brandHandler('brand')}/> Brand 
                            </label>
                        </div>
                    </div> 
                </div>  
            </div>
            {brandContainer}  

            <hr />
            <div>
                <h5>Servings</h5>
            </div>
            
            {servingsContainer}
            <ServingCreator show={this.state.addServing} saveServingHandler={serving => this.saveServingHandler(serving)} errorHandler={this.servingErrorHandler}/>

            
            {/* <div className={classes.AddSrvText}> */}
            <div>
                <span onClick={this.servingHandler}>{!this.state.addServing ? 'Add Serving' : 'Cancel'}</span>
            </div>
        
            <hr />

            <div className=" row align-items-center my-2">   
                <label htmlFor="notes" className="form-label col">Notes</label> 
            </div>
            <div className=" row-8 align-items-center my-2"> 
                <textarea type="text" className="form-control" id="notes" rows="4"></textarea> 
            </div>
            
            <button className="btn btn-sm btn-block btn-success" type='submit'>Save Food</button>
        </form>
        
    </FoodContainer> : null;

    const backButtons = this.props.show ? <button className="btn btn-sm btn-block btn-danger" type='button' onClick={this.props.backHandler}>Back</button> : null;

        return (
            <Fragment>
                <Modal show={this.state.saving} modalClosed={this.foodSaveCancelHandler}>
                    {foodSummary}
                </Modal>
                <Modal show={this.state.servingError} modalClosed={this.servingErrorCancelHandler}>
                    <p>Error</p>
                </Modal>
                {title}
                {foodCreator}
                {backButtons}
            </Fragment>
        );
    }
    
    
};

export default FoodCreator;