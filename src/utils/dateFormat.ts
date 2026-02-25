const dateFormat = ( isoString: string ) => {
    if ( !isoString ) return "";

    return new Date( isoString ).toLocaleDateString( "en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "UTC"
    } );
}

export default dateFormat
