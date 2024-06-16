const getTimeTip = (date:any) => {
    if (!date) return ''
    const timestamp = new Date(date);
    const hours = timestamp.getUTCHours();
    const minutes = timestamp.getUTCMinutes();
    return hours + ":" + minutes

}

export {getTimeTip}