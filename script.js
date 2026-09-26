/* =========================================
   STUDYFLOW - JAVASCRIPT
========================================= */


/* =========================================
   DATA
========================================= */

let tasks =
    JSON.parse(
        localStorage.getItem("studyFlowTasks")
    ) || [];


let goals =
    JSON.parse(
        localStorage.getItem("studyFlowGoals")
    ) || [];


let completedTopics =
    JSON.parse(
        localStorage.getItem("studyFlowTopics")
    ) || {};


let streak =
    Number(
        localStorage.getItem("studyFlowStreak")
    ) || 0;


/* =========================================
   SUBJECT DATA
========================================= */

const subjects = [

    {
        name: "Python Programming",
        icon: "🐍",
        topics: [
            "Python Basics",
            "Variables & Data Types",
            "Operators",
            "Control Flow",
            "Loops",
            "Functions"
        ]
    },

    {
        name: "Java Programming",
        icon: "☕",
        topics: [
            "Java Basics",
            "Classes & Objects",
            "Constructors",
            "Inheritance",
            "Polymorphism",
            "Packages"
        ]
    },

    {
        name: "Data Structures",
        icon: "🌳",
        topics: [
            "Arrays",
            "Linked Lists",
            "Stacks",
            "Queues",
            "Trees",
            "Graphs"
        ]
    },

    {
        name: "DBMS",
        icon: "🗄️",
        topics: [
            "DBMS Basics",
            "ER Model",
            "SQL",
            "Normalization",
            "Transactions",
            "Indexing"
        ]
    },

    {
        name: "Operating System",
        icon: "💻",
        topics: [
            "Processes",
            "CPU Scheduling",
            "Deadlocks",
            "Memory Management",
            "File System",
            "Security"
        ]
    },

    {
        name: "Computer Networks",
        icon: "🌐",
        topics: [
            "OSI Model",
            "TCP/IP",
            "IP Addressing",
            "Routing",
            "Transport Layer",
            "Network Security"
        ]
    },

    {
        name: "Theory of Computation",
        icon: "⚙️",
        topics: [
            "DFA",
            "NFA",
            "Regular Expressions",
            "CFG",
            "PDA",
            "Pumping Lemma"
        ]
    },

    {
        name: "Full Stack Development",
        icon: "🖥️",
        topics: [
            "HTML",
            "CSS",
            "JavaScript",
            "DOM",
            "APIs",
            "Backend"
        ]
    }

];


/* =========================================
   DOM LOADED
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* Get Started */

        const getStarted =
            document.getElementById(
                "getStartedBtn"
            );


        if (getStarted) {

            getStarted.addEventListener(
                "click",
                openPlanner
            );

        }


        /* Keep app hidden */

        const app =
            document.getElementById(
                "app"
            );


        if (app) {

            app.classList.add(
                "hidden"
            );

        }


        /* Date */

        updateDate();


        /* Streak */

        updateStreak();


        /* Render */

        renderTasks();

        renderSubjects();

        renderGoals();

        updateDashboard();

        renderAnalytics();

        updateAchievements();


        /* Timer */

        updateTimerDisplay();


        /* Task search */

        const search =
            document.getElementById(
                "taskSearch"
            );


        if (search) {

            search.addEventListener(
                "input",
                renderTasks
            );

        }


        /* Task filter */

        const filter =
            document.getElementById(
                "taskFilter"
            );


        if (filter) {

            filter.addEventListener(
                "change",
                renderTasks
            );

        }


        /* Task form */

        const taskForm =
            document.getElementById(
                "taskForm"
            );


        if (taskForm) {

            taskForm.addEventListener(
                "submit",
                addTask
            );

        }


        /* Goal form */

        const goalForm =
            document.getElementById(
                "goalForm"
            );


        if (goalForm) {

            goalForm.addEventListener(
                "submit",
                addGoal
            );

        }

    }
);


/* =========================================
   OPEN PLANNER
========================================= */

function openPlanner() {

    const welcome =
        document.getElementById(
            "welcomePage"
        );


    const app =
        document.getElementById(
            "app"
        );


    if (welcome) {

        welcome.classList.add(
            "hidden"
        );

    }


    if (app) {

        app.classList.remove(
            "hidden"
        );

    }


    showSection("dashboard");

    updateDashboard();

}


/* =========================================
   NAVIGATION
========================================= */

function showSection(
    sectionId,
    button = null
) {

    document
        .querySelectorAll(
            ".content-section"
        )
        .forEach(section => {

            section.classList.remove(
                "active-section"
            );

        });


    const section =
        document.getElementById(
            sectionId
        );


    if (section) {

        section.classList.add(
            "active-section"
        );

    }


    document
        .querySelectorAll(
            ".nav-btn"
        )
        .forEach(btn => {

            btn.classList.remove(
                "active"
            );

        });


    if (button) {

        button.classList.add(
            "active"
        );

    } else {

        const nav =
            document.querySelector(
                `.nav-btn[data-section="${sectionId}"]`
            );


        if (nav) {

            nav.classList.add(
                "active"
            );

        }

    }


    const titles = {

        dashboard: "Dashboard",
        tasks: "My Tasks",
        subjects: "My Subjects",
        goals: "Study Goals",
        pomodoro: "Pomodoro",
        analytics: "Study Analytics",
        achievements: "Achievements"

    };


    const pageTitle =
        document.getElementById(
            "pageTitle"
        );


    if (pageTitle) {

        pageTitle.textContent =
            titles[sectionId] ||
            "StudyFlow";

    }

}


/* =========================================
   DATE
========================================= */

function updateDate() {

    const element =
        document.getElementById(
            "todayDate"
        );


    if (!element) return;


    const today =
        new Date();


    element.textContent =
        today.toLocaleDateString(
            "en-IN",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

}


/* =========================================
   DASHBOARD
========================================= */

function updateDashboard() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    const pending =
        total - completed;


    const progress =
        total === 0
            ? 0
            : Math.round(
                completed /
                total *
                100
            );


    setText(
        "totalTasks",
        total
    );


    setText(
        "completedTasks",
        completed
    );


    setText(
        "pendingTasks",
        pending
    );


    setText(
        "taskProgress",
        progress + "%"
    );


    setText(
        "overallProgress",
        progress + "%"
    );


    const bar =
        document.getElementById(
            "taskProgressBar"
        );


    if (bar) {

        bar.style.width =
            progress + "%";

    }


    const circle =
        document.querySelector(
            ".circle-progress"
        );


    if (circle) {

        circle.style.background =
            `conic-gradient(
                var(--primary)
                ${progress * 3.6}deg,
                var(--primary-light)
                ${progress * 3.6}deg
            )`;

    }


    const message =
        document.getElementById(
            "progressMessage"
        );


    if (message) {

        if (total === 0) {

            message.textContent =
                "Add your first task to start.";

        } else if (progress === 100) {

            message.textContent =
                "Amazing! All tasks completed 🎉";

        } else {

            message.textContent =
                `${completed} of ${total} tasks completed.`;

        }

    }


    renderDashboardTasks();

}


/* =========================================
   DASHBOARD TASKS
========================================= */

function renderDashboardTasks() {

    const container =
        document.getElementById(
            "dashboardTasks"
        );


    if (!container) return;


    if (tasks.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                <p>📝 No tasks yet.</p>
                <small>
                    Add your first study task.
                </small>
            </div>
        `;

        return;

    }


    container.innerHTML =
        tasks
            .slice(0, 5)
            .map(
                task =>
                    taskHTML(task)
            )
            .join("");

}


/* =========================================
   ADD TASK
========================================= */

function addTask(event) {

    event.preventDefault();


    const name =
        document
            .getElementById(
                "taskName"
            )
            .value
            .trim();


    const subject =
        document
            .getElementById(
                "taskSubject"
            )
            .value
            .trim();


    const date =
        document
            .getElementById(
                "taskDate"
            )
            .value;


    const priority =
        document
            .getElementById(
                "taskPriority"
            )
            .value;


    if (!name) return;


    tasks.unshift({

        id: Date.now(),

        name,

        subject:
            subject ||
            "General Study",

        date,

        priority,

        completed: false

    });


    saveTasks();


    document
        .getElementById(
            "taskForm"
        )
        .reset();


    closeTaskModal();


    renderTasks();

    updateDashboard();

    renderAnalytics();

    updateAchievements();


    notify(
        "Task added successfully ✓"
    );

}


/* =========================================
   TASK HTML
========================================= */

function taskHTML(task) {

    return `

        <div class="
            task-card
            ${task.completed ? "completed-task" : ""}
        ">

            <div class="task-check">

                <button
                    class="check-btn"
                    onclick="toggleTask(${task.id})"
                >
                    ${task.completed ? "✓" : ""}
                </button>

            </div>


            <div class="task-info">

                <h3>
                    ${escapeHTML(task.name)}
                </h3>

                <p>
                    📚 ${escapeHTML(task.subject)}
                </p>

                ${
                    task.date
                        ? `<small>📅 ${task.date}</small>`
                        : ""
                }

            </div>


            <div class="task-actions">

                <span class="
                    priority
                    ${String(task.priority).toLowerCase()}
                ">
                    ${task.priority}
                </span>


                <button
                    class="delete-btn"
                    onclick="deleteTask(${task.id})"
                >
                    🗑️
                </button>

            </div>

        </div>

    `;

}


/* =========================================
   RENDER ALL TASKS
========================================= */

function renderTasks() {

    const container =
        document.getElementById(
            "allTasks"
        );


    if (!container) return;


    const search =
        (
            document
                .getElementById(
                    "taskSearch"
                )
                ?.value || ""
        )
        .toLowerCase();


    const filter =
        document
            .getElementById(
                "taskFilter"
            )
            ?.value ||
        "all";


    const filtered =
        tasks.filter(task => {

            const searchMatch =
                task.name
                    .toLowerCase()
                    .includes(search);


            const filterMatch =

                filter === "all" ||

                (
                    filter === "pending" &&
                    !task.completed
                ) ||

                (
                    filter === "completed" &&
                    task.completed
                );


            return (
                searchMatch &&
                filterMatch
            );

        });


    if (filtered.length === 0) {

        container.innerHTML = `
            <div class="panel">
                <div class="empty-state">
                    <p>📚 No tasks found.</p>
                    <small>
                        Add a new study task.
                    </small>
                </div>
            </div>
        `;

        return;

    }


    container.innerHTML =
        filtered
            .map(
                task =>
                    taskHTML(task)
            )
            .join("");

}


/* =========================================
   TOGGLE TASK
========================================= */

function toggleTask(id) {

    const task =
        tasks.find(
            item => item.id === id
        );


    if (!task) return;


    task.completed =
        !task.completed;


    saveTasks();


    renderTasks();

    updateDashboard();

    renderAnalytics();

    updateAchievements();


    if (task.completed) {

        increaseStreak();

        notify(
            "Task completed! 🎉"
        );

    }

}


/* =========================================
   DELETE TASK
========================================= */

function deleteTask(id) {

    tasks =
        tasks.filter(
            task =>
                task.id !== id
        );


    saveTasks();


    renderTasks();

    updateDashboard();

    renderAnalytics();

    updateAchievements();


    notify(
        "Task deleted."
    );

}


/* =========================================
   TASK MODAL
========================================= */

function openTaskModal() {

    document
        .getElementById(
            "taskModal"
        )
        .classList.remove(
            "hidden"
        );

}


function closeTaskModal() {

    document
        .getElementById(
            "taskModal"
        )
        .classList.add(
            "hidden"
        );

}


/* =========================================
   GOALS
========================================= */

function openGoalModal() {

    document
        .getElementById(
            "goalModal"
        )
        .classList.remove(
            "hidden"
        );

}


function closeGoalModal() {

    document
        .getElementById(
            "goalModal"
        )
        .classList.add(
            "hidden"
        );

}


function addGoal(event) {

    event.preventDefault();


    const name =
        document
            .getElementById(
                "goalName"
            )
            .value
            .trim();


    const date =
        document
            .getElementById(
                "goalDate"
            )
            .value;


    if (!name) return;


    goals.unshift({

        id: Date.now(),

        name,

        date,

        completed: false

    });


    saveGoals();


    document
        .getElementById(
            "goalForm"
        )
        .reset();


    closeGoalModal();


    renderGoals();

    updateAchievements();


    notify(
        "Study goal created 🎯"
    );

}


/* =========================================
   RENDER GOALS
========================================= */

function renderGoals() {

    const container =
        document.getElementById(
            "goalList"
        );


    if (!container) return;


    if (goals.length === 0) {

        container.innerHTML = `
            <div class="panel">
                <div class="empty-state">
                    <p>🎯 No goals yet.</p>
                    <small>
                        Create your first study goal.
                    </small>
                </div>
            </div>
        `;

        return;

    }


    container.innerHTML =
        goals
            .map(
                goal => `

                <div class="goal-card">

                    <button
                        class="delete-goal"
                        onclick="deleteGoal(${goal.id})"
                    >
                        ×
                    </button>

                    <div class="goal-icon">
                        🎯
                    </div>

                    <h3>
                        ${escapeHTML(goal.name)}
                    </h3>

                    <p>
                        ${
                            goal.date
                                ? "Target: " +
                                  goal.date
                                : "No target date"
                        }
                    </p>

                </div>

            `
            )
            .join("");

}


/* =========================================
   DELETE GOAL
========================================= */

function deleteGoal(id) {

    goals =
        goals.filter(
            goal =>
                goal.id !== id
        );


    saveGoals();


    renderGoals();

    updateAchievements();

}


/* =========================================
   SUBJECTS
========================================= */

function renderSubjects() {

    const container =
        document.getElementById(
            "subjectGrid"
        );


    if (!container) return;


    container.innerHTML =
        subjects
            .map(
                (subject, subjectIndex) => {

                    const completed =
                        subject.topics.filter(
                            (_, topicIndex) =>
                                completedTopics[
                                    `${subjectIndex}-${topicIndex}`
                                ]
                        ).length;


                    const progress =
                        Math.round(
                            completed /
                            subject.topics.length *
                            100
                        );


                    return `

                        <div class="subject-card">

                            <div class="subject-icon">
                                ${subject.icon}
                            </div>

                            <h3>
                                ${subject.name}
                            </h3>

                            <p>
                                ${completed}/${subject.topics.length}
                                topics completed
                            </p>


                            <div class="subject-progress">

                                <div class="progress-bar">

                                    <div
                                        class="progress-fill"
                                        style="
                                            width:${progress}%
                                        "
                                    ></div>

                                </div>

                                <strong>
                                    ${progress}%
                                </strong>

                            </div>


                            <div>

                                ${
                                    subject.topics
                                        .map(
                                            (topic, topicIndex) => {

                                                const key =
                                                    `${subjectIndex}-${topicIndex}`;

                                                return `

                                                    <label
                                                        class="topic-item"
                                                    >

                                                        <input
                                                            type="checkbox"
                                                            ${
                                                                completedTopics[key]
                                                                    ? "checked"
                                                                    : ""
                                                            }
                                                            onchange="
                                                                toggleTopic(
                                                                    '${key}'
                                                                )
                                                            "
                                                        >

                                                        ${topic}

                                                    </label>

                                                `;

                                            }
                                        )
                                        .join("")
                                }

                            </div>

                        </div>

                    `;

                }
            )
            .join("");

}


/* =========================================
   TOPICS
========================================= */

function toggleTopic(key) {

    if (completedTopics[key]) {

        delete completedTopics[key];

    } else {

        completedTopics[key] = true;

    }


    localStorage.setItem(
        "studyFlowTopics",
        JSON.stringify(
            completedTopics
        )
    );


    renderSubjects();

    renderAnalytics();

    updateAchievements();

}


/* =========================================
   ANALYTICS
========================================= */

function renderAnalytics() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            task =>
                task.completed
        ).length;


    const pending =
        total - completed;


    const rate =
        total === 0
            ? 0
            : Math.round(
                completed /
                total *
                100
            );


    setText(
        "analyticsTotal",
        total
    );


    setText(
        "analyticsCompleted",
        completed
    );


    setText(
        "analyticsPending",
        pending
    );


    setText(
        "analyticsRate",
        rate + "%"
    );


    setText(
        "analyticsProgress",
        rate + "%"
    );


    const bar =
        document.getElementById(
            "analyticsProgressBar"
        );


    if (bar) {

        bar.style.width =
            rate + "%";

    }


    setText(
        "analyticsMessage",
        total === 0
            ? "Start completing tasks to see your progress."
            : `You completed ${completed} of ${total} tasks.`
    );

}


/* =========================================
   ACHIEVEMENTS
========================================= */

function updateAchievements() {

    const container =
        document.getElementById(
            "achievementGrid"
        );


    if (!container) return;


    const completed =
        tasks.filter(
            task =>
                task.completed
        ).length;


    const topics =
        Object.keys(
            completedTopics
        ).length;


    const list = [

        [
            "🌱",
            "First Step",
            "Complete your first task.",
            completed >= 1
        ],

        [
            "🔥",
            "Getting Started",
            "Complete 5 tasks.",
            completed >= 5
        ],

        [
            "📚",
            "Knowledge Builder",
            "Complete 5 topics.",
            topics >= 5
        ],

        [
            "🎯",
            "Goal Setter",
            "Create your first goal.",
            goals.length >= 1
        ],

        [
            "🚀",
            "Focused Learner",
            "Complete 10 tasks.",
            completed >= 10
        ],

        [
            "🏆",
            "Study Champion",
            "Complete 20 tasks.",
            completed >= 20
        ]

    ];


    container.innerHTML =
        list
            .map(
                item => `

                    <div class="
                        achievement-card
                        ${item[3] ? "unlocked" : ""}
                    ">

                        <div class="achievement-icon">
                            ${item[0]}
                        </div>

                        <h3>
                            ${item[1]}
                        </h3>

                        <p>
                            ${item[2]}
                        </p>

                        <small>
                            ${
                                item[3]
                                    ? "✓ Unlocked"
                                    : "🔒 Locked"
                            }
                        </small>

                    </div>

                `
            )
            .join("");

}


/* =========================================
   POMODORO
========================================= */

let timerSeconds =
    25 * 60;


let timerInterval =
    null;


function updateTimerDisplay() {

    const minutes =
        Math.floor(
            timerSeconds / 60
        );


    const seconds =
        timerSeconds % 60;


    setText(
        "timerDisplay",
        String(minutes)
            .padStart(2, "0")
        +
        ":"
        +
        String(seconds)
            .padStart(2, "0")
    );

}


function setTimer(
    minutes,
    button
) {

    clearInterval(
        timerInterval
    );


    timerInterval = null;


    timerSeconds =
        minutes * 60;


    updateTimerDisplay();


    document
        .querySelectorAll(
            ".timer-option"
        )
        .forEach(
            btn =>
                btn.classList.remove(
                    "active"
                )
        );


    if (button) {

        button.classList.add(
            "active"
        );

    }

}


function startTimer() {

    if (timerInterval) return;


    timerInterval =
        setInterval(
            () => {

                if (
                    timerSeconds <= 0
                ) {

                    clearInterval(
                        timerInterval
                    );

                    timerInterval = null;

                    notify(
                        "Focus session complete! 🎉"
                    );

                    return;

                }


                timerSeconds--;

                updateTimerDisplay();

            },
            1000
        );

}


function pauseTimer() {

    clearInterval(
        timerInterval
    );

    timerInterval = null;

}


function resetTimer() {

    clearInterval(
        timerInterval
    );

    timerInterval = null;


    timerSeconds =
        25 * 60;


    updateTimerDisplay();

}


/* =========================================
   STREAK
========================================= */

function updateStreak() {

    setText(
        "streakCount",
        streak
    );

}


function increaseStreak() {

    streak++;

    localStorage.setItem(
        "studyFlowStreak",
        streak
    );


    updateStreak();

}


/* =========================================
   DARK MODE
========================================= */

function toggleTheme() {

    document.body.classList.toggle(
        "dark"
    );


    const dark =
        document.body.classList.contains(
            "dark"
        );


    localStorage.setItem(
        "studyFlowDark",
        dark
    );

}


/* =========================================
   LOAD THEME
========================================= */

if (
    localStorage.getItem(
        "studyFlowDark"
    ) === "true"
) {

    document.body.classList.add(
        "dark"
    );

}


/* =========================================
   STORAGE
========================================= */

function saveTasks() {

    localStorage.setItem(
        "studyFlowTasks",
        JSON.stringify(tasks)
    );

}


function saveGoals() {

    localStorage.setItem(
        "studyFlowGoals",
        JSON.stringify(goals)
    );

}


/* =========================================
   NOTIFICATION
========================================= */

function notify(message) {

    const notification =
        document.createElement(
            "div"
        );


    notification.className =
        "study-notification";


    notification.textContent =
        message;


    document.body.appendChild(
        notification
    );


    setTimeout(
        () => {

            notification.remove();

        },
        2500
    );

}


/* =========================================
   UTILITY
========================================= */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.textContent =
            value;

    }

}


function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}