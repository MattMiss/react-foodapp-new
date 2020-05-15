import React, {useState, useEffect} from 'react';
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import { Row, Col } from 'react-bootstrap';
import arrayMove from 'array-move';
import styled from 'styled-components';


const DirectionsContainer = styled(Row)`
    max-width: 90%;
`;

const SortableItem = sortableElement(({value, index, i}) => 
  <DirectionsContainer className="no-gutters">
      <Col xs={2} className="px-0 ml-3 text-right">[{i}]</Col>
      <Col xs={1} className="px-0">-</Col>
      <Col  className="px-0 text-left">{value}</Col>       
  </DirectionsContainer>);

const SortableContainer = sortableContainer(({children}) => {
  return <Col>{children}</Col>;
});

const Directions = ( {directions} ) => {

  //const testItems = ['Cook water on high until it boils', 'Add Pasta to water', 'Drain Pasta', 'Add Milk, Butter, and Cheese ', 'Mix Thoroughly', 'Let cool for a few minutes']
  
  const [items, setItems] = useState(directions);

  useEffect(() => {
    setItems(directions);
  }, [directions])

  const onSortEnd = ({oldIndex, newIndex}) => {
    setItems(arrayMove(items, oldIndex, newIndex));
  };

  console.log(items)
  return (
    <Row>
      <SortableContainer onSortEnd={onSortEnd}>
        {items.map((item, index) => {
          console.log(item)
          return <SortableItem key={`item-${item.direction_description}`} index={index} i={item.direction_number} value={item.direction_description} />
        })}
      </SortableContainer>
    </Row>
  );
  
}

export default Directions;