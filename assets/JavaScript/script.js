// Self-invoking function to encapsulate the code
(function () {
  // Display current day
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

  // Create time blocks for business hours (9 AM to 5 PM)
  for (let hour = 9; hour <= 17; hour++) {
    // Create row for each hour
    let timeBlock = $("<div>").addClass("row time-block");

    // Create hour column
    let hourCol = $("<div>")
      .addClass("col-md-1 hour")
      .text(dayjs().hour(hour).format("hA"));

    // Create textarea for user input
    let textArea = $("<textarea>").addClass("col-md-8 description");

    // Set background color based on past, present, or future
    if (hour < dayjs().hour()) {
      textArea.addClass("past");
    } else if (hour === dayjs().hour()) {
      textArea.addClass("present");
    } else {
      textArea.addClass("future");
    }

    // Retrieve saved events from local storage
    let savedEvent = localStorage.getItem(`event-${dayjs().format("YYYY-MM-DD")}-${hour}`);
    if (savedEvent) {
      textArea.val(savedEvent);
    }

    // Create save button
    let saveBtn = $("<button>")
      .addClass("col-md-1 saveBtn")
      .html('<i class="fas fa-save"></i>');

    // Create delete button
    let deleteBtn = $("<button>")
      .addClass("col-md-1 deleteBtn")
      .html('<i class="fas fa-trash-alt"></i>');

    // Save button click event
    saveBtn.click(function () {
      let eventText = textArea.val();
      localStorage.setItem(`event-${dayjs().format("YYYY-MM-DD")}-${hour}`, eventText);
      alert("Event saved");
    });

    // Delete button click event
    deleteBtn.click(function () {
      textArea.val(""); // Clear the text area
      localStorage.removeItem(`event-${dayjs().format("YYYY-MM-DD")}-${hour}`);
      alert("Event deleted");
    });

    // Append columns to time block
    timeBlock.append(hourCol, textArea, saveBtn, deleteBtn);

    // Append time block to container
    $(".container").append(timeBlock);
  }

  // Create a new row for Save All and Clear All buttons
  let buttonsRow = $("<div>").addClass("row justify-content-center");

  // Create "Save All" button
  let saveAllBtn = $("<button>")
    .addClass("col-md-1 btn btn-success saveAllBtn ml-2")
    .text("Save All");

  // Save All button click event
  saveAllBtn.click(function () {
    $(".saveBtn").click(); // Trigger click on all save buttons
    alert("All events saved");
  });

  // Create "Clear All" button
  let clearAllBtn = $("<button>")
    .addClass("col-md-1 btn btn-danger clearAllBtn ml-2")
    .text("Clear All");

  // Clear All button click event
  clearAllBtn.click(function () {
    $("textarea").val(""); // Clear all text areas
    localStorage.clear(); // Clear all events from local storage
    alert("All events cleared");
  });

  // Append Save All and Clear All buttons to the new row
  buttonsRow.append(saveAllBtn, clearAllBtn);

  // Append the new row to the container
  $(".container").append(buttonsRow);
})();
