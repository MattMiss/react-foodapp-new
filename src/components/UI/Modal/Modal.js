import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import styled from 'styled-components';

const ModalDiv = styled.div`
    position: fixed;
    z-index: 500;
    background-color: white;
    width: 80%;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 1px black;
    padding: 16px;
    left: 10%;
    top: 10%;
    box-sizing: border-box;
    transition: all 0.3s ease-out;
    max-height: 80%;
    overflow-y: auto;

    // @media (min-width: 600px) {
    //     width: 500px;
    //     left: calc(50% - 250px);
    // }
`;

const Modal = React.memo((props) => {

    return (
        <>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
            <ModalDiv
                style = {{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </ModalDiv>
        </>
    );
});

export default Modal;