import React, { useState, useRef } from 'react';

import Modal from '../../UI/Modal';
import ModalInner from '../../UI/ModalInner';
import Search from '../Searchers/Search';
import FoodSummary from './FoodSummary';
import Servings from './Servings';
import useInputForm from '../useInputForm';
import {Container, Row, Col, InputGroup, FormControl, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
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
    background-color: ${props => props.cancel ? 'palevioletred' : '#00a5ff'};
    color: white;
    margin: 20px;
    border-radius: 3px;
    padding: 5px;

    &:hover {
        cursor: pointer;
        background-color: ${props => props.cancel ? '#a91b0d' : '#182955'};
        color: ${props => props.cancel ? 'white' : '#00a5ff'};
    }

    &span {
        margin: 0 5px;
    }
`;

const FoodCreator = ( {showCreator, backHandler, initialItem} ) => {
    
    const [currentFood, setCurrentFood] = useState(null);
    const [saving, setSaving] = useState(false);
    const [addServing, setAddServing] = useState(false);
    const [showBrand, setShowBrand] = useState(true);
    const [servings, setServings] = useState(initialItem ? initialItem.servings : []);
    const [servingError, setServingError] = useState(null);
    const [error, setError] = useState(null);
    const [searchFood, setSearchFood] = useState(false);
    const [clearSearch, setClearSearch] = useState(false);

    const foodNameRef = useRef(null);
    const brandNameRef = useRef(null);
    const notesRef = useRef(null);

    const saveFoodHandler = () => {
        console.log(fields);
    };

    const {fields, handleInputChange, handleSubmit} = useInputForm(saveFoodHandler);

    const handleSave = () => {
        const foodCheck = foodNameRef.current.value && servings.length > 0;

        if (foodCheck){
            const food = {
                name : foodNameRef.current.value,
                food_type : showBrand ? 'brand' : 'generic',
                brand_name : showBrand ? brandNameRef.current.value : "",
                type: "food",
                notes : notesRef ? notesRef.current.value : "",
                servings : servings          
            }
            if (initialItem){
                food.id = initialItem.id;
            }
    
            setSaving(true); 
            setAddServing(false);
            setCurrentFood(food);
        }else{
            setError(true);
        }
           
    };

    const foodSaveContinueHandler = () => {
        console.log("Saving")
        console.log(currentFood)
        
        return (
            initialItem ? axios.put('/food-items/' + currentFood.id + '.json', currentFood)
                .then(response => {
                    setSaving(false);
                    //this.loadFoods()
                })
                .catch(error => {
                    setSaving(false); 
                }) 
                : 
                axios.post('/food-items.json', currentFood)
                .then(response => {
                    setSaving(false);
                    //this.loadFoods()
                })
                .catch(error => {
                    setSaving(false); 
                })

        )
     
        // axios.post(`{/food-items/${currentFood.id}}`, currentFood, config)
        // .then(response => {
        //     console.log(response)
        //     setLoading(false);
        //     setSaving(false);
        //     //this.loadFoods()
        // })
        // .catch(error => {
        //     setLoading(false);
        //     setSaving(false); 
        // });
    };

    const foodSaveCancelHandler = () => {
        setSaving(false);
    };

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

    const removeServingHandler = (serving) => {

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
    };

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



    const title = <div>
        <h2>Add a Food</h2>
    </div>;

    const brandContainer = <Row className="justify-content-right" id="brandNameContainer">
                <Col xs={2} className="px-1">
                    <label htmlFor="brandName" className="form-label">Brand Name</label>
                </Col>
                
                <Col xs={6} className="px-1">
                    <InputGroup size="sm">
                        <FormControl
                            aria-label="Brand Name"
                            id="brandName"
                            onChange={handleInputChange}
                            ref={brandNameRef}
                            defaultValue={initialItem ? initialItem.brand: ""}
                            />
                    </InputGroup>
                </Col>
            </Row>;

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
    
    const AddMinusIcons = ({icon}) => (
        <>
            <FontAwesomeIcon icon={icon} />
            <span className="mx-1">Serving</span>
        </>  
    );

    // creatorContent will be either FoodContainer or ServingCreator based on addServing
    const foodContainer = <FoodContainer>
        <Container>
          <Row className="form-group align-items-center">
            <Col sm={2} className="px-1">
              <label htmlFor="foodName" className="form-label">
                Food Name
              </label>
            </Col>
            <Col sm={6} className="px-1">
              <InputGroup size="sm">
                <FormControl
                  aria-label="Food Name"
                  id="foodName"
                  onChange={handleInputChange}
                  ref={foodNameRef}
                  defaultValue={initialItem ? initialItem.name : ""}
                />
              </InputGroup>
            </Col>
            <Col sm={1}>
              <label htmlFor="type" className="form-label">
                Type
              </label>
            </Col>
            <Col sm={3}>
              <ToggleButtonGroup
                type="radio"
                name="options"
                defaultValue={"brand"}
                size="sm"
              >
                <ToggleButton
                  value={"generic"}
                  onClick={() => brandHandler("generic")}
                >
                  generic
                </ToggleButton>
                <ToggleButton
                  value={"brand"}
                  onClick={() => brandHandler("brand")}
                >
                  brand
                </ToggleButton>
              </ToggleButtonGroup>
            </Col>
          </Row>

          {showBrand ? brandContainer : null}

          <hr />
          <div>
            <center>
              <h5>Servings</h5>
            </center>
          </div>

          {servingsContainer}

          <Row className="justify-content-center">
            <Col sm={8}>
              <Row className="no-gutters">
                {servings.length > 0 ? <Col>
                  <BtnDiv cancel={true} onClick={removeServingHandler}>
                      <AddMinusIcons icon={faMinus}/>
                  </BtnDiv>
                </Col> : null}
                <Col>
                  <BtnDiv onClick={addServingHandler}>
                    {!addServing ? <>
                        <AddMinusIcons icon={faPlus}/>
                      </> : "Cancel"}
                  </BtnDiv>
                </Col>
              </Row>
            </Col>
          </Row>

          <hr />

          <Row className="align-items-center my-2">
            <Col>
              <label htmlFor="notes" className="form-label">
                Notes
              </label>
            </Col>
          </Row>
          <Row className="align-items-center my-2">
            <Col>
              <textarea
                type="text"
                className="form-control"
                id="notes"
                rows="2"
                onChange={handleInputChange}
                ref={notesRef}
                defaultValue={initialItem ? initialItem.notes : ""}
              ></textarea>
            </Col>
          </Row>

          <button
            className="btn btn-sm btn-block btn-success"
            onClick={handleSave}
          >
            Save Food
          </button>
        </Container>
    </FoodContainer>;


    const backButtons = <button className="btn btn-sm btn-block btn-danger" type='button' onClick={backHandler}>Back</button>;

    // Is showCreator prop is true, mainContent will either be
    // the foodCreator or the serving creator (if addServing is true)
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

    if (initialItem) {
        console.log(initialItem)

        fields.foodName = initialItem.name;
        if (initialItem.brand && initialItem.brand.length > 0){
            fields.brandName = initialItem.brand;
        }
        fields.description = initialItem.description;
        fields.notes = initialItem.notes;
        
    }

    return (
        <>
            <Modal show={servingError || error} modalClosed={errorCancelHandler}>
                <p>Error</p>
            </Modal>
            <ModalInner show={searchFood} modalClosed={searchFoodHandler}>
                <Search isRecipe={false} clear={clearSearch} chosenItem={item => chosenItemHandler(item)}/>
            </ModalInner>
            <ModalInner show={saving && currentFood} modalClosed={foodSaveCancelHandler}>
                <FoodSummary 
                    item={currentFood} 
                    showSummary={saving && currentFood} 
                    cancelSave={foodSaveCancelHandler} 
                    continueSave={foodSaveContinueHandler}
                />
            </ModalInner>
            {showCreator ? mainContent : null}
        </>
    );
}
    

export default FoodCreator;