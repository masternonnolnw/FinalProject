function addNewContent() {
    var subjectName = document.getElementById("addContentSubject").value;
    var day = document.getElementById("addContentDate").value;
    var timeStart = document.getElementById("addContentTimeStart").value;
    var timeEnd = document.getElementById("addContentTimeEnd").value;
    var link = document.getElementById("addContentLink").value;

    let tableHtml = document.getElementById("table").innerHTML;
    tableHtml =
    `<div
            class="box"
            style="
            width: ${100 * (timeEnd - timeStart)}px;
            height: 60px;
            background-color: aliceblue;
            position: absolute;
            left: ${128 + 100 * (timeStart - 1)}px;
            top: ${85.5 + (day - 1) * 80}px;
            display: flex;
            align-content: center;
            justify-content: center;
            cursor: pointer;
            background-color: "#9ADCFF";


            background-size: 200% auto;
            z-index: 2;
            transition: 0.3s;
            "
            onclick="location.href='${link}'"
            onMouseOver="this.style.background-position='right center'"
    >
            <h4 style="color: blak;
                font-family: 'Sora';
                font-style: normal;
                font-weight: 400;"
            >${subjectName}</h4>
    </div>` + tableHtml;
      document.getElementById("table").innerHTML = tableHtml;
}