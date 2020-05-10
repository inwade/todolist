// находим div с textarea и саму textarea
let textareaBox = document.getElementById('textarea-box')
let textarea = document.getElementById('add-new-item')
// по умолчанию прячем div с textarea
textareaBox.hidden = true;

document.addEventListener('keydown' , function (event) {
    if (event.code == 'Enter' && textarea.value.length > 0) {
        event.preventDefault();
        createListItem();
    }
})

// находим кнопку открытия textarea и добавляем ей функционал
let plusAddButton = document.getElementById('plus-add-button');
plusAddButton.onclick = function () {
    textareaBox.hidden = false;
    textarea.focus();
    plusAddButton.hidden = true;
}

// кнопки "Добавить" и "Отменить"
let addItem = document.getElementById('add-item');
let cancelItem = document.getElementById('cancel-item');
// при нажатии "Отменить" прячем div с textarea
cancelItem.onclick = function () {
    textareaBox.hidden = true;
    plusAddButton.hidden = false;
}

function createListItem () {  
    
    //при нажатии на добавить создаем div и внутри него p с данными из textarea
    let div = document.createElement('div');
    let p = document.createElement('p');
    let itemsDiv = document.getElementById('items');    
    p.innerHTML = textarea.value;
    textarea.value = '';
    div.classList.add('list-item');
    div.append(p);
    itemsDiv.append(div);
    // добавляем кнопку удаления дела
    div.insertAdjacentHTML("afterbegin", '<button class="remove-button">x</button>');
    div.firstChild.onclick = function () {
        div.remove();
    }

    // при даблклике открываем режим редактирования     
    div.addEventListener('dblclick', function () {
        if (document.querySelectorAll('.text-edit-area').length == 0) {
        // создаем кнопки управления редактированием
        let buttonOK = document.createElement('button');
        let buttonCancel = document.createElement('button');
        // текст внутри кнопок
        buttonOK.innerHTML = 'OK';
        buttonCancel.innerHTML = 'Cancel';
        // добавляем к ним стили
        buttonOK.classList.add('button-edit');
        buttonCancel.classList.add('button-edit');
        // расположение кнопок редактирования
        let coord = div.getBoundingClientRect();
        buttonOK.style.left = coord.left + 10 + 'px';
        buttonOK.style.top = coord.bottom + 5 + 'px';
        buttonCancel.style.left = coord.left + 100 + 'px';
        buttonCancel.style.top = buttonOK.style.top;
        buttonOK.style.position = 'absolute';
        buttonCancel.style.position = 'absolute';
        // добавляем их в документ
        document.body.append(buttonOK);
        document.body.append(buttonCancel);
        // включаем режим редактирования
        let textEdit = document.createElement('textarea');
        //div.style.paddingLeft = 0;
        //div.style.paddingTop = 0;
        textEdit.style.marginTop = '5px';
        textEdit.style.marginBottom = '5px';
        textEdit.classList.add('text-edit-area')
        textEdit.value = p.innerHTML;
        p.replaceWith(textEdit); 
        // Функция подтверждения редактирования
        function editItem () {
            //let newP = document.createElement('p');
            p.innerHTML = textEdit.value;
            textEdit.replaceWith(p);
            buttonOK.remove();
            buttonCancel.remove();
        } 
        // Функция отмена редактирования
        function cancelEdit () {
            textEdit.replaceWith(p);
            buttonOK.remove();
            buttonCancel.remove();
        }
    
        // добавляем событие при клике на Ентер      
document.addEventListener('keydown' , function (event) {
    if (event.code == 'Enter' && textEdit.value.length > 0) {
        event.preventDefault();
        editItem();
    }
})
// событие при клике на Esc
document.addEventListener('keydown', function (event) {
    if (event.code == 'Escape' && document.activeElement == textEdit) {
        event.preventDefault();
        cancelEdit();
    }
}) 
        // делаем событие при клике на Ок 
        buttonOK.onclick = editItem;
        // делаем событие при клике на Cancel
        buttonCancel.onclick = cancelEdit;
        div.firstChild.onclick = function () {
            div.remove();
            buttonOK.remove();
            buttonCancel.remove();
        }
    }

    })
}

addItem.onclick = createListItem;