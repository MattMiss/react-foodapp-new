import React, { Component } from 'react'; 
import styled from 'styled-components';


const ServingContainer = styled.div`
    background-color: #eee;
    padding: 10px 5px 10px 5px;
`;

const InputAppend = styled.span`
    line-height: .5 !important;
`;

class ServingCreator extends Component {
 
    state = {
        servingSize: "-1",
        servingSizeDesc: "",
        metricSize: "-1",
        metricSizeDesc: "g",
        calories: "-1",
        totalFat: "-1",
        saturatedFat: "-1",
        polyFat: "-1",
        monoFat: "-1",
        cholesterol: "-1",
        sodium: "-1",
        potassium: "-1",
        totalCarbs: "-1",
        fiber: "-1",
        sugars: "-1",
        protein: "-1",
        vitaminA: "-1",
        vitaminC: "-1",
        calcium: "-1",
        iron: "-1"
    }

    saveServingHandler = () => {   

        const allFieldsFilled = (Number(this.state.servingSize) > 0 && Number(this.state.servingSizeDesc.trim().length) > 0 
                                && Number(this.state.metricSize) > 0 && Number(this.state.calories) > 0
                                && Number(this.state.totalFat) > 0 && Number(this.state.saturatedFat) > 0
                                && Number(this.state.polyFat) > 0 && Number(this.state.monoFat) > 0
                                && Number(this.state.cholesterol) > 0 && Number(this.state.sodium) > 0
                                && Number(this.state.potassium) > 0 && Number(this.state.totalCarbs) > 0
                                && Number(this.state.fiber) > 0 && Number(this.state.sugars) > 0
                                && Number(this.state.protein) > 0 && Number(this.state.vitaminA) > 0
                                && Number(this.state.vitaminC) > 0 && Number(this.state.calcium) > 0
                                && Number(this.state.iron) > 0)

        console.log(allFieldsFilled)
        console.log(this.state)

        if (allFieldsFilled){
            this.props.saveServingHandler(this.state);
        }else{
            this.props.errorHandler();
        }
        //this.props.saveServingHandler(this.state);
    };

    metricDescHandler = (val) => {
        this.setState({metricSizeDesc: val});
    };

    //calorieChange = e => this.setState({ nutrients[e.target.name]: e.target.value})
    nutrientChange = e => this.setState({[e.target.id]: e.target.value})

    render(){
        return (
            this.props.show ? <ServingContainer>
                <div className="mb-3">
                    <span>Fill in the Blanks</span>
                </div>
                <div className="form-group row "> 
                    <div className="input-group col">
                        <div className=" row align-items-center">
                            <label htmlFor="servingSize" className="form-label col-sm-4 px-1">Serving Size</label>
                            <div className="col-sm-4 px-1">
                                <div className="input-group input-group-sm">
                                    <input type="text" className="form-control" id="servingSize" onChange={this.nutrientChange}/>
                                </div>
                            </div> 
                            <div className="col-sm-4 px-1">
                                <div className="input-group input-group-sm">
                                    <input type="text" className="form-control" id="servingSizeDesc" onChange={this.nutrientChange}/>
                                </div>
                            </div>   
                        </div>
                    </div>
                    <div className="input-group col">
                        <div className=" row align-items-center">
                            <label htmlFor="metricSize" className="form-label col-sm-4 px-1">Metric Size</label>
                            <div className="col-sm-4 px-1">
                                <div className="input-group input-group-sm">
                                    <input type="text" className="form-control" id="metricSize" onChange={this.nutrientChange}/>
                                </div>
                            </div> 
                            <div className="col-sm-4 px-1">
                                <div className="dropdown px-2">
                                    <button className="btn btn-primary btn-sm dropdown-toggle" type="button" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {this.state.metricSizeDesc}
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenu">
                                        <button className="dropdown-item" type="button" onClick={() => this.metricDescHandler('g')}>g</button>
                                        <button className="dropdown-item" type="button" onClick={() => this.metricDescHandler('oz')}>oz</button>
                                        <button className="dropdown-item" type="button" onClick={() => this.metricDescHandler('ml')}>ml</button>
                                    </div>
                                </div>
                            </div>   
                        </div>
                    </div>
       
                </div>
                <hr />
                <div className="form-group row "> 
                    <div className="input-group col">
                        <div className=" row align-items-center mx-auto">
                            <label htmlFor="calories" className="form-label col-sm-4 px-1">Calories</label>
                            <div className="col-sm-8 px-1">
                                <div className="input-group input-group-sm">
                                    <input type="text" className="form-control" id="calories" onChange={this.nutrientChange}/>
                                </div>
                            </div>   
                        </div>
                    </div>    
                </div>
                <div className="form-group row"> 
                    <div className="input-group col-md">
                        <div className=" row mx-auto align-items-center">
                            <label htmlFor="totalFat" className="form-label col-sm-5 px-1">Total Fat</label>
                            <div className="col-sm-7 px-1">
                                <div className="input-group input-group-sm">
                                    <input type="text" className="form-control" id="totalFat" onChange={this.nutrientChange}/>
                                    <div className="input-group-append">
                                        <InputAppend className={'input-group-text '}>g</InputAppend>
                                    </div> 
                                </div>
                            </div>   
                        </div>
                    </div>
                    <div className="input-group col-md">
                        <div className=" row mx-auto align-items-center">
                            <label htmlFor="saturatedFat" className="form-label col-sm-5 px-1">Saturated Fat</label>
                            <div className="col-sm-7 px-1">
                                <div className="input-group input-group-sm">
                                    <input type="text" className="form-control" id="saturatedFat" onChange={this.nutrientChange}/>
                                    <div className="input-group-append">
                                        <InputAppend className={'input-group-text '}>g</InputAppend>
                                    </div> 
                                </div>
                            </div>   
                        </div>
                    </div>    
                    <div className="input-group col-md">
                        <div className=" row mx-auto align-items-center">
                            <label htmlFor="polyFat" className="form-label col-sm-5 px-1">Poly-unsaturated Fat</label>
                            <div className="col-sm-7 px-1">
                                <div className="input-group input-group-sm">
                                    <input type="text" className="form-control" id="polyFat" onChange={this.nutrientChange}/>
                                    <div className="input-group-append">
                                        <InputAppend className={'input-group-text '}>g</InputAppend>
                                    </div> 
                                </div>
                            </div>   
                        </div>
                    </div>
                    <div className="input-group col-md">
                        <div className=" row mx-auto align-items-center">
                            <label htmlFor="monoFat" className="form-label col-sm-5 px-1">Mono-unsaturated Fat</label>
                            <div className="col-sm-7 px-1">
                                <div className="input-group input-group-sm">
                                    <input type="text" className="form-control" id="monoFat" onChange={this.nutrientChange}/>
                                    <div className="input-group-append">
                                        <InputAppend className={'input-group-text '}>g</InputAppend>
                                    </div> 
                                </div>
                            </div>   
                        </div>
                    </div>    
                </div>
    
                <hr />
    
                <div className="form-group row"> 
                    <div className="input-group col-md">
                        <div className=" row mx-auto align-items-center">
                            <label htmlFor="cholesterol" className="form-label col-sm-5 px-1">Cholesterol</label>
                            <div className="col-sm-7 px-1">
                                <div className="input-group input-group-sm">
                                    <input type="text" className="form-control" id="cholesterol" onChange={this.nutrientChange}/>
                                    <div className="input-group-append">
                                        <InputAppend className={'input-group-text '}>mg</InputAppend>
                                    </div> 
                                </div>
                            </div>   
                        </div>
                    </div>
                    <div className="input-group col-md">
                        <div className=" row mx-auto align-items-center">
                            <label htmlFor="sodium" className="form-label col-sm-5 px-1">Sodium</label>
                            <div className="col-sm-7 px-1">
                                <div className="input-group input-group-sm">
                                    <input type="text" className="form-control" id="sodium" onChange={this.nutrientChange}/>
                                    <div className="input-group-append">
                                        <InputAppend className={'input-group-text '}>mg</InputAppend>
                                    </div> 
                                </div>
                            </div>   
                        </div>
                    </div>  
                    <div className="input-group col-md">
                        <div className=" row mx-auto align-items-center">
                            <label htmlFor="potassium" className="form-label col-sm-5 px-1">Potassium</label>
                            <div className="col-sm-7 px-1">
                                <div className="input-group input-group-sm">
                                    <input type="text" className="form-control" id="potassium" onChange={this.nutrientChange}/>
                                    <div className="input-group-append">
                                        <InputAppend className={'input-group-text '}>mg</InputAppend>
                                    </div> 
                                </div>
                            </div>   
                        </div>
                    </div>   
                </div>
    
                <div className="form-group row"> 
                    <div className="input-group col-md">
                        <div className=" row mx-auto align-items-center">
                            <label htmlFor="totalCarbs" className="form-label col-sm-5 px-1">Total Carbs</label>
                            <div className="col-sm-7 px-1">
                                <div className="input-group input-group-sm">
                                    <input type="text" className="form-control" id="totalCarbs" onChange={this.nutrientChange}/>
                                    <div className="input-group-append">
                                        <InputAppend className={'input-group-text '}>g</InputAppend>
                                    </div> 
                                </div>
                            </div>   
                        </div>
                    </div>
                    <div className="input-group col-md">
                        <div className=" row mx-auto align-items-center">
                            <label htmlFor="fiber" className="form-label col-sm-5 px-1">Fiber</label>
                            <div className="col-sm-7 px-1">
                                <div className="input-group input-group-sm">
                                    <input type="text" className="form-control" id="fiber" onChange={this.nutrientChange}/>
                                    <div className="input-group-append">
                                        <InputAppend className={'input-group-text '}>g</InputAppend>
                                    </div> 
                                </div>
                            </div>   
                        </div>
                    </div>    
                    <div className="input-group col-md">
                        <div className=" row mx-auto align-items-center" >
                            <label htmlFor="sugars" className="form-label col-sm-5 px-1">Sugars</label>
                            <div className="col-sm-7 px-1">
                                <div className="input-group input-group-sm">
                                    <input type="text" className="form-control" id="sugars" onChange={this.nutrientChange}/>
                                    <div className="input-group-append">
                                        <InputAppend className={'input-group-text ' }>g</InputAppend>
                                    </div> 
                                </div>
                            </div>   
                        </div>
                    </div>
                    <div className="input-group col-md">
                        <div className=" row mx-auto align-items-center">
                            <label htmlFor="protein" className="form-label col-sm-5 px-1">Protein</label>
                            <div className="col-sm-7 px-1">
                                <div className="input-group input-group-sm">
                                    <input type="text" className="form-control" id="protein" onChange={this.nutrientChange}/>
                                    <div className="input-group-append">
                                        <InputAppend className={'input-group-text '}>g</InputAppend>
                                    </div> 
                                </div>
                            </div>   
                        </div>
                    </div>    
                </div>
                
                <hr />
    
                <div className="form-group row"> 
                    <div className="input-group col-md">
                        <div className=" row mx-auto align-items-center">
                            <label htmlFor="vitaminA" className="form-label col-sm-5 px-1">Vitamin A</label>
                            <div className="col-sm-7 px-1">
                                <div className="input-group input-group-sm">
                                    <input type="text" className="form-control" id="vitaminA" onChange={this.nutrientChange}/>
                                    <div className="input-group-append">
                                        <InputAppend className={'input-group-text '}>%</InputAppend>
                                    </div> 
                                </div>
                            </div>   
                        </div>
                    </div>
                    <div className="input-group col-md">
                        <div className=" row mx-auto align-items-center">
                            <label htmlFor="vitaminC" className="form-label col-sm-5 px-1">Vitamin C</label>
                            <div className="col-sm-7 px-1">
                                <div className="input-group input-group-sm">
                                    <input type="text" className="form-control" id="vitaminC" onChange={this.nutrientChange}/>
                                    <div className="input-group-append">
                                        <InputAppend className={'input-group-text '}>%</InputAppend>
                                    </div> 
                                </div>
                            </div>   
                        </div>
                    </div>    
                    <div className="input-group col-md">
                        <div className=" row mx-auto align-items-center">
                            <label htmlFor="calcium" className="form-label col-sm-5 px-1">Calcium</label>
                            <div className="col-sm-7 px-1">
                                <div className="input-group input-group-sm">
                                    <input type="text" className="form-control" id="calcium" onChange={this.nutrientChange}/>
                                    <div className="input-group-append">
                                        <InputAppend className={'input-group-text '}>%</InputAppend>
                                    </div> 
                                </div>
                            </div>   
                        </div>
                    </div>
                    <div className="input-group col-md">
                        <div className="row mx-auto align-items-center">
                            <label htmlFor="iron" className="form-label col-sm-5 px-1">Iron</label>
                            <div className="col-sm-7 px-1">
                                <div className="input-group input-group-sm">
                                    <input type="text" className="form-control" id="iron" onChange={this.nutrientChange}/>
                                    <div className="input-group-append">
                                        <InputAppend className={'input-group-text '}>%</InputAppend>
                                    </div> 
                                </div>
                            </div>   
                        </div>
                    </div>    
                </div>
                <button className="btn btn-sm btn-primary" type="button" onClick={this.saveServingHandler}>Save Serving</button>
            </ServingContainer> : null  
        )
    }
              
};

export default ServingCreator;