//@ts-nocheck
document.addEventListener("DOMContentLoaded", function () {                //making sure DOM content is loaded first
    debugger;
    const taskList = document.getElementById("taskList") as HTMLElement;   //Trtriving HTML body element with id
    const addButton = document.getElementById("addButton") as HTMLElement; //Retriving HTML button element with id

    addButton.addEventListener("click", function () {                      //Function to execute when add button is clicked
        const taskInput = (document.getElementById("taskInput") as HTMLInputElement).value;

        if (taskInput !== "") {
            // Retriving existing task names into an array
            const existingTaskNames = Array.from(taskList.querySelectorAll("td:nth-child(2)")).map(td => (td.textContent!.trim()));

            //Checking task to be added with with existing task , if true goes inside
            if (!existingTaskNames.includes(taskInput)) {

                //Creating new Row
                const newRow = document.createElement("tr");

                //Creating Rowcells
                //Checkbox cell
                const checkboxCell = document.createElement("td");
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkboxCell.appendChild(checkbox);
                newRow.appendChild(checkboxCell);
                checkbox.className = "cb";

                //Task cell
                const taskCell = document.createElement("td");
                taskCell.textContent = taskInput;
                newRow.appendChild(taskCell);
                taskCell.className = "tb";

                //Status cell
                const statusCell = document.createElement("td");
                const select = document.createElement("select");
                select.className = "selectlist";
                const options = ["To-Do", "In progress", "Completed"];

                for (const optionText of options) {
                    const option = document.createElement("option");
                    option.value = optionText.toLowerCase().replace(" ", "-");
                    option.textContent = optionText;
                    select.appendChild(option);
                }

                //Creating function to check the checkbox when user selects completed option
                select.addEventListener("change", function () {
                    if (select.value === "completed") {
                        checkbox.checked = true;
                        checkbox.disabled = true;
                        select.disabled = true;
                        taskCell.style.textDecoration = "line-through";
                        previousTaskCompleted = true;

                    } else {
                        checkbox.checked = false;
                        taskCell.style.textDecoration = "none";
                        previousTaskCompleted = false;
                    }

                });

                statusCell.appendChild(select);
                newRow.appendChild(statusCell);

                //Delete button cell
                const deleteCell = document.createElement("td");
                const deleteButton = document.createElement("button");
                deleteButton.style.border = "none";
                deleteButton.setAttribute("class", "fa-solid fa-trash");
                deleteButton.addEventListener("click", function () {
                    newRow.remove();

                });

                deleteCell.appendChild(deleteButton);
                newRow.appendChild(deleteCell);
                taskList.appendChild(newRow);

                //Clearing the input field
                (document.getElementById("taskInput") as HTMLInputElement).value = "";

            }
            else {
                window.alert("task already exists");  //If task already exists displays a toast message
            }
        }

        //Retriving HTML element with id
        const searchInput = document.getElementById("searchInput") as HTMLInputElement;

        //Function search the task
        searchInput.addEventListener("input", function () {
            const searchTerm = searchInput.value.toLowerCase();
            const taskRows = document.querySelectorAll("#taskList tr");
            taskRows.forEach(function (row) {
                const taskText = row.querySelector("td:nth-child(2)")!.textContent!.toLowerCase();
                if (taskText.indexOf(searchTerm) !== -1) {
                    (row as HTMLElement).style.display = "table-row";
                } else {
                    (row as HTMLElement).style.display = "none";
                }
            });
        });
    });
});