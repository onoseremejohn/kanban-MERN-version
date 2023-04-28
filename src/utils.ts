import { nanoid } from "nanoid";
export const colors = [
  "#49c4e5",
  "#8471f2",
  "#67e2ae",
  "#e5a449",
  "#2a3fdb",
  "#c36e6e",
];
export const board = {
  boards: [
    {
      id: 0,
      name: "Platform Launch",
      columns: [
        {
          id: "0",
          name: "Todo",
          tasks: [
            {
              id: 0,
              title: "Build UI for onboarding flow",
              description: "",
              status: "Todo",
              statusId: 0,
              subtasks: [
                {
                  id: 0,
                  title: "Sign up page",
                  isCompleted: true,
                },
                {
                  id: 1,
                  title: "Sign in page",
                  isCompleted: false,
                },
                {
                  id: 2,
                  title: "Welcome page",
                  isCompleted: false,
                },
              ],
            },
          ],
        },
        {
          id: "1",
          name: "Doing",
          tasks: [
            {
              id: 4,
              title: "Design settings and search pages",
              description: "",
              status: "Doing",
              statusId: 1,
              subtasks: [
                {
                  id: 0,
                  title: "Settings - Account page",
                  isCompleted: true,
                },
                {
                  id: 1,
                  title: "Settings - Billing page",
                  isCompleted: true,
                },
                {
                  id: 2,
                  title: "Search page",
                  isCompleted: false,
                },
              ],
            },
          ],
        },
        {
          id: "2",
          name: "Done",
          tasks: [
            {
              id: 10,
              title: "Conduct 5 wireframe tests",
              description:
                "Ensure the layout continues to make sense and we have strong buy-in from potential users.",
              status: "Done",
              statusId: 2,
              subtasks: [
                {
                  id: 0,
                  title: "Complete 5 wireframe prototype tests",
                  isCompleted: true,
                },
              ],
            },
            {
              id: 11,
              title: "Create wireframe prototype",
              description:
                "Create a greyscale clickable wireframe prototype to test our asssumptions so far.",
              status: "Done",
              statusId: 2,
              subtasks: [
                {
                  id: 0,
                  title: "Create clickable wireframe prototype in Balsamiq",
                  isCompleted: true,
                },
              ],
            },
            {
              id: 12,
              title: "Review results of usability tests and iterate",
              description:
                "Keep iterating through the subtasks until we're clear on the core concepts for the app.",
              status: "Done",
              statusId: 2,
              subtasks: [
                {
                  id: 0,
                  title:
                    "Meet to review notes from previous tests and plan changes",
                  isCompleted: true,
                },
                {
                  id: 1,
                  title: "Make changes to paper prototypes",
                  isCompleted: true,
                },
                {
                  id: 2,
                  title: "Conduct 5 usability tests",
                  isCompleted: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 1,
      name: "Marketing Plan",
      columns: [
        {
          id: "0",
          name: "Todo",
          tasks: [
            {
              id: 17,
              title: "Plan Product Hunt launch",
              description: "11",
              status: "Todo",
              statusId: 0,
              subtasks: [
                {
                  id: 0,
                  title: "Find hunter",
                  isCompleted: false,
                },
                {
                  id: 1,
                  title: "Gather assets",
                  isCompleted: false,
                },
                {
                  id: 2,
                  title: "Draft product page",
                  isCompleted: false,
                },
                {
                  id: 3,
                  title: "Notify customers",
                  isCompleted: false,
                },
                {
                  id: 4,
                  title: "Notify network",
                  isCompleted: false,
                },
                {
                  id: 5,
                  title: "Launch!",
                  isCompleted: false,
                },
              ],
            },
            {
              id: 18,
              title: "Share on Show HN",
              description: "",
              status: "Todo",
              statusId: 0,
              subtasks: [
                {
                  id: 0,
                  title: "Draft out HN post",
                  isCompleted: false,
                },
                {
                  id: 1,
                  title: "Get feedback and refine",
                  isCompleted: false,
                },
                {
                  id: 2,
                  title: "Publish post",
                  isCompleted: false,
                },
              ],
            },
          ],
        },
        {
          id: "1",
          name: "Doing",
          tasks: [],
        },
      ],
    },
  ],
};

export const defaultBoard: Main = {
  theme: "light",
  boards: []
};

export interface TasksType {
  id: string;
  title: string;
  description: string;
  status: string;
  statusId: string;
  subtasks: { title: string; isCompleted: boolean; id: string }[];
  assignedTo?: { id: string; name: string; email: string }[];
}

interface ColumnType {
  id: string;
  name: string;
  color: string;
  tasks: TasksType[];
}

interface BoardType {
  id: string;
  name: string;
  columns: ColumnType[];
}

export interface Main {
  theme: "light" | "dark";
  boards: BoardType[];
}
