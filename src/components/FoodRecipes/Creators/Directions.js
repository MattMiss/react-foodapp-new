import React, {Component, useState, useEffect} from 'react';
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import styled from 'styled-components';


const DirectionsContainer = styled.div`
    max-width: 300px
`;

const SortableItem = sortableElement(({value, index, i}) => <DirectionsContainer className=" row justify-content-center mx-auto">
    <div className="col-1 px-0 ml-4 text-right">[{i}]</div>
    <div className="col-1 px-0">-</div>
    <div className="col px-0 text-left">{value}</div>

    
</DirectionsContainer>);

const SortableContainer = sortableContainer(({children}) => {
  return <div>{children}</div>;
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
  return (<SortableContainer onSortEnd={onSortEnd}>
      {items.map((item, index) => {
        console.log(item)
        return <SortableItem key={`item-${item.direction_description}`} index={index} i={item.direction_number} value={item.direction_description} />
      })}
    </SortableContainer>
  );
  
}

export default Directions;