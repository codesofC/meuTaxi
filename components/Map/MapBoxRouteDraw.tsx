
import React from 'react'
import { Layer, Source } from 'react-map-gl'

type PositionProps = number []

const MapBoxRouteDraw = ({ coordinates }: { coordinates: PositionProps []}) => {
  return (
    <Source
        type='geojson'
        data={{
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: coordinates
            },
            properties: Source
        }}
    >
        <Layer 
            type='line'
            layout={{ 'line-join': 'round', 'line-cap': 'square'}}
            paint={{ 'line-color': '#0462d4', 'line-width': 6}}
        />
    </Source>
  )
}

export default MapBoxRouteDraw