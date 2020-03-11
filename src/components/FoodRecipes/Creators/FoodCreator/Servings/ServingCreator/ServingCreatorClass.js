import React, { Component } from 'react'; 
import styled from 'styled-components';
import { Row, Col, InputGroup, FormControl, Dropdown } from 'react-bootstrap';            


const ServingContainer = styled.div`
    background-color: #eee;
    padding: 10px 5px 10px 5px;
`;

const InputAppend = styled.span`
    line-height: .5 !important;
`;

class ServingCreator extends Component {
 
    state = {
        servingSize: "-1",
        servingSizeDesc: "",
        metricSize: "-1",
        metricSizeDesc: "g",
        calories: "-1",
        totalFat: "-1",
        saturatedFat: "-1",
        polyFat: "-1",
        monoFat: "-1",
        cholesterol: "-1",
        sodium: "-1",
        potassium: "-1",
        totalCarbs: "-1",
        fiber: "-1",
        sugars: "-1",
        protein: "-1",
        vitaminA: "-1",
        vitaminC: "-1",
        calcium: "-1",
        iron: "-1"
    }

    saveServingHandler = () => {   

        const allFieldsFilled = (Number(this.state.servingSize) > 0 && Number(this.state.servingSizeDesc.trim().length) > 0 
                                && Number(this.state.metricSize) > 0 && Number(this.state.calories) > 0
                                && Number(this.state.totalFat) > 0 && Number(this.state.saturatedFat) > 0
                                && Number(this.state.polyFat) > 0 && Number(this.state.monoFat) > 0
                                && Number(this.state.cholesterol) > 0 && Number(this.state.sodium) > 0
                                && Number(this.state.potassium) > 0 && Number(this.state.totalCarbs) > 0
                                && Number(this.state.fiber) > 0 && Number(this.state.sugars) > 0
                                && Number(this.state.protein) > 0 && Number(this.state.vitaminA) > 0
                                && Number(this.state.vitaminC) > 0 && Number(this.state.calcium) > 0
                                && Number(this.state.iron) > 0)

        console.log(allFieldsFilled)
        console.log(this.state)

        if (allFieldsFilled){
            this.props.saveServingHandler(this.state);
        }else{
            this.props.errorHandler();
        }
        //this.props.saveServingHandler(this.state);
    };

    metricDescHandler = (val) => {
        this.setState({metricSizeDesc: val});
    };

    //calorieChange = e => this.setState({ nutrients[e.target.name]: e.target.value})
    nutrientChange = e => this.setState({[e.target.id]: e.target.value})

    render(){


        const ColNutrient = (nutrient) => {

            const append = nutrient.sizeDesc ? <InputGroup.Append>
                <InputGroup.Text id={nutrient.lbl+"Append"}>{nutrient.sizeDesc}</InputGroup.Text>
            </InputGroup.Append> : null;

            return (
                <Col md className="input-group">
                    <Row className="no-gutters align-items-center mx-auto">
                        <label htmlFor={nutrient.id} className="form-label px-1">{nutrient.lbl}</label>
                    </Row>

                    <Row className="no-gutters align-items-center mx-auto">
                        <Col className="px-1">
                            <InputGroup size="sm">
                            <FormControl
                                aria-label={nutrient.lblFull}
                                id={nutrient.id}
                                onChange={this.nutrientChange}
                                />
                                {append}
                            </InputGroup>
                        </Col> 
                    </Row>         
                </Col>
            )
        };

        return (
            this.props.show ? <ServingContainer>
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
                                    onChange={this.nutrientChange}
                                    />
                                </InputGroup>
                            </Col> 
                            <Col sm={4} className="px-1">
                            <InputGroup size="sm">
                                <FormControl
                                    placeholder="Desc"
                                    aria-label="Serving Size Description"
                                    id="servingSizeDesc"
                                    onChange={this.nutrientChange}
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
                                    onChange={this.nutrientChange}
                                    />
                                </InputGroup>
                            </Col> 
                            <Col sm={4} className="px-1">
                                <Dropdown>
                                    <Dropdown.Toggle size="sm" variant="primary" id="dropdownMenu">
                                        {this.state.metricSizeDesc}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => this.metricDescHandler('g')}>g</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.metricDescHandler('oz')}>oz</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.metricDescHandler('ml')}>ml</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>   
                        </Row>
                    </Col>
                </Row>
                <hr />

                <Row className="form-group"> 
                    <ColNutrient id="calories" lbl="Calories" lblFull="Calories"/>    
                </Row>

                <Row className="form-group"> 
                    <ColNutrient id="totalFat" lbl="Total Fat" lblFull="Total Fat" sizeDesc="g"/>  
                    <ColNutrient id="saturatedFat" lbl="Sat Fat" lblFull="Saturated Fat" sizeDesc="g"/>  
                    <ColNutrient id="polyFat" lbl="Poly Fat" lblFull="Poly Unsaturated Fat" sizeDesc="g"/>  
                    <ColNutrient id="monoFat" lbl="Mono Fat" lblFull="Mono Unsaturated Fat" sizeDesc="g"/>     
                </Row>
    
                <hr />
    
                <Row className="form-group"> 
                    <ColNutrient id="cholesterol" lbl="Cholest" lblFull="Cholesterol" sizeDesc="mg"/>  
                    <ColNutrient id="sodium" lbl="Sodium" lblFull="Sodium" sizeDesc="mg"/>  
                    <ColNutrient id="potassium" lbl="Potassium" lblFull="Potassium" sizeDesc="mg"/>  
                </Row>
    
                <Row className="form-group"> 
                    <ColNutrient id="totalCarbs" lbl="Carbs" lblFull="Total Carbs" sizeDesc="g"/>  
                    <ColNutrient id="fiber" lbl="Fiber" lblFull="Fiber" sizeDesc="g"/>  
                    <ColNutrient id="sugars" lbl="Sugars" lblFull="Sugars" sizeDesc="g"/> 
                    <ColNutrient id="protein" lbl="Protein" lblFull="Protein" sizeDesc="g"/>     
                </Row>
                
                <hr />
    
                <Row className="form-group"> 
                    <ColNutrient id="vitaminA" lbl="Vit A" lblFull="Vitamin A" sizeDesc="%"/>  
                    <ColNutrient id="vitaminC" lbl="Vit C" lblFull="Vitamin C" sizeDesc="%"/>  
                    <ColNutrient id="calcium" lbl="Calcium" lblFull="Caclium" sizeDesc="%"/> 
                    <ColNutrient id="iron" lbl="Iron" lblFull="Iron" sizeDesc="%"/>    
                </Row>

                <button className="btn btn-sm btn-primary" type="button" onClick={this.saveServingHandler}>Save Serving</button>
            </ServingContainer> : null  
        )
    }
              
};

export default ServingCreator;