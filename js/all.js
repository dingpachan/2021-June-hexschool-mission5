const list_menu = document.querySelector(".list-menu");
const all_tab = document.querySelector(".all-tab");
const todo_tab = document.querySelector(".todo-tab");
const done_tab = document.querySelector(".done-tab");
const list = document.querySelector(".list");
const not_finish = document.querySelector(".not-finish");
const add_btn = document.querySelector(".add-btn");
const add_content = document.querySelector(".add");
const clear_btn = document.querySelector(".clear-done");
const card = document.querySelector(".card");
const card_footer = document.querySelector(".card-footer");

let data_obj = [
    {
        todo: "把冰箱發霉的檸檬拿去丟",
        is_done: false
    },
    {
        todo: "打電話叫媽媽匯款給我",
        is_done: true
    },
    {
        todo: "整理電腦資料夾",
        is_done: false
    },
    {
        todo: "繳電費水費瓦斯費",
        is_done: true
    },
    {
        todo: "刪訊息",
        is_done: false
    },
    {
        todo: "約vicky禮拜三泡溫泉",
        is_done: false
    },
    {
        todo: "約ada禮拜四吃晚餐",
        is_done: false
    }
];



// 資料初始化
function render(){
    if (data_obj.length == 0) {
        card.style.display = "none";
        // card.classList.add("d-none");
        return;
    }

    let str = ""; // todo list 內容
    let not_finish_amount = 0; // 計算未完成數量

    data_obj.forEach(function(item,index){
        if( item.is_done == false ) {
            not_finish_amount ++;
            str += `<li><input type="checkbox" id="todo-item${index+1}" data-num=${index}><label for="todo-item${index+1}" class="todo-item"><span class="box"></span><div class="task">${item.todo}</div></label><a href="#" class="delete" data-num=${index}></a></li>`;
        } else if ( item.is_done == true ) {
            str += `<li><input type="checkbox" id="todo-item${index+1}" data-num=${index} checked><label for="todo-item${index+1}" class="todo-item"><span class="box"></span><div class="task task-done">${item.todo}</div></label><a href="#" class="delete" data-num=${index}></a></li>`;
        }
    });

    list.innerHTML = str;
    not_finish.innerHTML = `${not_finish_amount} 個待完成項目`;
}

render();

// 偵測點選 todo 項目
list.addEventListener("click",function(e){
    if (data_obj.length == 0) {
        // card.style.display = "none";
        card.classList.add("d-none");
        return;
    }
    if ( e.target.nodeName == "INPUT" ) {
        let data_num = e.target.getAttribute("data-num");
        if ( data_obj[data_num].is_done == false ) {
            data_obj[data_num].is_done = true;
        } else if ( data_obj[data_num].is_done == true ) {
            data_obj[data_num].is_done = false;
        }
        render();
    }
    // 刪除待辦
    if ( e.target.getAttribute("class") == "delete" ) {
        let data_num = e.target.getAttribute("data-num");
        data_obj.splice(data_num, 1);
        render();
    }
});

// 偵測點選 add-btn
add_btn.addEventListener("click", function(e){
    if ( add_content.value == "" ) {
        alert("待辦事項不可為空!");
        return;
    }

    let tmp_obj = {};
    tmp_obj.todo = add_content.value;
    tmp_obj.is_done = false;
    data_obj.push(tmp_obj);
    render();
    add_content.value = "";
});

// 清除已完成項目
clear_btn.addEventListener("click", function(e){
    data_obj.forEach(function(item,index){
        if ( item.is_done == true ) {
            data_obj.splice(index, 1);
        }
    });
    render();
});

// 偵測選擇顯示內容：全部、待完成、已完成
list_menu.addEventListener("click", function(e){
    let str = "";
    if ( e.target.innerText == "待完成" ) {
        e.preventDefault();
        data_obj.forEach(function(item,index){
            if( item.is_done == false ) {
                str += `<li><input type="checkbox" id="todo-item${index+1}" data-num=${index}><label for="todo-item${index+1}" class="todo-item"><span class="box"></span><div class="task">${item.todo}</div></label><a href="#" class="delete" data-num=${index}></a></li>`;
            }
        });
    
        list.innerHTML = str;
        card_footer.classList.add("d-none");
    } else if ( e.target.innerText == "已完成" ) {
        e.preventDefault();
        data_obj.forEach(function(item,index){
            if( item.is_done == true ) {
                str += `<li><input type="checkbox" id="todo-item${index+1}" data-num=${index} checked><label for="todo-item${index+1}" class="todo-item"><span class="box"></span><div class="task task-done">${item.todo}</div></label><a href="#" class="delete" data-num=${index}></a></li>`;
            }
        });
    
        list.innerHTML = str;
        card_footer.classList.add("d-none");
    } else {
        e.preventDefault();
        render();
        card_footer.classList.remove("d-none");
    }
});
