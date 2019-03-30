
export default {
    //格式化日期时间
    formatDate(currentTime){
        if(!currentTime) return '';
        return currentTime.getFullYear() + "年" + (currentTime.getMonth()+1) + "月" + currentTime.getDate() + "日   " +
        currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds()
        + " " + this.getWeek(currentTime.getDay());
    },

    getWeek(day){
        let weekday=new Array(7)
            weekday[0]="星期日"
            weekday[1]="星期一"
            weekday[2]="星期二"
            weekday[3]="星期三"
            weekday[4]="星期四"
            weekday[5]="星期五"
            weekday[6]="星期六"
        return weekday[day];
    }
}
