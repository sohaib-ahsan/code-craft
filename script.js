function dragStartHandler(ev) {
  // Set data to be dragged and specify effect allowed
  ev.dataTransfer.setData("application/my-app", ev.target.id);
  ev.dataTransfer.effectAllowed = "move";
}

function dragOverHandler(ev) {
  // Prevent default behavior of dragover event
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move"; // Specify drop effect
}

function dropHandler(ev) {
  // Prevent default behavior of drop event
  ev.preventDefault();
  // Reset drop area text and styles
  if (dropArea[0].innerText == "Drop Here") {
    dropArea[0].innerText = null;
    dropArea[0].style.padding = "10px";
    dropArea[0].style.color = "#1f1f1f";
  }
  // Get dragged data and render element with target div
  const data = ev.dataTransfer.getData("application/my-app");
  renderElement(data, findextendableDiv(ev.target));
}

// Add event listeners and make elements draggable
classList = document.getElementsByClassName("dropElements");
for (i = 0; i < classList.length; i++) {
  classList[i].addEventListener("dragstart", dragStartHandler);
  classList[i].setAttribute("draggable", true);
}

// Find extendable div for dropped element
function findextendableDiv(node) {
  if (node.classList.contains("extendableDiv")) return node;
  else return findextendableDiv(node.parentNode);
}

// Add event listeners for dragover and drop on drop area
dropArea = document.getElementsByClassName("dropper");
dropArea[0].addEventListener("dragover", dragOverHandler);
dropArea[0].addEventListener("drop", dropHandler);

// Get reference to element with class "actualCode"
let phpCode = document.querySelector(".actualCode");

// Render condition for extendableDiv child elements
function renderCondition(el) {
  console.log(el);
  console.log(el.parentElement.querySelectorAll(".extendableDiv")[1].children);
  if (
    el.parentElement.querySelectorAll(".extendableDiv")[1].children.length != 0
  ) {
    extendableDivChilds =
      el.parentElement.querySelectorAll(".extendableDiv")[1].children;
    for (const node of extendableDivChilds) {
      renderCode(node);
    }
  }
  phpCode.textContent += `}\n`;
}

// Function to render extendable div element
function renderextendableDiv(el) {
  // Check if the extendable div has any children
  if (el.parentElement.querySelector(".extendableDiv").children.length != 0) {
    // Loop through the children and call renderCode() on each node
    extendableDivChilds =
      el.parentElement.querySelector(".extendableDiv").children;

    for (const node of extendableDivChilds) {
      renderCode(node);
    }
  }
  // Append closing PHP curly brace
  phpCode.textContent += `}\n`;
}

// Function to generate PHP code based on element type
function getCode(el, name) {
  if (name == "newVarElem") {
    // Get variable name and value from input fields
    const varName = el.querySelector("#varName").value;
    const value = el.querySelector("#varValue").value;
    // Generate PHP code for variable declaration and assignment
    phpCode.textContent +=
      `${value ? "$" + varName + " = " + value : "$" + varName}` + " ;\n";
  } else if (name == "newarithElem") {
    // Get arithmetic operation symbol from input field
    const symbol = el.querySelector("#opSymbol").value;
    // Append arithmetic symbol to PHP code
    phpCode.textContent += `${symbol}`;
  } else if (name == "newconditionalsElem") {
    // Get condition from input field
    const condition = el.querySelector("#condition").value;
    // Generate PHP code for conditional statement (if-else)
    phpCode.textContent += `if (${condition}) {\n`;
    // Call renderextendableDiv() for nested extendable div
    renderextendableDiv(el);
    // Append else block to PHP code
    phpCode.textContent += `else {\n`;
    // Call renderCondition() for rendering nested conditionals
    renderCondition(el);
  } else if (name == "newloopElem") {
    // Get loop parameters from input fields
    const varName = el.querySelector("#varName").value;
    const varValue = el.querySelector("#varValue").value;
    const testCondition = el.querySelector("#testCondition").value;
    const incDec = el.querySelector("#incDec").value;
    // Generate PHP code for for loop
    phpCode.textContent += `for ($${varName} = ${varValue}; $${varName} ${testCondition}; $${varName} = $${varName}${incDec}) {\n`;
    // Call renderextendableDiv() for nested extendable div
    renderextendableDiv(el);
  } else if (name == "newFuncElem") {
    // Get function name and parameters from input fields
    const funcName = el.querySelector("#funcName").value;
    const parameters = el.querySelector("#parValue").value;
    // Generate PHP code for function declaration
    phpCode.textContent += `$function ${funcName}(${parameters}) {\n`;
    // Call renderextendableDiv() for nested extendable div
    renderextendableDiv(el);
  } else if (name == "newreadFileElem") {
    // Get file path from input field
    const filePath = el.querySelector("#path").value;
    // Generate PHP code for reading file
    phpCode.textContent += `
    $file_handle = fopen("${filePath}", 'r');
    $content = fread($file_handle, filesize("${filePath}"));
    fclose($file_handle);\n`;
  } else if (name == "newwriteFileElem") {
    // Get file path and content from input fields
    const filePath = el.querySelector("#path").value;
    const content = el.querySelector("#content").value;
    phpCode.textContent += `
    $content = "${content}";
    $file_handle = fopen("${filePath}", 'w');
    fwrite($"${filePath}", $content);
    fclose($file_handle);\n`;
  } else if (name == "newoutputElem") {
    // Get content from input fields
    const content = el.querySelector("#content").value;
    phpCode.textContent += `echo "${content}";\n`;
  }
}

// Function to render code based on the type of element in the drag area
function renderCode(dragArea) {
  const newEl = dragArea.children; // Get the children elements of the drag area
  for (const el of newEl) {
    // Loop through each child element
    getCode(el, el.className.split(" ")[1]); // Call getCode() function with the child element and its class name as arguments
  }
}

// Function to render elements based on their id and update their innerHTML
function renderElement(id, el) {
  switch (id) {
    case "variable": {
      // Render a new variable element with labels and input fields for varName and varValue
      el.innerHTML += `
          <div>
            <div class='newElem newVarElem'>
              <label for="varName">Var Name:</label>
              <input size="12" type="text" id="varName" name="varName">  
              <label for="varValue" style='margin-left: 10px;'>Value:</label>
              <input style='width:20%;' type="number" id="varValue" name="varValue">  
            </div>
          </div>
        `;
      break;
    }

    case "arithmetic": {
      // Render a new arithmetic element with labels and an input field for opSymbol
      el.innerHTML += `
          <div>
            <div class='newElem newarithElem'>
              <label for="opSymbol">Symbol :</label>
              <input size="12" type="text" id="opSymbol" name="opSymbol">
            </div>
          </div>
        `;
      break;
    }

    case "conditionals": {
      // Render a new conditionals element with labels, input field for condition, and extendable divs for "if" and "else"
      el.innerHTML += `
          <div>
            <div class='newElem newconditionalsElem '>
              <label for="condition">if (Condition):</label>
              <input size="16" type="text" id="condition" name="condition">  
              <div class='extendableDiv dropExtend'></div>
              <label for="else">else</label> 
              <div class='extendableDiv dropExtend'></div>
            </div>
          </div>
        `;
      break;
    }

    case "loop": {
      // Render a new loop element with labels and input fields for varName, varValue, testCondition, and incDec, along with an extendable div
      el.innerHTML += `
          <div>
            <div class='newElem newloopElem '>
              <label for="varName">Var Name:</label>
              <input size="12" type="text" id="varName" name="varName">  
              <label for="varValue" style='margin-left: 10px;'>Value:</label>
              <input style='width:20%;' type="number" id="varValue" name="varValue"><br><br>
              <label for="testCondition">Condition:</label>
              <input style='width:30%;' type="text" id="testCondition" name="testCondition">
              <label for="incDec" style='margin-left: 10px;'>Inc/Dec:</label>
              <input style='width:20%;' type="number" id="incDec" name="incDec">  
              <div class='extendableDiv dropExtend'></div>
            </div>
          </div>
        `;
      break;
    }

    // Switch case for different values of 'type'
    case "function": {
      // Append HTML to 'el' element
      el.innerHTML += `
        <div>
          <div class='newElem newFuncElem'>
            <label for="funcName">Function Name:</label>
            <input size="12" type="text" id="funcName" name="funcName"><br>  
            <label for="parValue">Parameters (comma separated):</label>
            <input style='width:80%;' type="text" id="parValue" name="parValue">  
            <div class='extendableDiv dropExtend'></div>
          </div>
        </div>
      `;
      break;
    }

    case "readFile": {
      // Append HTML to 'el' element
      el.innerHTML += `
        <div>
          <div class='newElem newreadFileElem'>
            <label for="path">File Path:</label>
            <input size="16" type="text" id="path" name="path"><br>  
          </div>
        </div>
      `;
      break;
    }

    case "writeFile": {
      // Append HTML to 'el' element
      el.innerHTML += `
        <div>
          <div class='newElem newwriteFileElem'>
            <label for="path">File Path:</label>
            <input size="16" type="text" id="path" name="path"><br><br>  
            <label for="content">Content:</label>
            <input style='width:80%;' type="text" id="content" name="content">  
          </div>
        </div>
      `;
      break;
    }

    case "outputNode": {
      // Append HTML to 'el' element
      el.innerHTML += `
        <div>
          <div class='newElem newoutputElem'>
            <label for="content">Content:</label>
            <input style='width:80%;' type="text" id="content" name="content">  
          </div>
        </div>
      `;
      break;
    }
  }
}

// Function to get and execute PHP code
function getAndExecPHPCode() {
  let code = document.querySelector(".actualCode").textContent; // Get the PHP code from the element with class "actualCode"
  let xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object
  xhr.open("POST", "executeCode.php", true); // Set the HTTP method, URL, and asynchronous flag for the request
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Set the request header for content type
  xhr.send("code=" + encodeURIComponent(code)); // Send the PHP code as a POST parameter with URL encoding
  xhr.onload = () => {
    document.querySelector(".output").textContent = xhr.responseText; // Set the response from the server as the text content of an element with class "output"
  };
}

const convertBtn = document.querySelector(".convert"); // Get the element with class "convert"
convertBtn.addEventListener("click", function () {
  phpCode.textContent = ""; // Clear the text content of an element with id "phpCode"
  const dragAreaChildrens = document.querySelector(".dropper").children; // Get the children elements of an element with class "dropper"
  for (const element of dragAreaChildrens) {
    renderCode(element); // Call a function to render code for each child element
  }
});

const runBtn = document.querySelector(".Run"); // Get the element with class "Run"
runBtn.addEventListener("click", function (e) {
  e.preventDefault(); // Prevent the default form submission behavior
  getAndExecPHPCode(); // Call the function to get and execute PHP code
});
