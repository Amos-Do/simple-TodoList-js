let list = document.querySelector('.list');
let sendData = document.querySelector('.send');
let textInput = document.querySelector('.text-input');
let unCheck = 'fa-circle-thin'
let check = 'fa-check-circle';
let lineThrough = 'line-through';
// 重新整理時，也可以讀到 localStorage 的值
let todoListData = JSON.parse(localStorage.getItem('listData')) || [];

// 監聽 與 更新
sendData.addEventListener('click',addData);
list.addEventListener('click',delAndComData);
textInput.addEventListener('keydown',enterAdd);
updateList(todoListData);

// 加入列表，同時更新網頁與 localStorage
function addData(e) {
    e.preventDefault();
    let addText = textInput.value;
    if (addText === '') { return; };
    let todo = {
        check: '0',
        content: addText,
    }
    todoListData.push(todo);
    // 更新網頁
    updateList(todoListData);
    // 更新 localStorage
    localStorage.setItem('listData', JSON.stringify(todoListData));
}

// 按 enter (keyCode 13) 加入列表
function enterAdd(e) {
    switch (e.keyCode) {
        case 13 :
            addData(e);
    }
}

// 更新網頁內容
function updateList(items) {
    let str='';
    let itemsLen = items.length;
    let checkDone = {
        done: unCheck,
        line: '',
    }
    for (let i = 0; i < itemsLen; i++) {
        if (items[i].check === '1') {
            checkDone.done = check;
            checkDone.line = lineThrough;
        } else {
            checkDone.done = unCheck;
            checkDone.line = '';
        }
        str += `<li class="item" data-index="${i}">
                    <i class="complete fa ${checkDone.done}" aria-hidden="true" data-check="${items[i].check}"></i>
                    <p class="item-text ${checkDone.line}">${items[i].content}</p>
                    <a class="fa"></a>
                </li>`
    }
    list.innerHTML = str;
    document.querySelector('.text-input').value = '';
    console.log(todoListData)
}

// 刪除與完成事項
function delAndComData(e) {
    e.preventDefault();
    let nowNodeName = e.target.nodeName;
    let dataIndex = e.target.parentNode.dataset.index;
    if (nowNodeName === 'A') {
        todoListData.splice(dataIndex,1);
        localStorage.setItem('listData', JSON.stringify(todoListData));
        updateList(todoListData);    
    } else if (nowNodeName === "I") {
        completeTodo(e);
    } else {
        return;
    }
    
}

// 完成事項劃記，並更新 localStorage 儲存劃記資料
function completeTodo(e) {
    let completeCircle = e.target;
    let dataCheck = completeCircle.dataset.check;
    let dataIndex = e.target.parentNode.dataset.index;
    // let itemText = completeCircle.parentNode.querySelector('.item-text');
    // completeCircle.classList.toggle(unCheck);
    // completeCircle.classList.toggle(check);
    // itemText.classList.toggle(lineThrough);
    if (dataCheck === '0') {
        todoListData[dataIndex].check = '1';
        localStorage.setItem('listData', JSON.stringify(todoListData));
    } else {
        todoListData[dataIndex].check = '0';
        localStorage.setItem('listData', JSON.stringify(todoListData));
    }
    updateList(todoListData);

}