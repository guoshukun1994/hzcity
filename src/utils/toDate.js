function toDate(){
    // 需要的格式 yyyy-MM-dd hh:mm:ss
    var date = new Date();
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    console.log(Y + M + D + h + m + s); // 2019-06-10 11:45:39
}

  //将时间戳转换为日期：yyyy-MM-dd hh:mm:ss
  toDate = (time) =>{
    // 需要的格式 yyyy-MM-dd hh:mm:ss
    var date = new Date(time);
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate();
    h = date.getHours();
    m = date.getMinutes();
    s = date.getSeconds();
    D += '';
    h += '';
    m += '';
    s += '';
    D.length === 1 ? D = '0'+D : D;
    h.length === 1 ? h = '0'+h : h;
    m.length === 1 ? m = '0'+m : m;
    s.length === 1 ? s = '0'+s : s;
    return Y + M + D +' '+ h+':' + m + ':' + s   // 2019-06-10 11:45:39
}