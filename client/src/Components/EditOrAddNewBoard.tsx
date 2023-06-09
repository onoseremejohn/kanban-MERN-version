import styled from "styled-components";
import { forwardRef, useState, ChangeEvent, FormEvent } from "react";
import { Close } from "../assets/Icons";
import { useGlobalContext } from "../AppContext";
import { nanoid } from "nanoid";
import { BoardType, ColumnType as BaseColumnType } from "../types";
import { findBoard } from "../helpers";

const colors = [
  "#49c4e5",
  "#8471f2",
  "#67e2ae",
  "#e5a449",
  "#2a3fdb",
  "#c36e6e",
];

interface ColumnType extends BaseColumnType {
  empty?: boolean;
  used?: boolean;
}
// This is AddNewBoardModal and also Edit board Modal and also Add new column modal
const EditOrAddNewBoard = forwardRef<HTMLDivElement>((props, ref) => {
  const {
    closeModal = () => {},
    addNewBoard = () => {},
    editBoardFlag,
    addNewColumnFlag,
    editBoard = () => {},
    boards,
    boardIds,
    currentBoardId = "",
  } = useGlobalContext() || {};
  const currentBoardName = findBoard(boards, currentBoardId) ?? "";
  let allBoards: (string | undefined)[] | undefined = [];
  if (addNewColumnFlag || editBoardFlag) {
    allBoards = boardIds
      ?.filter((id) => id !== currentBoardId)
      .map((x) => findBoard(boards, x));
  } else {
    allBoards = boardIds?.map((id) => findBoard(boards, id));
  }
  const currentColumns = boards?.find((b) => b.id === currentBoardId)?.columns;
  const [columns, setColumns] =
    editBoardFlag || addNewColumnFlag
      ? useState<ColumnType[]>(currentColumns ? [...currentColumns] : [])
      : useState<ColumnType[]>([
          {
            id: nanoid(),
            name: "",
            tasks: [],
            color: colors[0],
          },
        ]);
  const handleColumnsChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const value = e.target.value;
    if (/^\s+$/.test(value)) return;
    setColumns((prevColumns) => {
      let updated: ColumnType[];
      if (value === "") {
        updated = prevColumns.map((c) => {
          if (c.id === id)
            return { ...c, name: value, empty: true, used: false };
          return c;
        });
      } else if (
        prevColumns.some((c) => c.name.toLowerCase() === value.toLowerCase())
      ) {
        updated = prevColumns.map((c) => {
          if (c.id === id)
            return { ...c, name: value, empty: false, used: true };
          return c;
        });
      } else {
        updated = prevColumns.map((c) => {
          if (c.id === id)
            return { ...c, name: value, empty: false, used: false };
          return c;
        });
      }
      return updated;
    });
  };
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\s+$/.test(value)) return;
    setName(value);
    if (value === "") setNameError({ empty: true, used: false });
    else if (allBoards?.some((b) => b === value.toLowerCase()))
      setNameError({ empty: false, used: true });
    else setNameError({ empty: false, used: false });
  };
  const [name, setName] =
    editBoardFlag || addNewColumnFlag
      ? useState(currentBoardName)
      : useState("");
  const addNewColumn = () => {
    if (columns.length >= 6) return;
    setColumns([
      ...columns,
      { id: nanoid(), name: "", tasks: [], color: colors[columns.length] },
    ]);
  };
  const deleteColumn = (id: string) => {
    let updated = columns.filter((c) => c.id !== id);
    const usedNames = new Set();
    updated = updated.map((c) => {
      if (c.name === "") return c;
      else if (usedNames.has(c.name.toLowerCase())) {
        return { ...c, used: true };
      } else {
        usedNames.add(c.name.toLowerCase());
        return { ...c, used: false };
      }
    });
    setColumns(updated);
  };
  const [nameError, setNameError] = useState({ empty: false, used: false });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let payload: BoardType;
    let nameNext =
      name !== "" && !allBoards?.some((b) => b === name.toLowerCase());
    const columnsNext = columns.every(
      (c) =>
        c.name !== "" &&
        !columns.some(
          (column) =>
            column.name.toLowerCase() === c.name.toLowerCase() && column !== c
        )
    );
    let next = nameNext && columnsNext;
    if (next) {
      const newColumns = columns.map((c) => {
        const { empty, used, ...others } = c;
        return others;
      });
      if (editBoardFlag || addNewColumnFlag) {
        payload = { id: currentBoardId, name, columns: [...newColumns] };
        editBoard(payload);
      } else {
        payload = { id: nanoid(), name, columns: [...newColumns] };
        addNewBoard(payload);
      }
      closeModal();
    } else {
      if (!nameNext) {
        if (name === "") setNameError({ empty: true, used: false });
        if (allBoards?.some((b) => b === name.toLowerCase()))
          setNameError({ empty: false, used: true });
      }
      if (!columnsNext) {
        const usedNames = new Set();
        const updatedColumns = columns.map((c) => {
          if (c.name === "") {
            return { ...c, empty: true, used: false };
          } else if (usedNames.has(c.name.toLowerCase())) {
            return { ...c, empty: false, used: true };
          } else {
            usedNames.add(c.name.toLowerCase());
            return { ...c, empty: false, used: false };
          }
        });
        setColumns(updatedColumns);
      }
    }
  };
  return (
    <Wrapper ref={ref}>
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
      <h4>
        {editBoardFlag
          ? "Edit board"
          : addNewColumnFlag
          ? "Add New Column"
          : "Add New Board"}
      </h4>
      <form onSubmit={handleSubmit}>
        <div className="form-control" style={{ position: "relative" }}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            name="title"
            disabled={addNewColumnFlag}
            maxLength={50}
            onChange={handleNameChange}
            className={nameError.empty || nameError.used ? "error" : ""}
          />
          {(nameError.empty || nameError.used) && (
            <span className="errorText">
              {nameError.empty ? "Required" : "Used"}
            </span>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="columns">Columns</label>
          {columns.map((c) => (
            <div
              className={columns.length > 1 ? "flex" : "block"}
              key={c.id}
              style={{ position: "relative" }}
            >
              <input
                type="text"
                id="columns"
                value={c.name}
                onChange={(e) => handleColumnsChange(e, c.id)}
                className={c.empty || c.used ? "error" : ""}
                maxLength={50}
              />
              {columns.length > 1 && (
                <button
                  type="button"
                  style={{ padding: "7px" }}
                  onClick={(e) => {
                    deleteColumn(c.id);
                    e.stopPropagation();
                  }}
                  disabled={c.tasks.length > 0}
                >
                  <Close />
                </button>
              )}
              {(c.empty || c.used) && (
                <span
                  className="errorText"
                  style={columns.length > 1 ? { right: "3em" } : {}}
                >
                  {c.empty ? "Required" : "Used"}
                </span>
              )}
            </div>
          ))}
        </div>
        {columns.length < 6 && (
          <button
            type="button"
            className="column"
            onClick={(e) => {
              addNewColumn();
              e.stopPropagation();
            }}
          >
            + Add New Column
          </button>
        )}
        <button type="submit" className="submit">
          {editBoardFlag || addNewColumnFlag
            ? "Save Changes"
            : "Create New Board"}
        </button>
      </form>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.modalText};
  position: relative;
  height: auto;
  max-height: 80vh;
  width: 85vw;
  max-width: 500px;
  padding: 2.85em 1.5em;
  border-radius: var(--radius);
  overflow-x: hidden;
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
  h4 {
    color: ${({ theme }) => theme.headerText};
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
  input {
    height: 3em;
    padding: 0.5em 1em;
    border-radius: var(--radius);
    background-color: inherit;
    color: inherit;
    outline: none;
    border: 2px solid #828fa366;
    &:focus-visible {
      border-color: var(--purple);
    }
  }
  input.error {
    border-color: #ea5555;
  }
  .errorText {
    position: absolute;
    bottom: 0.5em;
    right: 1em;
    color: #ea5555;
  }
  .flex {
    display: flex;
    align-items: center;
    gap: 1%;
    input {
      flex-grow: 1;
    }
  }
  .block {
    input {
      display: block;
      width: 100%;
    }
  }
  button:disabled {
    opacity: 30%;
    cursor: not-allowed;
  }
  .column {
    background-color: #f0effa;
    padding: 0.75em 1em;
    border-radius: 20px;
    color: var(--purple);
    font-weight: 600;
    &:hover {
      opacity: 0.9;
    }
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
  input:disabled {
    opacity: 70%;
    cursor: not-allowed;
  }
`;

export default EditOrAddNewBoard;
