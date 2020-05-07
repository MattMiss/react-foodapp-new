import React from 'react';
import styled from 'styled-components';
//import Backdrop from '../Backdrop/Backdrop';

const Modal = styled.div`
    position: absolute;
    background-color: white;
    width: 80%;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 1px black;
    padding: 16px;
    left: 10%;
    top: 20%;
    box-sizing: border-box;
    transition: all 0.3s ease-out;
    overflow-y: auto;
    z-index: 20;
`;

const Backdrop = styled.div`
    width: 100%;
    height: 100%;
    margin-top: -4px;
    position: absolute;
    z-index: 10;
    
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease-out;
`;

const ModalInner = ( {show, children, backdropClicked} ) => {

    console.log(show)
    return (
        <>
            {<Backdrop onClick={backdropClicked}
                style = {{
                    pointerEvents: show ? "auto" : "none",
                    opacity: show ? '1' : '0',
                    
                }}/> }
            <Modal
                style = {{
                    pointerEvents: show ? "auto" : "none",
                    opacity: show ? '1' : '0',
                    
                }}>
                {children}
            </Modal>
        </>
    );   
}

export default ModalInner;