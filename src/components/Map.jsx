import mapImage from "../assets/images/map.png";
export default function Map(
) {
  return (
    <div className="flex flex-col items-center justify-center ">
        <img src={mapImage} alt="map" className="w-full h-130" />
    </div>
  );
}