$(function () {
    // 1. 全选 全不选功能模块
    // 就是把全选按钮（checkall）的状态赋值给 三个小的按钮（j-checkbox）就可以了
    // 事件可以使用change
    $(".checkall").change(function () {
        // console.log($(this).prop("checked"));
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            // 让所有的商品添加 check-cart-item 类名
            $(".cart-item").addClass("check-cart-item");
        } else {
            // check-cart-item 移除
            $(".cart-item").removeClass("check-cart-item");
        }
    });
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
        if ($(this).prop("checked")) {
            // 让当前的商品添加 check-cart-item 类名
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            // check-cart-item 移除
            $(this).parents(".cart-item").removeClass("check-cart-item");
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
        getSum();

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
        getSum();



    })
    //  4. 用户修改文本框的值 计算 小计模块  

    $(".itxt").change(function () {
        let n = $(this).val();
        let p = $(this).parents().siblings(".p-price").html().substr(1);
        // console.log(p);
        let price = (p * n).toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        getSum();

    })

    // 5. 计算总计和总额模块
    // ①核心思路：把所有文本框里面的值相加就是总计数量。总额同理
    // ②文本框里面的值不相同，如果想要相加需要用到each遍历。声明一个变量，相加即可
    // ③点击+号-号，会改变总计和总额，如果用户修改了文本框里面的值同样会改变总计和总额
    // ④因此可以封装一个函数求总计和总额的， 以上2个操作调用这个函数即可。
    // ⑤注意1： 总计是文本框里面的值相加用 val() 总额是普通元素的内容用text()
    // ⑥要注意普通元素里面的内容要去掉￥并且转换为数字型才能相加


    const getSum = function () {
        let count = 0; // 计算总件数 
        let money = 0; // 计算总价钱
        $(".itxt").each(function (i, ele) {
            count += parseInt($(ele).val());
        })
        $(".amount-sum em").text(count);
        $(".p-sum").each(function (i, ele) {
            // 转为浮点型
            money += parseFloat($(ele).text().substr(1));
        })
        $(".price-sum em").text("￥" + money.toFixed(2));

    }
    // 首先调用一次
    getSum();
    // 6. 删除商品模块
    // (1) 商品后面的删除按钮
    $(".p-action a").click(function () {
        // 删除的是当前的商品 
        $(this).parents(".cart-item").remove();
        getSum();
    })
    // (2) 删除选中的商品

    $(".remove-batch").click(function () {
        // 删除的是小的复选框选中的商品
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    })
    // (3) 清空购物车 删除全部商品
    $(".clear-all").click(function () {
        $(".cart-item").remove();
        getSum();
    })

})