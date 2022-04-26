import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  getFirestore,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyCRAXQQs7R5bZEyxOtZQ0A7aosWqnnNp-Q",
  authDomain: "finalproject-bceac.firebaseapp.com",
  databaseURL:
    "https://finalproject-bceac-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "finalproject-bceac",
  storageBucket: "finalproject-bceac.appspot.com",
  messagingSenderId: "383768368488",
  appId: "1:383768368488:web:a58fc3aed9a4d190a9f2dd"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const itemsRef = collection(db, "test");
var tempData;
setTable();
async function setTable() {
  var items = await getDocs(itemsRef);
  // console.log(items);
  const datas = items.docs.map((item) => ({
    docId: item.id,
    ...item.data()
  }));
  var allDatas = datas;
  tempData = datas;
  console.log(allDatas);
  let tableHtml = `<img id="tableSVG" src="table.svg" alt="table" />`;
  let tableDelte = document.getElementById("tableDelete").innerHTML;
  tableDelte = `<tr>
          <th>Subject</th>
          <th>Days</th>
          <th>TimeStart</th>
          <th>TimeEnd</th>
          <th>Delete</th>
        </tr>`;
  for (let i = 0; i < allDatas.length; i++) {
    // console.log(allDatas[i]);
    tableHtml =
      `<div
                  id="${allDatas[i].name}"
                  class="box"
                  style="
                  width: ${
                    100 * (allDatas[i].timeEnd - allDatas[i].timeStart)
                  }px;
                  height: 60px;
                  background-color: aliceblue;
                  position: absolute;
                  left: ${128 + 100 * (allDatas[i].timeStart - 8)}px;
                  top: ${85.5 + (allDatas[i].day - 1) * 80}px;
                  display: flex;
                  align-content: center;
                  justify-content: center;
                  cursor: pointer;
                  background-color:${
                    allDatas[i].color.length > 1 ? allDatas[i].color : "#9ADCFF"
                  };
      
      
                  background-size: 200% auto;
                  z-index: 2;
                  transition: 0.3s;
                  "
                  onclick="location.href='${allDatas[i].link}'"
                  onMouseOver="this.style.background-position='right center'"
            >
                  <h4 style="color: blak;
                      font-family: 'Sora';
                      font-style: normal;
                      font-weight: 400;"
                  >${allDatas[i].name}</h4>
            </div>` + tableHtml;
    document.getElementById("table").innerHTML = tableHtml;
    var days = "";
    if (allDatas[i].day == 1) days = "Mon";
    if (allDatas[i].day == 2) days = "Tue";
    if (allDatas[i].day == 3) days = "Wed";
    if (allDatas[i].day == 4) days = "Thu";
    if (allDatas[i].day == 5) days = "Fri";
    console.log(allDatas[i]);
    tableDelte += `
        <tr>
          <td height="50px">${allDatas[i].name}</td>
          <td height="50px">${days}</td>
          <td height="50px">${allDatas[i].timeStart}</td>
          <td height="50px">${allDatas[i].timeEnd}</td>
          <td height="50px">
            <button onclick="deleteItem('${allDatas[i].docId}')" style="
            font-family: 'Sora';
            font-style: normal;
            font-weight: 400;
            color: white;
            background-color: #f54e42;
            padding:3px;
            cursor: pointer;
            border: none;
            outline: none;
            ">Delete</button>
          </td>
        </tr>`;
  }
  document.getElementById("table").innerHTML = tableHtml;
  document.getElementById("tableDelete").innerHTML = tableDelte;
}
async function showData() {
  const items = await getDocs(itemsRef);

  if (items) {
    const datas = items.docs.map((item) => ({
      docId: item.id,
      ...item.data()
    }));

    console.log(datas);
    console.log("showData");
    return datas;
  }
}
// function showData() {
//   console.log("test");
// }
async function addNewContent() {
  var subjectName = document.getElementById("addContentSubject").value;
  var day = document.getElementById("addContentDate").value;
  var timeStart = document.getElementById("addContentTimeStart").value;
  var timeEnd = document.getElementById("addContentTimeEnd").value;
  var link = document.getElementById("addContentLink").value;
  if (timeStart > timeEnd) {
    var temp = timeStart;
    timeStart = timeEnd;
    timeEnd = temp;
  }

  let tableHtml = document.getElementById("table").innerHTML;
  var color = document.getElementById("colorPicker").value;
  // tableHtml =
  //   `<div
  //             class="box"
  //             style="
  //             width: ${100 * (timeEnd - timeStart)}px;
  //             height: 60px;
  //             background-color: ${color};
  //             position: absolute;
  //             left: ${128 + 100 * (timeStart - 1)}px;
  //             top: ${85.5 + (day - 1) * 80}px;
  //             display: flex;
  //             align-content: center;
  //             justify-content: center;
  //             cursor: pointer;

  //             background-size: 200% auto;
  //             z-index: 2;
  //             transition: 0.3s;

  //             onclick="location.href='${link}'"
  //             onMouseOver="this.style.background-position='right center'"
  //     >
  //             <h4 style="color: blak;
  //                 font-family: 'Sora';
  //                 font-style: normal;
  //                 font-weight: 400;"
  //             >${subjectName}</h4>
  //     </div>` + tableHtml;
  // document.getElementById("table").innerHTML = tableHtml;

  var name = subjectName;
  var day = Number(day);
  timeStart = Number(timeStart) + 7;
  timeEnd = Number(timeEnd) + 7;
  // var color = "#9ADCFF";

  document.getElementById("addContentSubject").value = "";
  document.getElementById("addContentDate").value = 1;
  document.getElementById("addContentTimeStart").value = 1;
  document.getElementById("addContentTimeEnd").value = 1.5;
  document.getElementById("addContentLink").value = "";
  var res = await addDoc(itemsRef, {
    name,
    day,
    timeStart,
    timeEnd,
    link,
    color
  });
  setTable();
  // console.log(res);
  // let tableDelte = document.getElementById("tableDelete").innerHTML;
  // var days = "";
  // if (day == 1) days = "Mon";
  // if (day == 2) days = "Tue";
  // if (day == 3) days = "Wed";
  // if (day == 4) days = "Thu";
  // if (day == 5) days = "Fri";
  // tableDelte += `
  //       <tr>
  //         <td height="50px">${subjectName}</td>
  //         <td height="50px">${days}</td>
  //         <td height="50px">${Number(timeStart) + 7}</td>
  //         <td height="50px">${Number(timeEnd) + 7}</td>
  //         <td height="50px">
  //           <button onclick="deleteItem('
  //             ${res.docId}
  //           }')">Delete</button>
  //         </td>
  //       </tr>`;
  // document.getElementById("tableDelete").innerHTML = tableDelte;
}

async function deleteData() {
  const items = await getDocs(itemsRef);
  const datas = items.docs.map((item) => ({
    docId: item.id,
    ...item.data()
  }));
  for (let i = 0; i < datas.length; i++) {
    const docRef = doc(db, `test/${datas[i].docId}`);
    console.log(datas[i].docId);
    await deleteDoc(docRef);
  }
  console.log("delete");
}
var t = setInterval(setRecomendedLink, 1000);
function setRecomendedLink() {
  var inx = 0;
  var mn = 100000000000;
  var ans = -1;
  for (let i = 0; i < tempData.length; i++) {
    inx = i;
    const d = new Date();
    let day = d.getDay();
    // console.log("day");
    // console.log(day);
    // console.log(tempData[inx].day);
    if (day != tempData[inx].day) {
      continue;
    }
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    var time = Number(tempData[inx].timeStart) * 60 * 60;
    time -= hours * 60 * 60 + minutes * 60 + seconds;
    if (time < 0) {
      time = Number(tempData[inx].timeEnd) * 60 * 60;
      time -= hours * 60 * 60 + minutes * 60 + seconds;
    }
    if (time > 0 && time < mn) {
      mn = time;
      ans = i;
    }
    // console.log("time");
    // console.log(time);
    // console.log(tempData[inx].name);
    // console.log(ans);
  }
  inx = ans;
  if (inx == -1) {
    document.getElementById("showCd").innerHTML = "00:00:00";
    document.getElementById("showSubject").innerHTML = "No class";
    document.getElementById("showLink").innerHTML = `<a
    target="_blank"
    >...</a
  >`;
    if (inx == -1) return;
  }
  // console.log("inx");
  // console.log(inx);
  document.getElementById("showSubject").innerHTML = tempData[inx].name;
  // console.log(tempData[inx].name);
  const d = new Date();
  let day = d.getDay();
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();
  // console.log(day);
  // console.log(hours);
  // console.log(minutes);
  // console.log(seconds);
  var time = Number(tempData[inx].timeStart) * 60 * 60;
  // console.log("time1");
  // console.log(time);
  time -= hours * 60 * 60 + minutes * 60 + seconds;
  if (time < 0) {
    hours = 0;
    minutes = 0;
    seconds = 0;
    document.getElementById("showCd").innerHTML = "00:00:00";
    document.getElementById("showSubject").innerHTML = tempData[inx].name;
    document.getElementById("showLink").innerHTML = `<a
    target="_blank"
    href="${tempData[inx].link}"
    >Go to Link</a
  >`;
    return;
  } else {
    hours = Math.floor(time / 3600);
    minutes = Math.floor((time - hours * 60 * 60) / 60);
    seconds = time % 60;
  }
  // console.log("time");
  // console.log(time);
  // console.log(hours);
  // console.log(minutes);
  // console.log(seconds);
  var wh = "";
  var wm = "";
  var ws = "";
  if (hours < 10) wh = "0";
  if (minutes < 10) wm = "0";
  if (seconds < 10) ws = "0";
  document.getElementById("showCd").innerHTML =
    wh +
    String(hours) +
    ":" +
    wm +
    String(minutes) +
    ":" +
    ws +
    String(seconds);
  document.getElementById("showLink").innerHTML = `<a
  target="_blank"
  href="${tempData[inx].link}"
  >${tempData[inx].link}</a
>`;
  setTable();
}
async function deleteItem(docId) {
  console.log("deleteItem");
  // console.log(docId);
  const docRef = doc(db, `test/${docId}`);

  await deleteDoc(docRef);
  setTable();
}

window.addNewContent = addNewContent;
window.showData = showData;
window.deleteData = deleteData;
window.deleteItem = deleteItem;
