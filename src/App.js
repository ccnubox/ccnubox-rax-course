import { createElement, Component } from "rax";
import View from "rax-view";
import Text from "rax-text";
import Image from "rax-image";
import TextInput from "rax-textinput";
import Touchable from "rax-touchable";
const native = require("@weex-module/test");
import logoImage from "./assets/audit_class.png";
import styles from "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "", // 课程名称 必须
      teacher: "", // 教师名称 非必须
      grade: "" // 授课年级 非必须
    };
  }

  onSubmit = () => {
    if (this.state.name === "") {
      alert("请输入课程名称");
      return;
    }
    native.push(
      `ccnubox://cengke.result?name=${this.state.name}&teacher=${
        this.state.teacher
      }&grade=${this.state.grade}`
    );
  };

  onNameChange = event => {
    this.setState({
      name: event.nativeEvent.text
    });
  };

  onTeacherChange = event => {
    this.setState({
      t: event.nativeEvent.text
    });
  };

  onGradeChange = event => {
    this.setState({
      s: event.nativeEvent.text
    });
  };

  render() {
    return (
      <View style={styles.app}>
        <Image style={styles.image} source={logoImage} />
        <View style={styles.input_container}>
          <TextInput
            style={styles.input_item}
            placeholder={`请输入课程名称`}
            onInput={this.onNameChange}
            onChange={this.onNameChange}
          />
          <TextInput
            style={styles.input_item}
            placeholder={`请输入任课教师（非必填）`}
            onInput={this.onTeacherChange}
            onChange={this.onTeacherChange}
          />
          <TextInput
            style={styles.input_item}
            placeholder={`请输入授课年级（非必填）`}
            onInput={this.onGradeChange}
            onChange={this.onGradeChange}
          />
        </View>
        <Touchable onPress={this.onSubmit}>
          <View style={styles.search_bt}>
            <Text style={styles.search_bt_text}>搜索课程</Text>
          </View>
        </Touchable>
      </View>
    );
  }
}

export default App;
