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
            {
              id: 1,
              title: "Build UI for search",
              description: "",
              status: "Todo",
              statusId: 0,
              subtasks: [
                {
                  id: 0,
                  title: "Search page",
                  isCompleted: false,
                },
              ],
            },
            {
              id: 2,
              title: "Build settings UI",
              description: "",
              status: "Todo",
              statusId: 0,
              subtasks: [
                {
                  id: 0,
                  title: "Account page",
                  isCompleted: false,
                },
                {
                  id: 1,
                  title: "Billing page",
                  isCompleted: false,
                },
              ],
            },
            {
              id: 3,
              title: "QA and test all major user journeys",
              description:
                "Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.",
              status: "Todo",
              statusId: 0,
              subtasks: [
                {
                  id: 0,
                  title: "Internal testing",
                  isCompleted: false,
                },
                {
                  id: 1,
                  title: "External testing",
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
            {
              id: 5,
              title: "Add account management endpoints",
              description: "",
              status: "Doing",
              statusId: 1,
              subtasks: [
                {
                  id: 0,
                  title: "Upgrade plan",
                  isCompleted: true,
                },
                {
                  id: 1,
                  title: "Cancel plan",
                  isCompleted: true,
                },
                {
                  id: 2,
                  title: "Update payment method",
                  isCompleted: false,
                },
              ],
            },
            {
              id: 6,
              title: "Design onboarding flow",
              description: "",
              status: "Doing",
              statusId: 1,
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
            {
              id: 7,
              title: "Add search enpoints",
              description: "",
              status: "Doing",
              statusId: 1,
              subtasks: [
                {
                  id: 0,
                  title: "Add search endpoint",
                  isCompleted: true,
                },
                {
                  id: 1,
                  title: "Define search filters",
                  isCompleted: false,
                },
              ],
            },
            {
              id: 8,
              title: "Add authentication endpoints",
              description: "",
              status: "Doing",
              statusId: 1,
              subtasks: [
                {
                  id: 0,
                  title: "Define user model",
                  isCompleted: true,
                },
                {
                  id: 1,
                  title: "Add auth endpoints",
                  isCompleted: false,
                },
              ],
            },
            {
              id: 9,
              title:
                "Research pricing points of various competitors and trial different business models",
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              status: "Doing",
              statusId: 1,
              subtasks: [
                {
                  id: 0,
                  title: "Research competitor pricing and business models",
                  isCompleted: true,
                },
                {
                  id: 1,
                  title: "Outline a business model that works for our solution",
                  isCompleted: false,
                },
                {
                  id: 2,
                  title:
                    "Talk to potential customers about our proposed solution and ask for fair price expectancy",
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
            {
              id: 13,
              title:
                "Create paper prototypes and conduct 10 usability tests with potential customers",
              description: "",
              status: "Done",
              statusId: 2,
              subtasks: [
                {
                  id: 0,
                  title: "Create paper prototypes for version one",
                  isCompleted: true,
                },
                {
                  id: 1,
                  title: "Complete 10 usability tests",
                  isCompleted: true,
                },
              ],
            },
            {
              id: 14,
              title: "Market discovery",
              description:
                "We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.",
              status: "Done",
              statusId: 2,
              subtasks: [
                {
                  id: 0,
                  title: "Interview 10 prospective customers",
                  isCompleted: true,
                },
              ],
            },
            {
              id: 15,
              title: "Competitor analysis",
              description: "",
              status: "Done",
              statusId: 2,
              subtasks: [
                {
                  id: 0,
                  title: "Find direct and indirect competitors",
                  isCompleted: true,
                },
                {
                  id: 1,
                  title: "SWOT analysis for each competitor",
                  isCompleted: true,
                },
              ],
            },
            {
              id: 16,
              title: "Research the market",
              description:
                "We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.",
              status: "Done",
              statusId: 2,
              subtasks: [
                {
                  id: 0,
                  title: "Write up research analysis",
                  isCompleted: true,
                },
                {
                  id: 1,
                  title: "Calculate TAM",
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
            {
              id: 19,
              title: "Write launch article to publish on multiple channels",
              description: "",
              status: "Todo",
              statusId: 0,
              subtasks: [
                {
                  id: 0,
                  title: "Write article",
                  isCompleted: false,
                },
                {
                  id: 1,
                  title: "Publish on LinkedIn",
                  isCompleted: false,
                },
                {
                  id: 2,
                  title: "Publish on Inndie Hackers",
                  isCompleted: false,
                },
                {
                  id: 3,
                  title: "Publish on Medium",
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
    {
      id: 2,
      name: "Roadmap",
      columns: [
        {
          name: "Now",
          id: "0",
          tasks: [
            {
              id: 20,
              title: "Launch version one",
              description: "",
              status: "Now",
              statusId: 0,
              subtasks: [
                {
                  id: 0,
                  title: "Launch privately to our waitlist",
                  isCompleted: false,
                },
                {
                  id: 1,
                  title: "Launch publicly on PH, HN, etc.",
                  isCompleted: false,
                },
              ],
            },
            {
              id: 21,
              title: "Review early feedback and plan next steps for roadmap",
              description:
                "Beyond the initial launch, we're keeping the initial roadmap completely empty. This meeting will help us plan out our next steps based on actual customer feedback.",
              status: "Now",
              statusId: 0,
              subtasks: [
                {
                  id: 0,
                  title: "Interview 10 customers",
                  isCompleted: false,
                },
                {
                  id: 1,
                  title: "Review common customer pain points and suggestions",
                  isCompleted: false,
                },
                {
                  id: 2,
                  title: "Outline next steps for our roadmap",
                  isCompleted: false,
                },
              ],
            },
          ],
        },
        {
          id: "1",
          name: "Next",
          tasks: [],
        },
        {
          id: "2",
          name: "Later",
          tasks: [],
        },
      ],
    },
  ],
};

export const defaultBoard: Main = {
  theme: "light",
  boards: board.boards.map((b) => {
    return {
      ...b,
      id: nanoid(),
      columns: b.columns.map((c, index) => {
        const columnId = nanoid();
        return {
          ...c,
          id: columnId,
          color: colors[index],
          tasks: c.tasks.map((t) => {
            return {
              ...t,
              id: nanoid(),
              statusId: columnId,
              subtasks: t.subtasks.map((s) => {
                return { ...s, id: nanoid() };
              }),
            };
          }),
        };
      }),
    };
  }),
};

interface TasksType {
  id: string;
  title: string;
  description: string;
  status: string;
  statusId: string;
  subtasks: { title: string; isCompleted: boolean; id: string }[];
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
