$(function () {
    // alert(11);
    // 1. 按下回车 把完整数据 存储到本地存储里面
    // 存储的数据格式  var todolist = [{title: "xxx", done: false}]
    // let todolist = [{
    //     title: "事件1",
    //     done: false
    // }, {
    //     title: "事件2",
    //     done: false
    // }]
    // ④注意点1： 本地存储 localStorage 里面只能存储字符串格式 ，因此需要把对象转换为字符串 JSON.stringify(data)。
    // localStorage.setItem("todo", JSON.stringify(todolist));
    // let data = localStorage.getItem("todo");
    // ⑤注意点2： 获取本地存储数据，需要把里面的字符串转换为对象格式JSON.parse() 我们才能使用里面的数据。
    // data = JSON.parse(data);
    // console.log(data);
    // console.log(data[0].title);

    //①切记： 页面中的数据，都要从本地存储里面获取，这样刷新页面不会丢失数据，所以先要把数据保存到本地存储里面。
    // ②利用事件对象.keyCode判断用户按下回车键（13）。
    // ③声明一个数组，保存数据。
    // ④先要读取本地存储原来的数据（声明函数 getData()），放到这个数组里面。
    // ⑤之后把最新从表单获取过来的数据，追加到数组里面。
    // ⑥最后把数组存储给本地存储 (声明函数 savaDate())

    // 渲染本地数据
    load();

    // 读取本地存储的数据 
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            // 本地存储里面的数据是字符串格式的 但是我们需要的是对象格式的
            return JSON.parse(data);
        } else {
            return [];
        }

    }

    // 保存本地存储数据
    function saveData(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    // 渲染加载数据
    // ①因为后面也会经常渲染加载操作，所以声明一个函数 load，方便后面调用
    // ②先要读取本地存储数据。（数据不要忘记转换为对象格式）
    // ③之后遍历这个数据（$.each()），有几条数据，就生成几个小li 添加到 ol 里面。
    // ④每次渲染之前，先把原先里面 ol 的内容清空，然后渲染加载最新的数据
    function load() {
        let data = getData();
        // console.log(data);
        // 遍历之前先要清空ol里面的元素内容
        $("ol, ul").empty();

        let todoCount = 0; // 正在进行的个数
        let doneCount = 0; // 已经完成的个数

        $.each(data, function (i, n) {
            if (n.done) {
                // ul是已完成
                $("ul").prepend("<li><input type='checkbox' checked='checked' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox'  > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
                todoCount++;

            }


        })
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }
    // load();

    // 添加元素
    $('#title').on("keydown", function (event) {
        if (event.keyCode === 13) {
            // alert(11);
            // } else {
            // 先读取本地存储原来的数据
            if ($(this).val() === "") {
                alert("请输入您要的操作");
            } else {
                let local = getData();
                // console.log(local);
                // 把local数组进行更新数据 把最新的数据追加给local数组
                local.push({ title: $(this).val(), done: false });
                // 把这个数组local 存储给本地存储
                saveData(local);
                // 2. toDoList 本地存储数据渲染加载到页面
                load();
                $(this).val("");
            }


        }
    });
    // toDoList 删除操作
    // ①点击里面的a链接，不是删除的li，而是删除本地存储对应的数据。
    // ②核心原理：先获取本地存储数据，删除对应的数据，保存给本地存储，重新渲染列表li
    // ③我们可以给链接自定义属性记录当前的索引号
    // ④根据这个索引号删除相关的数据----数组的splice(i, 1)方法
    // ⑤存储修改后的数据，然后存储给本地存储
    // ⑥重新渲染加载数据列表
    // ⑦因为a是动态创建的，我们使用on方法绑定事件
    $("ol, ul").on("click", "a", function () {
        // alert(11);
        let data = getData();
        // console.log(data);
        // 获取自定义属性
        let index = $(this).attr("id");
        // console.log(index);
        // 修改数据
        // array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
        data.splice(index, 1);
        // 保存到本地存储
        saveData(data);
        // 重新渲染页面
        load();

    });

    // toDoList 正在进行和已完成选项操作
    // ①当我们点击了小的复选框，修改本地存储数据，再重新渲染数据列表。
    // ②点击之后，获取本地存储数据。
    // ③修改对应数据属性 done 为当前复选框的checked状态。
    // ④之后保存数据到本地存储
    // ⑤重新渲染加载数据列表
    // ⑥load 加载函数里面，新增一个条件,如果当前数据的done为true 就是已经完成的，就把列表渲染加载到 ul 里面
    // ⑦如果当前数据的done 为false， 则是待办事项，就把列表渲染加载到 ol 里面
    $("ol, ul").on("click", "input", function () {
        // alert(11);
        // 先获取本地存储的数据
        let data = getData();
        // 修改数据
        let index = $(this).siblings("a").attr("id");
        // console.log(index);
        // data[?].done = ?
        // 固有属性是prop
        data[index].done = $(this).prop("checked");

        // 保存到本地存储
        saveData(data);
        // 重新渲染页面
        load();

    })
    // load();

})