import React from 'react';
import styled from 'styled-components'
import {Container, Row, Col} from 'react-bootstrap';


const ItemDiv = styled.div`
    background: transparent;
    border-radius: 3px;
    border: 2px solid #00a5ff;
    color: #00a5ff;
    margin: .5em 1em;
    padding: 0.25em 0;

    &.recipe{
        border: 2px solid palevioletred;
        color: palevioletred;
    }
`

const FoodRecipeItem = (props) => {
      
    //console.log(props.item)
    return (
        <ItemDiv className={props.item.type} onClick={item => props.clicked(item)}>
                
                <Container>
                    <Row>
                        <Col>
                            {props.item.name}
                        </Col>
                        <Col>
                            {props.item.brand ? 'BRAND' : 'GENERIC'}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {props.item.category}
                        </Col>
                        <Col>
                            {props.item.brand ? props.item.brand : null}
                        </Col>
                    </Row>
                    <hr className={"my-1"}/>
                    <Row>
                        <Col>
                            {props.item.type === 'recipe' ? props.item.description : null}  
                        </Col>
                                              
                    </Row>
                </Container>
        </ItemDiv>
    );
};

export default FoodRecipeItem;