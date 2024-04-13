
export default async function handle(req, res) {
    const { inputTime,
        inputShiftTime,
        inputShiftsNumber,
        nameIndex,
        names,
        stations } = req.body
    const activeNames = names.filter((person) => person.active)
    const activeStations = stations.filter((station) => station.active)
    const timeRegex = /^\d{2}:\d{2}$/;
    if (!timeRegex.test(inputTime)) {
        res.status(400).json({ message: "Invalid format" })
    }
    // generate list
    let GuardingListTemp = []
    let tempNameIndex = nameIndex
    let currentShiftTime = inputTime
    // run shifts Number times
    for (let i = 0; i < inputShiftsNumber; i++) {
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
        currentShiftTime = CalculateNextShift(currentShiftTime, inputShiftTime)
    }
    res.status(200).json({ GuardingListTemp, nameIndex: tempNameIndex })
}

const CalculateNextShift = (inputTime, inputShiftTime) => {
    //current in HH:MM format (string), shiftMinutes is int
    const [currentHours, currentMinutes] = inputTime.split(':').map(Number);
    const currentTotalMinutes = currentHours * 60 + currentMinutes;

    const [shiftHours, shiftMinues] = inputShiftTime.split(':').map(Number)
    const shiftTotalMinutes = shiftHours * 60 + shiftMinues;

    const newTotalMinutes = currentTotalMinutes + shiftTotalMinutes

    const nextHours = Math.floor(newTotalMinutes / 60) % 24;
    const nextMinutes = newTotalMinutes % 60;
    const nextTime = `${String(nextHours).padStart(2, '0')}:${String(nextMinutes).padStart(2, '0')}`;
    return nextTime;
};

const incrementNameIndex = (index, names) => {
    if (index + 1 >= names.length)
        return 0;
    else
        return index + 1
}

