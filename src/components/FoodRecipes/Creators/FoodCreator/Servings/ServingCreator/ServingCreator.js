import React, { useState } from 'react'; 
import styled from 'styled-components';
import useServingForm from './useServingForm';
import { Row, Col, InputGroup, FormControl, Dropdown } from 'react-bootstrap';            


// const ServingContainer = styled.div`
//     background-color: #eee;
//     padding: 10px 5px 10px 5px;
// `;


const ServingCreator = (props) => {
 
    // const [fields, setFields] = useState({
    //         servingSize: "-1",
    //         servingSizeDesc: "",
    //         metricSize: "-1",
    //         metricSizeDesc: "g",
    //         calories: "-1",
    //         totalFat: "-1",
    //         saturatedFat: "-1",
    //         polyFat: "-1",
    //         monoFat: "-1",
    //         cholesterol: "-1",
    //         sodium: "-1",
    //         potassium: "-1",
    //         totalCarbs: "-1",
    //         fiber: "-1",
    //         sugars: "-1",
    //         protein: "-1",
    //         vitaminA: "-1",
    //         vitaminC: "-1",
    //         calcium: "-1",
    //         iron: "-1"
    //     }
    // );

    const formCallbackThingy = () => {
        console.log(fields)
    }

    const {fields, handleInputChange, handleSubmit} = useServingForm(formCallbackThingy);

    

    const saveServingHandler = () => {   

        const allFieldsFilled = (Number(fields.servingSize) > 0 && Number(fields.servingSizeDesc.trim().length) > 0 
                                && Number(fields.metricSize) > 0 && Number(fields.calories) > 0
                                && Number(fields.totalFat) > 0 && Number(fields.saturatedFat) > 0
                                && Number(fields.polyFat) > 0 && Number(fields.monoFat) > 0
                                && Number(fields.cholesterol) > 0 && Number(fields.sodium) > 0
                                && Number(fields.potassium) > 0 && Number(fields.totalCarbs) > 0
                                && Number(fields.fiber) > 0 && Number(fields.sugars) > 0
                                && Number(fields.protein) > 0 && Number(fields.vitaminA) > 0
                                && Number(fields.vitaminC) > 0 && Number(fields.calcium) > 0
                                && Number(fields.iron) > 0)

        console.log(allFieldsFilled)
        console.log(fields)

        if (allFieldsFilled){
            props.saveServingHandler(fields);
        }else{
            props.errorHandler();
        }
    };

    const metricDescHandler = (val) => {
        const newFields = {...fields}
        newFields.metricSizeDesc = val;

        //setFields(newFields);
    };

    // const nutrientChange = e => {
    //     const newFields = {...fields}
    //     console.log(newFields)
    //     console.log(newFields[e.target.id])
    //     newFields[e.target.id] = e.target.value
        
    //     setFields(newFields);
    //     console.log(fields)
    // } 

    const handleEventChange = (event) => {
        event.persist();
        handleInputChange(event);
    }

    const ColNutrient = (props) => {

        const append = props.sizeDesc ? <InputGroup.Append>
            <InputGroup.Text id={props.lbl+"Append"}>{props.sizeDesc}</InputGroup.Text>
        </InputGroup.Append> : null;

        return (
            <Col md className="input-group">
                <Row className="no-gutters align-items-center mx-auto">
                    <label htmlFor={props.id} className="form-label px-1">{props.lbl}</label>
                </Row>

                <Row className="no-gutters align-items-center mx-auto">
                    <Col className="px-1">
                        <InputGroup size="sm">
                        <FormControl
                            aria-label={props.lblFull}
                            id={props.id}
                            onChange={handleInputChange}
                            />
                            {append}
                        </InputGroup>
                    </Col> 
                </Row>          
            </Col>
        )
    };

    return (
        props.show ? <div>
            <div className="mb-3">
                <span>Fill in the Blanks</span>
            </div>
            <Row className="form-group"> 
                <Col className="input-group">
                    <Row className="no-gutters align-items-center">
                        <label htmlFor="servingSize" className="form-label col-sm-4 px-1">Serving Size</label>
                        <Col sm={4} className="px-1">
                            <InputGroup size="sm">
                            <FormControl
                                placeholder="Size"
                                aria-label="Serving Size"
                                id="servingSize"
                                onChange={handleInputChange}
                                />
                            </InputGroup>
                        </Col> 
                        <Col sm={4} className="px-1">
                        <InputGroup size="sm">
                            <FormControl
                                placeholder="Desc"
                                aria-label="Serving Size Description"
                                id="servingSizeDesc"
                                onChange={handleInputChange}
                                />
                            </InputGroup>
                        </Col>   
                    </Row>
                </Col>
                <Col className="input-group">
                    <Row className="no-gutters align-items-center">
                        <label htmlFor="metricSize" className="form-label col-sm-4 px-1">Metric Size</label>
                        <Col sm={4} className="px-1">
                            <InputGroup size="sm">
                            <FormControl
                                placeholder="Metric"
                                aria-label="Metric Size"
                                id="metricSize"
                                onChange={handleInputChange}
                                />
                            </InputGroup>
                        </Col> 
                        <Col sm={4} className="px-1">
                            <Dropdown>
                                <Dropdown.Toggle size="sm" variant="primary" id="dropdownMenu">
                                    {fields.metricSizeDesc}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => metricDescHandler('g')}>g</Dropdown.Item>
                                    <Dropdown.Item onClick={() => metricDescHandler('oz')}>oz</Dropdown.Item>
                                    <Dropdown.Item onClick={() => metricDescHandler('ml')}>ml</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>   
                    </Row>
                </Col>
            </Row>
            <hr />

            <Row className="form-group"> 
                <Col md className="input-group">
                    <Row className="no-gutters align-items-center mx-auto">
                        <label htmlFor="calories" className="form-label px-1">Calories</label>
                    </Row>

                    <Row className="no-gutters align-items-center mx-auto">
                        <Col className="px-1">
                            <InputGroup size="sm">
                            <FormControl
                                aria-label="Calories"
                                id="calories"
                                onChange={handleInputChange}
                                />
        
                            </InputGroup>
                        </Col> 
                    </Row>         
                </Col>
                <ColNutrient id="calories" lbl="Calories" lblFull="Calories" onChange={e => {e.persist(); handleInputChange(e)}}/>    
            </Row>

            <Row className="form-group"> 
                <ColNutrient id="totalFat" lbl="Total Fat" lblFull="Total Fat" sizeDesc="g" val={fields.totalFat} handleChange={handleInputChange}/>  
                <ColNutrient id="saturatedFat" lbl="Sat Fat" lblFull="Saturated Fat" sizeDesc="g" val={fields.saturatedFat} handleChange={handleInputChange}/>  
                <ColNutrient id="polyFat" lbl="Poly Fat" lblFull="Poly Unsaturated Fat" sizeDesc="g" val={fields.polyFat} handleChange={handleInputChange}/>  
                <ColNutrient id="monoFat" lbl="Mono Fat" lblFull="Mono Unsaturated Fat" sizeDesc="g" val={fields.monoFat} handleChange={handleInputChange}/>     
            </Row>

            <hr />

            <Row className="form-group"> 
                <ColNutrient id="cholesterol" lbl="Cholest" lblFull="Cholesterol" sizeDesc="mg" val={fields.cholesterol}/>  
                <ColNutrient id="sodium" lbl="Sodium" lblFull="Sodium" sizeDesc="mg" val={fields.sodium}/>  
                <ColNutrient id="potassium" lbl="Potassium" lblFull="Potassium" sizeDesc="mg" val={fields.potassium}/>  
            </Row>

            <Row className="form-group"> 
                <ColNutrient id="totalCarbs" lbl="Carbs" lblFull="Total Carbs" sizeDesc="g" val={fields.totalCarbs}/>  
                <ColNutrient id="fiber" lbl="Fiber" lblFull="Fiber" sizeDesc="g" val={fields.fiber}/>  
                <ColNutrient id="sugars" lbl="Sugars" lblFull="Sugars" sizeDesc="g" val={fields.sugars}/> 
                <ColNutrient id="protein" lbl="Protein" lblFull="Protein" sizeDesc="g" val={fields.protein}/>     
            </Row>
            
            <hr />

            <Row className="form-group"> 
                <ColNutrient id="vitaminA" lbl="Vit A" lblFull="Vitamin A" sizeDesc="%" val={fields.vitaminA}/>  
                <ColNutrient id="vitaminC" lbl="Vit C" lblFull="Vitamin C" sizeDesc="%" val={fields.vitaminC}/>  
                <ColNutrient id="calcium" lbl="Calcium" lblFull="Caclium" sizeDesc="%" val={fields.calcium}/> 
                <ColNutrient id="iron" lbl="Iron" lblFull="Iron" sizeDesc="%" val={fields.iron}/>    
            </Row>

            <Row>
                <Col className="text-center">
                    <button className="btn btn-sm btn-primary" type="button" onClick={handleSubmit}>Save Serving</button>
                </Col>
            </Row>
        </div> : null  
    )         
};

export default ServingCreator;