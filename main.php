<html>
  <head>
    <!-- Set the title of the webpage -->
    <title>Code Craft • PHP</title>
    <!-- Link to an external CSS file for styling -->
    <link rel="stylesheet" href="style.css" />
    <!-- Link to Google Fonts for font styling -->
    <link
      href="https://fonts.googleapis.com/css?family=Varela Round"
      rel="stylesheet"
    />
    <!-- Set the favicon for the webpage -->
    <link rel="icon" href="./images/logo.png" />
  </head>
  <body>
    <!-- Container for the Code Craft PHP application -->
    <div class="container">
      <!-- extensible section for droppable elements -->
      <div class="extensible droppable">
        <!-- Heading for droppable elements section -->
        <span>Droppables</span>
        <!-- Individual droppable elements with unique IDs and classes -->
        <div id="variable" class="dropElements">Variable</div>
        <div id="arithmetic" class="dropElements">Arithmetic</div>
        <div id="conditionals" class="dropElements">Conditionals</div>
        <div id="loop" class="dropElements">Loop</div>
        <div id="function" class="dropElements">Function</div>
        <div id="readFile" class="dropElements">Read File</div>
        <div id="writeFile" class="dropElements">Write File</div>
        <div id="outputNode" class="dropElements">Output Node</div>
      </div>

      <!-- extensible section for dropping area and convert code button -->
      <div class="extensible droppingArea">
        <!-- Heading for dropping area section -->
        <span>Dropping Area</span>
        <!-- Button for converting code -->
        <button class="btn convert">Convert Code</button>
        <!-- Div for dropping area with a unique ID and class -->
        <div class="dropper extendableDiv">
          <!-- Text for drop here area -->
          <span id="dropHere">Drop Here</span>
        </div>
      </div>

      <!-- extensible section for code area and output area -->
      <div class="extensible codeArea">
        <!-- Subsection for PHP code input area -->
        <div class="area1">
          <!-- Heading for PHP code input area -->
          <span>PHP Code</span>
          <!-- Button for running the PHP code -->
          <input type="submit" value="Run" class="btn run" />
          <!-- Textarea for entering actual PHP code -->
          <textarea class="actualCode" name="actualCode"></textarea>
        </div>
        <!-- Subsection for output area -->
        <div class="area2">
          <!-- Div for output heading with a unique ID and class -->
          <div id="d1"><span id="outSpan">Output</span></div>
          <!-- Div for displaying output with a class -->
          <div class="output">
            <?php include "executeCode.php"; ?>
          </div>
        </div>
      </div>
    </div>
    <!-- Link to an external JavaScript file for functionality -->
    <script src="script.js"></script>
  </body>
</html>
