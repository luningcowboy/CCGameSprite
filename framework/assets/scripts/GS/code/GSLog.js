/* 日志模块
 * 不是单例日志，需要在用到到地方实例化
 * 也就是说会存在很多log实例，但是，这种模式便于，日志的分类和特殊处理
 */
let _formatTime = (date)=>{
    date = date || new Date();
    let strDate = date.getFullYear()+"-";
    strDate += date.getMonth()+1+"-";
    strDate += date.getDate()+"-";
    strDate += date.getHours()+":";
    strDate += date.getMinutes()+":";
    strDate += date.getSeconds();
    strDate += ' ' + date.getMilliseconds();
    return strDate ;  
};

let LogLevel = {
    DEBUG: 0,
    WARN: 1,
    ERROR: 2
};

let create = ({TAG = 'LOG', timeStamp= true, saveLevel = 2, logLevel = 0})=>{
    let ret = new Log({TAG: TAG, timeStamp: timeStamp, saveLevel: saveLevel, logLevel: logLevel});
    return ret;
};
class Log{
    constructor(config){
        this._config = config;
        this._logList = [];
    }
    _getLogInfo(type, infos){
        let time = this._showTimeStamp ? _dateFormat(new Date()) : '';
        let info = `${time} [${type}] ${this._tag} ${infos.join(' ')}`;
        return info;
    }
    debug(...infos){
        if(this._config.logLevel > LogLevel.DEBUG) return;

        let info = this._getLogInfo('DEUBG', infos);
        console.log(info);
        this._config.saveLevel <= LogLevel.DEBUG && this._logList.push(info);
    }
    warn(...infos){
        if(this._config.logLevel > LogLevel.WARN) return;

        let info = this._getLogInfo('WARN', infos);
        console.log(info);
        this._config.saveLevel <= LogLevel.WARN && this._logList.push(info);
    }
    error(...infos){
        let info = this._getLogInfo('ERROR', infos);
        console.log(info);
        this._config.saveLevel <= LogLevel.ERROR && this._logList.push(info);
    }
}

module.exports = {
    create,
    Log
};

