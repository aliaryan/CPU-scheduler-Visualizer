/**
 * Created by Zeeshan on 6/11/14.
 */

function serviceTime() {
    var sTime = document.forms.form1.serviceTime.value;
    sTime = sTime.split(',');
    return sTime;
}

function arrivalTime() {
    var aTime = document.forms.form1.arrivalTime.value;
    aTime = aTime.split(',');
    return aTime;
}

function drawCanvas() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.fillStyle = 'rgba(53,202,67,0.3)';
    ctx.fillRect(0, 0, 965, 384);
    ctx.fillStyle = 'rgb(192,101,235)';
    var np = document.forms.form1.NoOfprocesses.value;
    ctx.lineWidth = 0.3;
    ctx.font = '20px new roman';
    for (var i = 50, j = 0; i < 955; i += 30, j++) {
        ctx.moveTo(i, 50);
        ctx.lineTo(i, 373);
    }
    for (var i = 50, j = 0; i < 965; i += 30, j++) {
        if (j - 1 % 10 == 0)
            ctx.fillText(j, i - 2, 50);
        else
            ctx.fillText(j, i - 7, 50);
    }

    ctx.font = '12px new roman';
    for (var i = 50, j = 0; i < 377; i += 17, j++) {
        if (j < np)
            ctx.fillText("P " + j, 20, i + 13);
        ctx.moveTo(50, i);
        ctx.lineTo(950, i);
    }
    ctx.stroke();
    ctx.fillText("Disp", 13, 332);
    ctx.fillText("I/O ", 13, 367);
}

function sortIt(list)		//sorts collection of objects wrt serviceTime
{
    for (var i = 0; i < list.length - 1; i++)
        for (var j = i + 1; j < list.length; j++) {
            if (list[i].srvcT > list[j].srvcT) {
                var temp = list[i];
                list[i] = list[j];
                list[j] = temp;
            }
        }
    var ret = [];
    ret = list;
    return ret;
}
function sortIt2(list)		//sorts collection of objects wrt arrivalTime
{
    for (var i = 0; i < list.length - 1; i++)
        for (var j = i + 1; j < list.length; j++) {
            if (list[i].arrT > list[j].arrT) {
                var temp = list[i];
                list[i] = list[j];
                list[j] = temp;
            }
        }
    var ret = [];
    ret = list;
    return ret;
}

function addRange(dest, src)  // adds collection src to collection dest
{
    for (var i = 0; i < src.length; i++) {
        dest.push(src[i]);
    }
}