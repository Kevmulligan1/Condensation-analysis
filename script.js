var Tdesign;
var RHdesign;
var avgtemp;
var uvaluesMap = {
  "component5" : {uvalue: 0.9},
  "component7" : {uvalue: 1.25},
  "component17" : {uvalue: 5.00},
  "component18" : {uvalue: 6.25},
  "component19" : {uvalue: 7.20},
  "component20" : {uvalue: 2.13},
}
var heatTransferValuesMap = {
    "component1": { heatTransfer: 0.17},
    "component2": { heatTransfer: 0.68},
    "component3": { heatTransfer: 0.61},
    "component4": { heatTransfer: 0.97},
    "component9": { heatTransfer: 1.32},
    "component10": { heatTransfer: 0.53},
    "component11": { heatTransfer: 5.50},
    "component12": { heatTransfer: 12.44},
    "component13": { heatTransfer: 6.60},
    "component14": { heatTransfer: 7.10},
    "component15": { heatTransfer: 8.55},
    "component16": { heatTransfer: 19.11},
    "component21": { heatTransfer: 0.80},
    "component22": { heatTransfer: 0.44},
    "component23": { heatTransfer: 0.80},
    "component24": { heatTransfer: 1.11},
    "component25": { heatTransfer: 1.28},
    "component26": { heatTransfer: 0.52},
    "component27": { heatTransfer: 0.42},
    "component28": { heatTransfer: 0.33},
    "component29": { heatTransfer: 0.26},
    "component30": { heatTransfer: 0.21},
    "component31": { heatTransfer: 0.13},
    "component32": { heatTransfer: 0.07},
    "component33": { heatTransfer: 0.05},
    "component34": { heatTransfer: 0.08},
    "component35": { heatTransfer: 0.61},
    "component36": { heatTransfer: 1.80},
    "component37": { heatTransfer: 0.68},
    "component38": { heatTransfer: 0.05},
    "component39": { heatTransfer: 2.08},
    "component40": { heatTransfer: 1.23},
    "component41": { heatTransfer: 0.44},
    "component42": { heatTransfer: 0.97},
    "component43": { heatTransfer: 0.91},
    "component44": { heatTransfer: 1.69},
    "component45": { heatTransfer: 2.04},
    "component46": { heatTransfer: 2.38},
    "component47": { heatTransfer: 2.56},
    "component48": { heatTransfer: 3.23},
    "component49": { heatTransfer: 2.17},
    "component50": { heatTransfer: 6.5},
    "component51": { heatTransfer: 2.5},
    "component52": { heatTransfer: 10.5},
    "component53": { heatTransfer: 3.0},
}
var componentsData = [];
function addComponent(button) {
  var wallAssembly = button.closest(".wallassembly");
  var componentRows = wallAssembly.getElementsByClassName("component");
  var newComponent = componentRows[0].cloneNode(true);
  newComponent.removeChild(newComponent.lastChild);
  wallAssembly.appendChild(newComponent);
  newComponent.getElementsByClassName("add_component")[0].removeEventListener("click", function() {
    addComponent(this);
  });
  newComponent.getElementsByClassName("add_component")[0].addEventListener("click", function() {
    addComponent(this);
  });
  var dropdown = newComponent.querySelector('.ComponentName');
  dropdown.addEventListener("change", function() {
  
  });
  // Assign a unique identifier to the new component
  var wallAssemblyIndex = Array.from(wallAssembly.parentNode.children).indexOf(wallAssembly);
  var componentIndex = Array.from(wallAssembly.getElementsByClassName("component")).indexOf(newComponent);
  newComponent.setAttribute("data-wallassembly-index", wallAssemblyIndex);
  newComponent.setAttribute("data-component-index", componentIndex);
  // Clear the input values
  newComponent.querySelector('input[name="ComponentName"]');
  newComponent.querySelector('input[name="inboardInsulation"]').checked = false;
  //to delete component
  var removeComponentButton = newComponent.getElementsByClassName("remove_component")[0];
  removeComponentButton.addEventListener("click", function() {
    removeComponent(this);
  });
}
function addWallAssembly() {
  var wallAssemblies = document.getElementsByClassName("wallassemblies")[0];
  var wallAssembly = document.getElementsByClassName("wallassembly")[0];
  var newWallAssembly = wallAssembly.cloneNode(true);
  var components = newWallAssembly.getElementsByClassName("component");
  while (components.length > 1) {
    components[1].remove();
  }
  var wallAssemblyIndex = wallAssemblies.children.length;
  newWallAssembly.setAttribute("data-wallassembly-index", wallAssemblyIndex);

  wallAssemblies.appendChild(newWallAssembly);
  var addComponentButtons = newWallAssembly.getElementsByClassName("add_component");
  for (var i = 0; i < addComponentButtons.length; i++) {
    addComponentButtons[i].addEventListener("click", function() {
      addComponent(this);
    });
  }
    // Add the ratio container inside the new wall assembly
  var ratioContainer = document.createElement("div");
  ratioContainer.setAttribute("id", "ratioContainer");
  newWallAssembly.appendChild(ratioContainer);
 
 
  var firstComponent = newWallAssembly.querySelector('.component');
var firstDropdown = firstComponent.querySelector('.ComponentName');
initializeDropdownListener(firstDropdown, firstComponent);
firstDropdown.addEventListener("change", function() {
});

}
var addWallAssemblyButton = document.getElementById("add_wall_assembly");
addWallAssemblyButton.addEventListener("click", addWallAssembly);
var addComponentButton = document.querySelector(".wallassembly .add_component");
addComponentButton.addEventListener("click", function() {
  addComponent(this);
});
// Add this after the DOM has loaded
document.addEventListener('DOMContentLoaded', function () {
  var wallAssemblies = document.querySelector('.wallassemblies');
  wallAssemblies.addEventListener('change', function (event) {
    var target = event.target;
    if (target.classList.contains('ComponentName')) {
      var selectedComponent = target.value;
      var desiredComponents = ['component5', 'component6', 'component17', 'component19', 'component7', 'component8', 'component18', 'component20'];
      var componentDiv = target.closest('.component');
      var rValueField = componentDiv.querySelector('.other_div');
      var customComponentField = componentDiv.querySelector('.custom_component_div');
      var rValueInput = rValueField.querySelector('#r_value_field');
      var customComponentInput = customComponentField.querySelector('#custom_component_name');
      var permetricField = componentDiv.querySelector('.per_metric');
      var perMetric = permetricField.querySelector('#per_metric_length');
      var heatTransferDisplay = componentDiv.querySelector('.heat-transfer-display');
      heatTransferDisplay.textContent = "";
      if (desiredComponents.includes(selectedComponent)) {
        permetricField.style.display = 'block';
        perMetric.addEventListener('input', calculateHeatTransfer);
        rValueField.style.display = 'none';
        rValueInput.removeEventListener('input', calculateHeatTransfer);
        customComponentField.style.display = 'none';
      } else if (selectedComponent === 'other') {
        customComponentField.style.display = 'block';
        rValueField.style.display = 'block';
        rValueInput.addEventListener('input', calculateHeatTransfer);
        permetricField.style.display = 'none';
        perMetric.removeEventListener('input', calculateHeatTransfer);
      } else {
        rValueField.style.display = 'none';
        rValueInput.removeEventListener('input', calculateHeatTransfer);
        permetricField.style.display = 'none';
        perMetric.removeEventListener('input', calculateHeatTransfer);
        customComponentField.style.display = 'none';
      }
      outputnonothercomponent.call(componentDiv); // Pass the componentDiv
    }
  });
});
function calculateHeatTransfer() {
  var componentDiv = this.closest('.component');
  var rValueInput = componentDiv.querySelector('#r_value_field');
  var heatTransferDisplay = componentDiv.querySelector('.heat-transfer-display');
  var rValue = parseFloat(rValueInput.value);
  var selectedComponent = componentDiv.querySelector('.ComponentName').value;
  var perMetricInput = componentDiv.querySelector('#per_metric_length');
  var perMetric = parseFloat(perMetricInput.value);
    var calculatedHeatTransfer;
    if (selectedComponent === 'other') {
      calculatedHeatTransfer = rValue;
    
    } else if (
      selectedComponent === 'component5' ||
      selectedComponent === 'component17' ||
      selectedComponent === 'component19' ||
      selectedComponent === 'component7' ||
      selectedComponent === 'component18' ||
      selectedComponent === 'component20'
    ) {
      var uValue = uvaluesMap[selectedComponent].uvalue;
      calculatedHeatTransfer = uValue * perMetric; 
    } else {
      // Retrieve the predefined heat transfer value from the map
      calculatedHeatTransfer = heatTransferValuesMap[selectedComponent].heatTransfer;
    }
    heatTransferDisplay.textContent = "Heat Transfer: " + calculatedHeatTransfer.toFixed(2);
}
function outputnonothercomponent() {
  var componentDiv = this.closest('.component');
  var heatTransferDisplay = componentDiv.querySelector('.heat-transfer-display');
  var selectedComponent = componentDiv.querySelector('.ComponentName').value;
  var calculatedHeatTransfer;
   if (
      selectedComponent !== 'other' &&
      selectedComponent !== 'component5' &&
      selectedComponent !== 'component6' &&
      selectedComponent !== 'component17' &&
      selectedComponent !== 'component19' &&
      selectedComponent !== 'component7' &&
      selectedComponent !== 'component8' &&
      selectedComponent !== 'component18' &&
      selectedComponent !== 'component20'
   ) {
    calculatedHeatTransfer = heatTransferValuesMap[selectedComponent].heatTransfer;
    heatTransferDisplay.textContent = "Heat Transfer: " + calculatedHeatTransfer.toFixed(2);
   }
}
function submitForm(event) {
  event.preventDefault();
  Tdesign = document.getElementById('interior_design_temp').value;
  RHdesign = document.getElementById('interior_design_Rh').value;
  avgtemp = document.getElementById('average_temperature').value;
  var deltaT = Tdesign - avgtemp;
  var inboardInsulationValues = [];
  var inboardInsulationCheckboxes = document.querySelectorAll('.wallassembly input[type="checkbox"]');
  for (var i = 0; i < inboardInsulationCheckboxes.length; i++) {
    inboardInsulationValues.push(inboardInsulationCheckboxes[i].checked);
  }
  var Tintdesigncels = (Tdesign - 32) / 1.8;
  var a = 17.625;
  var b = 243.04;
  var alpha = Math.log(RHdesign / 100) + (a * Tintdesigncels) / (b + Tintdesigncels);
  var dewpoint = (b * alpha) / (a - alpha);
  var dewpointfar = dewpoint * 1.8 + 32;
  var resultElement = document.getElementById('result');
  resultElement.textContent = "Dewpoint: " + dewpointfar.toFixed(2) + "°F";
for (var i = 0; i < componentsData.length; i++) {
  var wallAssemblyData = componentsData[i];
  for (var j = 0; j < wallAssemblyData.length; j++) {
    var component = wallAssemblyData[j];
    var componentName = component.componentName;
    var inboardInsulation = component.inboardInsulation ? "Yes" : "No"; 

    if (componentName === 'other') {
      componentName = component.customComponentName;
    }
  }
}

// Retrieve the heat transfer values for each component
var heatTransferValues = [];
for (var i = 0; i < componentsData.length; i++) {
  for (var j = 0; j < componentsData[i].length; j++) {
    heatTransferValues.push(componentsData[i][j].heatTransfer);
  }
}
  var wallAssemblies = document.getElementsByClassName("wallassembly");
  componentsData = [];
  var calculatedHeatTransfers = [];
  for (var i = 0; i < wallAssemblies.length; i++) {
    var wallAssembly = wallAssemblies[i];
    var components = wallAssembly.getElementsByClassName("component");
    var wallAssemblyData = [];
    var wallAssemblyName = wallAssembly.querySelector('input[name="WallAssemblyName"]').value;
    for (var j = 0; j < components.length; j++) {
      var component = components[j];
      var rValueInput = component.querySelector('#r_value_field');  
      var rValue = parseFloat(rValueInput.value);
      var dropdown = component.querySelector('.ComponentName');
      var componentName = dropdown.value;
      var inboardInsulation = component.querySelector('input[name="inboardInsulation"]').checked;
      var heatTransferValue;
      var perMetricInput = component.querySelector('#per_metric_length');
      var perMetric = parseFloat(perMetricInput.value);
      if (
        componentName !== 'other' &&
        componentName !== 'component5' &&
        componentName !== 'component6' &&
        componentName !== 'component17' &&
        componentName !== 'component19' &&
        componentName !== 'component7' &&
        componentName !== 'component8' &&
        componentName !== 'component18' &&
        componentName !== 'component20'
     
     ){
      var heatTransferValue = heatTransferValuesMap[componentName].heatTransfer;
      } else if(
        componentName === 'component5' ||
        componentName === 'component6' ||
        componentName === 'component17' ||
        componentName === 'component19' ||
        componentName === 'component7' ||
        componentName === 'component8' ||
        componentName === 'component18' ||
        componentName === 'component20'
      ){
        var uValue = uvaluesMap[componentName].uvalue;
        heatTransferValue = uValue * perMetric; 
      }
         else{
        if (!calculatedHeatTransfers.hasOwnProperty(j)) {
          calculatedHeatTransfers[j] = rValue; 
        }
        heatTransferValue = calculatedHeatTransfers[j];
      }
      var componentData = {
        componentName: componentName,
        inboardInsulation: inboardInsulation,
        heatTransfer: heatTransferValue
      };
      wallAssemblyData.push(componentData);
    }
    wallAssemblyData.wallAssemblyName = wallAssemblyName;
    componentsData.push(wallAssemblyData);
  }
  // Calculate the total heat transfer for each wall assembly
  var totalHeatTransfer = [];
  for (var i = 0; i < componentsData.length; i++) {
    var wallAssemblyHeatTransfer = 0;
    var wallAssemblyData = componentsData[i];
    var wallAssemblyName = wallAssemblyData.wallAssemblyName;
    for (var j = 0; j < componentsData[i].length; j++) {
      var component = wallAssemblyData[j];
      var componentName = component.componentName;
      var inboardInsulation = component.inboardInsulation;
      var heatTransfer;
      heatTransfer = parseFloat(component.heatTransfer); 
      wallAssemblyHeatTransfer += heatTransfer;
    }
    totalHeatTransfer.push(wallAssemblyHeatTransfer);
  }
var wallAssemblyHeatTransferSums = [];
for (var i = 0; i < componentsData.length; i++) {
  var wallAssemblyHeatTransferSum = 0;
  for (var j = 0; j < componentsData[i].length; j++) {
    var component = componentsData[i][j];
    if (component.inboardInsulation) {
      var heatTransfer = parseFloat(component.heatTransfer);
      wallAssemblyHeatTransferSum += heatTransfer; 
    }
  }
  wallAssemblyHeatTransferSums.push(wallAssemblyHeatTransferSum);
}
for (var i = 0; i < componentsData.length; i++) {
  // Calculate the inboard insulation ratio for each wall assembly
  var inboardInsulationRatio = [];
  for (var i = 0; i < totalHeatTransfer.length; i++) {
    var ratio =  wallAssemblyHeatTransferSums[i] / totalHeatTransfer[i];
    inboardInsulationRatio.push(ratio);
  }
var Tsheathing = [];
for (var i = 0; i < totalHeatTransfer.length; i++) {
  var sheath = Tdesign - deltaT * inboardInsulationRatio[i];
  Tsheathing.push(sheath);
}
  var condensationResult = [];
  for (var i = 0; i < totalHeatTransfer.length; i++) {
    var condensation = Tsheathing[i] > dewpointfar ? "pass" : "fail";
    condensationResult.push(condensation);
  }
}    
  var resultContainer = document.getElementById('answers');
  resultContainer.innerHTML = '';

  for (var i = 0; i < componentsData.length; i++) {
      var wallAssemblyData = componentsData[i];
      var wallAssemblyName = wallAssemblyData.wallAssemblyName;
      var heatTransfer = totalHeatTransfer[i];
      var insulationratio = inboardInsulationRatio[i];
      var sheathingtemp = Tsheathing[i];
      var condensation = condensationResult[i];
      var wallAssemblyNumber = i + 1;

      var wallAssemblyResultDiv = document.createElement('div');
      wallAssemblyResultDiv.className = 'wallassembly_result' ;

      var resultElement = document.createElement('div');
      resultElement.innerHTML = 'Wall Assembly ' + wallAssemblyNumber + ': Total Heat Transfer: ' + heatTransfer.toFixed(2);
      wallAssemblyResultDiv.appendChild(resultElement);

      var resultElement = document.createElement('div');
      resultElement.innerHTML = 'Wall Assembly ' + wallAssemblyNumber + ': Inboard Insulation ratio: ' + (insulationratio.toFixed(2) * 100 ) + '%';
      wallAssemblyResultDiv.appendChild(resultElement);
      var resultElement = document.createElement('div');
      resultElement.innerHTML = 'Wall Assembly ' + wallAssemblyNumber + ': Temp at sheathing: ' + sheathingtemp.toFixed(2);
      wallAssemblyResultDiv.appendChild(resultElement);
      var resultElement = document.createElement('div');
      resultElement.innerHTML = 'Wall Assembly ' + wallAssemblyNumber + ': Condensation Result: ' + condensation;
      wallAssemblyResultDiv.appendChild(resultElement);
      resultContainer.appendChild(wallAssemblyResultDiv);
      console.log('wallAssemblyResultDiv: ', wallAssemblyResultDiv);
      
        // Show the appropriate result icon based on the condensation result
      var passResultIcon = document.getElementById("pass_result");
      var failResultIcon = document.getElementById("fail_result");
      if (condensationResult.includes("fail")) {
          passResultIcon.style.display = "none";
          failResultIcon.style.display = "block";
      } else {
          passResultIcon.style.display = "block";
          failResultIcon.style.display = "none";
      }
    }  
ShowCalculations(dewpointfar);
}
var form = document.getElementById('condensation_analysis');
form.addEventListener("submit", submitForm);
function generatePDF() {
  var fullHeight = document.documentElement.scrollHeight;
  var pageHeight = 297; // Height of an A4 page in millimeters
  var overlap = 10; // Amount of overlap between pages in millimeters
  var pageCount = Math.ceil(fullHeight / (pageHeight - overlap));
  var pdf = new jsPDF('p', 'mm', 'a4');
  function addPage(pageNumber) {
    var topPosition = -pageNumber * (pageHeight - overlap);
    // Scroll the page to the top position
    window.scrollTo(0, -topPosition);
    // Wait for the scrolling animation to complete
    setTimeout(function () {
      // Convert the form to a canvas
      html2canvas(document.body).then(function (canvas) {
        var imgData = canvas.toDataURL('image/png');
        if (pageNumber === 0) {
          // Add the image of the form as the first page in the PDF
          pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
        }
        if (pageNumber < pageCount - 1) {
          // Add the next page after a small delay to allow for rendering
          setTimeout(function () {
            addPage(pageNumber + 1);
          }, 0);
        } else {
          // Save the PDF file with only the first page
          pdf.save('condensation analysis.pdf');
        }
      });
    }, 0); // Adjust the delay as needed
  }
  addPage(0);
}
function removeComponent(button) {
  var component = button.closest(".component");
  var wallAssembly = component.closest(".wallassembly");
  var componentCount = wallAssembly.getElementsByClassName("component").length;
  // Check if there is more than one component before removing
  if (componentCount > 1) {
    component.remove();
  } 
}
function ShowCalculations(dewpointfar) {
  console.log('dewpointfar: ', dewpointfar);
}

var showCalculationsButton = document.getElementById('show_calculations_button');
showCalculationsButton.addEventListener("click", function() {
  ShowCalculations(dewpointfar);
});