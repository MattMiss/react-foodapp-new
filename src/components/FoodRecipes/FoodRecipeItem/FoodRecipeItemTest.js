import React, { useState } from 'react';
import styled from 'styled-components'
import ReactCardFlip from 'react-card-flip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faShare, faCaretLeft, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import ItemFrontSide from './ItemFrontSide';
import ItemBackSide from './ItemBackSide';
import ModalInner from '../../UI/ModalInner';



const ItemDiv = styled.div`
    position: relative;
    background: transparent;
    height: 130px;
    border-radius: 3px;
    border: 2px solid #00a5ff;
    color: #00a5ff;
    margin: .5em 1em;
    padding: 0.25em 40px 0.25em 0;
    overflow: hidden;

    &.recipe{
        border: 2px solid palevioletred;
        color: palevioletred;
    }
`

const FlipBtn = styled.div`
    position: absolute;
    bottom: 5px;
    right: 5px;
    height: 20px;
    width: 20px;
`;

const DeleteBtn = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
`;

const FoodRecipeItemTest = ( {item, clicked} ) => {
     
    const [showBackSide, setShowBackSide] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const deleteHandler = () => {
        console.log("deleted")
        setShowDelete(false);
    };

    const editHandler = () => {
        console.log("editing")
        setShowDelete(false);
    };


    return (
        <ItemDiv className={item.type} onClick={item => clicked(item)}>
                <ModalInner show={showDelete} backdropClicked={() => setShowDelete(false)}>
                    <div>
                        <FontAwesomeIcon icon={faTrashAlt} /><a href="#" onClick={deleteHandler}>Delete</a>
                        <br/>                  
                        <br/>
                        <FontAwesomeIcon icon={faEdit} /><a href="#" onClick={editHandler}>Edit</a>
                    </div>
                </ModalInner>
                <DeleteBtn onClick={() => setShowDelete(true)}><FontAwesomeIcon icon={faEllipsisV} /></DeleteBtn>
                <ReactCardFlip isFlipped={showBackSide} flipDirection="horizontal" infinite={false}>
                    <ItemFrontSide 
                        name = {item.name}
                        brand={item.brand}
                        type={item.type}
                        category={item.category}
                        description={item.description}
                    />
                    
                   <ItemBackSide item={item}/>

                </ReactCardFlip> 
                <FlipBtn onClick={() => setShowBackSide(prev => !prev)}><FontAwesomeIcon icon={showBackSide ? faCaretLeft : faShare} /></FlipBtn>
        </ItemDiv>
    );
};

export default FoodRecipeItemTest;