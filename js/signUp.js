import { setCookie, getCookie } from "./utilities.js"
setCookie("username", "")
// setCookie("dataUser", "")
console.log(getCookie("dataUser"))
$("#signUp").click(function () {
     let username = $("#username").val();
     let password = $("#password").val();
     let repassword = $("#repassword").val();
     if (password == repassword) {
          let acc = { username, password }
          if (getCookie("dataUser") != "") {
               let curDataUser = JSON.parse(getCookie("dataUser"))
               if (curDataUser.map((e) => e.username).indexOf(acc.username) > -1) {
                    alert("Username already exists")
               }
               else{
                    curDataUser.push(acc)
                    setCookie("username", username, 30);
                    setCookie("dataUser", JSON.stringify(curDataUser))
               }
          }
          else {
               setCookie("username", username, 30);
               setCookie("dataUser", JSON.stringify([acc]))
          }
     }
     else
          alert("Repassword ERR")
     location.assign("./index.html");
})