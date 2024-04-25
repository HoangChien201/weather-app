export function formatHour(time){
    if(time){
        const currentTime=new Date(time)
        const hours=currentTime.getHours()
        const minutes=currentTime.getMinutes()<10 ? `0${currentTime.getMinutes()}` :currentTime.getMinutes()
        return `${hours}:${minutes}`;
    }
}

export function formatDate(date){
    if(date){
        const currentDate=new Date(date)
        const dateNew=`${currentDate.getDate()}/${currentDate.getMonth()+1}`
        return dateNew;
    }
}