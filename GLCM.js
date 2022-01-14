window.onload = function () {
    buildGLCMApp(5, 6, 8, 1, 0);
}

function buildGLCMApp(arrayVLength, arrayHLength, grayScale, distance, degree) {
    var iMatrix = getRandomMatrix(arrayVLength, arrayHLength, grayScale);
    drawInputMatrix(iMatrix);

    var glcmMatrix = buildGLCMMatrix(grayScale);
    glcmMatrix = populateGLCMMatrix(iMatrix, distance, degree, glcmMatrix);
    drawGLCMMatrix(glcmMatrix);
}

function getRandomMatrix(arrayVLength, arrayHLength, grayScale) {
    //Defining the matrix type & populate values
    var iMatrix = new Array(arrayHLength);
    for (let i = 0; i < arrayHLength; i++) {
        iMatrix[i] = new Array(arrayVLength);

        for (let j = 0; j < arrayVLength; j++) {
            var randomValue = (Math.floor((Math.random() * 10)) % grayScale);
            //Remainder for 8 will be Zero. Hence replacing it with 8
            if (randomValue == 0) {
                randomValue = 8;
            }
            iMatrix[i][j] = randomValue;
        }
    }
    return iMatrix;
}

function drawInputMatrix(iMatrix) {
    var divIM = document.getElementById("divInputMatrix");
    var tblIM = document.createElement("table");

    for (let i = 0; i < iMatrix[0].length; i++) {
        var imRow = document.createElement("tr");

        for (let j = 0; j < iMatrix.length; j++) {
            var c = document.createElement("td");
            c.innerHTML = "<div class='divcellnormal' id='im_" + j + i + "'>" + iMatrix[j][i] + "</div>";
            imRow.appendChild(c);
        }
        tblIM.appendChild(imRow);
    }
    divIM.appendChild(tblIM);
}

function buildGLCMMatrix(grayScale) {
    var glcmMatrix = new Array(grayScale);
    for (let i = 0; i < grayScale; i++) {
        glcmMatrix[i] = new Array(grayScale);

        for (let j = 0; j < grayScale; j++) {
            glcmMatrix[i][j] = new Array();
        }
    }
    return glcmMatrix;
}

function populateGLCMMatrix(iMatrix, distance, degree, glcmMatrix) {
    for (let i = 0; i < iMatrix.length; i++) {
        for (let j = 0; j < iMatrix[i].length; j++) {
            var i1 = i, j1 = j, i2 = i, j2 = j;

            //Coordinates calculation
            if (degree == 0) {
                i2 = i + distance;
            }
            else if (degree == 45) {
                j2 = j - distance;
                i2 = i + distance;
            }
            else if (degree == 90) {
                j2 = j - distance;
            }
            else if (degree == 135) {
                j2 = j - distance;
                i2 = i - distance;
            }

            var ai = iMatrix[i1];
            if (typeof ai !== "undefined") {
                var a = ai[j1];
                if (typeof a !== "undefined") {
                    var bi = iMatrix[i2];
                    if (typeof bi !== "undefined") {
                        var b = bi[j2];
                        if (typeof b !== "undefined") {
                            glcmMatrix[b - 1][a - 1].push(i1 + "," + j1 + ";" + i2 + "," + j2);
                        }
                    }
                }
            }
        }
    }
    return glcmMatrix;
}

function drawGLCMMatrix(glcmMatrix) {
    var divM = document.getElementById("divGLCMMatrix");
    var tblM = document.createElement("table");

    for (let i = 0; i < glcmMatrix[0].length; i++) {
        var iRow = document.createElement("tr");

        for (let j = 0; j < glcmMatrix.length; j++) {
            var c = document.createElement("td");
            c.innerHTML = "<div class='divcellnormal' onclick='HighightPairs(this)' id='gm_" + j + i + "' data='" + glcmMatrix[j][i].join("~") + "'>" + glcmMatrix[j][i].length + "</div>";
            iRow.appendChild(c);
        }
        tblM.appendChild(iRow);
    }
    divM.appendChild(tblM);
}

function HighightPairs(e) {
    var previousHighlights = document.querySelectorAll(".divcellhighlighted");
    for (let i = 0; i < previousHighlights.length; i++) {
        previousHighlights[i].className = "divcellnormal";
    }

    //Set the current clicked cell as highlighted 
    e.className = "divcellhighlighted";

    //Set the Pairs as highlighted
    var data = e.getAttribute("data");

    if (typeof data != "undefined" && data.length > 0) {
        var iPairs = data.split("~");
        for (let i = 0; i < iPairs.length; i++) {
            var iCells = iPairs[i].split(";");
            for (let j = 0; j < iCells.length; j++) {
                document.getElementById("im_" + iCells[j].replace(',', '')).className = "divcellhighlighted";
            }
        }
    }
}
