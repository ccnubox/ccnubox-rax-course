import request from "../../box-ui/util/request";

const InfoService = {
  searchLesson(Options) {
    return request({
      method: "GET",
      url: `https://ccnubox.muxixyz.com/api/lesson/?name=${encodeURI(
        Options.name
      )}&t=${encodeURI(Options.teacher)}&s=${encodeURI(Options.grade)}`
    });
  },
  addLesson(postData, sid) {
    return request({
      method: "POST",
      url: "https://ccnubox.muxixyz.com/api/table/",
      headers: {
        'Bigipserverpool': "xxx",
        'Sid': sid,
        'Jsessionid': "xxx",
        'Authorization': "Basic " + btoa(sid + ":" + "foo")
      },
      body: postData
    });
  }
};

export default InfoService;
