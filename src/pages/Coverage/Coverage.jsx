import { useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const districts = [
    { name: "Dhaka", lat: 23.8103, lng: 90.4125 },
    { name: "Chattogram", lat: 22.3569, lng: 91.7832 },
    { name: "Sylhet", lat: 24.8949, lng: 91.8687 },
    { name: "Rajshahi", lat: 24.3636, lng: 88.6241 },
    { name: "Khulna", lat: 22.8456, lng: 89.5403 },
];

const MapController = ( { district } ) => {
    const map = useMap();

    if ( district ) {
        map.flyTo( [ district.lat, district.lng ], 12, {
            animate: true,
            duration: 1.2,
        } );
    }

    return null;
};

const Coverage = () => {
    const [ search, setSearch ] = useState( "" );
    const [ selectedDistrict, setSelectedDistrict ] = useState( null );

    const filteredDistricts = districts.filter( ( d ) =>
        d.name.toLowerCase().includes( search.toLowerCase() )
    );

    // ✅ Derived, NOT state
    const autoSelectedDistrict =
        filteredDistricts.length === 1 ? filteredDistricts[ 0 ] : null;

    const activeDistrict = selectedDistrict || autoSelectedDistrict;

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">

                <h1 className="text-4xl font-bold text-center mb-6">
                    We Are Available in 64 Districts
                </h1>

                <div className="max-w-md mx-auto mb-8">
                    <input
                        type="text"
                        placeholder="Search district..."
                        className="input input-bordered w-full"
                        value={search}
                        onChange={( e ) => {
                            setSearch( e.target.value );
                            setSelectedDistrict( null ); // reset manual selection
                        }}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Districts */}
                    <div className="bg-white p-6 rounded-xl shadow">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {filteredDistricts.map( ( district, index ) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedDistrict( district )}
                                    className={`badge py-4 transition cursor-pointer
                    ${ activeDistrict?.name === district.name
                                            ? "bg-[#03373D] text-white"
                                            : "badge-outline hover:bg-[#03373D] hover:text-white"
                                        }
                  `}
                                >
                                    {district.name}
                                </button>
                            ) )}
                        </div>
                    </div>

                    {/* Map */}
                    <div className="bg-white p-4 rounded-xl shadow">
                        <MapContainer
                            center={[ 23.685, 90.3563 ]}
                            zoom={7}
                            className="h-[400px] w-full rounded-lg"
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <MapController district={activeDistrict} />

                            {filteredDistricts.map( ( district, index ) => (
                                <Marker key={index} position={[ district.lat, district.lng ]}>
                                    <Popup>{district.name}</Popup>
                                </Marker>
                            ) )}
                        </MapContainer>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Coverage;
