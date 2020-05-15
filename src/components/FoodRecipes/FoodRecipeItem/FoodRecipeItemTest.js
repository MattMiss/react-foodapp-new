import React, { useState } from 'react';
import styled from 'styled-components'
import ReactCardFlip from 'react-card-flip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faShare, faCaretLeft, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import axios from '../../../axios-food';
import ItemFrontSideFood from './ItemFrontSideFood';
import ItemFrontSideRecipe from './ItemFrontSideRecipe';
import ItemBackSide from './ItemBackSide';
import ModalInner from '../../UI/ModalInner';



const ItemDiv = styled.div`
    position: relative;
    background: transparent;
    height: 130px;
    border-radius: 3px;
    border: 2px solid #00a5ff;
    color: #00a5ff;
    font-size: .8rem;
    margin: .5em 1em;
    padding: 0.25em 40px 0.25em 0;
    overflow: hidden;

    & hr {
        border-top: 1px solid #00a5ff;
    }

    &.recipe{
        border: 2px solid palevioletred;
        color: palevioletred;

        & hr {
        border-top: 1px solid palevioletred;
        }
    }
`

const FlipBtn = styled.div`
    position: absolute;
    bottom: 5px;
    right: 5px;
    height: 20px;
    width: 20px;
`;

const OptionsBtn = styled.div`
    position: absolute;
    top: 5px;
    right: 5px;
    height: 20px;
    width: 20px;
`;

const FoodRecipeItemTest = ( {item, clicked, editItem} ) => {
     
    const [showBackSide, setShowBackSide] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    console.log(item)

    const deleteHandler = () => {
        console.log("deleting" + item.id)
        
        console.log(item.type)
        const type = item.type === 'food' ? 'food-items' : 'recipe-items'

        axios.delete(`/${type}/${item.id}.json`)
            .then(response => {
                console.log("deleted!")
            })
            .catch(error => {
                console.log("Error", error)
            });


        setShowDelete(false);
    };

    const editHandler = () => {
        editItem(item);
        setShowOptions(false);
    };

    console.log("showDelete", showDelete)

    const deleteDiv = !showDelete ? 
        <>
            <FontAwesomeIcon icon={faTrashAlt} />
            <a href="#" onClick={() => setShowDelete(true)}>Delete</a>
        </> : 
        <>
            <span onClick={deleteHandler}>yes</span>
            <span onClick={() => setShowDelete(false)}>no</span>
        </>;

    return (
        <ItemDiv className={item.type} onClick={item => clicked(item)}>
                <ModalInner show={showOptions} modalClosed={() => setShowOptions(false)}>
                    <div>
                        {deleteDiv}
                        <br/>                  
                        <br/>
                        <FontAwesomeIcon icon={faEdit} /><a href="#" onClick={editHandler}>Edit</a>
                    </div>
                </ModalInner>
                <OptionsBtn onClick={() => setShowOptions(true)}><FontAwesomeIcon icon={faEllipsisV} /></OptionsBtn>
                <ReactCardFlip isFlipped={showBackSide} flipDirection="horizontal" infinite={false}>

                    {item.type === "food" ? <ItemFrontSideFood 
                        name = {item.name}
                        brand={item.food_type === "brand" ? item.brand_name : null}
                        type={item.type}
                        category={item.category}
                        description={item.description}
                    /> :
                    <ItemFrontSideRecipe 
                        name = {item.name}
                        type={item.type}
                        category={item.category}
                        description={item.description}
                    />}
                    
                   <ItemBackSide item={item}/>

                </ReactCardFlip> 
                <FlipBtn onClick={() => setShowBackSide(prev => !prev)}><FontAwesomeIcon icon={showBackSide ? faCaretLeft : faShare} /></FlipBtn>
        </ItemDiv>
    );
};

export default FoodRecipeItemTest;