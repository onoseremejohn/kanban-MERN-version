import moment from "moment";
import styled from "styled-components";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { TasksType } from "../types";
import Assignees from "../Components/Assignees";
import { RiErrorWarningLine } from "react-icons/ri";
import { countCompletedSubtasks } from "../helpers";
import Loading from "../Components/Loading";
const AssigneeViewTask = () => {
  const location = useLocation();
  const { userId, taskId } = useParams();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ msg: "" });
  const [myTask, setMyTask] = useState<TasksType | null>(null);
  useEffect(() => {
    setLoading(true);
    const fetchTask = async () => {
      try {
        const { data } = await axios(`/api/task/${userId}/${taskId}/view`, {
          params: { email },
        });
        setMyTask(data.task);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        setError({ msg: error.response.data.msg });
      }
    };
    fetchTask();
  }, [email, userId, taskId]);

  if (loading) return <Loading />;
  if (error.msg) return <h2 className="absolute-center">{error.msg}</h2>;
  if (!myTask) return null;
  document.title = myTask.title;
  const createdOnFormatted = moment(myTask.createdOn).format(
    "ddd, MMMM Do YYYY"
  );
  const dueFormatted = moment(myTask.due).format("ddd, MMMM Do YYYY");

  return (
    <main className="assignee-view">
      <Wrapper>
        <div
          style={{
            marginBottom: "0.75rem",
          }}
        >
          <h4>{myTask.title}</h4>
        </div>
        <p className="description">{myTask.description || "no description"}</p>
        <h6>
          Subtasks ({countCompletedSubtasks(myTask.subtasks)} of{" "}
          {myTask.subtasks.length})
        </h6>
        {myTask.subtasks.map((s) => {
          return (
            <label key={s.id} className={s.isCompleted ? "completed" : ""}>
              <input type="checkbox" checked={s.isCompleted} readOnly />
              <p>{s.title}</p>
            </label>
          );
        })}
        <h6>Current Status</h6>
        <div style={{ position: "relative" }}>
          <button type="button" className={"status"}>
            {myTask.status}
          </button>
        </div>
        <div className="dates">
          <div>
            <h6>Created On</h6>
            <p>{createdOnFormatted}</p>
          </div>
          <div style={{ position: "relative" }}>
            <h6>Due Date</h6>
            <p>
              {dueFormatted} <RiErrorWarningLine />
            </p>
          </div>
        </div>
        <Assignees assignedTo={myTask.assignedTo} />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  background-color: #fff;
  color: #828fa3;
  position: relative;
  max-height: 80vh;
  width: 85vw;
  max-width: 500px;
  padding: 2.85em 1.5em;
  border-radius: var(--radius);
  overflow-x: hidden;
  label {
    display: flex;
    align-items: center;
    background-color: #f4f7fd;
    color: #000;
    border-radius: var(--radius);
    font-weight: 600;
    padding: 0.6em 1em;
    gap: 0.8em;
    margin-bottom: 0.5em;
    cursor: pointer;
    transition: color 0.1s linear, text-decoration 0.1s linear;
    &:hover {
      background-color: #635fc740;
    }
  }
  input[type="checkbox"] {
    width: 15px;
    height: 15px;
  }
  .description {
    font-size: 1rem;
    margin-bottom: 1.5em;
    color: var(--grey);
  }
  h4 {
    color: #000;
    margin-bottom: 0;
  }
  h6 {
    font-size: 0.75rem;
    margin-bottom: 0.5em;
  }
  .status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border: 2px solid rgba(130, 143, 163, 0.4);
    padding: 0.5em 1em;
    border-radius: var(--radius);
    margin-bottom: 1em;
    color: #000;
    &:focus {
      border-color: #635fc7;
    }
  }
  .completed {
    font-weight: 400;
    text-decoration: line-through;
    color: gray;
  }
  .dates {
    display: flex;
    gap: 3.5em;
    margin-bottom: 1em;
    svg {
      color: red;
      font-size: 1.5rem;
      background-color: inherit;
    }
  }
`;

export default AssigneeViewTask;
