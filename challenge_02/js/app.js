import { ManageClass, ManageTimer } from "./timeTracker.js";

const classDetails = document.querySelector(".view-class-list");        
const selectClass = document.querySelector('#selectClass');
const timeClass = document.querySelector('#timeClass');
const classReport = document.querySelector(".class-report"); 
const rptClassCode = document.querySelector('#rptClassCode');
const rptClassName = document.querySelector('#rptClassName');

//Get Page name
const pageName = window.location.pathname.split('/').slice(-1)[0];
let classCode = null, className = null;

if (pageName == 'report.html') {
    classCode = (new URL(document.location)).searchParams.get("classCode");
    className = (new URL(document.location)).searchParams.get("className");
    rptClassCode.innerHTML = classCode;
    rptClassName.innerHTML = className;
}

const myClasses = new ManageClass(classDetails, selectClass, timeClass, 'classData');
const myTimer = new ManageTimer('studyData', classReport, classCode);

//Function to get current year
document.getElementById('currentYear').innerHTML = new Date().getFullYear();