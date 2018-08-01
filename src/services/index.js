import request from '../../box-ui/util/request';

const InfoService = {
  searchLesson(Options) {
    return request({
      method: 'GET',
      url: 'https://ccnubox.muxixyz.com/api/lesson/?name=' + Options.name + '&t=' + Options.t + '&s=' + Options.s
    })
  },
  addLesson(postData) {
    return request({
      method: 'POST',
      url: 'https://ccnubox.muxixyz.com/api/table/',
      headers: {
        "Content-Type": "application/json",
        "Sid": '2016214288'
      },
      body: postData
    })
  }
};

export default InfoService;