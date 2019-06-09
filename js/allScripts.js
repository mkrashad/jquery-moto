$(document).ready(function () {

    //�������
    $('#small a').click(function (eventObject) {
        if ($('#big img').attr('src') != $(this).attr('href')) {

            $('#big img').hide().attr('src', $(this).attr('href'));
            $('#big img').fadeIn(2000);
        }
        eventObject.preventDefault();
    });

    $('#switchGal').click(function () {
        $('#gallery').toggle("slow");
    });

    $('#small a img').click(function () {
        $('#small a img').fadeTo(1000, 1);
        $(this).fadeTo(1000, 0.6);
    });

    //�������� email ������ ������������
    var regV = /[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}/;

    $('#email').blur(function () {

        var myEmail = $(this).val();

        if (myEmail == "") {
            $(this).val("������: you@site.ru").css('border', 'none');
        }

        else if (myEmail.search(regV) == -1)
            $(this).css('border', '1px solid red');

        else
            $(this).css('border', '1px solid green');

    });

    //���������� ������ ��������
    $('#my_button').click(function (eventObject) {
        var myDate = $('#date');

        if (myDate.val() == "") {
            myDate.css('background-color', '#cc0000').effect('pulsate', 1000).effect('shake', function () {
                myDate.css('background-color', '#f6f6f6');
            });
        }
        $(this).attr('disabled', true);
        $(this).attr('value', '���������...');
        eventObject.preventDefault();
    });

    //���������
    $("#date").datepicker({
        changeMonth: true,
        changeYear: true
    });


    //����������� ���������
    (function (factory) {
        if (typeof define === "function" && define.amd) {

            // AMD. Register as an anonymous module.
            define(["../widgets/datepicker"], factory);
        } else {

            // Browser globals
            factory(jQuery.datepicker);
        }
    }(function (datepicker) {

        datepicker.regional.ru = {
            closeText: "�������",
            prevText: "&#x3C;����",
            nextText: "����&#x3E;",
            currentText: "�������",
            monthNames: ["������", "�������", "����", "������", "���", "����",
                "����", "������", "��������", "�������", "������", "�������"],
            monthNamesShort: ["���", "���", "���", "���", "���", "���",
                "���", "���", "���", "���", "���", "���"],
            dayNames: ["�����������", "�����������", "�������", "�����", "�������", "�������", "�������"],
            dayNamesShort: ["���", "���", "���", "���", "���", "���", "���"],
            dayNamesMin: ["��", "��", "��", "��", "��", "��", "��"],
            weekHeader: "���",
            dateFormat: "dd.mm.yy",
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ""
        };
        datepicker.setDefaults(datepicker.regional.ru);

        return datepicker.regional.ru;

    }));

    //�������
    $("#slider-range").slider({
        range: true,
        min: 10,
        max: 1000,
        values: [50, 400],
        slide: function (event, ui) {
            $("#amount").val(ui.values[0] + " - " + ui.values[1] + " ��");
        }
    });
    $("#amount").val($("#slider-range").slider("values", 0) +
        " - " + $("#slider-range").slider("values", 1) + " ��");

    //���������� ����
    $("#dialog").dialog({
        autoOpen: false,
        show: {
            effect: "blind",
            duration: 1000
        },
        hide: {
            effect: "explode",
            duration: 1000
        }
    });

    $("#help").on("click", function () {
        $("#dialog").dialog("open");
    });

    //������ ������
    $("input[type=submit]").button();

    //Tabs
    $("#tabs").tabs();

    //Accordion
    $("#accordion").accordion();

    //Progress
    $("#progressbar").progressbar({
        value: 0
    });

    $('#opros :radio').change(function () {

        var chRadio = $('#opros :radio:checked').length;
        $("#progressbar").progressbar({
            value: chRadio * 20
        });

        var questCount = $('#opros div[id*=radio]').length;
        $('#answerCount').text('���� ������� ' + chRadio + ' �� ' + questCount);

        $('#my_button').attr('disabled', 'disabled');

        if (chRadio == questCount) {
            $('#my_button').attr('disabled', false);
        }
    });

    //Autocomplete
    var availableTags = [
        "������������",
        "�������������",
        "�����������",
        "�����������"
    ];
    $("#tags").autocomplete({
        source: availableTags
    });

    //Draggable 
    $('div[id*=helmet]').draggable({
        containment: "#bound",
        revert: "invalid",
        helper: "clone",
        cursor: "move"
    });

    //Droppable Recycle Bin
    var helmetsCount = 0;
    var summa = 0;

    $('#mycart').droppable({
        accept: '#forHelmets div[id*=helmet]',
        activeClass: 'highlight',
        drop: function (event, ui) {
            helmetsCount++;
            if (helmetsCount > 0) { $('#myclear').show(); }
            $('#helmetsCount strong').text(helmetsCount);
            var helmet = $(ui.draggable);
            summa += parseInt(helmet.attr('title'));
            $('#helmetsSumm strong').text(summa);
            helmet.fadeOut(200, function () {
                $(this).appendTo('#mycart').fadeIn(1000).find('img').animate({
                    'width': '90',
                    'height': '80'
                }, 2000);
            });
        }
    });

    $('#forHelmets').droppable({
        accept: '#mycart div[id*=helmet]',
        activeClass: 'highlight',
        drop: function (event, ui) {
            helmetsCount--;
            if (helmetsCount == 0) { $('#myclear').hide(); }
            $('#helmetsCount strong').text(helmetsCount);
            var helmet2 = $(ui.draggable);
            summa -= parseInt(helmet2.attr('title'));
            $('#helmetsSumm strong').text(summa);
            helmet2.fadeOut(200, function () {
                $(this).appendTo('#forHelmets').fadeIn(1000).find('img').animate({
                    'width': '180',
                    'height': '160'
                }, 2000);
            });
        }
    });

    //Sortable
    $("#sortable").sortable({
        placeholder: "ui-state-highlight"
    });
    $("#sortable").disableSelection();

    //Selectable
    $("#selectable").selectable();

    //Effects
    $('#formHide').click(function () {

        $('#my_form').toggle('slide');

    });

    var state = true;
    $( "#formColor" ).on( "click", function() {
      if ( state ) {
        $( "#bigform > fieldset" ).animate({
          backgroundColor: "#e9f0e7"
        }, 5000 );
      } else {
        $( "#bigform > fieldset" ).animate({
          backgroundColor: "#e7e7f0"
        }, 5000 );
      }
      state = !state;
    });

    //Zoom
    $('#zoom').on( "click", function(){

        $('#tabs p').switchClass('forP','forP2',2000);
        $('.forP2').switchClass('forP2','forP',2000);

    });

});//����� ready
