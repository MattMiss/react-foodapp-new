import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';


const Label = styled.span`
    font-weight: 700;
    font-size: .8rem;
`;

const DarkerRow = styled(Row)`
    background-color: #d0e0e9;
    margin: 0;
`;

const LighterRow = styled(Row)`
    margin: 0;
`;

const SmallSpan = styled.span`
    font-size: .7rem;  
`;

const ServingsDiv = styled.div`
    text-align:center 
`;

const serving = (props) => {
    //console.log(props)
    return(
        <ServingsDiv>
            <DarkerRow> 
                <Col>
                    <Label >Calories</Label> <SmallSpan>{props.serving.nutrients.calories}</SmallSpan>
                </Col>
            </DarkerRow>
            
            <LighterRow>
                <Col className="px-1">
                    <Row className="no-gutters">
                        <Col className="px-0">
                            <Label>Total Fat</Label>
                        </Col>
                    </Row>
                    <Row className="no-gutters">
                        <Col className="px-0">
                            <SmallSpan>{props.serving.nutrients.fat}g</SmallSpan>
                        </Col>
                    </Row>
                </Col>
                <Col className="px-1">
                    <Row className="no-gutters">
                        <Col className="px-0">
                            <Label>Sat Fat</Label>
                        </Col>
                    </Row>
                    <Row className="no-gutters">
                        <Col className="px-0">
                            <SmallSpan>{props.serving.nutrients.saturatedFat}g</SmallSpan>   
                        </Col>
                    </Row>
                </Col>
                <Col className="px-1">
                    <Row className="no-gutters">
                        <Col className="px-0">
                            <Label>Poly Fat</Label>
                        </Col>
                    </Row>
                    <Row className="no-gutters">
                        <Col className="px-0">
                            <SmallSpan>{props.serving.nutrients.polyFat}g</SmallSpan>  
                        </Col>
                    </Row>
                </Col>
                <Col className="px-1">
                    <Row className="no-gutters">
                        <Col className="px-0">
                            <Label >Mono Fat</Label>
                        </Col>
                    </Row>
                    <Row className="no-gutters">
                        <Col className="px-0">
                            <SmallSpan>{props.serving.nutrients.monoFat}g</SmallSpan>  
                        </Col>
                    </Row>
                </Col>
            </LighterRow>

            <DarkerRow>
                <Col className="px-1">
                    <Row className="no-gutters">
                        <Col className="px-0">
                            <Label >Choles</Label>
                        </Col>
                    </Row>
                    <Row className="no-gutters">
                        <Col className="px-0">
                            <SmallSpan>{props.serving.nutrients.cholesterol}mg</SmallSpan>
                        </Col>
                    </Row>
                </Col>
                <Col className="px-1">
                    <Row className="no-gutters">
                        <Col className="px-0">
                            <Label >Sodium</Label>
                        </Col>
                    </Row>
                    <Row className="no-gutters">
                        <Col className="px-0">
                            <SmallSpan>{props.serving.nutrients.sodium}g</SmallSpan>
                        </Col>
                    </Row>
                </Col>
                <Col className="px-1">
                    <Row className="no-gutters">
                        <Col className="px-0">
                            <Label >Potass</Label>
                        </Col>
                    </Row>
                    <Row className="no-gutters">
                        <Col className="px-0">
                            <SmallSpan>{props.serving.nutrients.potassium}mg</SmallSpan>
                        </Col>
                    </Row>
                </Col>
            </DarkerRow>
            
            <LighterRow>
                <Col className="px-1">
                    <Row className="no-gutters">
                        <Col className="px-0">
                            <Label >Carbs</Label>
                        </Col>
                    </Row>
                    <Row className="no-gutters">
                        <Col className="px-0">
                            <SmallSpan>{props.serving.nutrients.carbs}g</SmallSpan>
                        </Col>
                    </Row>
                </Col>
                <Col className="px-1">
                    <Row className="no-gutters">
                        <Col className="px-0">
                            <Label >Fiber</Label>
                        </Col>
                    </Row>
                    <Row className="no-gutters">
                        <Col className="px-0">
                            <SmallSpan>{props.serving.nutrients.fiber}g</SmallSpan>
                        </Col>
                    </Row>
                </Col>
                <Col className="px-1">
                    <Row className="no-gutters">
                        <Col className="px-0">
                            <Label >Sugars</Label>
                        </Col>
                    </Row>
                    <Row className="no-gutters">
                        <Col className="px-0">
                            <SmallSpan>{props.serving.nutrients.sugars}g</SmallSpan>
                        </Col>
                    </Row>
                </Col>
                <Col className="px-1">
                    <Row className="no-gutters">
                        <Col className="px-0">
                            <Label >Protein</Label>
                        </Col>
                    </Row>
                    <Row className="no-gutters">
                        <Col className="px-0">
                            <SmallSpan>{props.serving.nutrients.protein}g</SmallSpan>
                        </Col>
                    </Row>
                </Col>
            </LighterRow>

            <DarkerRow>
                <Col className="px-1">
                    <Row className="no-gutters">
                        <Col className="px-0">
                            <Label >Vit A</Label>
                        </Col>
                    </Row>
                    <Row className="no-gutters">
                        <Col className="px-0">
                            <SmallSpan>{props.serving.nutrients.vitaminA}%</SmallSpan>
                        </Col>
                    </Row>
                </Col>
                <Col className="px-1">
                    <Row className="no-gutters">
                        <Col className="px-0">
                            <Label >Vit C</Label>
                        </Col>
                    </Row>
                    <Row className="no-gutters">
                        <Col className="px-0">
                            <SmallSpan>{props.serving.nutrients.vitaminC}%</SmallSpan>
                        </Col>
                    </Row>
                </Col>
                <Col className="px-1">
                    <Row className="no-gutters">
                        <Col className="px-0">
                            <Label >Calcium</Label>
                        </Col>
                    </Row>
                    <Row className="no-gutters">
                        <Col className="px-0">
                            <SmallSpan>{props.serving.nutrients.calcium}%</SmallSpan>
                        </Col>
                    </Row>
                </Col>
                <Col className="px-1">
                    <Row className="no-gutters">
                        <Col className="px-0">
                            <Label >Iron</Label>
                        </Col>
                    </Row>
                    <Row className="no-gutters">
                        <Col className="px-0">
                            <SmallSpan>{props.serving.nutrients.iron}%</SmallSpan>
                        </Col>
                    </Row>
                </Col>
            </DarkerRow>

        </ServingsDiv>     
    );
};

export default serving;