import {
  forwardRef,
  useState,
  useRef,
  ChangeEvent,
  FormEvent,
  MouseEvent,
} from "react";
import styled from "styled-components";
import { useGlobalContext } from "../AppContext";
import { Close, ChevronDown } from "../assets/Icons";
import { nanoid } from "nanoid";
import { TasksType } from "../types";
import { statusName } from "../helpers";
import moment from "moment";
import { useUserContext } from "../UserContext";
interface SubtasksType
  extends Pick<TasksType["subtasks"][number], "title" | "isCompleted" | "id"> {
  error?: boolean;
}
interface AssigneeType
  extends Pick<TasksType["assignedTo"][number], "email" | "name" | "id"> {
  error?: boolean;
  disabled?: boolean;
}

const ModifyTask = forwardRef<HTMLDivElement>((props, ref) => {
  const showRef = useRef<HTMLDivElement>(null);
  const {
    closeModal = () => {},
    selectedTask,
    boards,
    currentBoardId,
    editTask = () => {},
  } = useGlobalContext() || {};
  const { user, sendEmail = () => {} } = useUserContext() || {};
  if (!user) return <>Unauthorized</>;
  const task = selectedTask?.task;
  const statusIds = boards
    ?.find((b) => b.id === currentBoardId)
    ?.columns.map((c) => c.id);
  let columnId = selectedTask?.columnId;
  columnId = columnId ? columnId : statusIds ? statusIds[0] : undefined;
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow((s) => !s);
  const closeShow = (e: MouseEvent<HTMLDivElement>) => {
    if (show && !showRef.current?.contains(e.target as Node)) setShow(false);
  };
  const newSubtask: SubtasksType[] = [
    {
      id: nanoid(),
      title: "",
      isCompleted: false,
    },
  ];

  const [tempStatusId, setTempStatusId] = useState(columnId);

  interface Task {
    title: string;
    description: string;
    createdOn: Date | string;
    due: Date | string;
  }

  const [info, setInfo] = task
    ? useState<Task>({
        title: task.title,
        description: task.description,
        createdOn: task.createdOn,
        due: task.due,
      })
    : useState<Task>({
        title: "",
        description: "",
        createdOn: new Date().toISOString(),
        due: "",
      });

  const today = new Date();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name !== "createdOn" && name !== "due") {
      if (/^\s+$/.test(value)) return;
      setInfo({ ...info, [name]: value });
      if (name === "title" && value === "") setTitleError(true);
      else if (name === "title" && value !== "") setTitleError(false);
    } else {
      setInfo({
        ...info,
        [name]: moment.parseZone(value).toDate().toISOString(),
      });
    }
  };

  const [subtasks, setSubtasks] = task
    ? useState<SubtasksType[]>([...task.subtasks])
    : useState<SubtasksType[]>([...newSubtask]);
  const handleSubtasksChange = (
    id: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (/^\s+$/.test(value)) return;
    const updated = subtasks.map((s) => {
      if (s.id === id) return { ...s, title: value, error: value === "" };
      return s;
    });
    setSubtasks(updated);
  };
  const addNewSubtask = () => {
    if (subtasks.length >= 6) return;
    setSubtasks([
      ...subtasks,
      {
        id: nanoid(),
        title: "",
        isCompleted: false,
      },
    ]);
  };
  const handleDeleteSubtask = (id: string) => {
    const updated = subtasks.filter((s) => s.id !== id);
    setSubtasks(updated);
  };

  let [assignees, setAssignees] = task
    ? useState<AssigneeType[]>(
        [...task.assignedTo].map((a) => ({ ...a, disabled: true }))
      )
    : useState<AssigneeType[]>([]);
  const handleAssigneesChange = (
    id: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const name = e.target.name;
    if (/^\s+$/.test(value)) return;
    setAssignees((prevAssignees) => {
      let updated: AssigneeType[] = [];
      if (
        prevAssignees.some((a) => a.email.toLowerCase() === value.toLowerCase())
      ) {
        updated = prevAssignees.map((a) => {
          if (a.id === id) return { ...a, [name]: value, error: true };
          return a;
        });
      } else {
        updated = prevAssignees.map((a) => {
          if (a.id === id) return { ...a, [name]: value, error: false };
          return a;
        });
      }
      return updated;
    });
  };
  const addNewAssignee = () => {
    setAssignees([
      ...assignees,
      {
        id: nanoid(),
        name: "",
        email: "",
        disabled: false,
      },
    ]);
  };
  const handleDeleteAssignee = (id: string) => {
    let updated = assignees.filter((a) => a.id !== id);
    const usedEmails = new Set();
    updated = updated.map((a) => {
      if (usedEmails.has(a.email.toLowerCase())) {
        return { ...a, error: true };
      } else {
        usedEmails.add(a.email.toLowerCase());
        return { ...a, error: false };
      }
    });
    setAssignees(updated);
  };

  const [titleError, setTitleError] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = info.title !== "" && subtasks.every((s) => s.title !== "");
    const assignNext = assignees.every(
      (a) =>
        !assignees.some(
          (assig) =>
            assig.email.toLowerCase() === a.email.toLowerCase() && assig !== a
        )
    );
    if (next && assignNext) {
      const status = statusName(boards, currentBoardId, tempStatusId);
      let payload = {} as TasksType;
      if (task && status && tempStatusId) {
        payload = {
          ...task,
          title: info.title,
          description: info.description,
          status,
          statusId: tempStatusId,
          createdOn: info.createdOn,
          due: info.due,
          subtasks: subtasks.map((s) => {
            const { error, ...others } = s;
            return others;
          }),
          assignedTo: assignees.map((a) => {
            const { error, disabled, ...others } = a;
            return others;
          }),
        };
        editTask(payload, true);
      } else if (!task && status && tempStatusId) {
        payload = {
          id: nanoid(),
          title: info.title,
          description: info.description,
          status,
          statusId: tempStatusId,
          createdOn: info.createdOn,
          due: info.due,
          subtasks: subtasks.map((s) => {
            const { error, ...others } = s;
            return others;
          }),
          assignedTo: assignees.map((a) => {
            const { error, disabled, ...others } = a;
            return others;
          }),
        };
        editTask(payload, false);
      }
      const emails = assignees
        .filter((a) => a.disabled === false)
        .filter(
          (b) =>
            !task?.assignedTo.some(
              (t) => t.email.toLowerCase() === b.email.toLowerCase()
            )
        );
      // second filter method is to avoid a scenario whereby I delete an assignee by mistake and add such email back then send another email
      if (emails.length > 0) {
        sendEmail(user.name, payload.title, emails, payload.id);
      }
      closeModal();
    } else {
      if (info.title === "") setTitleError(true);
      setSubtasks((prevSubtasks) => {
        const updated = prevSubtasks.map((s) => {
          if (s.title === "") return { ...s, error: true };
          return s;
        });
        return updated;
      });
      if (!assignNext) {
        const usedEmails = new Set();
        const updatedAssignees = assignees.map((a) => {
          if (usedEmails.has(a.email.toLowerCase()))
            return { ...a, error: true };
          usedEmails.add(a.email.toLowerCase());
          return { ...a, error: false };
        });
        setAssignees(updatedAssignees);
      }
    }
  };

  return (
    <Wrapper ref={ref} onClick={closeShow}>
      <button
        type="button"
        className="close"
        onClick={(e) => {
          closeModal();
          e.stopPropagation();
        }}
      >
        <Close />
      </button>
      <h4>{task ? "Edit Task" : "Add New Task"}</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-control" style={{ position: "relative" }}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={info.title}
            name="title"
            onChange={handleInputChange}
            className={titleError ? "error" : ""}
            maxLength={200}
            placeholder="e.g Mobile UI Design"
          />
          {titleError && <span className="errorText">Required</span>}
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows={4}
            value={info.description}
            onChange={handleInputChange}
            maxLength={350}
            placeholder="e.g Design an intuitive and user-friendly Mobile UI for the platform"
          ></textarea>
        </div>
        <div className="form-control">
          <label htmlFor="subtasks">Subtasks</label>

          {subtasks.map((s) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1%",
                position: "relative",
              }}
              key={s.id}
            >
              <input
                type="text"
                id="subtasks"
                style={{ flexGrow: 1 }}
                value={s.title}
                onChange={(e) => handleSubtasksChange(s.id, e)}
                className={s.error ? "error" : ""}
                placeholder="e.g design the dashboard"
              />
              <button
                type="button"
                style={{ padding: "7px" }}
                onClick={(e) => {
                  handleDeleteSubtask(s.id);
                  e.stopPropagation();
                }}
              >
                <Close />
              </button>
              {s.error && (
                <span className="errorText" style={{ right: "3em" }}>
                  Required
                </span>
              )}
            </div>
          ))}
        </div>
        {subtasks.length < 6 && (
          <button
            type="button"
            className="subtask"
            onClick={(e) => {
              addNewSubtask();
              e.stopPropagation();
            }}
          >
            + Add New Subtask
          </button>
        )}
        <div className="form-control" style={{ position: "relative" }}>
          <label>Status</label>
          <button
            type="button"
            className={show ? "status show" : "status"}
            onClick={toggleShow}
          >
            {statusName(boards, currentBoardId, tempStatusId)}
            <ChevronDown />
          </button>
          {show && (
            <div className="dropdown" ref={showRef}>
              {statusIds?.map((id) => {
                return (
                  <button
                    type="button"
                    key={id}
                    onClick={(e) => {
                      setTempStatusId(id);
                      setShow(false);
                      e.stopPropagation();
                    }}
                  >
                    {statusName(boards, currentBoardId, id)}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="createdOn">
            Created On
            <input
              type="date"
              id="createdOn"
              value={moment(info.createdOn).format("YYYY-MM-DD")}
              name="createdOn"
              required
              style={{ marginLeft: "1em" }}
              onChange={handleInputChange}
              max={moment(today).format("YYYY-MM-DD")}
            />
          </label>
        </div>
        <div className="form-control">
          <label htmlFor="due">
            Due Date
            <input
              type="date"
              id="due"
              required
              name="due"
              style={{ marginLeft: "1em" }}
              value={
                info.due === "" ? "" : moment(info.due).format("YYYY-MM-DD")
              }
              onChange={handleInputChange}
              min={moment(info.createdOn).format("YYYY-MM-DD")}
            />
          </label>
        </div>
        <div className="form-control">
          <label htmlFor="assignTo">Assign To</label>
          {assignees.map((a) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1%",
                position: "relative",
              }}
              key={a.id}
            >
              <div className="grid">
                <input
                  type="text"
                  required
                  id="assignTo"
                  placeholder="e.g John Doe"
                  name="name"
                  value={a.name}
                  onChange={(e) => handleAssigneesChange(a.id, e)}
                  disabled={a.disabled}
                />
                <input
                  type="email"
                  required
                  placeholder="e.g john.doe@example.com"
                  name="email"
                  value={a.email.toLowerCase()}
                  onChange={(e) => handleAssigneesChange(a.id, e)}
                  className={a.error ? "error" : ""}
                  disabled={a.disabled}
                />
              </div>
              <button
                type="button"
                style={{ padding: "7px" }}
                onClick={(e) => {
                  handleDeleteAssignee(a.id);
                  e.stopPropagation();
                }}
              >
                <Close />
              </button>
              {a.error && (
                <span className="errorText" style={{ right: "3em" }}>
                  Used
                </span>
              )}
            </div>
          ))}
          <button
            type="button"
            className="assign"
            onClick={(e) => {
              addNewAssignee();
              e.stopPropagation();
            }}
          >
            + Add New Assignee
          </button>
        </div>
        <button type="submit" className="submit">
          {task ? "Save Changes" : "Create Task"}
        </button>
      </form>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.white};
  position: relative;
  height: auto;
  max-height: 80vh;
  overflow-y: scroll;
  width: 85vw;
  max-width: 500px;
  padding: 2.85em 1.5em;
  border-radius: var(--radius);
  h4 {
    color: ${({ theme }) => theme.headerText};
  }
  .close {
    position: absolute;
    right: 3%;
    top: 1.5%;
    padding: 0.4em;
    transition: var(--transition);
    border-radius: var(--radius);
    &:hover {
      background-color: ${({ theme }) => theme.body};
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  .form-control {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
  label {
    color: ${({ theme }) => theme.modalText};
    font-weight: 500;
  }
  textarea {
    background-color: inherit;
    color: inherit;
    border-radius: var(--radius);
    resize: none;
    padding: 0.5em 1em;
    outline: none;
    border: 2px solid #828fa366;
    &:focus-visible {
      border-color: var(--purple);
    }
  }
  input {
    color: inherit;
    background-color: inherit;
    height: 3em;
    padding: 0.5em 1em;
    border-radius: var(--radius);
    outline: none;
    border: 2px solid #828fa366;
    &:focus-visible {
      border-color: var(--purple);
    }
  }
  input.error {
    border-color: #ea5555;
  }
  input[type="date"] {
    min-width: 150px;
  }
  input:disabled {
    cursor: not-allowed;
    opacity: 50%;
  }
  .errorText {
    position: absolute;
    bottom: 0.5em;
    right: 1em;
    color: #ea5555;
  }
  button {
    display: block;
  }
  .subtask,
  .assign {
    background-color: #f0effa;
    padding: 0.75em 0em;
    border-radius: 20px;
    color: var(--purple);
    font-weight: 600;
    &:hover {
      opacity: 0.8;
    }
  }
  .status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 2px solid rgba(130, 143, 163, 0.4);
    padding: 0.5em 1em;
    color: inherit;
    border-radius: var(--radius);
    margin-bottom: 1em;
    &:focus {
      border-color: #635fc7;
    }
    svg {
      transition: var(--transition);
    }
  }
  .status.show {
    svg {
      rotate: 180deg;
    }
  }
  .dropdown {
    display: flex;
    flex-direction: column;
    align-items: start;
    box-shadow: var(--bs);
    position: absolute;
    top: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.modifyToggle};
    color: var(--grey);
    button {
      color: inherit;
      width: 100%;
      text-align: start;
      padding: 0.5em 1em;
      font-size: larger;
    }
    margin-bottom: 2em;
  }
  .submit {
    background-color: var(--purple);
    padding: 0.75em 0em;
    color: white;
    font-weight: 600;
    border-radius: 20px;
    &:hover {
      background-color: #a8a4ff;
    }
  }
  div.grid {
    display: grid;
    flex-grow: 1;
    grid-template-columns: 40% 1fr;
    gap: 1em;
  }
`;

export default ModifyTask;
