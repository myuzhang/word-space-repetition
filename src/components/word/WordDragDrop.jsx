import React, {useEffect, useState} from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import Word from '../word/Word'
import {updateReorderedWords} from '../../utils'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

function Quote({quote, index, checkboxes, setCheckboxes}) {
  return (
    <Draggable draggableId={quote.word.id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Word wordWithCheckbox={quote} checkboxes={checkboxes} setCheckboxes={setCheckboxes}/>
        </div>
      )}
    </Draggable>
  );
}

const QuoteList = React.memo(function QuoteList({quotes, checkboxes, setCheckboxes}) {
  return quotes.map((quote, index) => (
    <Quote quote={quote} index={index} checkboxes={checkboxes} setCheckboxes={setCheckboxes} key={quote.word.id}/>
  ));
});

export default function WordDragDrop({checkboxWords, checkboxes, setCheckboxes}) {
  const [state, setState] = useState({quotes: checkboxWords});

  useEffect(() => {
    setState({quotes: checkboxWords})
  }, [checkboxWords])

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const quotes = reorder(
      state.quotes,
      result.source.index,
      result.destination.index
    );

    setState({quotes});
    updateReorderedWords(quotes.map(q => q.word))
    setCheckboxes(pre => {
      return {
        showAll: checkboxes.showAll,
        isAllSelected: pre.isAllSelected,
        checkboxWords: [...quotes]
      }
    })
 }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <QuoteList quotes={state.quotes} checkboxes={checkboxes} setCheckboxes={setCheckboxes} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
