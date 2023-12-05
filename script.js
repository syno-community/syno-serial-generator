$(function () {

    $("#generate").click(function () {
        $("#sn").val(generateSerial($("#model").val()));
    });
   
    $("#generate").click(function () {
        $("#mac").val(generateMac($("#model").val()));
    });
    
    $.getJSON("synology.json", function(json) {

        $("#model").empty();
        $("#model").append($('<option>').text("Select model"));

        $.each(json, function(i, obj){
            $("#model").append($('<option>').text(obj.model).attr('value', obj.permanent));
        });
    });

});

function generateMac(permanent) {
    if(permanent == "Select model")
        return "Please select a model first!";
    return "001132" + random(1048576, 16777215).toString(16).toUpperCase();
}

function generateSerial(permanent) {
    if(permanent == "Select model") {
        return "Please select a model first!";
    }
    if (permanent == "SJR" || permanent == "SBR") {
        var beginArray = [
            "2030",
            "2040",
            "20C0",
            "2150"
        ];

        return (beginArray[Math.floor(Math.random()*beginArray.length)] + permanent + generateRandomLetter() + generateRandomValue() + generateRandomValue() + generateRandomValue() + generateRandomValue() + generateRandomLetter()).toUpperCase();
    }
    else if (permanent == "RFR") {
        var beginArray = [
            "1930",
            "1940"
        ];
        
        return (beginArray[Math.floor(Math.random()*beginArray.length)] + permanent + generateRandomLetter() + generateRandomValue() + generateRandomValue() + generateRandomValue() + generateRandomValue() + generateRandomLetter()).toUpperCase();
    }
    else if (permanent == "PDN") {
        var beginArray = [
            "1780",
            "1790",
            "1860",
            "1980"
        ];

        return (beginArray[Math.floor(Math.random()*beginArray.length)] + permanent + padLeft(random(1,030000),6)).toUpperCase();

    }
    else {
        return (random(11,14) + "30" + permanent + padLeft(random(1,030000),6)).toUpperCase();
    }

}

function padLeft(nr, n) {
    return Array(n - String(nr).length + 1).join('0') + nr;
}

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomLetter() {
  const alphabet = "abcdefghjklmnpqrstvwxyz"

  return alphabet[Math.floor(Math.random() * alphabet.length)]
}

function generateRandomValue() {
  const alphabet = "0123456789abcdefghjklmnpqrstvwxyz"

  return alphabet[Math.floor(Math.random() * alphabet.length)]
}
