import {createElement, Component} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Image from 'rax-image';
import TextInput from 'rax-textinput';
import Button from 'rax-button';
import Link from 'rax-link';
import styles from './App.css';
import InfoService from './services/index.js'

import auditClassIcon from './assets/audit_class.png'

let image = {
  uri: 'https://github.com/ccnubox/ccnubox-rax-course/blob/master/src/assets/audit_class.png?raw=true'
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '', // 课程名称 必须
      t: '',    // 教师名称 非必须
      s: ''     // 授课对象 非必须
    };
  }

  componentWillMount() {
  }

  render() {
    return (
      <View style={styles.app}>
        <Image style={styles.image} source={image} />
        <View style={styles.input_container}>
          <TextInput style={styles.input_item} placeholder={`请输入课程名称`}
          onChange={(event) => {
            this.setState({
              name: event.nativeEvent.text
            })
          }}/>
          <TextInput style={styles.input_item} placeholder={`请输入任课教师（非必填）`}
          onChange={(event) => {
            this.setState({
              t: event.nativeEvent.text
            })
          }}/>
          <TextInput style={styles.input_item} placeholder={`请输入授课年级（非必填）`}
          onChange={(event) => {
            this.setState({
              s: event.nativeEvent.text
            })
          }}/>
        </View>
        <Link href={`./second.bundle.js?name=${this.state.name}&t=${this.state.t}&s=${this.state.s}`}>
            <View style={styles.search_bt}>
              <Text style={styles.search_bt_text}>
                搜索课程
              </Text>
            </View>
          </Link>
      </View>
    );
  }
}

export default App;
