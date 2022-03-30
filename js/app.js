import { setCookie, getCookie } from "./utilities.js"
let username = getCookie("username")
function congratulation(ele) {
     let result = true;
     $(ele).find("input[type='checkbox']").each((i, e) => {
          if (!(e.checked))
               result = false;
     });
     if (result) {
          $(ele).text("")
          $(ele).append(`<div align="center"><img src="https://i.pinimg.com/originals/42/a4/27/42a4271628718662d468929271b69421.gif" ></div>`)
     }
}
function isChecked(ele) {
     $(ele).find(".form-check-label").css("text-decoration", "line-through")
     $(ele).removeClass("bg-primary");
     $(ele).addClass("bg-danger");
     $(ele).find(".form-check-input").removeClass("bg-primary")
     $(ele).find(".form-check-input").addClass("bg-danger")
}
function unchecked(ele) {
     $(ele).find(".form-check-label").css("text-decoration", "none")
     $(ele).addClass("bg-primary");
     $(ele).removeClass("bg-danger");
     $(ele).find(".form-check-input").removeClass("bg-danger")
}
function createIdTask(TodoList) {
     let aId = []
     let idTask = $(TodoList).attr("id")
     $(TodoList).find(".task").each(function (index, ele) {
          aId.push($(ele).attr("id"))
     })
     let i = 1
     while (i < 1000) {
          let id = idTask + "_Task" + i
          if (aId.indexOf(id) == -1)
               return id
          i++
     }

}
function createTask(todoList, cTodoList, data) {
     let id = createIdTask(todoList)
     let content = $(todoList).find(".inpNameTDL").val()
     let checked = false
     if (data) {
          id = data.id
          content = data.content
          checked = data.checked
     }
     let check = ""
     if (checked) {
          check = "checked"
     }
     let task = `<input class="form-check-input" ${check} type="checkbox">`
     task = task + `<label class="form-check-label ms-2" style="overflow:hidden; max-width:750px; white-space: nowrap;"> ${content} </label>`
     task = task + `<div class="mx-auto "></div><button class="btn btn-outline-primary rm"><i class="bi bi-trash "></i></button>`
     task = `<div class="nav">${task}</div>`;
     task = $.parseHTML(`<li id="${id}" class="list-group-item bg-primary bg-opacity-10 bg-primary task fs-5" >${task}</li>`)
     let cTask = {
          id,
          content,
          checked,
     }
     addEventChangeTask(cTodoList, task, cTask)
     addEventRemoveTask(cTodoList, task, cTask)
     return { task, cTask }
}
function addEventRemoveTask(cTodoList, task, cTask) {
     $(task).find('.rm').click(function () {
          $(task).remove();
          let curDataTodoList = JSON.parse(getCookie("DataTodoList"))
          curDataTodoList.filter((val) => val.username == username)[0].todoLists.filter((val) => val.id == cTodoList.id)[0].Tasks = (curDataTodoList.filter((val) => val.username == username)[0].todoLists.filter((val) => val.id == cTodoList.id)[0].Tasks.filter((val) => val.id != cTask.id))
          setCookie("DataTodoList", JSON.stringify(curDataTodoList))
          console.log(JSON.parse(getCookie("DataTodoList")))

     })
}
function changeStatusTask(idTDL, idTask, status) {
     let curDataTodoList = JSON.parse(getCookie("DataTodoList"))
     curDataTodoList.filter((val) => val.username == username)[0].todoLists.filter((val) => val.id == idTDL)[0].Tasks.filter((val) => val.id == idTask)[0].checked = status
     setCookie("DataTodoList", JSON.stringify(curDataTodoList))
     console.log(JSON.parse(getCookie("DataTodoList")))
}
function addEventChangeTask(cTodoList, task, cTask) {
     let fun = function () {
          if ($(this).find("input[type='checkbox']")[0].checked) {
               isChecked(task)
               changeStatusTask(cTodoList.id, cTask.id, true)
          }
          else {
               unchecked(task)
               changeStatusTask(cTodoList.id, cTask.id, false)

          }
          // congratulation($(task).parent());
     }
     $(task).change(fun)
}
function createIdTodoList() {
     let aId = []
     $("#TodoLists").find(".todoList").each(function (index, ele) {
          aId.push($(ele).attr("id"))
     })
     let i = 1
     while (i < 1000) {
          let id = "todoList" + i
          if (aId.indexOf(id) == -1)
               return id
          i++
     }

}

function createToDoList(data) {
     let id = createIdTodoList()
     let name = $("#inputNameTDL").val();
     console.log(data)
     if (data) {
          id = data.id
          name = data.name
     }
     let todoList = `<p class="text-center text-primary fs-4">${name}<p><input type="text" class="inpNameTDL form-control fs-5 bg-primary bg-opacity-10" placeholder="Add Task" value="" /></p>`
     todoList = todoList + `<ul class="list-group fs-5"> </ul>`
     todoList = `<div id="${id}" class="border boder-primary mb-3 todoList">${todoList}</div>`
     todoList = $.parseHTML(todoList)
     let cTodoList = {
          id,
          name,
          Tasks: []
     }
     return { todoList, cTodoList }
}
function isLoggedIn() {
     if (username != "")
          return true
     return false
}
function addTask(cTodoList, task, cTask) {
     $(`#${cTodoList.id}`).find(".list-group").append(task)
     let curDataTodoList = JSON.parse(getCookie("DataTodoList"))
     curDataTodoList.filter((val) => val.username == username)[0].todoLists.filter((val) => val.id == cTodoList.id)[0].Tasks.push(cTask)
     setCookie("DataTodoList", JSON.stringify(curDataTodoList))
     console.log(JSON.parse(getCookie("DataTodoList")))
}
function addTodoList(todoList, cTodoList) {
     $("#TodoLists").append(todoList)
     if (getCookie("DataTodoList") == "") {
          let dataUser = {
               username,
               todoLists: [cTodoList]
          }
          setCookie("DataTodoList", JSON.stringify([dataUser]))
          console.log(JSON.parse(getCookie("DataTodoList")))
     }
     else {
          let curDataTodoList = JSON.parse(getCookie("DataTodoList"))
          curDataTodoList.filter((val) => val.username == username)[0].todoLists.push(cTodoList)
          setCookie("DataTodoList", JSON.stringify(curDataTodoList))
          console.log(JSON.parse(getCookie("DataTodoList")))
     }
}
function addEventCreateTask(todoList, cTodoList) {
     $(todoList).find(".inpNameTDL").on("keypress", function (e) {
          if (e.keyCode == "13") {
               let { task, cTask } = createTask(todoList, cTodoList)
               addTask(cTodoList, task, cTask)
          }
     })
}
function loadTodoList() {
     let curDataTodoList = JSON.parse(getCookie("DataTodoList"))
     if (curDataTodoList.filter((val) => val.username == username).length > 0) {
          let curDataTodoList = JSON.parse(getCookie("DataTodoList"))
          curDataTodoList.filter((val) => val.username == username)[0].todoLists.map(function (val) {
               let { todoList, cTodoList } = createToDoList(val)
               addEventCreateTask(todoList, cTodoList)
               $("#TodoLists").append(todoList)
               val.Tasks.map(function (ele) {
                    let { task } = createTask(todoList, cTodoList, ele)
                    $(todoList).append(task)
                    if (ele.checked) {
                         isChecked(task)
                    }
               })
          })
     }
}

// setCookie("DataTodoList", "")
let curDataTodoList = JSON.parse(getCookie("DataTodoList"))
console.log(curDataTodoList.filter((val) => val.username == username))
console.log(getCookie("dataUser"))
console.log(getCookie("DataTodoList"))
loadTodoList()

if (isLoggedIn()) {
     $("#name").text(`${username}`)
     $("#btn-login").text(`Logout`)
     $("#btnAddTDL").click(function () {
          let { todoList, cTodoList } = createToDoList()
          addEventCreateTask(todoList, cTodoList)
          addTodoList(todoList, cTodoList)
     })
}

module.exports = isChecked;
