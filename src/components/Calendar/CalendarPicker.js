import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { getMonthTxt, getDayTxt } from '../../utils/calendarHelper';
import styled from 'styled-components';


const DateHeaderCol = styled(Col)`
    font-size: 1.2em;
`;

const CalendarDayContainer = styled(Col)`
    border-radius: 5px;

    &:hover {
        background-color: #ddd;
        cursor: pointer;
    }
`;

const CalendarDayCol = styled(Col)`
    border: 2px solid black;
    border-radius: 5px;
    margin: 5px 5px 0 5px;

    @media (max-width: 500px) {
        margin: 2px;
    }
`;

const CalendarInfoCol = styled(Col)`
    border: 1px solid #aaa;
    border-top: none;
    border-radius: 2px;
    margin: 0 8px 5px 8px;
    min-height: 50px;

    &.today {
        background-color: palevioletred;
    }

    @media (max-width: 500px) {
        margin: 2px;
    }
`;

const DayofWeekCol = styled(Col)`
    @media (max-width: 500px) {
        font-size: .9em;
    }
`;

const DayofMonthCol = styled(Col)`
    font-size: 1.5em;

    @media (max-width: 500px) {
        font-size: .8em;
    }
`;

const MealAmountCol = styled(Col)`
    font-size: .9em;

    @media (max-width: 500px) {
        font-size: .7em;
    }
`;

const CaloriesCol = styled(Col)`
    font-size: .9em;

    @media (max-width: 500px) {
        font-size: .7em;
    }
`;

const TodayBtn = styled.button`
    border: 1px solid black;
    border-radius: 20px;
    font-size: .5em;
    font-weight: bold;
    margin: auto 10px;

    &:hover {
        background-color: palevioletred;
    }
`;

const CalendarPicker = (props) => {

    console.log(props.currentDate)
    //console.log(props.currentDate.getDay())

    const [weekOffset, setWeekOffset] = useState(0);
    const [week, setWeek] = useState(null);
    const [dateToday, setDateToday] = useState(new Date());
    
    
    useEffect(() => {
        let focusWeek = [];
        const todayDate = dateToday.getDate();
        const dayOfWeek = dateToday.getDay();

        for(let i=0; i < 7; i++) {
            let day = new Date();
            day.setDate(todayDate + weekOffset - (dayOfWeek - i))
            focusWeek[i] = day;
        }
        setWeek(focusWeek);
    },[weekOffset])


    const dayClickHandler = (day) => {
        if (day){
            props.clicked(day);
        }

    };

    const weekDivs = week ? week.map(day => {

        const dayText = day.getDate() < 10 ? '0' + day.getDate() : day.getDate();
        const monthText = day.getMonth() + 1 < 10 ? '0' + (day.getMonth() + 1) : (day.getMonth() + 1);

        const date = monthText + "-" + dayText + "-" + day.getFullYear();
        //console.log(date)

        let mealClicked = null;
        let mealAmount = null;
        let calories = null;
        
        props.items.forEach(meal => {
            //console.log(meal.id)
            if (meal.id === date){
                mealClicked = meal;
                mealAmount = meal.meals.length;
                calories = meal.nutrientTotals.calories;
            }
        });

        // Adds 'today' className to the div on todays date.
        const todayHighlight = (dateToday.getDate() === day.getDate()) &&
                                (dateToday.getMonth() === day.getMonth() &&
                                dateToday.getFullYear() === day.getFullYear()) ? 'today' : '';

        return(
            
            <CalendarDayContainer key={day.getDate()} onClick={() => dayClickHandler(mealClicked)}>
                <Row>
                    <CalendarDayCol className="px-1">
                        <Row className="no-gutters">
                            <DayofWeekCol className="px-0">
                                {getDayTxt(day.getDay() + 1)}
                            </DayofWeekCol>
                        </Row>
                        <Row>
                            <DayofMonthCol className="px-0">
                                {day.getDate()}
                            </DayofMonthCol>
                        </Row>
                    </CalendarDayCol>
                </Row>
                <Row>
                    <CalendarInfoCol className={"px-1 " + todayHighlight}>
                        <Row className="no-gutters">
                            <MealAmountCol className="px-0">
                                {mealAmount ? mealAmount + " meals" : null}
                            </MealAmountCol>
                        </Row>
                        <Row>
                            <CaloriesCol className="px-0">
                                {calories ? calories + " cals" : null}
                            </CaloriesCol>
                        </Row>
                    </CalendarInfoCol>
                </Row>
            </CalendarDayContainer>
            )
    }) : null;

    const now = week ? week[0] : null;
    const nextMth = week ? week[6] : null;    
        
    const changeWeekHandler = (direction) => {
        if (direction === 'back'){
            setWeekOffset(prev => prev - 7)
        }else {
            setWeekOffset(prev => prev + 7)
        }
    }

    return(
            props.show ? <Container>
                <Row>
                    <DateHeaderCol className="text-left">
                        {now ? getMonthTxt(now.getMonth() + 1) : null} {now ? now.getFullYear() : null}
                        <TodayBtn onClick={() => setWeekOffset(0)}>TODAY</TodayBtn>
                    </DateHeaderCol>   
                    <DateHeaderCol className="text-right">
                        {nextMth ? 
                            ((now.getFullYear() !== nextMth.getFullYear()) ? 
                                getMonthTxt(nextMth.getMonth() + 1) 
                                    : null): null} {nextMth ? (now.getFullYear() !== nextMth.getFullYear() ? nextMth.getFullYear() : null) : null}
                    </DateHeaderCol>
                    <Col> 
                        <button onClick={ () => changeWeekHandler('back')}>{"<"}</button>
                        <button onClick={ () => changeWeekHandler('forward')}>{">"}</button>
                    </Col>
                </Row>
                <Row>
                    {weekDivs}
                </Row>
                
            </Container> : null
    );
};

export default CalendarPicker;
