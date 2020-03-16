/**
 * Created by Zeeshan on 6/11/14.
 */

function roundRobinRenamed(param1,param2) {

    drawCanvas();
    var ctx = document.getElementById("canvas").getContext("2d");

    function Process() {
        this.no;
        this.srvcT = 0;
        this.arrT = 0;
        this.waitT = 0;
        this.turnT = 0;
    }

    var noOfProcess = document.forms.form1.NoOfprocesses.value
        , srvcTArr = serviceTime()
        , arrTArr = arrivalTime()
        , quantamT, maxT = 0
        , count = []
        , robin = new Array(Number(noOfProcess))
        , process = [];

    for (var t in srvcTArr) {
        if (maxT < srvcTArr[t])
            maxT = Number(srvcTArr[t]);
    }

    //read quantum time
    quantamT = Number(prompt("Please Enter Quantam Time, Default : 4", 4));
    var noOfBreaks = Math.floor(Number(maxT) / Number(quantamT) + 1);

    for (var p = 0; p < Number(noOfProcess * noOfBreaks); p++)
        process.push(new Process());

    for (var i = 0; i < robin.length; i++)
        robin[i] = new Array(Number(noOfBreaks));

    for (var i = 0; i < noOfProcess; i++)
        for (var j = 0; j < robin[i].length; j++)
            robin[i][j] = 0;

    var pIndex = 0
        , bIndex;

    while (pIndex < Number(noOfProcess)) {
        bIndex = 0;
        while (srvcTArr[pIndex] > 0) {
            if (srvcTArr[pIndex] >= quantamT) {
                srvcTArr[pIndex] = srvcTArr[pIndex];
                robin[pIndex][bIndex] = quantamT;
                bIndex++;
            }
        }
        count[pIndex] = Number(bIndex - 1);
        pIndex++;
    }

    var indexx = -1;
    for (var j = 0; j < Number(noOfBreaks); j++)
        for (var i = 0; i < Number(noOfProcess); i++) {
            process[++indexx].no = i;
            process[indexx].srvcT = robin[i][j];
        }

    var incx = 0, y = 50, x = Number(arrTArr[0]) * 30 + 50;

    for (var i in process) {
        ctx.fillStyle = 'rgba(189,131,155,0.9)';
        ctx.fillRect(x + incx, y + 17 * process[i].no, process[i].srvcT * 30, 17);
        incx += process[i].srvcT * 30;
    }

}


function roundRobin1() {

    drawCanvas();
    var ctx = document.getElementById("canvas").getContext("2d");

    function Process() {
        this.no;
        this.srvcT = 0;
        this.arrT = 0;
        this.waitT = 0;
        this.turnT = 0;
    }

    var noOfProcess = document.forms.form1.NoOfprocesses.value
        , srvcTArr = serviceTime()
        , arrTArr = arrivalTime()
        , totalSrvcT = 0
        , dequed = false
        , dequedP
        , pIndex = Number(0)
        , ran = 0
        , quantamT = 4
        , bPrint
        , ready = new Queue()
        , processQue = new Queue()
        , process = []
        , dispatcher = new Process();

    dispatcher.no = 16;
    dispatcher.srvcT = 1;

    quantamT = Number(prompt("Please Enter Quantam Time, Default : 4", 4));

    for (var i = 0; i < noOfProcess; i++) {
        process.push(new Process());
        process[i].no = i;
        process[i].srvcT = srvcTArr[i];
        totalSrvcT += Number(process[i].srvcT);
        process[i].arrT = arrTArr[i];
    }

    var i = 0;
    while (i < totalSrvcT) {
        for (var j = i; j <= Number(ran); j++) {
            for (var k = pIndex; k < process.length; k++) {
                if (process[k].arrT == j) {
                    ready.enq(process[k]);
                    pIndex++;
                }
            }
        }
        if (dequed) {
            dequed = false;
            if (dequedP.srvcT > 0)
                ready.enq(dequedP);
        }

        if (ready.count() > 0) {
            dequed = true;
            dequedP = ready.deq();
            if (dequedP.srvcT > quantamT) {
                bPrint = Number(quantamT);
                dequedP.srvcT -= Number(quantamT);
                ran += Number(bPrint + 1);
                var temp = new Process();
                temp.no = dequedP.no;
                temp.srvcT = bPrint;
                temp.arrT = dequedP.arrT;
                processQue.enq(temp);
                processQue.enq(dispatcher);
            }
            else {
                bPrint = dequedP.srvcT;
                dequedP.srvcT = Number(0);
                ran += Number(bPrint + 1);
                var temp = new Process();
                temp.no = dequedP.no;
                temp.srvcT = Number(bPrint);
                temp.arrT = Number(dequedP.arrT);
                processQue.enq(temp);
                processQue.enq(dispatcher);
            }
        }
        i++;
    }

    var tempLen = Number(processQue.count() - 1);
    var incx = 0, y = 50, x = Number(arrTArr[0]) * 30 + 50;
    for (var i = 0; i < tempLen; i++) {
        var p = processQue.deq();
        ctx.fillStyle = 'rgba(189,131,155,0.9)';
        ctx.fillRect(x + incx, y + 17 * p.no, p.srvcT * 30, 17);
        incx += p.srvcT * 30;
    }

}

var cells = new Array()
//--------------------------------------------------------------
function makeGrid (nRows, nCols) {
    table = document.getElementById ('GRID')

    for (var i=0; i < table.rows.length; ) {
        table.deleteRow(0)
    }

    cells = new Array()

    for (var i=0; i<nRows; i++) {
        newrow = table.insertRow (i)
        for (var j=0; j< nCols; j++) {
            newcell = newrow.insertCell (j)

            newcell.index = i * nCols + j
            newcell.step = 0
            newcell.timerId = 0

            newcell.onmouseover = function (evt) { over (this) }
            newcell.onmouseout  = function (evt) { out  (this) }

            cells [ newcell.index ] = newcell
        }
    }

    return false // prevent page reload
}

//--------------------------------------------------------------
// global variables

var overColor = '#7093DB'
var outColor  = '#FFFFFF'

var steps = 50
var stepDuration = 40

//--------------------------------------------------------------
function over (cell) {
    clearTimeout (cell.timerId)  // stop transitioning
    cell.step = steps
    cell.style.backgroundColor = overColor
}

//--------------------------------------------------------------
function out (cell) {
    setTimeout ("doTransition("+cell.index+")", 0)
}