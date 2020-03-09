import React, { Component } from 'react';
import Serving from './Serving/Serving';
import styled from 'styled-components';



const CurrentServingSpan = styled.span`
    font-size: 1.6rem;
    line-height: 1.4rem;
`;

const ServingContainer = styled.div`
    max-width: 400px;
`;

class Servings extends Component {
    state = {
        index: 0
    }

    changeServing = (move) => {
        switch(move) {
            case 'left':
                if (this.state.index === 0){
                    this.setState({index: this.props.servings.length - 1})
                }else{
                    this.setState({index: this.state.index - 1})
                }
                break;
            case 'right':
                if (this.state.index === this.props.servings.length - 1){
                    this.setState({index: 0})
                }else{
                    this.setState({index: this.state.index + 1})
                }
                break;
            default:
        }

    }

    render() {
        const curServing = this.props.servings[this.state.index];
        return (
            <ServingContainer className="mx-auto">
                <div className="row">
                    <div className="col-3 align-items-center my-auto">
                        <button type="button" className="btn btn-secondary btn-sm" onClick={() => this.changeServing('left')}>
                            <svg className="bi bi-chevron-left" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M13.354 3.646a.5.5 0 010 .708L7.707 10l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z" clipRule="evenodd"/>
                            </svg>
                        </button>                
                    </div>
                    <div className="col"> 
                        <span>Servings</span>
                        <hr className="m-0"/>
                        <CurrentServingSpan>
                            {(this.state.index + 1) +  '/' + this.props.servings.length}
                        </CurrentServingSpan>
                        <div>
                            <span>{curServing.servingSize} {curServing.servingSizeDesc} ({curServing.metricSize} {curServing.metricSizeDesc})</span>
                        </div>
                    </div>
                    <div className="col-3 align-items-center my-auto">
                        <button type="button" className="btn btn-secondary btn-sm" onClick={() => this.changeServing('right')}>
                            <svg className="bi bi-chevron-right" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z" clipRule="evenodd"/>
                            </svg>
                        </button>
                    </div>
                </div>
                { <Serving serving={curServing}/> }
            </ServingContainer>
        )
    }
    
};

export default Servings;