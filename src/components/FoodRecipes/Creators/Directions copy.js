import React, {Component} from 'react';
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import styled from 'styled-components';


const DirectionsContainer = styled.div`
    max-width: 300px
`;

const SortableItem = sortableElement(({value, i}) => <DirectionsContainer className=" row justify-content-center mx-auto">
    <div className="col-1 px-0 ml-4 text-right">[{i+1}]</div>
    <div className="col-1 px-0">-</div>
    <div className="col px-0 text-left">{value}</div>

    
</DirectionsContainer>);

const SortableContainer = sortableContainer(({children}) => {
  return <div>{children}</div>;
});

class Directions extends Component {
  state = {
    items: ['Cook water on high until it boils', 'Add Pasta to water', 'Drain Pasta', 'Add Milk, Butter, and Cheese ', 'Mix Thoroughly', 'Let cool for a few minutes'],
  };

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({items}) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };

  render() {
    const {items} = this.state;

    return (
      <SortableContainer onSortEnd={this.onSortEnd}>
        {items.map((value, index) => (
          <SortableItem key={`item-${value}`} index={index} i={index} value={value} />
        ))}
      </SortableContainer>
    );
  }
}

export default Directions;