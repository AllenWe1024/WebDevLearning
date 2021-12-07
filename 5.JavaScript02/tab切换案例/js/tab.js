var that;
class Tab {
    // 抽象对象: Tab 对象
    // 2.该对象具有添加功能
    // 3.该对象具有删除功能
    // 4.该对象具有修改功能
    constructor(id) {
        // 获取元素
        that = this;
        this.main = document.querySelector(id);
        // 注意this不能省略

        this.add = this.main.querySelector('.tabadd');
        // li的父元素
        this.ul = this.main.querySelector('.fisrstnav ul:first-child');
        // section 父元素
        this.fsection = this.main.querySelector('.tabscon');
        this.init();

    }
    // 初始化操作
    init() {
        this.updateNode();
        this.add.onclick = this.addTab;
        // 注意this不能省略

        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            // 回调函数
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }
    // 获取元素
    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');

    }
    // 1.该对象具有切换功能
    toggleTab() {
        // console.log(this.index);
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';
    }
    // 清除所有li 和section 的类
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    // 2. 添加功能
    // 1.点击 + 可以实现添加新的选项卡和内容
    // 2.第一步: 创建新的选项卡li 和 新的 内容 section
    // 3.第二步: 把创建的两个元素追加到对应的父元素中.
    // 4.以前的做法: 动态创建元素 createElement , 但是元素里面内容较多, 需要innerHTML赋值,在 appendChild 追加到父元素里面.
    // 5.现在高级做法: 利用 insertAdjacentHTML() 可以直接把字符串格式元素添加到父元素中
    // 6.appendChild 不支持追加字符串的子元素, insertAdjacentHTML 支持追加字符串的元素
    // 7.insertAdjacentHTML(追加的位置,‘要追加的字符串元素’)
    // 8.追加的位置有: beforeend 插入元素内部的最后一个子节点之后
    addTab() {
        // console.log(111);
        // 先清除
        that.clearClass();
        // (1) 创建li元素和section元素 
        var random = Math.random();
        var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>'
        var section = '<section class="conactive">测试 ' + random + '</section>';

        // (2) 把这两个元素追加到对应的父元素里面
        that.ul.insertAdjacentHTML('beforeend', li);
        that.fsection.insertAdjacentHTML('beforeend', section);
        that.init();

    }
    // 3. 删除功能
    removeTab(e) {
        // 1.点击 × 可以删除当前的li选项卡和当前的section
        // 2.X是没有索引号的, 但是它的父亲li 有索引号, 这个索引号正是我们想要的索引号
        // 3.所以核心思路是: 点击 x 号可以删除这个索引号对应的 li 和 section
        // 4.但是,当我们动态删除新的li和索引号时,也需要重新获取 x 这个元素. 需要调用init 方法
        e.stopPropagation(); // 阻止冒泡 防止触发li 的切换点击事件
        var index = this.parentNode.index;
        console.log(index);
        // 根据索引号删除对应的li 和section   remove()方法可以直接删除指定的元素
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
        // 当我们删除的不是选中状态的li 的时候,原来的选中状态li保持不变
        if (document.querySelector('.liactive')) return;
        // 当我们删除了选中状态的这个li 的时候, 让它的前一个li 处于选定状态
        index--;
        // 手动调用我们的点击事件  不需要鼠标触发
        that.lis[index] && that.lis[index].click();
    }

    // 4. 修改功能
    editTab() {
        // 核心思路: 双击文字的时候, 在 里面生成一个文本框, 当失去焦点或者按下回车然后把文本框输入的值给原先元素即可.
        // 获取原值
        var str = this.innerHTML;
        // 双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        // alert(11);
        this.innerHTML = '<input type="text" />';
        var input = this.children[0];
        input.value = str;
        // 文本框里面的文字处于选定状态
        input.select();
        // 当我们离开文本框就把文本框里面的值给span 
        input.onblur = function () {
            this.parentNode.innerHTML = this.value;
        };
        // 按下回车也可以把文本框里面的值给span
        input.onkeyup = function (e) {
            if (e.keyCode === 13) {
                // 手动调用表单失去焦点事件  不需要鼠标离开操作
                this.blur();
            }
        }
    }
}

new Tab('#tab');
