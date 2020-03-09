import React from 'react';
import styled from 'styled-components';

const Label = styled.span`
    font-weight: 700;
    font-size: .8rem;
`;

const DarkerRow = styled.div`
    background-color: #d0e0e9;
    margin: 0;
`;

const LighterRow = styled.div`
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
            <DarkerRow className={"row "}> 
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <Label >Calories:</Label> <SmallSpan>{props.serving.nutrients.calories}</SmallSpan>
                        </div>
                    </div>    
                </div>
            </DarkerRow>
            
            <LighterRow className={"row " }>
                <div className="col">
                    <div className="row justify-content-center">
                        <Label>Total Fat: </Label>
                    </div>
                    <div className="row justify-content-center">
                        <SmallSpan>{props.serving.nutrients.fat}g</SmallSpan>
                    </div>
                </div>
                <div className="col">
                    <div className="row justify-content-center">
                        <Label >Saturated Fat: </Label> 
                    </div>
                    <div className="row justify-content-center">
                        <SmallSpan>{props.serving.nutrients.saturatedFat}g</SmallSpan>   
                    </div>
                </div>
                <div className="col">
                    <div className="row justify-content-center">
                        <Label> Poly Fat: </Label>
                    </div>
                    <div className="row justify-content-center">
                        <SmallSpan>{props.serving.nutrients.polyFat}g</SmallSpan>
                    </div>
                </div>
                <div className="col">
                    <div className="row justify-content-center">
                        <Label >Mono Fat: </Label>
                    </div>
                    <div className="row justify-content-center">
                        <SmallSpan>{props.serving.nutrients.monoFat}g</SmallSpan>
                    </div>
                </div>
            </LighterRow>

            <DarkerRow className={"row " }>
                <div className="col">
                    <div className="row justify-content-center">
                        <Label >Cholesterol: </Label>
                    </div>
                    <div className="row justify-content-center">
                        <SmallSpan>{props.serving.nutrients.cholesterol}mg</SmallSpan>
                    </div>
                   
                </div>
                <div className="col">
                    <div className="row justify-content-center">
                        <Label >Sodium: </Label>
                    </div>
                    <div className="row justify-content-center">
                        <SmallSpan>{props.serving.nutrients.sodium}g</SmallSpan>
                    </div>
                    
                </div>
                <div className="col">
                    <div className="row justify-content-center">
                        <Label >Potassium: </Label>
                    </div>
                    <div className="row justify-content-center">
                        <SmallSpan>{props.serving.nutrients.potassium}mg</SmallSpan>
                    </div>  
                </div>
            </DarkerRow>
            
            <LighterRow className={"row " }>
                <div className="col">
                    <div className="row justify-content-center">
                        <Label >Total Carbs: </Label>
                    </div>
                    <div className="row justify-content-center">
                        <SmallSpan>{props.serving.nutrients.carbs}g</SmallSpan>
                    </div>   
                </div>
                <div className="col">
                    <div className="row justify-content-center">
                        <Label >Fiber: </Label>
                    </div>
                    <div className="row justify-content-center">
                        <SmallSpan>{props.serving.nutrients.fiber}g</SmallSpan>
                    </div>  
                </div>
                <div className="col">
                    <div className="row justify-content-center">
                        <Label >Sugars: </Label>
                    </div>
                    <div className="row justify-content-center">
                        <SmallSpan>{props.serving.nutrients.sugars}g</SmallSpan>
                    </div>   
                </div>
                <div className="col">
                    <div className="row justify-content-center">
                        <Label >Protein: </Label>
                    </div>
                    <div className="row justify-content-center">
                        <SmallSpan>{props.serving.nutrients.protein}g</SmallSpan>
                    </div> 
                </div>
            </LighterRow>

            <DarkerRow className={"row "}>
                <div className="col">
                    <div className="row justify-content-center">
                        <Label >Vitamin A: </Label>
                    </div>
                    <div className="row justify-content-center">
                        <SmallSpan>{props.serving.nutrients.vitaminA}%</SmallSpan>
                    </div> 
                </div>
                <div className="col">
                    <div className="row justify-content-center">
                        <Label >Vitamin C: </Label>
                    </div>
                    <div className="row justify-content-center">
                        <SmallSpan>{props.serving.nutrients.vitaminC}%</SmallSpan>
                    </div>  
                </div>
                <div className="col">
                    <div className="row justify-content-center">
                        <Label >Calcium: </Label>
                    </div>
                    <div className="row justify-content-center">
                        <SmallSpan>{props.serving.nutrients.calcium}%</SmallSpan>
                    </div>  
                </div>
                <div className="col">
                    <div className="row justify-content-center">
                        <Label >Iron: </Label>
                    </div>
                    <div className="row justify-content-center">
                        <SmallSpan>{props.serving.nutrients.iron}%</SmallSpan>
                    </div>
                    
                </div>
            </DarkerRow>

        </ServingsDiv>     
    );
};

export default serving;