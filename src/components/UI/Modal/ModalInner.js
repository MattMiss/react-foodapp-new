import React,{Component, Fragment} from 'react';
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
    max-height: 80%;
    overflow-y: auto;
`;

class ModalInner extends Component {

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        return (
            <Fragment>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <Modal
                    style = {{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </Modal>
            </Fragment>
        );
    }
}

export default ModalInner;