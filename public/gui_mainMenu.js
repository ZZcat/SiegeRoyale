var menuGUI = new dat.GUI({ autoPlace: false });
menuGUI.domElement.id = 'menu_gui';
mainMenu_container.appendChild(menuGUI.domElement);


menuGUI.__closeButton.hidden = true // Don't let user close this menu by hand

//Make full screen
menuGUI.width=window.innerWidth
menuGUI.height=window.innerHeight

menuGUI.add(config, "name").listen();


//menuGUI.add({ 1:function(){ console.log("port1..."); serverStart(2000); }}, '1');
//menuGUI.add({ 2:function(){ console.log("port2..."); serverStart(2001); }}, '2');
menuGUI.add({ start:function(){ console.log("Starting..."); server(config['name'
], 2000); game.start(); menuGUI.close() }}, 'start');


// Start new start menu here

// Create the button and the text inside
var btn = document.createElement("button");
var btnText = document.createTextNode("This is just a button");
btn.appendChild(btnText);



// Add to the div (main)
var element = document.getElementById("main");
element.appendChild(btn); // Use element.removeChild(btn) to remove