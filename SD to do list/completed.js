
    document.querySelectorAll(".list-group-item").forEach(task => {
        task.addEventListener("mouseover", () => {
            task.style.backgroundColor = "#d1f7c4";
            task.style.cursor = "pointer";
        });
        task.addEventListener("mouseout", () => {
            task.style.backgroundColor = "";
        });
    });

    const searchContainer = document.createElement("div");
    searchContainer.className = "input-group mb-3";


    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.className = "form-control";
    searchInput.placeholder = "Search completed tasks...";
    searchInput.id = "task-search";
    searchContainer.appendChild(searchInput);
    document.querySelector("main").prepend(searchContainer);
    searchInput.addEventListener("input", function() {
        const searchText = this.value.toLowerCase();
        document.querySelectorAll(".list-group-item").forEach(task => {
            const taskText = task.textContent.toLowerCase();
            task.style.display = taskText.includes(searchText) ? "" : "none";
        });
    });
    function updateProgress() {
        const totalTasks = document.querySelectorAll(".list-group-item").length;
        const completedTasks = totalTasks - document.querySelectorAll(".list-group-item[style*='display: none']").length;
        const progressPercentage = totalTasks ? (completedTasks / totalTasks) * 100 : 100;
        const progressBar = document.querySelector(".progress-bar");

        progressBar.style.width = `${progressPercentage}%`;
        progressBar.setAttribute("aria-valuenow", progressPercentage);
        progressBar.textContent = `${Math.round(progressPercentage)}% Completed`;
    }

    updateProgress();
    document.getElementById("task-search").addEventListener("input", updateProgress);

    function clearTasks() {
        const confirmClear = confirm("Are you sure you want to clear all tasks?");
        if (confirmClear) {
            document.getElementById("academic-tasks").innerHTML = "";
            document.getElementById("fitness-tasks").innerHTML = "";
            document.getElementById("personal-development-tasks").innerHTML = "";
            alert("All tasks have been cleared!");
        }
    }
