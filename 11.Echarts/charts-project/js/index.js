window.onload = function () {
  // 使用立即执行函数
  // 监控区域模块制作
  (function () {
    // alert(11)
    $(".monitor .tabs").on("click", "a", function () {
      // alert(1);
      $(this)
        .addClass("active")
        .siblings("a") //选择a
        .removeClass("active");

      // console.log($(this).index());
      //   选取对应索引号的content
      $(".monitor .content")
        .eq($(this).index())
        .show()
        .siblings(".content") //选择content
        .hide();
    });
    // 1. 先克隆marquee里面所有的行（row）
    $(".marquee-view .marquee").each(function () {
      // console.log($(this));
      var rows = $(this)
        .children()
        .clone();
      $(this).append(rows);
    });
  })();
  // 点位分布统计模块
  (function () {
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".pie"));
    // 2. 指定配置项和数据
    var option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      // 注意颜色写的位置
      color: [
        "#006cff",
        "#60cda0",
        "#ed8884",
        "#ff9f7f",
        "#0096ff",
        "#9fe6b8",
        "#32c5e9",
        "#1d9dff"
      ],
      series: [

        {
          name: '点位统计',
          type: 'pie',
          radius: ['10%', '70%'],
          center: ['50%', '50%'],
          roseType: 'radius',
          itemStyle: {
            borderRadius: 5
          },
          data: [
            { value: 20, name: "云南" },
            { value: 26, name: "北京" },
            { value: 24, name: "山东" },
            { value: 25, name: "河北" },
            { value: 20, name: "江苏" },
            { value: 25, name: "浙江" },
            { value: 30, name: "四川" },
            { value: 42, name: "湖北" }
          ],
          label: {
            fontSize: 10,

          },
          labelLine: {
            // 连接到图形的线长度
            length: 6,
            // 连接到文字的线长度
            length2: 8,
          }
        }
      ]
    };
    // 3. 配置项和数据给我们的实例化对象
    myChart.setOption(option);
    // 4. 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener("resize", function () {
      // 让我们的图表调用 resize这个方法
      myChart.resize();
    });
  })();
  // 柱形图模块
  (function () {
    var item = {
      name: "",
      value: 1200,
      // 1. 修改当前柱形的样式
      itemStyle: {
        color: "#254065"
      },
      // 2. 鼠标放到柱子上不想高亮显示
      emphasis: {
        itemStyle: {
          color: "#254065"
        }
      },
      // 3. 鼠标经过柱子不显示提示框组件
      // 注意：series.tooltip 仅在 tooltip.trigger 为 'item' 时有效。
      tooltip: {
        extraCssText: "opacity: 0"
      }
    };
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".bar"));
    // 2. 指定配置和数据
    var option = {
      color: new echarts.graphic.LinearGradient(
        // (x1,y2) 点到点 (x2,y2) 之间进行渐变
        0,
        0,
        0,
        1,
        [
          { offset: 0, color: "#00fffb" }, // 0 起始颜色
          { offset: 1, color: "#0061ce" } // 1 结束颜色
        ]
      ),
      tooltip: {
        // trigger: "item",
        // axisPointer:{
        //   show:'true',
        //   type:'line',
        // },
        trigger: 'axis',
        axisPointer: {
          // show: 'shadow',
          type: 'shadow',
        }
      },

      grid: {
        left: "0%",
        right: "3%",
        bottom: "3%",
        top: "3%",
        //  图表位置紧贴画布边缘是否显示刻度以及label文字 防止坐标轴标签溢出跟grid 区域有关系
        containLabel: true,
        // 是否显示直角坐标系网格
        show: true,
        //grid 四条边框的颜色
        borderColor: "rgba(0, 240, 255, 0.3)"
      },
      xAxis: [
        {
          type: "category",
          data: [
            "上海",
            "广州",
            "北京",
            "深圳",
            "合肥",
            "",
            "......",
            "",
            "杭州",
            "厦门",
            "济南",
            "成都",
            "重庆"
          ],
          axisTick: {
            alignWithLabel: false,
            // 把x轴的刻度隐藏起来
            show: false
          },
          // 修改文字颜色
          axisLabel: {
            color: "#4c9bfd"
          },
          // x轴这条线的颜色样式
          axisLine: {
            lineStyle: {
              // color:'red',
              color: "rgba(0, 240, 255, 0.3)"
              // width: 3
            }
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          axisTick: {
            alignWithLabel: false,
            // 把y轴的刻度隐藏起来
            show: false
          },
          axisLabel: {
            color: "#4c9bfd"
          },
          // y轴这条线的颜色样式
          axisLine: {
            lineStyle: {
              color: "rgba(0, 240, 255, 0.3)"
              // width: 3
            }
          },
          // y轴分割线的颜色样式
          splitLine: {
            lineStyle: {
              color: "rgba(0, 240, 255, 0.3)"
            }
          }
        }
      ],
      series: [
        {
          name: "直接访问",
          type: "bar",
          barWidth: "60%",
          data: [
            2100,
            1900,
            1700,
            1560,
            1400,
            item,
            item,
            item,
            900,
            750,
            600,
            480,
            240
          ]
        }
      ]
    };
    // 3. 把配置给实例对象
    myChart.setOption(option);
    // 4. 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener("resize", function () {
      // 让我们的图表调用 resize这个方法
      myChart.resize();
    });
  })();
  // 销售统计模块
  (function () {
    // 准备好要切换的数据
    var data = {
      year: [
        [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
        [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
      ],
      quarter: [
        [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
        [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
      ],
      month: [
        [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
        [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
      ],
      week: [
        [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
        [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
      ]
    };
    var myChart = echarts.init(document.querySelector(".line"));
    // 2. 指定配置和数据
    var option = {
      // 折线图的颜色
      color: ["#00f2f1", "#ed3f35"],
      tooltip: {
        // 通过坐标轴来触发
        trigger: "axis"
      },
      legend: {
        // 距离容器10%
        right: "10%",
        // 修饰图例文字的颜色
        textStyle: {
          color: "#4c9bfd"
        }
        // 如果series 里面设置了name，此时图例组件的data可以省略
        // data: ["邮件营销", "联盟广告"]
      },
      grid: {
        top: "20%",
        left: "3%",
        right: "4%",
        bottom: "3%",
        show: true,
        borderColor: "#012f4a",
        containLabel: true
      },

      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ],
        // 去除刻度
        axisTick: {
          show: false
        },
        // 修饰刻度标签的颜色
        axisLabel: {
          color: "#4c9bfd"
        },
        // 去除x坐标轴的颜色
        axisLine: {
          show: false
        }
      },
      yAxis: {
        type: "value",
        // 去除刻度
        axisTick: {
          show: false
        },
        // 修饰刻度标签的颜色
        axisLabel: {
          color: "#4c9bfd"
        },
        // 修改y轴分割线的颜色
        splitLine: {
          lineStyle: {
            color: "#012f4a"
          }
        }
      },
      series: [
        {
          name: "预期销售额",
          type: "line",
          stack: "总量",
          // 是否让线条圆滑显示
          smooth: true,
          data: data.year[0]
        },
        {
          name: "实际销售额",
          type: "line",
          stack: "总量",
          smooth: true,
          data: data.year[1]
        }
      ]
    };
    // 3. 把配置和数据给实例对象
    myChart.setOption(option);

    // 4. tab切换效果制作
    // 核心原理：
    // 1. series 里面的data 数据决定着折线的显示
    // 2. 当我们点击不同的tab标签， 就让  series 里面的data调用不同的数据即可
    // 3. 我们现在只准备了年的数据，还需要准备季度、月和周的数据 
    // 点击后切换
    // index切换到块级作用域
    let index = 0;
    $('.sales').on('click', '.caption a', function () {
      // 此时要注意这个索引号的问题
      // var index = 0;
      index = $(this).index() - 1;
      // 点击当前a 高亮显示 调用active
      $(this)
        .addClass("active")
        .siblings("a")
        .removeClass("active");
      // 拿到当前a 的自定义属性值
      // console.log(this.dataset.type);
      // 根据拿到的值 去找数据
      // console.log(data.year);
      // console.log(data["year"]);
      // console.log(data[this.dataset.type]);
      // 拿到类别
      var arr = data[this.dataset.type];
      // console.log(arr);
      // 根据拿到的数据重新渲染 series里面的data值
      option.series[0].data = arr[0];
      option.series[1].data = arr[1];
      // 重新把配置好的新数据给实例对象
      myChart.setOption(option);
    })
    // 5. tab栏自动切换效果
    //  开启定时器每隔3s，自动让a触发点击事件即可
    var as = $(".sales .caption a");
    var timer = setInterval(() => {
      index++;
      if (index >= 4) index = 0;
      as.eq(index).click();
    }, 3000);
    // 鼠标经过sales，关闭定时器，离开开启定时器
    $(".sales").hover(
      function () {
        clearInterval(timer);
      },
      function () {
        clearInterval(timer);
        timer = setInterval(function () {
          index++;
          if (index >= 4) index = 0;
          as.eq(index).click();
        }, 3000);
      }
    );


    // 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener("resize", function () {
      // 让我们的图表调用 resize这个方法
      myChart.resize();
    });
  })();
}