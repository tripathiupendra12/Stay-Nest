import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

const ListingMap = ({ coordinates, location }) => {
    if(!coordinates || coordinates.length < 2) {
        return <p>Location not available</p> 
    }
    return (
        <div className="h-100 md:h-125 rounded-xl">
            <MapContainer
                center={[coordinates[1], coordinates[0]]}
                zoom={13}
                scrollWheelZoom={false}
                style={{height: "100%", width: "100%" }}
            >
                <TileLayer attribution="&copy;
                    OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[coordinates[1], coordinates[0]]}>
                    <Popup> <h4 className="text-2xl font-bold text-gray-600">{location}</h4>
                        <p className="text-md font-medium text-gray-800">Exact Location will be <br/> provided after booking</p>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default ListingMap;