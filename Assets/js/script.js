$(function () { 
  // listener for click events on the save button.
  $(".saveBtn").on("click", function (){

    // time-block-id acquirement
    var timeBlockId = $(this).parent().attr("id");

    // assign a var to the user input
    var userInput = $(this).siblings(".description").val().trim();

    // save the user input using the time block id as key
    localStorage.setItem(timeBlockId, userInput);
  });

  // function to assign past, current , or future classes
  function timeClassAssignment(){

    // current hour in 12hour format
    var currentHour = dayjs().format("h A");
    // look at each time-block
    $(".time-block").each(function () {
    // assign time-block a number
    var blockHour = parseInt($(this).attr("id").split("-")[1]);
    // AM or PM for the block
    var blockPmAm = $(this).attr("id").split("-")[2];

    // remove class
    $(this).removeClass("past present future");

    // add correct class
    if (
      (blockPmAm === "AM" && currentHour.endsWith("PM")) ||
      (blockPmAm === "PM" && currentHour.endsWith("AM")) ||
      (blockPmAm === "PM" && blockHour < parseInt(currentHour))
    ) {
      $(this).addClass("past");
    } else if (
      (blockPmAm === "AM" && currentHour.endsWith("PM")) ||
      (blockPmAm === "PM" && currentHour.endsWith("PM") && blockHour > parseInt(currentHour))
    ) {
      $(this).addClass("future");
    } else if (blockHour === parseInt(currentHour) && blockPmAm === currentHour.split(" ")[1]) {
      $(this).addClass("present");
    }
  });
}
    
      function loadUserInput() {
        $(".time-block").each(function () {
          var timeBlockId = $(this).attr("id");
          var userInput = localStorage.getItem(timeBlockId);
    
          if (userInput) {
            $(this).find(".description").val(userInput);
          }
        });
      }
    
      // display the current date in the header
      $("#currentDay").text(dayjs().format("dddd, MMMM D"));
    
      // call the functions to initialize the page
      timeClassAssignment();
      loadUserInput();

    });
  


