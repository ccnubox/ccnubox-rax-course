import request from '../../box-ui/util/request';

const InfoService = {
  searchLesson(Options) {
    return request({
      method: 'GET',
      url: 'https://ccnubox.muxixyz.com/api/lesson/?name=' + Options.name + '&t=' + Options.t + '&s=' + Options.s
    })
  }
};

export default InfoService;