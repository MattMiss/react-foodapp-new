import React, { useState } from 'react'; 
import styled from 'styled-components';
import useInputForm from '../useInputForm';
import { Row, Col, InputGroup, FormControl, Dropdown } from 'react-bootstrap';            


const ServingContainer = styled.div`
    padding: 10px 5px 10px 5px;
    font-size: .7rem;

    input, .input-group-text {
        font-size: .7rem !important;
    }

    .form-group {
        margin-bottom: .5rem;
    }
`;


const ServingCreator = (props) => {

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
            // Add Chosen MetricSizeDesc to the fields
            let newServing = {
                ...fields,
                metricSizeDesc: metricDesc
            }

            props.saveServing(newServing);
        }else{
            props.error();
        }
    };

    const cancelServing = () => {
        props.cancel();
    };
 

    const {fields, handleInputChange, handleSubmit} = useInputForm(saveServingHandler);
    const [metricDesc, setMetricDesc] = useState('');
    

    
    const metricDescHandler = (val) => {
        setMetricDesc(val);
    };


    // const ColNutrient = (props) => {

    //     const append = props.sizeDesc ? <InputGroup.Append>
    //         <InputGroup.Text id={props.lbl+"Append"}>{props.sizeDesc}</InputGroup.Text>
    //     </InputGroup.Append> : null;

    //     return (
    //         <Col md className="input-group">
    //             <Row className="no-gutters align-items-center mx-auto">
    //                 <label htmlFor={props.id} className="form-label px-1">{props.lbl}</label>
    //             </Row>

    //             <Row className="no-gutters align-items-center mx-auto">
    //                 <Col className="px-1">
    //                     <InputGroup size="sm">
    //                     <FormControl
    //                         aria-label={props.lblFull}
    //                         id={props.id}
    //                         onChange={props.handleChange}
    //                         value={props.val}
    //                         />
    //                         {append}
    //                     </InputGroup>
    //                 </Col> 
    //             </Row>          
    //         </Col>
    //     )
    // };

    return (
        props.show ? <ServingContainer>
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
                                    {metricDesc}
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
            </Row>

            <Row className="form-group"> 
                <Col md className="input-group">
                    <Row className="no-gutters align-items-center mx-auto">
                        <label htmlFor="totalFat" className="form-label px-1">Total Fat</label>
                    </Row>

                    <Row className="no-gutters align-items-center mx-auto">
                        <Col className="px-1">
                            <InputGroup size="sm">
                            <FormControl
                                aria-label="Total Fat"
                                id="totalFat"
                                onChange={handleInputChange}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>g</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col> 
                    </Row>         
                </Col>
                <Col md className="input-group">
                    <Row className="no-gutters align-items-center mx-auto">
                        <label htmlFor="saturatedFat" className="form-label px-1">Sat Fat</label>
                    </Row>

                    <Row className="no-gutters align-items-center mx-auto">
                        <Col className="px-1">
                            <InputGroup size="sm">
                            <FormControl
                                aria-label="Saturated Fat"
                                id="saturatedFat"
                                onChange={handleInputChange}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>g</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col> 
                    </Row>         
                </Col>
                <Col md className="input-group">
                    <Row className="no-gutters align-items-center mx-auto">
                        <label htmlFor="polyFat" className="form-label px-1">Poly Fat</label>
                    </Row>

                    <Row className="no-gutters align-items-center mx-auto">
                        <Col className="px-1">
                            <InputGroup size="sm">
                            <FormControl
                                aria-label="Poly Unsaturated Fat"
                                id="polyFat"
                                onChange={handleInputChange}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>g</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col> 
                    </Row>         
                </Col> 
                <Col md className="input-group">
                    <Row className="no-gutters align-items-center mx-auto">
                        <label htmlFor="monoFat" className="form-label px-1">Mono Fat</label>
                    </Row>

                    <Row className="no-gutters align-items-center mx-auto">
                        <Col className="px-1">
                            <InputGroup size="sm">
                            <FormControl
                                aria-label="Mono Unsaturated Fat"
                                id="monoFat"
                                onChange={handleInputChange}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>g</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col> 
                    </Row>         
                </Col>               
            </Row>

            <hr />

            <Row className="form-group"> 
                <Col md className="input-group">
                    <Row className="no-gutters align-items-center mx-auto">
                        <label htmlFor="cholesterol" className="form-label px-1">Cholest</label>
                    </Row>

                    <Row className="no-gutters align-items-center mx-auto">
                        <Col className="px-1">
                            <InputGroup size="sm">
                            <FormControl
                                aria-label="Cholesterol"
                                id="cholesterol"
                                onChange={handleInputChange}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>mg</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col> 
                    </Row>         
                </Col>
                <Col md className="input-group">
                    <Row className="no-gutters align-items-center mx-auto">
                        <label htmlFor="sodium" className="form-label px-1">Sodium</label>
                    </Row>

                    <Row className="no-gutters align-items-center mx-auto">
                        <Col className="px-1">
                            <InputGroup size="sm">
                            <FormControl
                                aria-label="Sodium"
                                id="sodium"
                                onChange={handleInputChange}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>mg</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col> 
                    </Row>         
                </Col>
                <Col md className="input-group">
                    <Row className="no-gutters align-items-center mx-auto">
                        <label htmlFor="potassium" className="form-label px-1">Potassium</label>
                    </Row>

                    <Row className="no-gutters align-items-center mx-auto">
                        <Col className="px-1">
                            <InputGroup size="sm">
                            <FormControl
                                aria-label="Potassium"
                                id="potassium"
                                onChange={handleInputChange}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>mg</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col> 
                    </Row>         
                </Col>  
            </Row>

            <Row className="form-group"> 
                <Col md className="input-group">
                    <Row className="no-gutters align-items-center mx-auto">
                        <label htmlFor="totalCarbs" className="form-label px-1">Carbs</label>
                    </Row>

                    <Row className="no-gutters align-items-center mx-auto">
                        <Col className="px-1">
                            <InputGroup size="sm">
                            <FormControl
                                aria-label="Total Carbs"
                                id="totalCarbs"
                                onChange={handleInputChange}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>g</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col> 
                    </Row>         
                </Col>
                <Col md className="input-group">
                    <Row className="no-gutters align-items-center mx-auto">
                        <label htmlFor="fiber" className="form-label px-1">Fiber</label>
                    </Row>

                    <Row className="no-gutters align-items-center mx-auto">
                        <Col className="px-1">
                            <InputGroup size="sm">
                            <FormControl
                                aria-label="Fiber"
                                id="fiber"
                                onChange={handleInputChange}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>g</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col> 
                    </Row>         
                </Col>
                <Col md className="input-group">
                    <Row className="no-gutters align-items-center mx-auto">
                        <label htmlFor="sugars" className="form-label px-1">Sugars</label>
                    </Row>

                    <Row className="no-gutters align-items-center mx-auto">
                        <Col className="px-1">
                            <InputGroup size="sm">
                            <FormControl
                                aria-label="Sugars"
                                id="sugars"
                                onChange={handleInputChange}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>g</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col> 
                    </Row>         
                </Col> 
                <Col md className="input-group">
                    <Row className="no-gutters align-items-center mx-auto">
                        <label htmlFor="protein" className="form-label px-1">Protein</label>
                    </Row>

                    <Row className="no-gutters align-items-center mx-auto">
                        <Col className="px-1">
                            <InputGroup size="sm">
                            <FormControl
                                aria-label="Protein"
                                id="protein"
                                onChange={handleInputChange}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>g</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col> 
                    </Row>         
                </Col>    
            </Row>
            
            <hr />

            <Row className="form-group"> 
                <Col md className="input-group">
                    <Row className="no-gutters align-items-center mx-auto">
                        <label htmlFor="vitaminA" className="form-label px-1">Vit A</label>
                    </Row>

                    <Row className="no-gutters align-items-center mx-auto">
                        <Col className="px-1">
                            <InputGroup size="sm">
                            <FormControl
                                aria-label="Vitamin A"
                                id="vitaminA"
                                onChange={handleInputChange}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col> 
                    </Row>         
                </Col>
                <Col md className="input-group">
                    <Row className="no-gutters align-items-center mx-auto">
                        <label htmlFor="vitaminC" className="form-label px-1">Vit C</label>
                    </Row>

                    <Row className="no-gutters align-items-center mx-auto">
                        <Col className="px-1">
                            <InputGroup size="sm">
                            <FormControl
                                aria-label="Vitamin C"
                                id="vitaminC"
                                onChange={handleInputChange}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col> 
                    </Row>         
                </Col>
                <Col md className="input-group">
                    <Row className="no-gutters align-items-center mx-auto">
                        <label htmlFor="calcium" className="form-label px-1">Calcium</label>
                    </Row>

                    <Row className="no-gutters align-items-center mx-auto">
                        <Col className="px-1">
                            <InputGroup size="sm">
                            <FormControl
                                aria-label="Calcium"
                                id="calcium"
                                onChange={handleInputChange}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col> 
                    </Row>         
                </Col> 
                <Col md className="input-group">
                    <Row className="no-gutters align-items-center mx-auto">
                        <label htmlFor="iron" className="form-label px-1">Iron</label>
                    </Row>

                    <Row className="no-gutters align-items-center mx-auto">
                        <Col className="px-1">
                            <InputGroup size="sm">
                            <FormControl
                                aria-label="Iron"
                                id="iron"
                                onChange={handleInputChange}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col> 
                    </Row>         
                </Col>   
            </Row>

            <Row>
                <Col className="text-center">
                    <button className="btn btn-sm btn-danger" type="button" onClick={cancelServing}>Cancel</button>
                    <button className="btn btn-sm btn-primary" type="button" onClick={handleSubmit}>Save Serving</button>
                </Col>
            </Row>
        </ServingContainer> : null  
    )         
};

export default ServingCreator;