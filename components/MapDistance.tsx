import { useDirectionData } from "@/utils/context/useDirectionData"


const MapDistance = () => {

    const { directionData } = useDirectionData()

    const getDistanceToKm = () => {
        
        return (directionData.routes[0].distance / 1000).toFixed(2)
    }

    const getTime = () => {
        if(directionData.routes[0].duration > 3600){
            const hour = Math.trunc(directionData.routes[0].duration / 3600)
            const min = Math.trunc((directionData.routes[0].duration % 3600) / 60)
            return hour + " h e " + min + " min";
        }else{

            return Math.trunc(directionData.routes[0].duration / 60) + " min"
        }
    }

  return (
    <div className="absolute bottom-5 right-0 p-4 bg-orange-600 flex justify-between items-center gap-6">
        <div className="text-lg text-white">
            <span> Distancia: </span>
            <span className="text-black"> { getDistanceToKm() } </span>
            <span> Km </span>
        </div>
        <div className="text-lg text-white">
            <span> Tempo: </span>
            <span className="text-black"> { getTime() } </span>
        </div>
    </div>
  )
}

export default MapDistance