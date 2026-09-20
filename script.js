let tasks = [];
function addTask() {

    // Get values from HTML
    let taskName = document.getElementById("taskInput").value;
    let subject = document.getElementById("subjectInput").value;
    let priority = document.getElementById("priorityInput").value;
    let date = document.getElementById("dateInput").value;

    // Check if required fields are empty
    if (taskName === "" || subject === "") {
        alert("Please enter task and subject");
        return;
    }

    // Create task object
    let newTask = {
        name: taskName,
        subject: subject,
        priority: priority,
        date: date,
        completed: false
    };

    // Add task to array
    tasks.push(newTask);

    // Clear input fields
    document.getElementById("taskInput").value = "";
    document.getElementById("subjectInput").value = "";
    document.getElementById("dateInput").value = "";

    // Save and display
    saveTasks();
    displayTasks();
}


// ==========================================
// DISPLAY TASKS
// ==========================================

function displayTasks() {

    let taskList = document.getElementById("taskList");

    // Clear old task list
    taskList.innerHTML = "";

    // Get search and filter values
    let searchText = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    let filter = document.getElementById("filterInput").value;


    // Loop through all tasks
    tasks.forEach(function(task, index) {

        // Search filter
        if (!task.name.toLowerCase().includes(searchText)) {
            return;
        }

        // Completed filter
        if (filter === "Completed" && task.completed === false) {
            return;
        }

        // Pending filter
        if (filter === "Pending" && task.completed === true) {
            return;
        }


        // Create list item
        let li = document.createElement("li");

        li.classList.add("task");


        // Add completed class
        if (task.completed === true) {
            li.classList.add("completed");
        }


        // Add task information
        li.innerHTML = `
            <div class="task-info">

                <strong>${task.name}</strong>

                <span class="subject">
                    Subject: ${task.subject}
                </span>

                <span class="${task.priority.toLowerCase()}">
                    Priority: ${task.priority}
                </span>

                <span>
                    Date: ${task.date || "No date"}
                </span>

            </div>


            <div>

                <button onclick="completeTask(${index})">
                    ${task.completed ? "Completed" : "Done"}
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${index})">
                    Delete
                </button>

            </div>
        `;


        // Add task to list
        taskList.appendChild(li);

    });


    // Update dashboard
    updateDashboard();
}


// ==========================================
// COMPLETE TASK
// ==========================================

function completeTask(index) {

    // Change task status
    tasks[index].completed = true;

    // Save changes
    saveTasks();

    // Display updated tasks
    displayTasks();
}


// ==========================================
// DELETE TASK
// ==========================================

function deleteTask(index) {

    // Remove task from array
    tasks.splice(index, 1);

    // Save changes
    saveTasks();

    // Display updated tasks
    displayTasks();
}


// ==========================================
// UPDATE DASHBOARD
// ==========================================

function updateDashboard() {

    // Total number of tasks
    let total = tasks.length;


    // Count completed tasks
    let completed = 0;

    tasks.forEach(function(task) {

        if (task.completed === true) {
            completed++;
        }

    });


    // Calculate pending tasks
    let pending = total - completed;


    // Display numbers
    document.getElementById("totalTasks").innerText = total;

    document.getElementById("completedTasks").innerText = completed;

    document.getElementById("pendingTasks").innerText = pending;


    // Calculate percentage
    let percentage = 0;

    if (total > 0) {
        percentage = (completed / total) * 100;
    }


    // Update progress bar
    document.getElementById("progress").style.width =
        percentage + "%";


    // Update percentage text
    document.getElementById("progressText").innerText =
        Math.round(percentage) + "% completed";
}


// ==========================================
// SAVE TASKS TO LOCAL STORAGE
// ==========================================

function saveTasks() {

    localStorage.setItem(
        "studyTasks",
        JSON.stringify(tasks)
    );
}


// ==========================================
// LOAD TASKS FROM LOCAL STORAGE
// ==========================================

function loadTasks() {

    let savedTasks = localStorage.getItem("studyTasks");


    // Check if saved data exists
    if (savedTasks !== null) {

        tasks = JSON.parse(savedTasks);

    }


    // Display saved tasks
    displayTasks();
}


// ==========================================
// START APPLICATION
// ==========================================

loadTasks();