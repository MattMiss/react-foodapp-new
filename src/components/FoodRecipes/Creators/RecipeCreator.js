import React, { useState, useRef } from 'react';

import Modal from '../../UI/Modal';
import ModalInner from '../../UI/ModalInner';
import Search from '../Searchers/Search';
import FoodSummary from './FoodSummary';
import Servings from './Servings';
import Directions from './Directions';
import CategoryGrid from './CategoryGrid';
import useInputForm from '../useInputForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import {Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import axios from '../../../axios-food';
import styled from 'styled-components';
import ServingCreator from './ServingCreator';

  
const RecipeContainer = styled.div`
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
        background-color: #182955;
        color: #00a5ff;
    }

    &span {
        margin: 0 5px;
    }
`;

const AddDirectionDiv = styled.div`
    text-align: center;
    font-size: 1.2em;
    margin-top: 10px;
    border-radius: 3px;
    padding: 5px;

`;


// const testServings = [{
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
// }];

const RecipeCreator = ( {showCreator, backHandler, initialItem} ) => {

    const [currentRecipe, setCurrentRecipe] = useState(null);
    const [saving, setSaving] = useState(false);
    const [addServing, setAddServing] = useState(false);
    const [selectCategory, setSelectCategory] = useState(false);
    const [category, setCategory] = useState(initialItem ? initialItem.category : null);
    const [servings, setServings] = useState(initialItem ? initialItem.servings : []);
    const [servingError, setServingError] = useState(null);
    const [error, setError] = useState(null);
    const [searchRecipe, setSearchRecipe] = useState(false);
    const [clearSearch, setClearSearch] = useState(false);
    const [directions, setDirections] = useState(initialItem ? initialItem.directions : []);
    const [addDirection, setAddDirection] = useState(false);

    const recipeNameRef = useRef(null);
    const recipeDescRef = useRef(null);
    const recipeServingSizeRef = useRef(null);
    const recipePrepTimeRef = useRef(null);
    const recipeCookTimeRef = useRef(null);
    const notesRef = useRef(null);

    const saveRecipeHandler = () => {
        console.log(fields);
    };

    const {fields, handleInputChange, handleSubmit} = useInputForm(saveRecipeHandler);

    const handleSave = () => {
        const recipeCheck = recipeNameRef.current.value && 
                            recipeDescRef.current.value &&
                            recipeServingSizeRef.current.value &&
                            servings.length > 0;
                   
        if (recipeCheck){
            const recipe = {
                name : recipeNameRef.current.value,
                description : recipeDescRef.current.value,
                servingSize : recipeServingSizeRef.current.value,
                prepTime : recipePrepTimeRef.current.value,
                cookTime : recipeCookTimeRef.current.value,
                servings : servings,
                directions: directions,
                notes : notesRef ? notesRef.current.value : "",   
                category: category ? category : "none" 
            }

            if (initialItem){
                recipe.id = initialItem.id;
            }
    
            setSaving(true); 
            setAddServing(false);
            setCurrentRecipe(recipe);
        }else{
            setError(true);
        }
           
    }

    const recipeSaveContinueHandler = () => {

        return(
            initialItem ? axios.put('/recipe-items/' + currentRecipe.id + '.json', currentRecipe)
                .then(response => {
                    setSaving(false);
                    //this.loadFoods()
                })
                .catch(error => {
                    setSaving(false); 
                }) 
                : 
                axios.post('/recipe-items.json', currentRecipe)
                    .then(response => {
                        setSaving(false);
                        //this.loadFoods()
                    })
                    .catch(error => {
                        setSaving(false); 
                    })
                );
    }

    const recipeSaveCancelHandler = () => {
        setSaving(false);
    }

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

    const addDirectionHandler = () => {
        setAddDirection(prev => !prev);
    };

    const servingErrorHandler = () => {
        setServingError(true);
    };

    const errorCancelHandler = () => {
        setServingError(false);
        setError(false);
    };

    const searchRecipeHandler = () => {
        setSearchRecipe(prev => !prev);
        setClearSearch(prev => !prev);   
    }


    const categorySelectedHandler = (cat) => {
        setCategory(cat);
        setSelectCategory(false);
    }

    const chosenItemHandler = (item) => {
        // TODO: Add item to boxes
        console.log(item)
        setSearchRecipe(false);
        setClearSearch(prev => !prev);   

        const srv = item.serving_sizes.serving;

        fields.recipeName = item.recipe_name;
        recipeNameRef.current.value = item.recipe_name;
        fields.description = item.recipe_description;
        recipeDescRef.current.value = item.recipe_description;
        fields.servingSize = srv.serving_size;
        recipeServingSizeRef.current.value = srv.serving_size;
        const pT = srv.prep_time ? srv.prep_time : "";
        fields.prepTime = pT;
        recipePrepTimeRef.current.value = pT;
        const cT = srv.cook_time ? srv.cook_time : "";
        fields.cookTime = cT; 
        recipeCookTimeRef.current.value = cT;  
        

        const newTempServing = {
            servingSize : item.number_of_servings,
            servingSizeDesc : srv.serving_size,
            nutrients : {
                calcium : srv.calcium,
                calories : srv.calories,
                carbs : srv.carbohydrate,
                cholesterol : srv.cholesterol,
                fat : srv.fat,
                fiber : srv.fiber,
                iron : srv.iron,
                monoFat : srv.monounsaturated_fat,
                polyFat : srv.polyunsaturated_fat,
                potassium : srv.potassium,
                protein : srv.protein,
                saturatedFat : srv.saturated_fat,
                sodium : srv.sodium,
                sugars : srv.sugar,
                transFat: srv.trans_fat,
                vitaminA : srv.vitamin_a,
                vitaminC : srv.vitamin_c
            }
        }

        setServings([newTempServing]);
        setDirections(item.directions.direction)
    };

    const directionAddedHandler = () => {
        const newDirection = { direction_description : fields.addDirection, direction_number : directions.length + 1 }
        setDirections([...directions, newDirection])
    };
    
    const title = <div>
        <h2>Add a Recipe</h2>
    </div>;


    const searchBtnDiv = <BtnDiv onClick={searchRecipeHandler}>
    <Container>
        <Row>
            <Col>
                Search Online
            </Col>
        </Row>
    </Container>
    </BtnDiv>;

    const servingsContainer = servings.length > 0 ? <Servings servings={servings} /> : <div>No Servings</div>
    const categoryChosen = category ? <span>{category}</span> : <span>Choose a Category</span>

    const AddMinusIcons = ({icon, text}) => (
        <>
            <FontAwesomeIcon icon={icon} />
            <span className="mx-1">{text}</span>
        </>  
    );

    // only show the creator is props.show is true
    const recipeContainer = (
      <RecipeContainer>
        <Container>
          <Row className="form-group align-items-center">
            <label htmlFor="recipeName" className="form-label col-sm-2">
              Recipe Name
            </label>
            <Col>
              <InputGroup size="sm">
                <FormControl
                  aria-label="Recipe Name"
                  id="recipeName"
                  onChange={handleInputChange}
                  ref={recipeNameRef}
                  defaultValue={initialItem ? initialItem.name : ""}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className="form-group align-items-center">
            <label htmlFor="description" className="form-label col-sm-2">
              Description
            </label>
            <Col>
              <InputGroup size="sm">
                <FormControl
                  aria-label="Description"
                  id="description"
                  onChange={handleInputChange}
                  ref={recipeDescRef}
                  defaultValue={initialItem ? initialItem.description : ""}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className="align-items-center">
            <label htmlFor="servings" className="form-label col px-1">
              Servings
            </label>
            <Col className="px-1">
              <InputGroup size="sm">
                <FormControl
                  aria-label="Servings"
                  id="servingSize"
                  onChange={handleInputChange}
                  ref={recipeServingSizeRef}
                  defaultValue={initialItem ? initialItem.servingSize : ""}
                />
              </InputGroup>
            </Col>
            <label htmlFor="prepTime" className="form-label col px-1">
              Prep Time
            </label>
            <Col className="px-1">
              <InputGroup size="sm">
                <FormControl
                  aria-label="Prep Time"
                  id="prepTime"
                  onChange={handleInputChange}
                  ref={recipePrepTimeRef}
                  defaultValue={initialItem ? initialItem.prepTime : ""}
                />
              </InputGroup>
            </Col>
            <label htmlFor="cookTime" className="form-label col px-1">
              Cook Time
            </label>
            <Col className="px-1">
              <InputGroup size="sm">
                <FormControl
                  aria-label="Cook Time"
                  id="cookTime"
                  onChange={handleInputChange}
                  ref={recipeCookTimeRef}
                  defaultValue={initialItem ? initialItem.cookTime : ""}
                />
              </InputGroup>
            </Col>
          </Row>

          <div className=" row align-items-center justify-content-center">
            <label htmlFor="category" className="form-label col-sm-2">
              Category
            </label>
            <div className="col-4">{categoryChosen}</div>
            <div className="col-2">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                id="description"
                onClick={() => setSelectCategory(true)}
              >
                {category === null ? "Choose" : "Change"}
              </button>
            </div>
          </div>

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
                {servings.length > 0 ? (
                  <Col>
                    <BtnDiv cancel={true} onClick={removeServingHandler} >
                      <AddMinusIcons icon={faMinus} text="Serving"/>
                    </BtnDiv>
                  </Col>
                ) : null}
                <Col>
                  <BtnDiv onClick={addServingHandler}>
                    {!addServing ? (
                      <>
                        <AddMinusIcons icon={faPlus} text="Serving"/>
                      </>
                    ) : (
                      "Cancel"
                    )}
                  </BtnDiv>
                </Col>
              </Row>
            </Col>
          </Row>

          <hr />

          <div>
            <center>
              <h5>Directions</h5>
            </center>
          </div>

          <Directions directions={directions} />

          <Row>
            <Col>
              {!addDirection ? (
                <BtnDiv cancel={false} onClick={addDirectionHandler} >
                      <AddMinusIcons icon={faPlus} text="Direction"/>
                </BtnDiv>
              ) : (
                <AddDirectionDiv>
                  <Row>
                    <Col xs={9}>
                      <InputGroup size="sm">
                        <FormControl
                          aria-label="Add a Direction"
                          id="addDirection"
                          placeholder={`Enter Direction ${
                            directions.length + 1
                          }`}
                          onChange={handleInputChange}
                        />
                      </InputGroup>
                    </Col>
                    <Col xs={3}>
                      <Row className="no-gutters">
                        <Col>
                          <Button
                            size="sm"
                            onClick={directionAddedHandler}
                            variant="success"
                          >
                            Add
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            size="sm"
                            onClick={() => setAddDirection(false)}
                            variant="danger"
                          >
                            Cancel
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </AddDirectionDiv>
              )}
            </Col>
          </Row>

          <hr />

          <div className=" row align-items-center my-2">
            <label htmlFor="notes" className="form-label col">
              Notes
            </label>
          </div>
          <div className=" row-8 align-items-center my-2">
            <textarea
              type="text"
              className="form-control"
              id="notes"
              rows="2"
              onChange={handleInputChange}
              ref={notesRef}
              defaultValue={initialItem ? initialItem.notes : ""}
            ></textarea>
          </div>

          <button
            className="btn btn-sm btn-block btn-success"
            onClick={handleSave}
          >
            Save Recipe
          </button>
        </Container>
      </RecipeContainer>
    );

    


    const backButtons = <button className="btn btn-sm btn-block btn-danger" type='button' onClick={backHandler}>Back</button>;

    // Is showCreator prop is true, mainContent will either be
    // the foodCreator or the serving creator (if addServing is true)
    const mainContent = !addServing ? <>
            {title}
            {searchBtnDiv}
            {recipeContainer}
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

        fields.recipeName = initialItem.name;
        fields.description = initialItem.description;
        fields.servingSize = initialItem.servingSize;
        fields.prepTime = initialItem.prepTime;
        fields.cookTime = initialItem.cookTIme;
        fields.notes = initialItem.notes;

    }

    return (
        <>
            <Modal show={selectCategory} modalClosed={() => setSelectCategory(false)}>
                <CategoryGrid selected={cat => categorySelectedHandler(cat)}/>
            </Modal>
            <Modal show={servingError || error} modalClosed={errorCancelHandler}>
                <p>Error</p>
            </Modal>
            <ModalInner show={searchRecipe} modalClosed={searchRecipeHandler}>
                <Search isRecipe={true} clear={clearSearch} chosenItem={item => chosenItemHandler(item)}/>
            </ModalInner>
            <ModalInner show={saving && currentRecipe} modalClosed={recipeSaveCancelHandler}>
                <FoodSummary 
                    item={currentRecipe} 
                    showSummary={saving && currentRecipe} 
                    cancelSave={recipeSaveCancelHandler} 
                    continueSave={recipeSaveContinueHandler}
                />
            </ModalInner>
            {showCreator ? mainContent : null}  
        </>

    );
      
};

export default RecipeCreator;