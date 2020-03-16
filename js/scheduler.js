
(function (window, $) {

    $(function () {

        $('#rotatescroll').tinycircleslider({ interval: true, snaptodots: true });
        $("#onSchedule").live("click", function () {
            var radioalg = $("input:radio[name:radioalgo]:checked").val();
            if (radioalg == "fcfs")
                fcfs();
            else if (radioalg == "spn")
                spn2();
            else if (radioalg == "srn")
                alert("Not Working Yet!");
            else if (radioalg == "rr")
                roundRobin1();
            else
                alert("Select An Algorithm First!");
        });

        $("#NoOfprocesses").addClass("lightText").val("Enter no. of Process").focus(function () {
            if ($(this).val() == "Enter no. of Process")
                $(this).removeClass("lightText").val("");
        }).blur(function () {
                if ($(this).val() == "")
                    $(this).addClass("lightText").val("Enter no. of Process");
            });


        $("#arrivalTime").addClass("lightText").val("Enter Arrival Time").focus(function () {
            if ($(this).val() == "Enter Arrival Time")
                $(this).removeClass("lightText").val("");
        }).blur(function () {
                if ($(this).val() == "")
                    $(this).addClass("lightText").val("Enter Arrival Time");
            });

        $("#serviceTime").addClass("lightText").val("Enter Service Time").focus(function () {
            if ($(this).val() == "Enter Service Time")
                $(this).removeClass("lightText").val("");
        }).blur(function () {
                if ($(this).val() == "")
                    $(this).addClass("lightText").val("Enter Service Time");
            });

        $("#search").addClass("lightText").val("search").focus(function () {
            if ($(this).val() == "search")
                $(this).removeClass("lightText").val("");
        }).blur(function () {
                if ($(this).val() == "")
                    $(this).addClass("lightText").val("search");
            });

        $("#onRefresh").one("click", function () {
            window.location.reload();
        });

        $("#onChromeDownload").one("click", function () {
            window.open("http://www.google.com/chrome/index.html?hl=en&brand=CHMB&utm_campaign=en&utm_source=en-ha-seaother-other-sk&utm_medium=ha#eula");
        });


        $("#SchedulingPara").text("What is Scheduling? In uniprocessor only one process is running. A process migrates between various scheduling queues throughout its lifetime. The process of selecting processes from among these queues is carried out by a scheduler.The aim of processor scheduling is to assign processes to be executed by the processor. Scheduling affects the performance of the system, because it determines which process will wait and which will progress.").css("font-size", "17px").css("font-family", "'Comic Sans MS', cursive");

        $("#SPNPara").text("The process with the shortest expected processing time is selected for execution, among the available processes in the ready queue. Thus, a short process will jump to the head of the queue over long jobs. If the next CPU bursts of two processes are the same then FCFS scheduling is used to break the tie.SJF scheduling algorithm is probably optimal. It givs the minimum average time for a given set of processes.It cannot be implemented at the level of short term CPU scheduling. There is no way of knowing the shortest CPU burst.").css("font-size", "25px").css("font-family", "'Comic Sans MS', cursive");


    }); // onReady


})(window, jQuery);
