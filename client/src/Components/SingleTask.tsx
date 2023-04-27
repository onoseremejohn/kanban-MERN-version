import styled from "styled-components";
import { TasksType as BaseTasksType } from "../types";
import { useGlobalContext } from "../AppContext";
import { countCompletedSubtasks, isCompleted } from "../helpers";
import { Draggable } from "@hello-pangea/dnd";
import { RiErrorWarningLine, RiCheckboxCircleFill } from "react-icons/ri";
import moment from "moment";
interface TasksType extends BaseTasksType {
  columnId: string;
  index: number;
}

const SingleTask = ({
  id: taskId,
  title,
  subtasks,
  columnId,
  index,
  due,
}: TasksType) => {
  const { openTask = () => {} } = useGlobalContext() || {};
  const today = moment();
  const overdue = today.isSameOrAfter(moment(due), "day");
  const completed = isCompleted(subtasks);
  return (
    <Draggable draggableId={taskId} index={index}>
      {(provided, snapshot) => (
        <Wrapper
          aria-label="view task"
          onClick={(e) => {
            openTask(columnId, taskId);
            e.stopPropagation();
          }}
          onMouseDown={(e) => e.stopPropagation()}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          aria-roledescription="Press spacebar to lift task"
        >
          <h4>{title}</h4>
          <p className="font-bold">
            {countCompletedSubtasks(subtasks)} of {subtasks.length} Subtasks
          </p>
          {!completed && overdue && (
            <RiErrorWarningLine title="Overdue" color="red" />
          )}
          {completed && (
            <RiCheckboxCircleFill title="completed" color="green" />
          )}
        </Wrapper>
      )}
    </Draggable>
  );
};

interface WrapperProps {
  isDragging: boolean;
}

const Wrapper = styled.article<WrapperProps>`
  position: relative;
  box-shadow: var(--bs);
  padding: 1.5rem 1rem;
  width: 17rem;
  font-size: 1rem;
  border-radius: var(--radius);
  border: 1px solid #8686861a;
  background-color: ${({ theme, isDragging }) =>
    isDragging ? "#67e2ae" : theme.white};
  &:hover {
    opacity: ${({ isDragging }) => (isDragging ? 1 : 0.5)};
  }
  &:focus,
  &:focus-visible {
    outline: 1px solid red;
  }
  h4 {
    font-size: 1rem;
    font-weight: var(--fw-bold);
    display: -webkit-box;
    display: -moz-box;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -webkit-line-clamp: 4;
    -moz-line-clamp: 4;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  p {
    color: var(--grey);
  }
  svg {
    position: absolute;
    top: 1.5rem;
    right: 1rem;
    font-size: 1.5em;
    background-color: inherit;
    cursor: pointer;
  }
`;

export default SingleTask;
