import 'react-svg-map/lib/'
import china from "@svg-maps/china";
import { SVGMap } from 'react-svg-map';
import LabelSVGMap from '../label-svg-map';
import React, { useState, useEffect, useRef } from 'react';
import data from "../gdp.json";
import * as d3 from "d3";
import { feature } from 'topojson';
import { colorLegend } from '../components/colorLegend';
import { colorData, colorScale, numberScale } from '../components/color';
// import { colorData, colorScale, numberScale, } from '../components/color.js';
import { geoNaturalEarth1, geoPath } from "d3-geo";

export default function China() {
    const provinces_data = data.map((item) => item["Country/Territory"]);
    const estimateGDP = data.map((item) => item["Estimate"]);
    const getColor = (num) => colorData(num);

    const svgRef = useRef();


    useEffect(() => {
        const width = 1190;
        const height = 600;
        const colors = colorScale();
        const range = numberScale();
        const getGDP = (country) => estimateGDP[provinces_data.findIndex((isCountry) => isCountry === country)];

        const scale = d3.scaleOrdinal()
            .domain(range)
            .range(colors);
        const svg = d3.select(svgRef.current).attr('width', width).attr('height', height);

        const projection = geoNaturalEarth1()
            .scale(1190)
            .translate([-700, 760])
            ;
        var pathGenerator = geoPath().projection(projection);

        const g = svg.append('g');


        g.append('path')
            .attr('class', 'sphere')
            .attr('d', pathGenerator({ type: 'Sphere' }));

        svg.call(d3.zoom()
            .scaleExtent([1, 12])
            .on('zoom', (event) => {
                g.attr('transform', event.transform);
            }));


        // create a tooltip
        const tooltip = d3
            .select('body')
            .append('div')
            .attr('class', 'd3-tooltip')
            .style('position', 'absolute')
            .style('z-index', '10')
            .style('visibility', 'hidden')
            .style('padding', '10px')
            .style('background', 'rgba(0,0,0,0.6)')
            .style('border-radius', '5px')
            .style('color', 'white');

        //create a map
        d3.json(
            'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-states.json'
        ).then((data) => {
            const jsondata = feature(data, data.objects.IND_adm1);
            jsondata.features.shift()

            g.selectAll('path')
                .data(jsondata.features)
                .enter()
                .append('path')
                .attr('class', 'states')
                .attr('fill', (d) => getColor(
                    getGDP(d.properties.NAME_1)))
                .attr('d', pathGenerator)
                .on("click", (event, d) => {
                    console.log(d.properties.NAME_1)
                })
                .on('mouseover', function (e, d) {
                    tooltip
                        .html(
                            `${d.properties.NAME_1
                            }`
                        )
                        .style('visibility', 'visible');
                })
                .on('mousemove', function (event) {
                    tooltip
                        .style('top', event.pageY - 10 + 'px')
                        .style('left', event.pageX + 10 + 'px')
                        ;
                })
                .on('mouseout', function () {
                    tooltip.style('visibility', 'hidden');
                })
                .append('title')


            //text Label Name_country
            g.selectAll("text.country-name")
                .data(jsondata.features)
                .enter()
                .append("text")
                .attr("class", "province-name")
                .attr("x", d => pathGenerator.centroid(d)[0])
                .attr("y", d => pathGenerator.centroid(d)[1])
                .attr("text-anchor", "middle")
                .attr("font-size", "5px")
                .style("font-weight", "light")
                .style("fill", "black")
                .text(d => d.properties.NAME_1);

        });

        //colorLengend
        svg.call(colorLegend, {
            colorScale: scale,
            colorLegendLabel:
                'GDP (2023)',
            colorLegendX: 30,
            colorLegendY: 70,
        });
    }, [provinces_data, estimateGDP]);


    return (
        <div className="home">
            <div className="home-header" />
            <div className='home-body'>
                <svg className="map" ref={svgRef}></svg>
            </div>
        </div>
    );
}