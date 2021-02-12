//print function
export function print(...messages) {
    const div = document.createElement('div');
    for (var message of messages) {
        var anchor = document.createElement('a');
        anchor.innerHTML = message;
        anchor.setAttribute("id", message);
        div.appendChild(anchor);
    }
    document.body.appendChild(div);
}

//print in color
export function printColour(...messagesAndColours) {
    var div = document.createElement('div');
    for (var i=0; i<messagesAndColours.length; i+=2){
        var message = messagesAndColours[i];
        var colour = messagesAndColours[i+1];
        var anchor = document.createElement('a');
        anchor.style.color = colour;
        anchor.innerHTML = message;
        anchor.setAttribute("id", message);
        div.appendChild(anchor);
    }
    document.body.appendChild(div);
}

//create hyperlink
export function printLink(text, link, colour) {
    var div = document.createElement('div');
    var anchor = document.createElement('a');
    anchor.innerHTML = text;
    anchor.href = link;
    if (colour != undefined) {
        anchor.style.color = colour;
    }
    anchor.setAttribute("id", text);
    div.appendChild(anchor);
    document.body.appendChild(anchor);
}

//add hyperlink to text
export function addLink(text, link) {
    var anchor = document.getElementById(text);
    anchor.href = link;
}

//print new line
export function newLine() { 
    print("<br/>");
}