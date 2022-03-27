function congratulation() {
     let result = true;
     $("#listTask").find("input[type='checkbox']").each((i, e) => {
          if (!(e.checked))
               result = false;
     });
     if (result) {
          $("#app").text("")
          $("#app").append(`<div align="center"><img src="https://i.pinimg.com/originals/42/a4/27/42a4271628718662d468929271b69421.gif" ></div>`)
     }
}
function isChecked() {
     $(this).find(".form-check-label").css("text-decoration", "line-through")
     $(this).removeClass("bg-primary");
     $(this).addClass("bg-danger");
     $(this).find(".form-check-input").removeClass("bg-primary")
     $(this).find(".form-check-input").addClass("bg-danger")
}
function unchecked() {
     $(this).find(".form-check-label").css("text-decoration", "none")
     $(this).addClass("bg-primary");
     $(this).removeClass("bg-danger");
     $(this).find(".form-check-input").removeClass("bg-danger")
}
function createTask() {
     let task = `<input class="form-check-input "type="checkbox">`
     task = task + `<label class="form-check-label ms-2" style="overflow:hidden; max-width:750px; white-space: nowrap;"> ${$(this).val()} </label>`
     task = task + `<div class="mx-auto "></div><button class="btn btn-outline-primary rm"><i class="bi bi-trash "></i></button>`
     task = `<div class="nav">${task}</div>`;
     task = $.parseHTML(`<li class="list-group-item bg-primary bg-opacity-10 bg-primary"  >${task}</li>`)
     return task
}
function removeTask(task) {
     $(task).find('.rm').click(() => {
          $(task).remove();
     })
}
function addChange(task) {
     $(task).change(function () {
          if ($(this).find("input[type='checkbox']")[0].checked)
               isChecked.call(task)
          else
               unchecked.call(task)
          congratulation();
     })
}
$("#addTask").on("keypress", function (e) {
     if (e.keyCode == "13") {
          let task = createTask.call(this)
          addChange(task)
          removeTask(task)
          $(".list-group").append(task)
          $(this).val("")
     }
})