


export default function ListSelector({ setIsFixedTimeList, setIsStartEndList }) {


    const handleGenerateFixedTimeList = () => {
        setIsStartEndList(false)
        setIsFixedTimeList(true)
    }

    const handleGenerateStartEndList = () => {
        setIsFixedTimeList(false)
        setIsStartEndList(true)
    }

    return (
        <div className="flex my-20 justify-center h-80 m-4">
            <div className="flex-1/2 max-w-screen-lg rounded-lg shadow-lg bg-white mx-4 p-10 overflow-y-auto items-center">
                <div className='flex flex-row '>
                    <h1 className="text-2xl font-bold mb-4 mr-auto">Choose Your List!</h1>
                </div>
                <div className="flex flex-col font-semibold text-left">
                Choose between:
                <span>
                 List with start and end time 
                 </span>
                 <span>
                 List with fixed time and number of shifts
                 </span>
                </div>
                <div className="flex flex-row my-3">
                    <button
                        className="rounded border font-bold border-black w-28 mx-2 bg-white text-black hover:bg-gray-200 transition duration-300 whitespace-normal"
                        onClick={handleGenerateStartEndList}>
                        Start & End Time
                    </button>
                    <button
                        className="rounded border font-bold border-black w-28 mx-1 bg-white text-black hover:bg-gray-200 transition duration-300 whitespace-normal"
                        onClick={handleGenerateFixedTimeList}>
                        Shift Time
                    </button>

                </div> 
            </div>
        </div>
    )
}