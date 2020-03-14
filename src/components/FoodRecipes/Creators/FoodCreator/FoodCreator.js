import React, { Fragment, useState } from 'react';

import Modal from '../../../UI/Modal/Modal';
import ModalInner from '../../../UI/Modal/ModalInner';
//import FoodSummary from '../FoodSummary/FoodSummary';
import ServingCreator from './Servings/ServingCreator/ServingCreator';
import Servings from './Servings/Servings';
import axios from '../../../../axios-food';
import styled from 'styled-components';


const FoodContainer = styled.div`
    margin: 20px auto;
    font-size: 12px;
`;

const AddServingDiv = styled.div`
    text-align: center;
    font-size: 1.2em;
    background-color: #00a5ff;
    color: white;
    margin-top: 10px;
    border-radius: 3px;

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
}];

const FoodCreator = (props) => {
    
    const [currentFood, setCurrentFood] = useState(null);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(false);
    const [addServing, setAddServing] = useState(false);
    const [showBrand, setShowBrand] = useState(false);
    const [servings, setServings] = useState(testServings);
    const [currentServing, setCurrentServing] = useState(null);
    const [servingError, setServingError] = useState(null);
    const [error, setError] = useState(null);


    // state = {
    //     currentFood: null,
    //     saving: false,
    //     addServing: false,
    //     showBrand: false,
        // servings: [{
        //     servingSize: "123",
        //     servingSizeDesc: "ty",
        //     metricSize: "12",
        //     metricSizeDesc: "g",
        //     nutrients: {
        //         calcium: "786",
        //         calories: "123",
        //         carbs: "954",
        //         cholesterol: "1567",
        //         fat: "774",
        //         fiber: "28",
        //         iron: "26",
        //         monoFat: "945",
        //         polyFat: "14",
        //         potassium: "346",
        //         protein: "865",
        //         saturatedFat: "234",
        //         sodium: "563",
        //         sugars: "346",
        //         vitaminA: "2457",
        //         vitaminC: "457",
        //     }
        // },
        // {
        //     servingSize: "5637",
        //     servingSizeDesc: "df",
        //     metricSize: "3",
        //     metricSizeDesc: "g",
        //     nutrients: {
        //         calcium: "678",
        //         calories: "3567",
        //         carbs: "5368",
        //         cholesterol: "857",
        //         fat: "568",
        //         fiber: "4654",
        //         iron: "234",
        //         monoFat: "64",
        //         polyFat: "12",
        //         potassium: "6",
        //         protein: "568",
        //         saturatedFat: "978",
        //         sodium: "89",
        //         sugars: "687",
        //         vitaminA: "564",
        //         vitaminC: "47",
        //     }
        // }],
    //     currentServing: null,
    //     servingError: false
    // } 


    const handleSubmit = (event) => {
        event.preventDefault(); 

        const food = {
            name : event.target.foodName.value,
            type : event.target.type.value,
            servings : servings          
        }
        if (event.target.type.value === 'brand'){
            food.brand = event.target.brandName.value;
        }

        setSaving(true); 
        setAddServing(false);
        setCurrentFood(food);   
    }

    const foodSaveContinueHandler = () => {
        setLoading(true);

        axios.post('/food-items.json', currentFood)
            .then(response => {
                setLoading(false);
                setSaving(false);
                //this.loadFoods()
            })
            .catch(error => {
                setLoading(false);
                setSaving(false);
            });
    }

    const loadFoods = () => {
        props.loadFood();
    }

    const foodSaveCancelHandler = () => {
        setSaving(false);
    }



    const brandHandler = (props) => {
        switch (props){
            case 'generic':
                setShowBrand(false);
                break;
            case 'brand':
                setShowBrand(true);
                break;
            default:
        }
    };

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


    let foodSummary = null;

    if (currentFood){
        // foodSummary = <FoodSummary 
        //     food={currentFood}
        //     foodSaveCancelled ={foodSaveCancelHandler}
        //     foodSaveContinued = {foodSaveContinueHandler}/>
    }


    const title = props.show ? <div>
        <h2>Add a Food</h2>
    </div> : null;


    const brandContainer = showBrand ? <div className="row" id="brandNameContainer">
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


    const servingsContainer = servings.length > 0 ? <Servings servings={servings} /> : null

    
    // only show the creator is props.show is true
    const foodCreator = props.show ? <FoodContainer>
        <form onSubmit={handleSubmit}>
            <div className="container">
                <div className="form-group row align-items-center"> 
                    <label htmlFor="foodName" className="form-label col-sm-2">Food Name</label>
                    <div className="col-sm-4">
                        <input type="text" className="form-control" id="foodName"/> 
                    </div>
                    <div className={"col-sm-6"}>
                        <div className={"row align-items-center"}>
                            <label htmlFor="type" className="form-label col-sm-4">Type</label> 
                            <div className="btn-group btn-group-toggle col-sm-8" data-toggle="buttons">
                                <label className="btn btn-sm btn-primary active">
                                    <input type="radio" name="type" value="generic" defaultChecked onClick={() => brandHandler('generic')}/> Generic 
                                </label>
                                <label className="btn btn-sm btn-primary">
                                    <input type="radio" name="type" value="brand" onClick={() => brandHandler('brand')}/> Brand 
                                </label>
                            </div>
                        </div> 
                    </div>  
                </div>
                {brandContainer}  

                <hr />
                <div>
                    <center><h5>Servings</h5></center>
                </div>
                
                {servingsContainer}

                <div className="row">
                    <div className="col">
                        <AddServingDiv onClick={props.addServ}>
                            {!addServing ? 'Add Serving' : 'Cancel'}
                        </AddServingDiv>
                    </div>
                </div>
                
            
                <hr />

                <div className=" row align-items-center my-2">   
                    <label htmlFor="notes" className="form-label col">Notes</label> 
                </div>
                <div className=" row-8 align-items-center my-2"> 
                    <textarea type="text" className="form-control" id="notes" rows="4"></textarea> 
                </div>
                
                <button className="btn btn-sm btn-block btn-success" type='submit'>Save Food</button>
            </div>
        </form>
    </FoodContainer> : null;

    const backButtons = props.show ? <button className="btn btn-sm btn-block btn-danger" type='button' onClick={props.backHandler}>Back</button> : null;

    return (
        <Fragment>
            <Modal show={saving} modalClosed={foodSaveCancelHandler}>
                {foodSummary}
            </Modal>
            {/* <ModalInner show={addServing} modalClosed={servingCancelHandler}>
                <ServingCreator show={addServing} saveServingHandler={serving => saveServingHandler(serving)} errorHandler={servingErrorHandler}/>
            </ModalInner> */}
            <Modal show={servingError} modalClosed={servingErrorCancelHandler}>
                <p>Error</p>
            </Modal>
            {title}
            {foodCreator}
            {backButtons}
        </Fragment>
    );
}
    

export default FoodCreator;