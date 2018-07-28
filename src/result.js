import {createElement, Component} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Image from 'rax-image';
import Button from 'rax-button';
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
    };
  }

  componentWillMount() {
    // 获取查询参数
    Options.name = getQueryString("name")
    Options.t = getQueryString("t")
    Options.s = getQueryString("s")
    InfoService.searchLesson(Options)
    // 找到课程
    .then(data => {
      alert(data)
    })
    // 未找到课程
    .catch((error) => {
      alert(error)
    })
  }

  render() {
    return (
      <View style={styles.app}></View>
    );
  }
}

export default Result;