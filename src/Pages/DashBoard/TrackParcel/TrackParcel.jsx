import React from 'react';

const TrackParcel = () => {
    return (
        <div>
            <h1>Track Your Parcel</h1>
            <form>
                <input type="text" placeholder="Enter Tracking ID" />
                <button type="submit">Track</button>
            </form>
        </div>
    );
};

export default TrackParcel;