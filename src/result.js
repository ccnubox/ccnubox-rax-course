import {createElement, Component} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Image from 'rax-image';
import Button from 'rax-button';
import ListView from 'rax-listview';
import styles from './result.css';
import InfoService from './services/index.js'

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
  var r = decodeURIComponent(window.location.search).substr(1).match(reg);  
  if (r != null) return unescape(r[2]);  
  return null;  
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
            {item.kind}
          </Text>
        </View>
        <View style={styles.content}>
          <View>
            <Text numberOfLines={1} style={styles.item_name}>{item.name}</Text>
            <Text style={styles.item_teacher}>({item.teacher})</Text>
          </View>
          <View>
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
        <Button style={styles.item_bt}>
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