window.addEventListener('load', function () {
    // this.alert("1");
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    // 2. 鼠标经过focus 就显示隐藏左右按钮
    focus.addEventListener('mouseenter', function () {

        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; // 清除定时器变量
    });
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            //手动调用点击事件
            arrow_r.click();
        }, 2000);
    });

    let ul = focus.querySelector('ul');
    let ol = focus.querySelector('.circle');
    // console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);

        ol.appendChild(li);

        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            // 6. 克隆第一张图片(li)放到ul 最后面

            // 7. 点击右侧按钮， 图片滚动一张
            // 5. 点击小圆圈，移动图片 当然移动的是 ul 
            // ul 的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
            // 当我们点击了某个小li 就拿到当前小li 的索引号
            var index = this.getAttribute('index');
            // num = index;
            // 当我们点击了某个小li 就要把这个li 的索引号给 num  
            number = index;
            // 当我们点击了某个小li 就要把这个li 的索引号给 circle
            circle = index;

            animate(ul, -index * focusWidth);

        })

    }
    ol.children[0].className = 'current';
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    let number = 0;
    // circle 控制小圆圈的播放
    let circle = 0;
    var flag = true;

    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;

            if (number == ul.children.length - 1) {
                ul.style.left = 0;
                number = 0;
            }
            number++;
            animate(ul, -number * focusWidth, function () {
                flag = true; // 打开节流阀
            });
            circle++;
            // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }


    })

    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (number == 0) {
                number = ul.children.length - 1;
                ul.style.left = -number * focusWidth + 'px';

            }
            number--;
            animate(ul, -number * focusWidth, function () {
                flag = true; // 打开节流阀
            });
            circle--;
            // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
            circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();
        }

    })
    function circleChange() {

        // 先清除其余小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下当前的小圆圈的current类名
        ol.children[circle].className = 'current';
    }
    // 10. 自动播放轮播图
    var timer = setInterval(function () {
        //手动调用点击事件
        arrow_r.click();
    }, 2000);

})