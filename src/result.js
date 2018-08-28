import { createElement, Component } from "rax";
import View from "rax-view";
import Text from "rax-text";
import Button from "rax-button";
import ListView from "rax-listview";
import Image from "rax-image";
import styles from "./result.css";
import Toast from "universal-toast";
const native = require("@weex-module/test");
import InfoService from "./services/index.js";
import { parseSearchString } from "../box-ui/util";
import errorImage from "./assets/audit_error.png";

const dayMap = {
  一: "1",
  二: "2",
  三: "3",
  四: "4",
  五: "5"
};

function getAddCourseData(item) {
  const postData = {
    course: "", // 课程的名称
    teacher: "", // 老师的名称
    weeks: "", // 上课周次
    day: "", // 上课星期
    start: "", // 课程开始时间(ex: start=3表示上午第三节课开始上)
    during: "2", // 课程持续时间(ex: during=2表示持续2节课)
    palce: "", // 上课地点
    remind: false
  };
  postData.course = item.name;
  postData.teacher = item.teacher;
  let weeks_start,
    weeks_end,
    weeks_gap = 1;
  weeks_start = parseInt(item.ww[0].when.match(/{(\S*)-/)[1]);
  weeks_end = parseInt(item.ww[0].when.match(/-(\S*)周/)[1].match(/-(\S*)/)[1]);
  weeks_gap = item.ww[0].when.indexOf("(") == -1 ? 1 : 2;
  for (let i = weeks_start; i <= weeks_end; i += weeks_gap) {
    postData.weeks = postData.weeks + i;
    if (i + weeks_gap <= weeks_end) {
      postData.weeks = postData.weeks + ",";
    }
  }
  postData.day = dayMap[item.ww[0].when.match(/星期(\S*)第/)[1]];
  postData.start = item.ww[0].when.match(/第(\S*)-/)[1].match(/(\S*)-/)[1];
  postData.palce = item.ww[0].where;
  return postData;
}

const Options = {
  name: "", // 课程名称 必须
  teacher: "", // 教师名称 非必须
  grade: "" // 年级 非必须
};

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseList: [],
      hasResult: true
    };
  }

  componentWillMount() {
    let qd = {};
    // 获取查询参数
    if (window.location.search) {
      qd = parseSearchString(window.location.search);
    } else {
      alert("参数缺失错误 " + window.location);
    }

    Options.name = qd.name[0];
    Options.teacher = qd.teacher[0] || "";
    Options.grade = qd.grade[0] || "";

    InfoService.searchLesson(Options)
      // 找到课程
      .then(data => {
        native.changeLoadingStatus(true);
        this.setState({
          courseList: data.res,
          hasResult: true
        });
      })
      // 未找到课程
      .catch(error => {
        native.changeLoadingStatus(true);
        this.setState({
          hasResult: false
        });
      });
  }

  listItem = (item, index) => {
    return (
      <View
        style={[
          styles.item_container,
          index === 0 ? styles.item_first : {},
          index === this.state.courseList.length - 1 ? styles.item_last : {}
        ]}
      >
        <View style={styles.item}>
          <View style={styles.kind}>
            <Text style={styles.kind_text}>
              {item.kind.substr(0, item.kind.length - 1)}
            </Text>
          </View>
          <View style={styles.content}>
            <View>
              <Text numberOfLines={1} style={styles.item_name}>
                {item.name}
              </Text>
              <Text style={styles.item_teacher}>({item.teacher})</Text>
            </View>
            <View style={styles.when_where_container}>
              {item.ww.map(el => (
                <View style={styles.when_where}>
                  <View>
                    <Text style={styles.when_where_text}>{el.when}</Text>
                  </View>
                  <View>
                    <Text style={styles.when_where_text}>{el.where}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <Button
            onPress={() => {
              native.getStuInfo(res => {
                if (res.code === "200") {
                  let sid = res.sid;
                  let postData = getAddCourseData(item);
                  InfoService.addLesson(postData, sid)
                    .then(data => {
                      Toast.show("添加成功");
                    })
                    .catch(data => {
                      Toast.show("添加失败");
                    });
                } else {
                  Toast.show("请登录后再添加课程");
                  native.push("ccnubox://login");
                }
              });
            }}
            style={styles.item_bt}
          >
            <Text style={styles.item_bt_text}>添加</Text>
          </Button>
        </View>
      </View>
    );
  };

  render() {
    const that = this;
    if (that.state.hasResult) {
      return (
        <View style={styles.app}>
          <View style={styles.container}>
            <ListView
              renderRow={this.listItem}
              dataSource={this.state.courseList}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.error_app}>
          <View style={styles.error_container}>
            <Image style={styles.error_image} source={errorImage} />
            <Text style={styles.error_text}>没有找到此课程</Text>
          </View>
        </View>
      );
    }
  }
}

export default Result;
