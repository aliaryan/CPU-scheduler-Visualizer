/**
 * Created by Zeeshan on 6/11/14.
 */
function srn() {

    drawCanvas();
    var ctx = document.getElementById("canvas").getContext("2d");

    function Process() {
        this.no;
        this.srvcT = 0;
        this.arrT = 0;
        this.waitT = 0;
        this.turnT = 0;
        this.state;
    }

    var noOfProcess = document.forms.form1.NoOfprocesses.value
        , srvcTArr = serviceTime()
        , arrTArr = arrivalTime()
        , process = []
        , totalTime = 0;

    for (var i = 0; i < noOfProcess + 1; i++)
        process.push(new Process());

    for (var i = 1; i < (Number(noOfProcess) + 1); i++) {
        process[i].no = i - 1;
        process[i].srvcT = srvcTArr[i - 1];
        totalTime += Number(process[i].srvcT);
        process[i].arrT = arrTArr[i - 1];
        process[i].state = "T";
    }

    var count = 0
        , tempArr = [],
        tAT = process[1].arrT;

    while (process[++count].arrT == tAT) {
        tempArr[count] = process[count];
    }

    tempArr = sortIt(tempArr);
    for (var i = tempArr.length; i < process.length; i++) {
        tempArr[i] = process[i];
    }
    process = tempArr;
    var temp
        , temp1;

    for (var i = noOfProcess; i > 0; i--) {
        for (var j = 3; j < Number(noOfProcess + 1); j++) {

            if (process[j - 1].srvcT > process[j].srvcT) {
                temp = process[j - 1];
                process[j - 1] = process[j];
                process[j] = temp;
            }
        }
    }

    var incx = 0, y = 50, x = Number(arrTArr[0]) * 30 + 50;

    for (var i = 1; i < noOfProcess + 1; i++) {
        ctx.fillStyle = 'rgba(189,131,155,0.9)';
        ctx.fillRect(x + incx, y + 17 * process[i].no, process[i].srvcT * 30, 17);
        incx += process[i].srvcT * 30;
    }
}