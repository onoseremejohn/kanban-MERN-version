To run it on your local machine follow these steps
```
1. git clone https://github.com/onoseremejohn/kanban-MERN-version.git
2. setup env variables
- APP_URL  (the live url of the app where its hosted on eg https://kanban-app.onrender.com)
- EMAIL_HOST (for nodemailer)
- EMAIL_USER (for nodemailer)
- EMAIL_PASS (for nodemailer)
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
- JWT_LIFETIME (for JWT eg 5d)
- JWT_SECRET (for JWT. You can generate one from https://www.allkeysgenerator.com  256bit)
- MONGO_URI (for mongoose/mongodb driver connection eg mongodb+srv://YourProfile:YourPassword@nodeexpressproject.of3osfz.mongodb.net/KANBAN-TASK-MANAGER?retryWrites=true&w=majority)
3. npm run setup-production
4. npm run start
```


## The challenge

Your challenge is to build out this task management app and get it looking as close to the design as possible.

Your users should be able to:

- [x] View the optimal layout for the app depending on their device's screen size
- [x] See hover states for all interactive elements on the page
- [x] Create, read, update, and delete boards and tasks
- [x] Receive form validations when trying to create/edit boards and tasks
- [x] Mark subtasks as complete and move tasks between columns
- [x] Hide/show the board sidebar
- [x] Toggle the theme between light/dark modes
- [x] **Bonus**: Allow users to drag and drop tasks to change their status and re-order them in a column
- [x] **Bonus**: Allow users to drag and drop columns/statuses to change their positions and re-order them on the board
- [ ] **Bonus**: Keep track of any changes, even after refreshing the browser (`localStorage` could be used for this if you're not building out a full-stack app)
- [x] **Bonus**: Build this project as a full-stack application

### Expected Behaviour

- Boards
  - [x] Clicking different boards in the sidebar will change to the selected board.
  - [x] Clicking "Create New Board" in the sidebar opens the "Add New Board" modal.
  - [x] Clicking in the dropdown menu "Edit Board" opens up the "Edit Board" modal where details can be changed.
  - [x] Columns are added and removed for the Add/Edit Board modals.
  - [x] Deleting a board deletes all columns and tasks and requires confirmation.
- Columns
  - [x] A board needs at least one column before tasks can be added.
  - [x] Clicking "Add New Column" opens the "Edit Board" modal where columns are added.
- Tasks
  - [x] Adding a new task adds it to the bottom of the relevant column.
  - [x] Updating a task's status will move the task to the relevant column. If you're taking on the drag and drop bonus, dragging a task to a different column will also update the status.
