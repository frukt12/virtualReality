import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

const T7_PROMOTER = "GGTAATACGACTCACTATAG"; // GG added for better annealing in beginning

Template.insert.events({
  'click #submit'(event, instance) {
    event.preventDefault();
    let input = $("#code").val();
    let prefix = $("#prefix").val();
    let amount = $("#amount").val();



    let code = cleanCode(input);

    code.map((key) => {
      key[1] = addPromoter(key[1]);
    });

    code.map((key) => {
      key[1] = reverseComplement(key[1]);
    });

    code.map((key) => {
      key[0] = prefix+key[0];
    });

    console.log(code);
    // code.map((key) => {
    //   $("#output").append("<b>"+key[0]+"</b><br>"+key[1]+"<br>");
    // });

    code.map((key) => {
      $("#order").append(key[0]+","+key[1]+","+amount+",STD\n");
    });
    //
    // $("#table").append("<table>");
    // code.map((key) => {
    //   $("#table").append("<tr>");
    //   $("#table").append("<td><b>"+key[0]+"</b></td><td>"+key[1]+"</td>");
    //   $("#table").append("</tr>");
    // });
    // $("#table").append("</table>");
  },
});

function reverseComplement(input){
  let foo = "";
  for(let i=input.length-1; i>=0; i--){
    let n = input[i];
    if(n === "A") foo += "T";
    if(n === "T") foo += "A";
    if(n === "U") foo += "A";
    if(n === "C") foo += "G";
    if(n === "G") foo += "C";
  }
  return foo;
}

function addPromoter(input){
  return T7_PROMOTER + input;
}

function cleanCode(input){
  let code = input.split("\n");

  // Remove empty lines
  code = code.filter((key) => {
    if(key !== "") return true;
  });

  // Split lines on space
  code = code.map((key) => {
    let foo = key.split(/(\s+)/); // Split on whitespace
    foo = foo.filter((bar) => { // Remove strings that are only whitespace
      if (/\S/.test(bar)) return true;
    })
    return foo;
  });

  return code
}
