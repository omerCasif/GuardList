
export default async function handle(req, res){
    const {startDate, endDate, startTime, endTime, capTime, nameIndex, names, stations} = req.body
    
    const timeRegex = /^\d{2}:\d{2}$/;    
    if (!timeRegex.test(startTime)) {
        res.status(400).json({ message: "Invalid format" })
    }
    if (!timeRegex.test(endTime)) {
        res.status(400).json({ message: "Invalid format" })
    }
    if (!timeRegex.test(capTime)) {
        res.status(400).json({ message: "Invalid format" })
    }

    const activeNames = names.filter((person) => person.active)
    const activeStations = stations.filter((station) => station.active)

    let stationsAmountInShift = 0; 
    activeStations.map((station) => stationsAmountInShift += station.count)
    
    const daysDiff = calculateDaysDifference(startDate, endDate)
    
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const startTimeMinutes = startHours * 60 + startMinutes;
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    const endTimeMinutes = endHours * 60 + endMinutes;
    const [capHours, capMinutes] = capTime.split(':').map(Number)
    const capTimeMinutes = capHours * 60 + capMinutes;

    let totalMinutes;
    if(daysDiff >= 1){ // different days
        totalMinutes = (24 * 60 - startTimeMinutes) + endTimeMinutes + (daysDiff - 1) * 24 * 60;
    }
    else{ // same day
        totalMinutes = endTimeMinutes - startTimeMinutes;
    }
    let shiftsAmount = Math.floor(activeNames.length / stationsAmountInShift)
    let shiftMinutes = Math.ceil(totalMinutes / shiftsAmount)
    
    while(shiftMinutes > capTimeMinutes){
        shiftMinutes = shiftMinutes / 2        
        shiftsAmount = shiftsAmount * 2
    }
    
    let GuardingListTemp = []
    let tempNameIndex = nameIndex
    let currentShiftTime = startTime
    // run shifts Number times
    for (let i = 0; i < shiftsAmount; i++) {
        let currentShift = [];

        // run through each shift in the shiftTime
        for (let j = 0; j < activeStations.length; j++) {
            const stationName = activeStations[j].name
            let stationsPeople = ""

            // run through shift count (add people to shift)
            for (let k = 0; k < activeStations[j].count; k++) {
                if (k == (activeStations[j].count - 1)) {
                    stationsPeople += ' ' + activeNames[tempNameIndex].name
                    tempNameIndex = incrementNameIndex(tempNameIndex, activeNames)
                }
                else {
                    stationsPeople += ' ' + activeNames[tempNameIndex].name + ','
                    tempNameIndex = incrementNameIndex(tempNameIndex, activeNames)
                }
            }
            currentShift.push({
                stationName: stationName,
                stationPeople: stationsPeople
            })
        }
        GuardingListTemp.push({
            time: currentShiftTime,
            shiftStations: currentShift
        })  
        currentShiftTime = CalculateNextShift(currentShiftTime, shiftMinutes)
    }
    res.status(200).json({GuardingListTemp, nameIndex: tempNameIndex})
}

const CalculateNextShift = (currentTime, inputShiftTime) => {
    //current in HH:MM format (string), shiftMinutes is int
    const [currentHours, currentMinutes] = currentTime.split(':').map(Number);
    const currentTotalMinutes = currentHours * 60 + currentMinutes;

    const newTotalMinutes = currentTotalMinutes + parseInt(inputShiftTime)

    const nextHours = Math.floor(newTotalMinutes / 60) % 24;
    const nextMinutes = newTotalMinutes % 60;
    const nextTime = `${String(nextHours).padStart(2, '0')}:${String(nextMinutes).padStart(2, '0')}`;
    return nextTime;
};

function calculateDaysDifference(dateString1, dateString2) {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);
  
    const timeDifference = Math.abs(date2 - date1);
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    return daysDifference;
  }

const incrementNameIndex = (index, names) => {
    if(index + 1 >= names.length)
        return 0;
    else
        return index + 1
}
