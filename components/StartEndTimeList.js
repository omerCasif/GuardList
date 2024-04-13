
import React, { useState, useEffect, useRef } from 'react';

export default function StartEndTimeList({ names, stations, nameIndex, setNameIndex, setIsStartEndList }) {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [capTime, setCapTime] = useState('03:00')
    const [GuardingList, setGuardingList] = useState([])
    const [isGenerated, setIsGenerated] = useState(false);

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(today.getDate()).padStart(2, '0');
        const initialDate = `${year}-${month}-${day}`;

        setStartDate(initialDate);
        setEndDate(initialDate)
    }, []); // Run this effect only once on component mount

    const textareaRef = useRef(null);

    const handleStartTimeInput = (e) => setStartTime(e.target.value)
    const handleEndTimeInput = (e) => setEndTime(e.target.value)
    const handleCapTimeInput = (e) => setCapTime(e.target.value)
    const handleStartDateInput = (e) => setStartDate(e.target.value)
    const handleEndDateInput = (e) => setEndDate(e.target.value)

    const copyText = () => {
        if (textareaRef.current) {
            textareaRef.current.select();
            textareaRef.current.setSelectionRange(0, 99999); // For mobile devices

            document.execCommand('copy');

            textareaRef.current.setSelectionRange(0, 0);
            alert('Text copied to clipboard!');
        }
    }

    const handleGenerateList = async () => {
        try {
            const requestData = {
                startDate: startDate,
                endDate: endDate,
                startTime: startTime,
                endTime: endTime,
                capTime: capTime,
                nameIndex: nameIndex,
                names: names,
                stations: stations,
            }

            const response = await fetch('./api/dynamic_list_generator', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
            if (response.ok) {
                const data = await response.json()
                setGuardingList(data.GuardingListTemp)
                setIsGenerated(true)
                setNameIndex(data.nameIndex)
            }
        }
        catch {
            console.error('Error:', error.message);
        }


    }

    const shareText = async () => {
        if (textareaRef.current) {
            const textToShare = textareaRef.current.value;
            console.log("entered first if")
            try {
                if (navigator.share) {
                    console.log("entered sec if")
                    const res = await navigator.share({
                        text: textToShare,
                    });
                } else {
                    // Fallback for browsers that do not support the Web Share API
                    alert('Web Share API not supported on this browser');
                }
            } catch (error) {
                console.error('Error sharing:', error.message);
            }
        }
    }

    return (
        <div className="flex my-20 justify-center m-4 transition-all w-96">
            <div className="flex-1/3 max-w-screen-sm rounded-lg shadow-lg bg-white mx-4 p-8 overflow-y-auto">
                <div className='flex flex-row'>
                    <h1 className="text-2xl font-bold mb-4 mr-auto">List Maker</h1>
                    <button
                        onClick={() => setIsStartEndList(false)}
                        className='flex ml-auto bg-white text-cyan-900 font-bold'>
                        Back
                    </button>
                </div>
                <h1 className="bg-gray-700 text-white uppercase py-2 px-4 font-semibold mb-3">Start & End Time List</h1>
                <div className='flex flex-col bg-white'>
                    <label className='m-0.5 font-bold text-left'>
                        Start Date:
                        <input
                            className='mx-2'
                            type="date"
                            value={startDate}
                            onChange={handleStartDateInput} />
                    </label>
                    <label className='m-0.5 font-bold text-left'>
                        Starting Time:
                        <input
                            className='mx-2'
                            type="time"
                            value={startTime}
                            onChange={handleStartTimeInput}
                        />
                    </label>
                    <label className='m-0.5 font-bold text-left'>
                        End Date:
                        <input
                            className='mx-2'
                            type="date"
                            value={endDate}
                            onChange={handleEndDateInput} />
                    </label>
                    <label className='m-0.5 font-bold text-left'>
                        End Time:
                        <input
                            className='mx-2'
                            type="time"
                            value={endTime}
                            onChange={handleEndTimeInput}
                        />
                    </label>
                    <label className='m-0.5 font-bold text-left'>
                        Shift Time Limit:
                        <input
                            className='mx-2'
                            type="time"
                            value={capTime}
                            onChange={handleCapTimeInput}
                        />
                    </label>
                    <button
                        onClick={handleGenerateList}
                        className='mt-4 border font-bold  px-4 py-2 rounded'>
                        Create
                    </button>
                    {isGenerated && (
                        <div className="flex flex-col items-center justify-center m-4">
                            <textarea
                                ref={textareaRef}
                                rows="10"
                                cols="20"
                                value={GuardingList.map((currentShift, index1) => (
                                    `*${currentShift.time}*\n` +
                                    currentShift.shiftStations.map((station, index2) => (
                                        `${station.stationName}: ${station.stationPeople}\n`
                                    )).join('')
                                )).join('\n')}
                                readOnly
                                dir="rtl"
                            />
                            <div className='flex flex-row items-center'>
                                <button className="m-4  px-4 py-2 border font-bold rounded" onClick={copyText}>Copy</button>
                                <button className="m-4 border font-bold rounded px-4 py-2" onClick={shareText}>Share</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}