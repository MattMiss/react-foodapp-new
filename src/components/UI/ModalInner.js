import React from 'react';
import styled from 'styled-components';
import Backdrop from '../Backdrop/Backdrop';

const Modal = styled.div`
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
    height: 80%;
    overflow-y: auto;
`;

const ModalInner = (props) => {

    return (
        <>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
            <Modal
                style = {{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </Modal>
        </>
    );   
}

export default ModalInner;