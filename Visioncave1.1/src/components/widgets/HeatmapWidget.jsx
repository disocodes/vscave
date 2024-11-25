import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function HeatmapWidget({ data, width = 400, height = 300 }) {
  const svgRef = useRef()

  useEffect(() => {
    if (!data || !svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const margin = { top: 20, right: 20, bottom: 30, left: 40 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.x)])
      .range([0, innerWidth])

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.y)])
      .range([innerHeight, 0])

    const color = d3.scaleSequential(d3.interpolateInferno)
      .domain([0, d3.max(data, d => d.intensity)])

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.x))
      .attr("cy", d => y(d.y))
      .attr("r", 5)
      .attr("fill", d => color(d.intensity))
      .attr("opacity", 0.7)

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x))
      .attr("color", "#9CA3AF")

    g.append("g")
      .call(d3.axisLeft(y))
      .attr("color", "#9CA3AF")

  }, [data, width, height])

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-white mb-4">Activity Heatmap</h3>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="w-full"
        style={{ maxHeight: '400px' }}
      />
    </div>
  )
}
