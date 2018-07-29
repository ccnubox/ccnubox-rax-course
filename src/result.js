import {createElement, Component} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Image from 'rax-image';
import Button from 'rax-button';
import ListView from 'rax-listview';
import styles from './result.css';
import ScrollView from 'rax-scrollview';
import InfoService from './services/index.js';

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
  var r = decodeURIComponent(window.location.search).substr(1).match(reg);  
  if (r != null) return unescape(r[2]);  
  return null;  
}

const dayMap = {
  '一': '1',
  '二': '2',
  '三': '3',
  '四': '4',
  '五': '5'
}

function getAddCourseData(item) {
  const postData = {
    course: "", // 课程的名称 
    teacher: "",  // 老师的名称
    weeks: "",  // 上课周次
    day: "",  // 上课星期
    start: "", // 课程开始时间(ex: start=3表示上午第三节课开始上)
    during: "2", // 课程持续时间(ex: during=2表示持续2节课)
    palce: "", // 上课地点
    remind: false
  }
  postData.course = item.name
  postData.teacher = item.teacher
  let weeks_start, weeks_end, weeks_gap = 1
  weeks_start = parseInt(item.ww[0].when.match(/{(\S*)-/)[1])
  weeks_end = parseInt(item.ww[0].when.match(/-(\S*)周/)[1].match(/-(\S*)/)[1])
  weeks_gap = item.ww[0].when.indexOf('(') == -1 ? 1 : 2
  for (let i = weeks_start; i <= weeks_end; i += weeks_gap) {
    postData.weeks = postData.weeks + i
    if (i + weeks_gap <= weeks_end) {
      postData.weeks = postData.weeks + ','
    }
  }
  postData.day = dayMap[item.ww[0].when.match(/星期(\S*)第/)[1]]
  postData.start = item.ww[0].when.match(/第(\S*)-/)[1].match(/(\S*)-/)[1];
  postData.palce = item.ww[0].where
  return postData
}

const Options = {
  name: '', // 课程名称 必须
  t: '',    // 教师名称 非必须
  s: ''     // 授课对象 非必须
}

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseList: []
    };
  }

  componentWillMount() {
    const that = this
    // 获取查询参数
    Options.name = getQueryString("name")
    Options.t = getQueryString("t")
    Options.s = getQueryString("s")
    InfoService.searchLesson(Options)
    // 找到课程
    .then(data => {
      that.setState({
        courseList: data.res
      })
    })
    // 未找到课程
    .catch((error) => {
      alert(error)
    })
  }

  listItem = (item, index) => {
    return (
      <View style={styles.item}>
        <View style={styles.kind}>
          <Text style={styles.kind_text}>
            {item.kind.substr(0,item.kind.length-1)}
          </Text>
        </View>
        <View style={styles.content}>
          <View>
            <Text numberOfLines={1} style={styles.item_name}>{item.name}</Text>
            <Text style={styles.item_teacher}>({item.teacher})</Text>
          </View>
          <View style={styles.when_where_container}>
            {item.ww.map((el) =>
              <View style={styles.when_where}>
                <View>
                  <Text style={styles.when_where_text}>{el.when}</Text>
                </View>
                <View>
                  <Text style={styles.when_where_text}>{el.where}</Text>
                </View>
              </View>
            )}
          </View>
        </View>
        
        <Button onPress={() => {
          let postData = getAddCourseData(item)
          alert(postData)
          InfoService.addLesson(postData)
          .then(data => {
            alert(data)
          })
          .catch(data => {
            alert(data)
          })
        }} style={styles.item_bt}>
          <Text style={styles.item_bt_text}>
            添加
          </Text>
        </Button>
      </View>
    );
  }

  render() {
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
  }
}

export default Result;