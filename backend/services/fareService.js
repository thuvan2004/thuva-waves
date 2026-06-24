// Fare calculation — distance-ஐ வச்சு fare calculate பண்றோம்
export const calculateFare = (distanceKm) => {
    const baseFare = 80;          // Base fare (Rs.)
    const perKmRate = 45;         // Per km rate
    const minFare = 150;          // Minimum fare

    const fare = baseFare + (distanceKm * perKmRate);
    return Math.max(fare, minFare);
};

// Google Maps API-ல இருந்து distance எடுக்கிறோம்
export const getDistanceAndDuration = async (origin, destination) => {
    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.lat},${origin.lng}&destinations=${destination.lat},${destination.lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        const element = data.rows[0].elements[0];

        return {
            distance: element.distance.value / 1000,  // meters to km
            duration: element.duration.value / 60      // seconds to minutes
        };
    } catch (error) {
        throw new Error('Distance calculation failed');
    }
};