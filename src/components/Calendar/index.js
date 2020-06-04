require("./index.scss");

const calendar = {
  name: "Calendar",
  functional: false, // true : this === null;  false: this === VueComponent
  render(createElement) {

    let _this = this;

    return createElement("div", {
      'class': {
        wrapBox: true
      }
    }, [
      createElement('div', {
        'class': {
          calendarTitle: true
        }
      }, [
        createElement('i', {
          'class': {
            leftIcon: true
          }
        }),
        createElement('strong', {
          'class': {
            leftIcon: true
          },
          domProps: {
            innerHTML: this.changedDate.fullDate
          }
        }),
        createElement('i', {
          'class': {
            rightIcon: true
          }
        })
      ]),
      createElement('ul', {
        'class': {
          weekWrap: true
        }
      }, this.weekList.map(item => {
        return createElement('li', item);
      })),
      createElement('ul', {
        'class': {
          dateWrap: true
        }
      }, [
        ...this.lastArr.map(item => {
          return createElement('li', {
            'class': {
              disable: true
            },
            domProps: {
              innerHTML: item
            }
          });
        }),
        ...this.nowArr.map(item => {
          return createElement('li', {
            'class': {
              nowDay: this.nowDate.getDate() === Number(item.day)
            },
            domProps: {
              innerHTML: item.day
            },
            on: {
              click() {
                _this.$emit("change", item);
              }
            }
          });
        }),
        ...this.nextArr.map(item => {
          return createElement('li', {
            'class': {
              disable: true
            },
            domProps: {
              innerHTML: item
            }
          });
        }),
      ])
    ])
  },
  data() {
    return {
      lastArr: [], // 上个月
      nowArr: [], // 当月
      nextArr: [], // 下个月
      nowDate: new Date(), // 当前日期
      weekList: [
        "日",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六"
      ],
      changedDate: {}, // 选中的日期
    }
  },
  created() {

    this.createCalendar();

    this.changedDate = {
      fullDate: this.formattingDate(this.nowDate),
      day: this.nowDate.getDate(),
      date: this.nowDate.getTime()
    }

  },

  methods: {
    // 补零
    toZero(val) {
      return val < 10 ? '0' + val : "" + val;
    },

    // 传入Date返回标准格式日期
    formattingDate(t) {
      return `${t.getFullYear()}-${this.toZero(t.getMonth() + 1)}-${this.toZero(t.getDate())}`
    },

    // 上个月
    lastMonth() {
      this.lastArr = [];
      let t = new Date(this.nowDate);
      t.setDate(0) // 上个月
      let lastDateLen = t.getDate(); // 上个月长度
      let lastWeek = t.getDay(); // 上个月最后一天是周几
      let lastArr = [];
      for (let i = 0; i < lastWeek + 1; i++) {
        lastArr.push(lastDateLen--);
      }
      this.lastArr = lastArr.length ? lastArr.reverse() : [];
    },

    // 下个月
    nextMonth() {
      this.nowArr = [];
      this.nextArr = [];
      let t = new Date(this.nowDate);
      t.setMonth(t.getMonth() + 1);
      t.setDate(0);
      let nowDateLen = t.getDate();
      for (let i = 1; i < nowDateLen + 1; i++) {
        t.setDate(i);

        this.nowArr.push({
          fullDate: this.formattingDate(t),
          day: this.toZero(i),
          date: t.getTime()
        });
      }
      let nextLen = this.lastArr.length + this.nowArr.length;
      for (let i = 1; i < 43 - nextLen; i++) {
        this.nextArr.push(this.toZero(i));
      }
    },

    // 创建日历
    createCalendar() {
      // 上个月
      this.lastMonth();

      // 下个月
      this.nextMonth();
    }
  }
}

export default calendar;

