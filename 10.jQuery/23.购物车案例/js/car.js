$(function () {
    // 1. 全选 全不选功能模块
    // 就是把全选按钮（checkall）的状态赋值给 三个小的按钮（j-checkbox）就可以了
    // 事件可以使用change
    $(".checkall").change(function () {
        // console.log($(this).prop("checked"));
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
    })
    // 2. 如果小复选框被选中的个数等于3 就应该把全选按钮选上，否则全选按钮不选。
    $(".j-checkbox").change(function () {
        // if(被选中的小的复选框的个数 === 3) {
        //     就要选中全选按钮
        // } else {
        //     不要选中全选按钮
        // }
        console.log($(".j-checkbox:checked").length);
        // $(".j-checkbox").length 这个是所有的小复选框的个数
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);

        }
    })
    // 3. 增减商品数量模块 首先声明一个变量，当我们点击+号（increment），就让这个值++，然后赋值给文本框。
    // ①核心思路：首先声明一个变量，当我们点击+号（increment），就让这个值++，然后赋值给文本框。
    // ②注意1： 只能增加本商品的数量， 就是当前+号的兄弟文本框（itxt）的值。
    // ③修改表单的值是val() 方法
    // ④注意2： 这个变量初始值应该是这个文本框的值，在这个值的基础上++。要获取表单的值
    // ⑤减号（decrement）思路同理，但是如果文本框的值是1，就不能再减了。
    $(".increment").click(function () {
        // 得到当前兄弟文本框的值
        let n = $(this).siblings(".itxt").val();
        // console.log(n);
        n++;
        $(this).siblings(".itxt").val(n);
        //  4. 用户修改文本框的值 计算 小计模块  
        // ①核心思路：每次点击+号或者-号，根据文本框的值 乘以 当前商品的价格 就是 商品的小计
        // ②注意1： 只能增加本商品的小计， 就是当前商品的小计模块（p-sum）
        // ③修改普通元素的内容是text() 方法
        // ④注意2： 当前商品的价格，要把￥符号去掉再相乘 截取字符串 substr(1)
        // ⑤parents(‘选择器’) 可以返回指定祖先元素
        // ⑥最后计算的结果如果想要保留2位小数 通过 toFixed(2) 方法
        // ⑦用户也可以直接修改表单里面的值，同样要计算小计。 用表单change事件
        // ⑧用最新的表单内的值 乘以 单价即可 但是还是当前商品小计

        // 当前商品的价格 p  
        let p = $(this).parents().siblings(".p-price").html().substr(1);
        // console.log(p);
        let price = (p * n).toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
    })
    $(".decrement").click(function () {
        // 得到当前兄弟文本框的值
        let n = $(this).siblings(".itxt").val();

        // console.log(n);
        if (n <= 1) return false;
        n--;
        $(this).siblings(".itxt").val(n);
        let p = $(this).parents().siblings(".p-price").html().substr(1);
        // console.log(p);
        let price = (p * n).toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);


    })
    //  4. 用户修改文本框的值 计算 小计模块  

    $(".itxt").change(function () {
        let n = $(this).val();
        let p = $(this).parents().siblings(".p-price").html().substr(1);
        // console.log(p);
        let price = (p * n).toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
    })


})