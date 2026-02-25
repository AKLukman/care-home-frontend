import { useState, useEffect } from "react";

type CalendarPickerProps = {
    onSelectDate: ( date: string ) => void; // emits YYYY-MM-DD
};

const CalendarPicker = ( { onSelectDate }: CalendarPickerProps ) => {
    const today = new Date();
    const formattedToday = today.toISOString().split( "T" )[ 0 ]; // YYYY-MM-DD

    const [ currentDate, setCurrentDate ] = useState( today );
    const [ selectedDate, setSelectedDate ] = useState<string>( formattedToday );

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date( year, month + 1, 0 ).getDate();
    const firstDay = new Date( year, month, 1 ).getDay();

    // Emit today on mount
    useEffect( () => {
        onSelectDate( formattedToday );
    }, [] );

    // Navigate months
    const handlePrevMonth = () => setCurrentDate( new Date( year, month - 1, 1 ) );
    const handleNextMonth = () => setCurrentDate( new Date( year, month + 1, 1 ) );

    // Click on a day
    const handleDateClick = ( day: number ) => {
        const date = new Date( year, month, day );
        const formattedDate = date.toISOString().split( "T" )[ 0 ]; // YYYY-MM-DD
        setSelectedDate( formattedDate );
        onSelectDate( formattedDate );
    };

    return (
        <div className="card bg-base-100 shadow w-80">
            <div className="card-body p-4">
                {/* Header: Month + navigation */}
                <div className="flex items-center justify-between mb-3">
                    <button className="btn btn-sm btn-ghost" onClick={handlePrevMonth}>
                        ‹
                    </button>
                    <div className="font-semibold text-center">
                        {currentDate.toLocaleString( "default", { month: "long", year: "numeric" } )}
                    </div>
                    <button className="btn btn-sm btn-ghost" onClick={handleNextMonth}>
                        ›
                    </button>
                </div>

                {/* Weekday labels */}
                <div className="grid grid-cols-7 text-center text-sm opacity-60 mb-1">
                    {[ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ].map( ( day ) => (
                        <div key={day}>{day}</div>
                    ) )}
                </div>

                {/* Days */}
                <div className="grid grid-cols-7 gap-1 text-center">
                    {/* empty slots for first week */}
                    {Array.from( { length: firstDay } ).map( ( _, i ) => (
                        <div key={`empty-${ i }`} />
                    ) )}

                    {/* actual days */}
                    {Array.from( { length: daysInMonth } ).map( ( _, i ) => {
                        const day = i + 1;
                        const dateStr = new Date( year, month, day ).toISOString().split( "T" )[ 0 ];
                        const isSelected = selectedDate === dateStr;

                        return (
                            <button
                                key={day}
                                className={`btn btn-sm ${ isSelected ? "btn-primary" : "btn-ghost" }`}
                                onClick={() => handleDateClick( day )}
                            >
                                {day}
                            </button>
                        );
                    } )}
                </div>

                {/* Selected date display */}
                {selectedDate && (
                    <p className="mt-3 text-center text-sm">
                        Selected: <span className="font-semibold">{selectedDate}</span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default CalendarPicker;
