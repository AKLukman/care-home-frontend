export const dateFormat = ( isoString: string ) => {
    if ( !isoString ) return "";

    return new Date( isoString ).toLocaleDateString( "en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "UTC"
    } );
}

export const dateAndTimeFormat = ( isoString: string ) => {
    if ( !isoString ) return "";

    return new Date( isoString ).toLocaleString( "en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,     // 24-hour format
        timeZone: "UTC"
    } );
};

export default dateFormat;