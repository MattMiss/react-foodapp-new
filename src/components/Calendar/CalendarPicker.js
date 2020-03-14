import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';


const DateHeaderCol = styled(Col)`
    font-size: 1.2em;
`;

const CalendarPicker = (props) => {

    console.log(props.currentDate)
    console.log(props.currentDate.getDay())

    const [weekOffset, setWeekOffset] = useState(0);
    const [week, setWeek] = useState(null);
    
    
    useEffect(() => {
        let focusWeek = [];

        for(let i = 0; i < 7; i++){
            focusWeek.push(props.currentDate);
        }
        setWeek(focusWeek);
    },[])

    

    


    const weekDivs = week ? week.map((day, index) => {
        const newDate = new Date();
        // Set the 7 div days based on the current day and also subtract the week(* 7 days)
        newDate.setDate(day.getDate() - ((props.currentDate.getDay() - index) - (weekOffset * 7)));
        return(<Col key={newDate.getDate()}>{newDate.getDate()}</Col>)
    }) : null;

    let monthTxt ="";
    console.log("WEEK", week ? week[0].getMonth() + 1 : props.currentDate.getMonth() + 1);
    console.log(week);

    const now = week ? new Date().setDate(week[0].getDate()) : null;
    //const monthNum = week ? now.setDate(week[0] + 30) : props.currentDate.getMonth() + 1;
    //console.log("MonthNum", week ? now.ge)

    switch (now) {
        case 1:
            monthTxt =  'Jan';
            break;
        case 2:
            monthTxt = 'Feb';
            break;
        case 3:
            monthTxt = 'Mar';
            break;
        case 4:
            monthTxt = 'Apr';
            break;
        case 5:
            monthTxt = 'May';
            break;
        case 6:
            monthTxt = 'June';
            break;
        case 7:
            monthTxt = 'July';
            break;
        case 8:
            monthTxt = 'Aug';
            break;
        case 9:
            monthTxt = 'Sep';
            break;
        case 10:
            monthTxt = 'Oct';
            break;
        case 11:
            monthTxt = 'Nov';
            break;
        case 12:
            monthTxt = 'Dec';
            break;
    }
        
    const changeWeekHandler = (direction) => {
        if (direction === 'back'){
            setWeekOffset(prev => prev - 1)
        }else {
            setWeekOffset(prev => prev + 1)
        }
        console.log("MONTH", props.currentDate.getMonth() + 1)
    }

    console.log(weekOffset)
    return(
            <Container>
                <Row>
                    <DateHeaderCol className="text-left">
                        {monthTxt} {props.currentDate.getFullYear()}
                    </DateHeaderCol>
                    <Col>
                        <button onClick={ () => changeWeekHandler('back')}>{"<"}</button>
                        <button onClick={ () => changeWeekHandler('forward')}>{">"}</button>
                    </Col>
                </Row>
                <Row>
                    {weekDivs}
                </Row>
            </Container>
    );
};

export default CalendarPicker;
