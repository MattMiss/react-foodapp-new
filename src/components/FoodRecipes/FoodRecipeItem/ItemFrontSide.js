import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';


const ItemFrontSide = ({name, brand, type, category, description}) => (
    <Container>
        <Row>
            <Col className="text-left">
                {name}
            </Col>
            <Col  className="text-right">
                {brand ? 'BRAND' : 'GENERIC'}
            </Col>
        </Row>
        <Row>
            <Col className="text-left">
                <svg 
                    className="categoryIcon mx-1 mb-1" 
                    width="15" 
                    height="15" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 487.85 487.85"
                    fill={type === 'food' ? '#4682c0' : 'palevioletred'}>
                    <g>
                        <path d="M479,215.275l-83.5-113.9c-11-15-33.3-26.3-51.8-26.3H39.2c-21.6,0-39.2,17.6-39.2,39.2v259.3c0,21.6,17.6,39.2,39.2,39.2
                                h304.5c18.6,0,40.9-11.3,51.8-26.3l83.5-113.9C490.8,256.575,490.8,231.375,479,215.275z M457.2,256.775l-83.5,113.9
                                c-5.8,8-20.2,15.2-30.1,15.2H39.2c-6.7,0-12.2-5.5-12.2-12.2v-259.4c0-6.7,5.5-12.2,12.2-12.2h304.5c9.9,0,24.2,7.3,30.1,15.2
                                l83.5,113.9C462.1,237.875,462.1,250.075,457.2,256.775z"/>
                    </g>
                </svg>
                {category}
            </Col>
            <Col className="text-right">
                {brand ? brand : null}
            </Col>
        </Row>
        <hr className={"my-1"}/>
        <Row>
            <Col>
                {type === 'recipe' ? description : null}  
            </Col>
                                    
        </Row>
    </Container>
    
);

export default ItemFrontSide;