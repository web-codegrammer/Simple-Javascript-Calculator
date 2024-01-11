function getHistory() {
  return document.getElementById("history-value");
}
function printHistory(num) {
  document.getElementById("history-value").innerText = num;
}
function getOutput() {
  return document.getElementById("output-value").innerText;
}
function printOutput(num) {
  document.getElementById("output-value").innerText = num;
}
var lst = ["%", "/", "+", "-", "*"];
var f = false;
var operator = document.getElementsByClassName("number");

for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function () {
    if (this.id == "clear") {
      printHistory("");
      printOutput("");
    } else if (this.id == "backspace") {
      var output = getOutput();
      if (output) {
        //if output has a value
        output = output.substring(0, output.length - 1);
        //output = output;
        printOutput(output);
      }
    } else if (this.id == "=") {
      try {
        var output = getOutput();

        if (output == "NaN" || output == "" || f) {
          f = false;
          printOutput("");
          printHistory("");
        } else {
          var outpu = eval(output);
          // print(outpu);
          if (outpu == undefined) {
            outpu = "NaN";
            output = "";
          }
          f = true;
          printOutput(outpu);
          printHistory(output);
        }
      } catch (error) {
        outpu = "NaN";
        output = "";
        f = true;
        printOutput(outpu);
        printHistory(output);
      }
    } else {
      var output = getOutput().toString();
      //console.log(lst[1] == this.id);
      if (output.length == 0 && lst.includes(this.id)) {
        printOutput("");
        printHistory("");
        f = false;
      } else {
        if (f || output == "NaN") {
          if (!lst.includes(this.id)) {
            output = this.id;
            printHistory("");
          } else {
            output = output + this.id.toString();
          }
          f = false;
        } else {
          if (output.length > 0) output = output + this.id.toString();
          else output = this.id;
        }
        console.log(output);

        printOutput(output);
      }
    }
  });
}
