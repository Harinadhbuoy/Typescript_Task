//@ts-nocheck
document.addEventListener("DOMContentLoaded", function () {
    debugger;
    var previousTaskCompleted = true;
    var taskList = document.getElementById("taskList");
    var addButton = document.getElementById("addButton");
    addButton.addEventListener("click", function () {
        var taskInput = document.getElementById("taskInput").value;
        if (taskInput !== "" && previousTaskCompleted) {
            var existingTaskNames = Array.from(taskList.querySelectorAll("td:nth-child(2)")).map(function (td) { return (td.textContent.trim()); });
            if (!existingTaskNames.includes(taskInput)) {
                var newRow_1 = document.createElement("tr");
                var checkboxCell = document.createElement("td");
                var checkbox_1 = document.createElement("input");
                checkbox_1.type = "checkbox";
                checkboxCell.appendChild(checkbox_1);
                newRow_1.appendChild(checkboxCell);
                checkbox_1.className = "cb";
                var taskCell_1 = document.createElement("td");
                taskCell_1.textContent = taskInput;
                newRow_1.appendChild(taskCell_1);
                taskCell_1.className = "tb";
                var statusCell = document.createElement("td");
                var select_1 = document.createElement("select");
                select_1.className = "selectlist";
                var options = ["To-Do", "In progress", "Completed"];
                for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
                    var optionText = options_1[_i];
                    var option = document.createElement("option");
                    option.value = optionText.toLowerCase().replace(" ", "-");
                    option.textContent = optionText;
                    select_1.appendChild(option);
                }
                select_1.addEventListener("change", function () {
                    if (select_1.value === "completed") {
                        checkbox_1.checked = true;
                        checkbox_1.disabled = true;
                        select_1.disabled = true;
                        taskCell_1.style.textDecoration = "line-through";
                        previousTaskCompleted = true;
                    }
                    else {
                        checkbox_1.checked = false;
                        taskCell_1.style.textDecoration = "none";
                        previousTaskCompleted = false;
                    }
                });
                statusCell.appendChild(select_1);
                newRow_1.appendChild(statusCell);
                var deleteCell = document.createElement("td");
                var deleteButton = document.createElement("button");
                deleteButton.style.border = "none";
                deleteButton.setAttribute("class", "fa-solid fa-trash");
                deleteButton.addEventListener("click", function () {
                    newRow_1.remove();
                });
                deleteCell.appendChild(deleteButton);
                newRow_1.appendChild(deleteCell);
                taskList.appendChild(newRow_1);
                document.getElementById("taskInput").value = "";
            }
            else {
                window.alert("task already exists");
            }
        }
        var searchInput = document.getElementById("searchInput");
        searchInput.addEventListener("input", function () {
            var searchTerm = searchInput.value.toLowerCase();
            var taskRows = document.querySelectorAll("#taskList tr");
            taskRows.forEach(function (row) {
                var taskText = row.querySelector("td:nth-child(2)").textContent.toLowerCase();
                if (taskText.indexOf(searchTerm) !== -1) {
                    row.style.display = "table-row";
                }
                else {
                    row.style.display = "none";
                }
            });
        });
    });
});
