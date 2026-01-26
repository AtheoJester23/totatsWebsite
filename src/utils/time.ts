export const to12Hour = (time: string) => {
    if(!time) return "";

    let [hour, minute] = time.split(":").map(Number);
    const ampm = hour >= 12 ? "pm" : "am"
    hour = hour % 12 || 12;
    
    return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`
}
 
export const toReadableDate = (dateStr: string) => {
    if(!dateStr) return "";

    const date = new Date(dateStr + "T00:00:00"); // avoid timezone issues

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

export const compareToToday = (dateStr: string) => {
    if(!dateStr) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const given = new Date(dateStr + "T00:00:00");

    if(given < today) return -1; //past;
    if(given > today) return 1; //future;
    return 0; //today;
}

export const compareTimeToNow = (timeStr: string, timeStr2: string) => {
    if(!timeStr || !timeStr2) return null;

    const now = new Date();

    const [hour, minute] = timeStr.split(':').map(Number);
    const [hour2, minute2] = timeStr2.split(":").map(Number);

    const given1 = new Date();
    given1.setHours(hour, minute, 0, 0);

    const given2 = new Date();
    given2.setHours(hour2, minute2, 0, 0)
    
    // Ensure correct order
    const start = given1 < given2 ? given1 : given2;
    const end = given1 < given2 ? given2 : given1;

    if (now < start) return 0;  // before window
    if (now > end) return -1;   // after window
    return 1;                   // within window
}

export const minimalTime = (timeStr: string) => {
    if(!timeStr) return null;

    const [hour, minutes] = timeStr.split(":").map(Number)

    const given = new Date();
    given.setHours(hour, minutes, 0, 0);

    //+45 mins:
    const plus45m = new Date(given);
    plus45m.setHours(plus45m.getHours() + 1);

    return plus45m.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
}