import React, { Component, useState } from 'react';
import Serving from './Serving/Serving';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';



const CurrentServingDiv = styled.div`
    text-align: center;
`;

const ServingContainer = styled.div`
    max-width: 400px;
`;

const CurrentSrvSizeDiv = styled.div`
    font-size: 1.2em;
    text-align: center;
`;


const Servings = (props) => {
    
    const [index, setIndex] = useState(0);

    const changeServing = (move) => {
        const servingsLengthIndex = props.servings.length - 1;
        switch(move) {
            case 'left':
                if (index === 0){
                    setIndex(servingsLengthIndex);
                }else{
                    setIndex(index - 1);
                }
                break;
            case 'right':
                if (index === servingsLengthIndex){
                    setIndex(0);
                }else{
                    setIndex(index + 1);
                }
                break;
            default:
        }

    }

    const curServing = props.servings[index];

    return (
        <ServingContainer className="mx-auto">
            <Row>
                <Col sm={3} className="my-auto text-center">
                    <button 
                        type="button" 
                        className="btn btn-secondary btn-sm" 
                        onClick={() => changeServing('left')}>
                        <svg 
                            className="bi bi-chevron-left" 
                            width="20" 
                            height="20" 
                            viewBox="0 0 20 20" 
                            fill="currentColor" 
                            xmlns="http://www.w3.org/2000/svg">
                            <path 
                                fillRule="evenodd" 
                                d="M13.354 3.646a.5.5 0 010 .708L7.707 10l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z" 
                                clipRule="evenodd"
                            />
                        </svg>

                    </button>                
                </Col>
                <Col> 
                    <CurrentSrvSizeDiv>
                        <span>{curServing.servingSize} {curServing.servingSizeDesc} ({curServing.metricSize} {curServing.metricSizeDesc})</span>                        
                    </CurrentSrvSizeDiv>

                    <CurrentServingDiv>
                        {(index + 1) +  '/' + props.servings.length}
                    </CurrentServingDiv>
                </Col>
                <Col sm={3} className="my-auto text-center">
                    <button 
                        type="button" 
                        className="btn btn-secondary btn-sm" 
                        onClick={() => changeServing('right')}>
                        <svg 
                            className="bi bi-chevron-right" 
                            width="20" 
                            height="20" 
                            viewBox="0 0 20 20" 
                            fill="currentColor" 
                            xmlns="http://www.w3.org/2000/svg">
                            <path 
                                fillRule="evenodd" 
                                d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z" 
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </Col>
            </Row>
            { <Serving serving={curServing}/> }
        </ServingContainer>
    )
};

export default Servings;