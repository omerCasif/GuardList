import { useState } from "react"
import { FaTrashCan } from "react-icons/fa6";

export default function StationsList({ currentUsername, stations, setStations }) {
    console.log("test")
    const [newStation, setNewStation] = useState('')
    const [newStationCount, setNewStationCount] = useState(1)
    const [isManage, setIsManage] = useState(false)
    const [isAdd, setIsAdd] = useState(false)

    const addStation = async () => {
        if (newStation.trim() != '' && newStationCount != 0) {
            const intStationCount = parseInt(newStationCount)
            const updatedStations = [...stations, { name: newStation, count: intStationCount, active: true }]
            const res = await updateStationsInDatabase(updatedStations)
            if (res)
                console.log("Station added successfully")
            setStations(updatedStations)
            setNewStation('')
            setNewStationCount(0)
        }
        else{
            alert("Station name or count is empty")
        }
    }

    const deleteStation = async (index) => {
        const newStations = [...stations]
        newStations.splice(index, 1)
        await updateStationsInDatabase(newStations)
        setStations(newStations)
    }

    const toggleActive = async (index) => {
        const newStations = [...stations];
        newStations[index].active = !newStations[index].active;
        await updateStationsInDatabase(newStations)
        setStations(newStations)
    };

    const updateStationsInDatabase = async (updatedStations) => {
        try {
            const requestData = {
                stations: updatedStations,
                username: currentUsername
            }
            await fetch('/api/update_stations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });
        } catch (error) {
            console.error('Error updating stations in the database:', error);
        }
    }

    return (
        <div>
            <div className="flex-1/3 mx-4 p-8 overflow-y-auto">
                <div className='flex flex-row'>
                    <h1 className="text-2xl font-bold">Stations</h1>
                    </div>

                {stations.length > 0 && 
                    <table className="leading-normal shadow-md rounded my-6">
                        <thead>
                            <tr>
                                <th className="text-center p-3 bg-gray-700 text-gray-100 font-semibold">
                                    Active
                                </th>                                
                                <th className="text-center p-3 bg-gray-700 text-gray-100 font-semibold">
                                    Name
                                </th>
                                <th className="text-center p-3 bg-gray-700 text-gray-100 font-semibold">
                                    Amount
                                </th>
                                <th className="text-center p-3 bg-gray-700 text-gray-100 font-semibold">
                                    Operations
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {stations.map((station, index) => (
                            <tr className={`${!station.active ? 'bg-gray-200' : ''}`}>
                                <td className="text-center border-b border-gray-200">
                                <input
                                    type="checkbox"
                                    checked={station.active}
                                    onChange={() => toggleActive(index)}
                                    className="mx-2"
                                />                            
                                </td>                                
                                <td className="text-center p-3 border-b border-gray-200">
                                    <div className="flex-col flex font-bold">
                                        {station.name}
                                    </div>
                                </td>
                                <td className="text-center p-3 border-b border-gray-200">
                                    <div className={'flex-col flex font-bold '}>
                                        {station.count}
                                    </div>
                                </td>
                                <td className="text-center p-3 border-b border-gray-200">
                                    <div className={'flex-col flex items-center font-bold '}>
                                        <button onClick={() => deleteStation(index)}>
                                            <FaTrashCan />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                            
                        </tbody>
                    </table>
                }
                {isAdd &&
                <div>
                    <table>
                        <tr>
                            <td className="text-left">
                                Stations Name: 
                            </td>
                            <td>
                            <input
                                type="text"
                                value={newStation}
                                onChange={(e) => setNewStation(e.target.value)}
                                placeholder="Name"
                                className="border p-2 mx-2"
                            />
                            </td>
                        </tr>
                        <tr>
                            <td className="text-left">
                                Amount of people:
                            </td>
                            <td>
                            <input
                                type="text"
                                value={newStationCount}
                                placeholder="Amount"
                                onChange={(e) => setNewStationCount(e.target.value)}
                                className="border p-2 mx-2"
                            />
                            </td>
                        </tr>
                    </table>                
                    <button onClick={addStation} className="border font-bold rounded py-2 px-4 m-2">
                        Add
                    </button>
                    <button onClick={() => setIsAdd(false)} className="border font-bold rounded py-2 px-4 m-2">
                        Cancel
                    </button>
                </div>
                }
                {!isAdd &&                                 
                    <button onClick={() => setIsAdd(true)} className="border font-bold rounded py-2 px-4 m-2">
                    Add Station
                    </button>
                }
            </div>        
        </div>
    );
}