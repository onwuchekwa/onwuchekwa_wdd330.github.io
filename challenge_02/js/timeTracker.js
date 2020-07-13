import { addToLocalStorage, getDataFromLocalStorage, getElementId, bindEvent, getElementAllIds, bindChangeEvent } from "./utility.js";

// Declare Variables
let classArray = null, timerArray = null;
const newClassCode = getElementId("#newClassCode");
const newClassName = getElementId("#newClassName");
const editClassCode = getElementId("#editClassCode");
const editClassName = getElementId("#editClassName");
const spHour = getElementId("#spHour");
const spMinutes = getElementId("#spMinutes");
const spSeconds = getElementId("#spSeconds");   
const btnStart = getElementId("#btnStart");
const btnPause = getElementId("#btnPause");
const btnReset = getElementId("#btnReset");
const btnStop = getElementId("#btnStop");
const btnSave = getElementId("#btnSave");
const getPageName = window.location.pathname.split('/').slice(-1)[0];

// Validate New Class Data Entry Fields
const validateNewClass = () => {
    const classMessage = getElementAllIds('.classMessage');
    let errorMsg = "";
    let elementId = "";

    // Check if Class Code field is field is empty
    if(newClassCode.validity.valueMissing) {
        errorMsg = errorMsg + classMessage.innerHTML + "<br>";
        newClassCode.nextElementSibling.style.display = "block";
        if(elementId == "") {
            elementId = newClassCode;
        }
        elementId.focus();
    } else {
        newClassCode.nextElementSibling.style.display = "none";
    }

    // Check if Class Name field is field is empty
    if(newClassName.validity.valueMissing) {
        errorMsg = errorMsg + classMessage.innerHTML + "<br>";
        newClassName.nextElementSibling.style.display = "block";
        if(elementId == "") {
            elementId = newClassName;
        }
        elementId.focus();
    } else {
        newClassName.nextElementSibling.style.display = "none";
    }

    // Check if error message is empty
    if(errorMsg != "") {
        return false;
    } else {
        return true;
    }
}

// Validate Edit Class Form
const validateEditClass = () => {
    const editMessage = getElementAllIds('.editMessage');
    const selectClass = getElementId("#selectClass");timeClass
    let errorMsg = "";
    let elementId = "";

     // Check if Class Code select box is field is empty
     if(selectClass.validity.valueMissing) {
        errorMsg = errorMsg + editMessage.innerHTML + "<br>";
        selectClass.nextElementSibling.style.display = "block";
        if(elementId == "") {
            elementId = selectClass;
        }
        elementId.focus();
    } else {
        selectClass.nextElementSibling.style.display = "none";
    }

    // Check if Class Code field is field is empty
    if(editClassCode.validity.valueMissing) {
        errorMsg = errorMsg + editMessage.innerHTML + "<br>";
        editClassCode.nextElementSibling.style.display = "block";
        if(elementId == "") {
            elementId = editClassCode;
        }
        elementId.focus();
    } else {
        editClassCode.nextElementSibling.style.display = "none";
    }

    // Check if Class Name field is field is empty
    if(editClassName.validity.valueMissing) {
        errorMsg = errorMsg + editMessage.innerHTML + "<br>";
        editClassName.nextElementSibling.style.display = "block";
        if(elementId == "") {
            elementId = editClassName;
        }
        elementId.focus();
    } else {
        editClassName.nextElementSibling.style.display = "none";
    }

    // Check if error message is empty
    if(errorMsg != "") {
        return false;
    } else {
        return true;
    }
}

// Validate Timer Form
const validateTimeClass = () => {
    const timeMessage = getElementId('.timeMessage');
    const timeClass = getElementId("#timeClass");
    let errorMsg = "";
    let elementId = "";

     // Check if Class Code select box is field is empty
     if(timeClass.validity.valueMissing) {
        errorMsg = errorMsg + timeMessage.innerHTML + "<br>";
        timeClass.nextElementSibling.style.display = "block";
        if(elementId == "") {
            elementId = timeClass;
        }
        elementId.focus();
    } else {
        timeClass.nextElementSibling.style.display = "none";
    }

    // Check if error message is empty
    if(errorMsg != "") {
        return false;
    } else {
        return true;
    }
}

// Add New Class function
const addClass = (classCode, className, key) => {
    const newClass = {
        id: new Date(),
        classCode: classCode,
        className: className
    };
    classArray.push(newClass);
    addToLocalStorage(key, classArray);
}

// Get List of Classes
const getClassList = (classList, element) => {
    element.innerHTML = "";
    if(!classArray.length <= 0) {        
        classList.forEach(classes => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="./report.html?classCode=${classes.classCode}&className=${classes.className}">${classes.classCode} - ${classes.className}</a>`;
            element.appendChild(li);
        });
    } else {
        element.innerHTML = "<li class='emptyClass'>You have not added any class</li>";
    }
}

// Create option for Select Boxes
const getClassOption = (sList, selectElement) => {
    selectElement.innerHTML = "";
    if(!classArray.length <= 0) {
        selectElement.innerHTML = `<option value="" selected disabled>Select a Class</option>`;
        sList.forEach(classItem => {
            const option = document.createElement('option');
            option.setAttribute("value", `${classItem.classCode}`)
            option.innerHTML = `${classItem.className}`;
            selectElement.appendChild(option);
        });
    } else {
        selectElement.innerHTML = `<option value="" selected disabled>Select a Class</option>`;
    }
}

// Get Class from LocalStorage
const getClasses = (key) => {
    if(classArray === null) {
        classArray = getDataFromLocalStorage(key) || [];        
    }
    return classArray;
}

// Get Specific Class
const filterClass = (key, selectElement) => {
    let classList = getClasses(key);
    return classList.filter(classId => classId.classCode === selectElement.value);
}

// Create Timer Functions
let Timer = {
    seconds: 0,
    interval: null,
    start: () => {
        if(!Timer.interval) {
            let _this = Timer;
            const pad = (val) => {
                return val > 9 ? val : "0" + val;
            }
            _this.interval = setInterval(() => {
                _this.seconds += 1;
                spHour.innerHTML = pad(Math.floor(_this.seconds / 3600 % 60));
                spMinutes.innerHTML = pad(Math.floor(_this.seconds / 60 % 60));
                spSeconds.innerHTML = pad(parseInt(_this.seconds % 60));
            }, 1000);
        }
    },

    pause: () => {
        let _this = Timer;
        clearInterval(_this.interval);
        delete _this.interval;
    },

    reset: () => {
        let _this = Timer;
        _this.seconds = null;
        clearInterval(_this.interval);
        spHour.innerHTML = "00";
        spMinutes.innerHTML = "00";
        spSeconds.innerHTML = "00";
        delete _this.interval;
    },

    restart: () => {
        let _this = Timer;
        _this.reset();
        _this.start();
    }
};

// Add New Timer function
const addTimer = (classCode, mHour, mMinute, mSeconds, key) => {
    const newTimer = {
        studyDate: new Date(),
        classCode: classCode,
        timeSpend: mHour + ":" + mMinute + ":" + mSeconds
    };
    timerArray.push(newTimer);
    addToLocalStorage(key, timerArray);
}

// Get List of Reports
const getReportList = (reportList, element) => {
    element.innerHTML = "";
    if(!timerArray.length <= 0) {        
        reportList.forEach(reports => {
            const li = document.createElement('li');
            const studyDate = new Date(reports.studyDate).toLocaleDateString('en-US');
            li.innerHTML = `<strong>Date of Study: ${studyDate}</strong><br> &emsp; Class Code: ${reports.classCode} <br> &emsp; Time Spend: ${reports.timeSpend}</a>`;
            element.appendChild(li);
        });
    } else {
        element.innerHTML = "<li class='emptyClass'>You have not added any reports</li>";
    }
}

// Get Reports from LocalStorage
const getReports = (key) => {
    if(timerArray === null) {
        timerArray = getDataFromLocalStorage(key) || [];        
    }
    return timerArray;
}

// Get Specific Class
const filterReport = (key, searchString) => {
    let reportList = getReports(key);
    return reportList.filter(classId => classId.classCode === searchString);
}


// Manage Class
export class ManageClass {
    constructor(elementList, selList, rcdList, key) {
        this.elementList = elementList;
        this.selList = selList;
        this.rcdList = rcdList;
        this.key = key;
        if(getPageName == 'index.html') { 
            bindEvent("#addClass", this.newClass.bind(this));
            bindChangeEvent('#selectClass', this.populateEditClass.bind(this))
            bindEvent("#editClass", this.ediClass.bind(this));
            this.classLists();
            this.selectEditLists();
            this.selectRecordLists();
        }
    }

    // Add class to localStorage
    newClass() {
        if(validateNewClass()) {
            addClass(newClassCode.value, newClassName.value, this.key);
            this.classLists();
            this.selectEditLists();
            this.selectRecordLists();
            newClassCode.value = ""; 
            newClassName.value = "";
        }
    }

    // Populate Class List
    classLists() {
        getClassList(getClasses(this.key), this.elementList);
    }

    // Populate Edit Combobox
    selectEditLists() {
        getClassOption(getClasses(this.key), this.selList);
    }

    // Populate Timer Combobox
    selectRecordLists() {
        getClassOption(getClasses(this.key), this.rcdList);
    }

    // Populate Edit form textboxes
    populateEditClass() {
        const classId = filterClass(this.key, this.selList);
        editClassCode.value = classId.map(c => `${c.classCode}`)
        editClassName.value = classId.map(c => `${c.className}`)
    }

    // Update local storage with new edit values
    ediClass() {
        if (validateEditClass()) {
            const classId = getClasses(this.key);
            for(var i = 0; i < classId.length; i++) {  
                if(this.selList.value === classId[i].classCode) {
                    classId[i].classCode = editClassCode.value;
                    classId[i].className = editClassName.value;
                }
            }
            addToLocalStorage(this.key, classId);
            editClassCode.value = ""; 
            editClassName.value = "";
            this.classLists();
            this.selectEditLists();
            this.selectRecordLists();
        }
    }
}

// Manage Timer
export class ManageTimer { 
    constructor(key, ulReportList, getUrl) {
        this.key = key;
        this.ulReportList = ulReportList;
        this.getUrl = getUrl;
        if(getPageName == 'report.html') {            
            this.reportLists();
        } else {
            bindEvent("#btnStart", this.startTimer.bind(this));
            bindEvent("#btnPause", this.pauseTimer.bind(this));
            bindEvent("#btnReset", this.resetTimer.bind(this));
            bindEvent("#btnStop", this.stopTimer.bind(this));
            bindEvent("#btnSave", this.newTimer.bind(this));
            this.reportLists();
        }
    }

    // Start Timer
    startTimer() {
        if(validateTimeClass()) {
            if(btnStart.innerHTML != 'Restart') {
                Timer.start();
            } else {
                Timer.restart();
            }
            if (btnStart.innerHTML == 'Resume' || btnStart.innerHTML == 'Restart') {
                btnStart.innerHTML = 'Start';
            }
            btnStart.setAttribute('disabled', 'disabled');
            btnPause.removeAttribute('disabled');
            btnReset.removeAttribute('disabled');
            btnStop.removeAttribute('disabled');
            btnSave.removeAttribute('disabled');
        }
    }

    // Pause Timer
    pauseTimer() {
        Timer.pause();
        btnStart.innerHTML = 'Resume';
        btnPause.setAttribute('disabled', 'disabled');
        btnStart.removeAttribute('disabled');
    }

    // Reset Timer
    resetTimer() {
        Timer.reset();
        btnStart.innerHTML = 'Start';
        btnStart.removeAttribute('disabled');
        btnPause.setAttribute('disabled', 'disabled');
        btnReset.setAttribute('disabled', 'disabled');
        btnStop.setAttribute('disabled', 'disabled');
        btnSave.setAttribute('disabled', 'disabled');
    }

    // Stop TImer
    stopTimer() {
        Timer.pause();
        btnStart.innerHTML = 'Restart';
        btnStart.removeAttribute('disabled');
        btnStop.setAttribute('disabled', 'disabled');
        btnPause.setAttribute('disabled', 'disabled');
        btnReset.setAttribute('disabled', 'disabled');
        btnSave.removeAttribute('disabled');
    }

    // Add Timer to localStorage
    newTimer() {
        if(validateTimeClass()) {
            const timeClass = getElementId("#timeClass"); 
            this.stopTimer(); 
            addTimer(timeClass.value, spHour.innerHTML, spMinutes.innerHTML, spSeconds.innerHTML, this.key);
            timeClass.value = "";
            this.resetTimer();
        }
    }

    // Populate Report List
    reportLists() {
        getReportList(filterReport(this.key, this.getUrl), this.ulReportList);
    }
}
