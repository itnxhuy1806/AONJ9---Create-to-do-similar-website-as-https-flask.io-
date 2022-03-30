const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
const isChecked = require('./app.js');
const $ = require('jquery');
test('displays task', () => {
     // Set up our document body

     let id = "task1"
     let content = "task"
     let check = ""
     let task = `<input class="form-check-input" ${check} type="checkbox">`
     task = task + `<label class="form-check-label ms-2" style="overflow:hidden; max-width:750px; white-space: nowrap;"> ${content} </label>`
     task = task + `<div class="mx-auto "></div><button class="btn btn-outline-primary rm"><i class="bi bi-trash "></i></button>`
     task = `<div class="nav">${task}</div>`;
     task = `<li id="${id}" class="list-group-item bg-primary bg-opacity-10 bg-primary task fs-5" >${task}</li>`
     dom.window.document.body.innerHTML = `<div>${task}</div>`
     let ele = $(`#${id}`)
     isChecked(ele)
     expect($(ele).find(".form-check-input").attr('class').toMatch(/task/));
});