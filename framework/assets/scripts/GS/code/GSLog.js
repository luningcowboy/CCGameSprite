let log = {};
// 日志配置
let _config = {
    level: 1, // 日志等级 1 debug 2 warn 3 error
    showTimeStamp: true, // 是否显示时间戳
    isReport: false, // 是否上报错误日志
    reportURL: '', // 上报日志地址
    isSaveToLocal: false, // 是否在本地保存日志
    localTag: '', // 本地日志tag 日志在本地保存的时候是 `tag_date.log`
    maxLogInCache: 200, // 最大日志缓存条数
};
let _cache = []; // 日志缓存数组

// 添加日志到缓存
let _addLog2Cache = (type, time, tag, infos)=>{
    let log_info = {
        type: type,
        tag: tag,
        infos: infos
    };
    _cache.push(log_info);
    if(_cache.length >= _config.maxLogInCache){
        _config.isSaveToLocal && _saveLog2Local();
        _config.isReport && _reportLog2Server();
        _cache = [];
    }
};

// 保存日志到本地
// TODO: 本地保存模块
let _saveLog2Local = ()=>{

};

// 上传日志到服务器
// TODO: 上传日志模块
let _reportLog2Server = ()=>{

};

// 设置日志配置
log.setConfig = (config)=>{
    if(config) _config = config;
};


log.debug = (tag, infos)=>{
    let time = GS.Date.timeStamp();
    console.log('GSLOG [DEBUG] ', _config.showTimeStamp ? time : '' , tag, infos);
    _addLog2Cache("debug", time ,tag, infos);
};
log.warn = (tag, infos)=>{
    let time = GS.Date.timeStamp();
    console.log('GSLOG [WARN] ', _config.showTimeStamp ? time : '', tag, infos);
    _addLog2Cache("warn", time ,tag, infos);
};
log.error = (tag, infos)=>{
    let time = GS.Date.timeStamp();
    console.log('GSLOG [ERROR] ', _config.showTimeStamp ? time : '', tag, infos);
    _addLog2Cache("error", time ,tag, infos);
};


module.exports = log;
