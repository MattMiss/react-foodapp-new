import React, { useState, useRef } from 'react';

import Modal from '../../UI/Modal';
//import FoodSummary from '../FoodSummary/FoodSummary';
import FoodRecipeItem from '../FoodRecipeItem/FoodRecipeItem';
import Search from '../Searchers/Search';
import Servings from './Servings';
import useInputForm from '../useInputForm';
import {Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import axios from '../../../axios-food';
import styled from 'styled-components';
import ServingCreator from './ServingCreator';


const FoodContainer = styled.div`
    margin: 20px auto;
    font-size: 12px;
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

const FoodCreator = ( {showCreator, backHandler} ) => {
    
    const [currentFood, setCurrentFood] = useState(null);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(false);
    const [addServing, setAddServing] = useState(false);
    const [showBrand, setShowBrand] = useState(true);
    const [servings, setServings] = useState([]);
    const [currentServing, setCurrentServing] = useState(null);
    const [servingError, setServingError] = useState(null);
    const [error, setError] = useState(null);
    const [searchFood, setSearchFood] = useState(false);
    const [clearSearch, setClearSearch] = useState(false);

    const foodNameRef = useRef(null);
    const brandNameRef = useRef(null);

    const saveFoodHandler = () => {
        console.log(fields);
    };

    const {fields, handleInputChange, handleSubmit} = useInputForm(saveFoodHandler);

    const handleSave = () => {
        const foodCheck = foodNameRef.current.value && servings.length > 0;

        if (foodCheck){
            const food = {
                name : foodNameRef.current.value,
                type : showBrand ? 'brand' : 'generic',
                servings : servings          
            }
            if (showBrand){
                food.brand = brandNameRef.current.value;
            }
    
            setSaving(true); 
            setAddServing(false);
            setCurrentFood(food);
        }else{
            setError(true);
        }
           
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

    const foodSaveCancelHandler = () => {
        setSaving(false);
    }



    const brandHandler = (foodType) => {
        switch (foodType){
            case 'generic':
                setShowBrand(false);
                break;
            case 'brand':
                setShowBrand(true);
                break;
            default:
        }
    };

    const addServingHandler = () => {
        setAddServing(prev => !prev);
    };


    
    const saveServingHandler = (serving) => {
        const newServing = {
            servingSize : serving.servingSize,
            servingSizeDesc : serving.servingSizeDesc,
            metricSize : serving.metricSize,
            metricSizeDesc : serving.metricSizeDesc,
            nutrients : {
                calcium : serving.calcium,
                calories : serving.calories,
                carbs : serving.totalCarbs,
                cholesterol : serving.cholesterol,
                fat : serving.totalFat,
                fiber : serving.fiber,
                iron : serving.iron,
                monoFat : serving.monoFat,
                polyFat : serving.polyFat,
                potassium : serving.potassium,
                protein : serving.protein,
                saturatedFat : serving.saturatedFat,
                sodium : serving.sodium,
                sugars : serving.sugars,
                vitaminA : serving.vitaminA,
                vitaminC : serving.vitaminC
            }           
        }
        console.log(newServing)
        // //Add new serving to old servings array
        const allServings = [...servings, newServing]

        setServings(allServings)
        setAddServing(false);
    }; 

    const servingErrorHandler = () => {
        setServingError(true);
    };

    const errorCancelHandler = () => {
        setServingError(false);
        setError(false);
    };

    const searchFoodHandler = () => {
        setSearchFood(prev => !prev);
        setClearSearch(prev => !prev);   
    }


    const chosenItemHandler = (item) => {
        // TODO: Add item to boxes
        console.log(item)
        setSearchFood(false);
        setClearSearch(prev => !prev);   

        fields.foodName = item.food_name;
        foodNameRef.current.value = item.food_name;

        if (item.brand_name){
            setShowBrand(true);
            fields.brandName = item.brand_name;
            brandNameRef.current.value = item.brand_name;
        }

        let tempServings = [];
        if (item.servings.serving.length > 1){
            item.servings.serving.forEach(serv => tempServings.push(serv));
        }else{
            tempServings.push(item.servings.serving);
        }

        const newTempServings = tempServings.map(serving => {
            return {
                servingSize : serving.number_of_units,
                servingSizeDesc : serving.measurement_description,
                metricSize : serving.metric_serving_amount,
                metricSizeDesc : serving.metric_serving_unit,
                nutrients : {
                    calcium : serving.calcium,
                    calories : serving.calories,
                    carbs : serving.carbohydrate,
                    cholesterol : serving.cholesterol,
                    fat : serving.fat,
                    fiber : serving.fiber,
                    iron : serving.iron,
                    monoFat : serving.monounsaturated_fat,
                    polyFat : serving.polyunsaturated_fat,
                    potassium : serving.potassium,
                    protein : serving.protein,
                    saturatedFat : serving.saturated_fat,
                    sodium : serving.sodium,
                    sugars : serving.sugar,
                    vitaminA : serving.vitamin_a,
                    vitaminC : serving.vitamin_c
                }
            }
        })

        setServings(newTempServings);
        
    };

    let foodSummary = null;

    const addFieldsTest = () => {
        fields.foodName = "Burger";
        foodNameRef.current.value = "Burger"
    };

    if (currentFood){
        foodSummary = <div >
            <FoodRecipeItem item={currentFood} clicked={item => console.log(item)}/>
            <Container>
                <Row>
                    <Col>
                        <button className="btn btn-sm btn-block btn-danger" onClick={foodSaveCancelHandler}>No</button>
                    </Col>
                    <Col>
                        <button className="btn btn-sm btn-block btn-success" onClick={foodSaveContinueHandler}>Yes</button>
                    </Col>
                </Row>
            </Container>
        </div>
        
        
    }


    const title = <div>
        <h2>Add a Food</h2>
    </div>;


    const brandContainer = <div className="row" id="brandNameContainer">
            <Row className="justify-content-right">
                <label htmlFor="brandName" className="form-label col-sm-4">Brand Name</label>
                <Col xs={8}>
                    <InputGroup size="sm">
                        <FormControl
                            aria-label="Brand Name"
                            id="brandName"
                            onChange={handleInputChange}
                            ref={brandNameRef}
                            />
                    </InputGroup>
                </Col>
            </Row>         
    </div>;

    const searchBtnDiv = <BtnDiv onClick={searchFoodHandler}>
        <Container>
            <Row>
                <Col>
                    Search Online
                </Col>
            </Row>
        </Container>
    </BtnDiv>;

    const servingsContainer = servings.length > 0 ? <Servings servings={servings} /> : <div>No Servings</div>

    
    // creatorContent will be either FoodContainer or ServingCreator based on addServing
    const foodContainer = <FoodContainer >
            <Container>
                <Row className="form-group align-items-center"> 
                    <label htmlFor="foodName" className="form-label col-sm-2">Food Name</label>
                    <Col sm={4}>
                        <InputGroup size="sm">
                            <FormControl
                                aria-label="Food Name"
                                id="foodName"
                                onChange={handleInputChange}
                                ref={foodNameRef}
                                />
                        </InputGroup>
                    </Col>
                    <Col sm={6}>
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
                    </Col>  
                </Row>
                {showBrand ? brandContainer : null}  

                <button className="btn btn-danger" onClick={addFieldsTest}>Fields</button>

                <hr />
                <div>
                    <center><h5>Servings</h5></center>
                </div>
                
                {servingsContainer}

                <Row>
                    <Col>
                        <BtnDiv onClick={addServingHandler}>
                            {!addServing ? 'Add Serving' : 'Cancel'}
                        </BtnDiv>
                    </Col>
                </Row>
                
            
                <hr />

                <div className=" row align-items-center my-2">   
                    <label htmlFor="notes" className="form-label col">Notes</label> 
                </div>
                <div className=" row-8 align-items-center my-2"> 
                    <textarea type="text" className="form-control" id="notes" rows="4" onChange={handleInputChange}></textarea> 
                </div>
                
                <button className="btn btn-sm btn-block btn-success" onClick={handleSave}>Save Food</button>
            </Container>
    </FoodContainer>;


    const backButtons = <button className="btn btn-sm btn-block btn-danger" type='button' onClick={backHandler}>Back</button>;

    const mainContent = !addServing ? <>
            {title}
            {searchBtnDiv}
            {foodContainer}
            {backButtons}
        </> : <>
            <ServingCreator 
                show={true} 
                cancel={() => setAddServing(false)} 
                saveServing={serv => saveServingHandler(serv)}
                error={servingErrorHandler}/>
        </>;

    return (
        <>
            <Modal show={servingError || error} modalClosed={errorCancelHandler}>
                <p>Error</p>
            </Modal>
            <Modal show={searchFood} modalClosed={searchFoodHandler}>
                <Search isRecipe={false} clear={clearSearch} chosenItem={item => chosenItemHandler(item)}/>
            </Modal>
            {showCreator && !saving ? mainContent : null}
            {saving ? foodSummary : null}
        </>
    );
}
    

export default FoodCreator;