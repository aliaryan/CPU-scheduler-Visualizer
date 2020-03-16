/**
 * Created by Zeeshan on 6/11/14.
 */


function spn() {

    drawCanvas();
    var ctx = document.getElementById("canvas").getContext("2d");

    function Process() {
        this.no;
        this.srvcT = 0;
        this.waitT = 0;
        this.turnT = 0;
    }

    var noOfProcess = document.forms.form1.NoOfprocesses.value
        , srvcTArr = serviceTime()
        , arrTArr = arrivalTime()
        , process = [];

    for (var i = 0; i < noOfProcess + 1; i++)
        process.push(new Process());
    for (var i = 1; i < noOfProcess + 1; i++) {
        process[i].no = i - 1;
        process[i].srvcT = srvcTArr[i - 1];
    }
    var temp = new Process();
    for (var i = 1; i < noOfProcess; i++)
        for (var j = i + 1; j < noOfProcess + 1; j++) {

            if (process[i].srvcT > process[j].srvcT) {
                temp = process[i];
                process[i] = process[j];
                process[j] = temp;
            }
        }
    var incx = 0, y = 50;
    var x = Number(arrTArr[0]) * 30 + 50;
    for (var i = 1; i < noOfProcess + 1; i++) {
        ctx.fillStyle = 'rgba(189,131,155,0.9)';
        ctx.fillRect(x + incx, y + 17 * process[i].no, process[i].srvcT * 30, 17);
        incx += process[i].srvcT * 30;
    }
}

function spn2() {

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
        , totalBT = 0
        , pIndex = 0
        , count = -1
        , sPN = []
        , tempArr = []
        , sPN2 = []
        , tempArr2 = []
        , transfer = []
        , dispatcher = new Process();

    dispatcher.no = 16;
    dispatcher.srvcT = Number(1);

    var tempQueue = []
        , arrTMax = 8;

    for (var i = 0; i < Number(noOfProcess); i++) {
        process.push(new Process());
        transfer.push(new Process());
    }
    for (var i = 0; i < Number(noOfProcess); i++) {
        process[i].no = i;
        process[i].srvcT = srvcTArr[i];
        totalBT += Number(process[i].srvcT);
        process[i].arrT = arrTArr[i];
        transfer[i].no = i;
        transfer[i].srvcT = srvcTArr[i];
        transfer[i].arrT = arrTArr[i];
    }
    var tAT = process[0].arrT;
    while (process[++count].arrT == tAT) {
        tempArr[count] = process[count];
        tempArr2[count] = transfer[count];

    }
    tempArr = sortIt(tempArr);
    tempArr2 = sortIt(tempArr2);
    for (var i = tempArr.length; i < process.length; i++) {
        tempArr[i] = process[i];
        tempArr2[i] = transfer[i];
    }
    for (var i = 0; i < process.length; i++) {
        process[i] = tempArr[i];
        transfer[i] = tempArr2[i];
    }
    sPN.push(transfer[0]);
    function addRange(dest, src) {
        for (var i = 0; i < src.length; i++) {
            dest.push(src[i]);
        }
    }

    var maxcomp
        , inflag = false;

    for (var i = 0; i < Number(totalBT); i++) {
        while ((tempArr[pIndex].srvcT--) != 0) {
            for (var k = pIndex + 1; k < process.length; k++)
                if (tempArr[k].arrT == i) {

                    tempQueue.push(transfer[k]);

                }

            i++;
            maxcomp = i;

        }
        pIndex++;
        tempQueue = sortIt(tempQueue);
        for (var m in tempQueue) {
            sPN.push(tempQueue[m]);
        }
        for (var l in sPN)
            tempQueue = [];
        if (maxcomp >= arrTMax)
            break;
    }

    var spnPrint = []
        , counti = -1;

    for (var i = 0; i < Number(noOfProcess * 2 - 1); i++) {
        if (i % 2 === 0)
            spnPrint.push(sPN[++counti]);
        else
            spnPrint.push(dispatcher);
    }

    var incx = 0, y = 50, x = Number(arrTArr[0]) * 30 + 50;
    for (var i = 0; i < Number(noOfProcess * 2 - 1); i++) {
        ctx.fillStyle = 'rgba(189,131,155,0.9)';
        ctx.fillRect(x + incx, y + 17 * spnPrint[i].no, spnPrint[i].srvcT * 30, 17);
        incx += spnPrint[i].srvcT * 30;
    }
}