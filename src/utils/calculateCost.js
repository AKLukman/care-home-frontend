export const calculateCost = ( { type, weight, senderCenter, receiverCenter } ) => {
    let base = type === "document" ? 50 : 80;
    let weightCost = Number( weight || 1 ) * 10;

    if ( senderCenter !== receiverCenter ) {
        base += 40;
    }

    return base + weightCost;
};
