import React from 'react';
import { animated, useSpring } from "react-spring";
import { useScroll } from "react-use-gesture";
import { getMonthTxt } from '../../../utils/calendarHelper';
import styled from "styled-components";
import './RecentSlideList.css';

// const dates = [
//     '03/01/2020',
//     '03/02/2020',
//     '03/03/2020',
//     '03/04/2020',
//     '03/05/2020',
//     '03/06/2020',
//     '03/07/2020'
// ]

const CardContainer = styled.div`
    display: flex;
    overflow-x: scroll;
    width: 100%;
    padding: 20px 0;
`;

const Card = styled(animated.div)` 
    flex-shrink: 0;
    width: 160px;
    height: 120px;
    border: 2px solid #00a5ff;
    border-radius: 10px;
    margin-left: 10px;

    &:hover {
        background-color: #182955;
        color: #00a5ff;
        cursor: pointer;
    }
`;

const DayDiv = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    font-size: 4.8em;
    text-align: left;
    line-height: .8em;
    margin: .02em;
`;

const MthDiv = styled.div`
    position: absolute;
    top: 2px;
    right: 0;
    font-size: 1.9em;
    text-align: right;
    line-height: 1em;
    margin: .02em;
`;

const YrDiv = styled.div`
    position: absolute;
    top: .9em;
    right: 0;
    font-size: 2.2em;
    text-align: right;
    line-height: 1em;
    margin: .02em;
`;

const MealsDiv = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    text-align: left;
    line-height: 1em;
    margin: .2em;
`;

const CalsDiv = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    text-align: right;
    line-height: 1em;
    margin: .2em;
`;

const MealAmt = styled.span`
    font-size: 1.4em;
    font-weight: 500;
`;

const CalAmt = styled.span`
    font-size: 1.2em;
    font-weight: 500;
`;

const Label = styled.span`
    font-size: .8em;
`;

const NewMealDiv = styled.div`
    text-align: center;
    margin-top: 1.5em;
`;

const RecentSlideList = (props) => {
    //console.log(props.items)
    const [styleTurn, set] = useSpring(() => ({
        transform: "perspective(500px) rotateY(0deg)"
    }));


    const clamp = (value, clampAt = 30) => {
        if (value > 0) {
          return value > clampAt ? clampAt : value;
        } else {
          return value < -clampAt ? -clampAt : value;
        }
    };

    const bind = useScroll(event => {
        set({
          transform: `perspective(500px) rotateY(${
            event.scrolling ? clamp(event.delta[0]) : 0
          }deg)`
        });
    });

    const clickedHandler = (item) => {
        //console.log("clicked", item)
        if(!props.mealChoice.editing){
            props.clicked(item);
        }else{
            props.promptSave(item);
        }
        
        
    }

    return (
        props.show ? <CardContainer {...bind()}>
          {props.items.map(date => {
            
            //console.log(date)
            // dateSplit[0]=month, dateSplit[1]=day, dateSPlit[2]=year
            const dateSplit = date.id.split('-');

            // Removes the 0 from the day
            const day = dateSplit[1][0] === '0' ? dateSplit[1][1] : dateSplit[1];

            const month = dateSplit[0][0] === '0' ? dateSplit[0][1] : dateSplit[0];
            
            console.log(getMonthTxt(month))
            // Removes the first two digits from the year
            const year = dateSplit[2].slice(2,4);

            const mealLength = date.meals ? date.meals.length : 0;
            return(
                <Card
                key={date.id}
                onClick={() => clickedHandler(date)}
                style={{
                    ...styleTurn
                }}>
                {/* {date.id} */}
                
                    <DayDiv>
                        {day}
                    </DayDiv> 
                    <MthDiv>
                        {getMonthTxt(month)}
                    </MthDiv>
                    <YrDiv>
                        `{year}
                    </YrDiv>
                
                    <MealsDiv>
                        <MealAmt>
                            {mealLength}
                        </MealAmt>
                        <Label>
                            MEALS
                        </Label>
                    </MealsDiv>
                    <CalsDiv>
                        <CalAmt>
                            {date.nutrientTotals.calories}
                        </CalAmt>
                        <Label>
                            CALS
                        </Label>
                    </CalsDiv>
                
                </Card>
            )
            })}
            <Card
                key={'AddNEw'}
                onClick={() => clickedHandler('new')}
                style={{
                    ...styleTurn
                }}>
                <NewMealDiv>
                    <center>NEW</center>    
                    <svg 
                        version="1.1" 
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 512 512">
                        <g>
                            <path d="M492,236H276V20c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20v216H20c-11.046,0-20,8.954-20,20s8.954,20,20,20h216
                                v216c0,11.046,8.954,20,20,20s20-8.954,20-20V276h216c11.046,0,20-8.954,20-20C512,244.954,503.046,236,492,236z"/>
                        </g>
                    </svg>
                </NewMealDiv>
                      
            </Card>
        </CardContainer> : null
    );
};

export default RecentSlideList;
