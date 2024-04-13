
import React, { useState, useRef, useEffect } from 'react';

export default function FixedTimeList({ names, stations, nameIndex, setNameIndex, setIsFixedTimeList }) {
    const [inputTime, setInputTime] = useState('');
    const [inputShiftTime, setInputShiftTime] = useState(0)
    const [inputShiftsNumber, setInputShiftsNumber] = useState(0)
    const [GuardingList, setGuardingList] = useState([])
    const [isGenerated, setIsGenerated] = useState(false);

    const textareaRef = useRef(null);

    const handleInputChange = (e) => setInputTime(e.target.value);
    const handleInputShiftChange = (e) => setInputShiftTime(e.target.value)
    const handleInputShiftsNumberChange = (e) => setInputShiftsNumber(e.target.value)

    const handleGenerateList = async () => {
        try {
            const requestData = {
                inputTime: inputTime,
                inputShiftTime: inputShiftTime,
                inputShiftsNumber: inputShiftsNumber,
                nameIndex: nameIndex,
                names: names,
                stations: stations,
            }

            const response = await fetch('./api/fixed_list_generator', {
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

    const copyText = () => {
        if (textareaRef.current) {
            textareaRef.current.select();
            textareaRef.current.setSelectionRange(0, 99999); // For mobile devices

            document.execCommand('copy');

            textareaRef.current.setSelectionRange(0, 0);
            alert('Text copied to clipboard!');
        }
    };

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
        <div className="flex my-20 justify-center m-4 transition-all w-80">
            <div className="flex-1/3 max-w-screen-sm rounded-lg shadow-lg bg-white mx-4 p-8 overflow-y-auto">
                <div className='flex flex-row'>
                    <h1 className="text-2xl font-bold mb-5 mr-auto">List Maker</h1>
                    <button
                        onClick={() => setIsFixedTimeList(false)}
                        className='flex ml-auto bg-white text-cyan-900 font-bold'>
                        Back
                    </button>
                </div>
                <h1 className="bg-gray-700 text-white uppercase py-2 px-4 font-semibold">Shift Time List</h1>
                <div className='flex flex-col  justify-center bg-white'>
                    <label className='m-0.5 font-bold text-left'>
                        Starting Time:
                        <input
                            className='mx-2'
                            type="time"
                            value={inputTime}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label className='m-0.5 font-bold text-left'>
                        Shift Time:
                        <input
                            className='mx-2'
                            type="time"
                            value={inputShiftTime}
                            onChange={handleInputShiftChange}
                        />
                    </label>
                    <label className='m-0.5 font-bold text-left'>
                        Shifts Number:
                        <input
                            className='mx-2 w-1/4'
                            type="number"
                            value={inputShiftsNumber}
                            onChange={handleInputShiftsNumberChange}
                        />
                    </label>
                    <button
                        onClick={handleGenerateList}
                        className='mt-4 px-4 py-2 border font-bold rounded'>
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
    );
};