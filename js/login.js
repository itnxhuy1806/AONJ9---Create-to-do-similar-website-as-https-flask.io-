import { setCookie, getCookie } from "./utilities.js"

function checkLogin(data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].username == $("#username").val() && data[i].password == $("#password").val()) {
            return true
        }
    }
    return false
}
setCookie("username", "", 30);
console.log(getCookie("dataUser"))

$("#login").click(function () {
    let dataUser = JSON.parse(getCookie("dataUser"))
    console.log(checkLogin(dataUser))
    if (checkLogin(dataUser)) {
        setCookie("username", $("#username").val(), 30)
        location.assign("./index.html")
    }
    else
        alert("Incorrect username or password")

})
