// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.
"use strict";

// Write your Javascript code.

document.getElementById("submitName").disabled = true;
document.getElementById("userCard").style.display = "none";


var connection = new signalR.HubConnectionBuilder().withUrl("/notificationHub").build();

connection.on("RecieveNotification", (user, message) =>  {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&gt;");
    var from = user;
    console.log(from);
    console.log(user);
    
    var li = document.createElement("li");
    if (from === localStorage.getItem("USERNAME")) {
        li.setAttribute("class", "list-group-item list-group-item-info text-right");
    } else {
        li.setAttribute("class", "list-group-item list-group-item-success text-left");

    }
    li.textContent = user +"----" + msg;
    document.getElementById("messages").appendChild(li);
});

connection.start().then(() => {
    document.getElementById("submitName").disabled = false;
    document.getElementById("messageCard").style.display = "none";
}).catch((err) => {
    return console.error(err.toString());
});

document.getElementById("submitName").addEventListener("click", (e) => {
    var input = document.getElementById("usernameInput").value;
    var currentUserDisplay = document.getElementById("currentUser");
    currentUserDisplay.innerText = input;
    localStorage.setItem("USERNAME", input);
    document.getElementById("messageCard").style.display = "block";
    document.getElementById("usernameCard").style.display = "none";
    document.getElementById("userCard").style.display = "block";
    e.preventDefault();
});

document.getElementById("sendMessage").addEventListener("click", (e) => {
    var message = document.getElementById("messageBox").value;
    var username = localStorage.getItem("USERNAME");
    connection.invoke("Notify", username, message).catch((err) => {
        console.log(err.toString());
    });
    e.preventDefault();

});
