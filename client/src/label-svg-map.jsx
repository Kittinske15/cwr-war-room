import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import data from "./gdp.json";
import inflation from "./inflation.json"
import * as d3 from "d3";

function LabelSVGMap(props) {
	const countries = data.map((item) => item["Country/Territory"]);
	const estimateGDP = data.map((item) => item["Estimate"]);
	const inflationData = inflation.map((item) => item["Last"])
	// const color = d3
    // .scaleThreshold()
    // .domain(d3.range(2, 75.1, (75.1 - 2.6) / 8))
    // .range(d3.schemeGreens[9]);
	const color = d3.scaleQuantize([1, 9], d3.schemeBlues[9]);
	const colorCountry = (GDP) => {
  		if (GDP < 10000) {
			return color(1);
		} else if (GDP < 2000000) {
			return color(2);
		} else if (GDP < 4000000) {
			return color(3);
		} else {
			return color(4);
		}
		};
	

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox={props.map.viewBox}
			className={props.className}
			role={props.role}
			aria-label={props.map.label}
		>
			{props.childrenBefore}
			{props.map.locations.map((location, index) => {
				const countryIndex = countries.findIndex((country) => country === location.name);
				const gdp = countryIndex !== -1 ? estimateGDP[countryIndex] : null;
				const inflationLast = countryIndex !== -1 ? inflationData[countryIndex] : null;

				return (
          <>
            <path
              id={location.id}
              name={location.name}
              d={location.path}
              className={
                typeof props.locationClassName === "function"
                  ? props.locationClassName(location, index)
                  : props.locationClassName
              }
              tabIndex={
                typeof props.locationTabIndex === "function"
                  ? props.locationTabIndex(location, index)
                  : props.locationTabIndex
              }
              role={props.locationRole}
              aria-label={
                typeof props.locationAriaLabel === "function"
                  ? props.locationAriaLabel(location, index)
                  : location.name
              }
              aria-checked={
                props.isLocationSelected &&
                props.isLocationSelected(location, index)
              }
              onMouseOver={props.onLocationMouseOver}
              onMouseOut={props.onLocationMouseOut}
              onMouseMove={props.onLocationMouseMove}
              onClick={props.onLocationClick}
              onKeyDown={props.onLocationKeyDown}
              onFocus={props.onLocationFocus}
              onBlur={props.onLocationBlur}
              key={location.id}
              fill={colorCountry(gdp)}
            />

            <style>
              {`
          .highlighted {
            fill: blue;
            font-weight: bold;
			padding-right: 10px;
          }
        `}
            </style>
            <text
              id={"text_" + location.id}
              key={"text_" + location.id}
              textAnchor="middle"
              fontSize="0em"
              fontWeight="lighter"
              name={location.name}
            >
              <tspan class="highlighted">{location.name}</tspan>
              <tspan id="gdp" dx="1em">
                {gdp} MM$
              </tspan>
            </text>
          </>
        );
			})}
			{props.childrenAfter}
		</svg>
	);

}

LabelSVGMap.propTypes = {
	// Map properties
	map: PropTypes.shape({
		viewBox: PropTypes.string.isRequired,
		locations: PropTypes.arrayOf(
			PropTypes.shape({
				path: PropTypes.string.isRequired,
				id: PropTypes.string.isRequired,
				name: PropTypes.string
			})
		).isRequired,
		label: PropTypes.string
	}).isRequired,
	className: PropTypes.string,
	role: PropTypes.string,

	// Locations properties
	locationClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	locationTabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	locationRole: PropTypes.string,
	locationAriaLabel: PropTypes.func,
	onLocationMouseOver: PropTypes.func,
	onLocationMouseOut: PropTypes.func,
	onLocationMouseMove: PropTypes.func,
	onLocationClick: PropTypes.func,
	onLocationKeyDown: PropTypes.func,
	onLocationFocus: PropTypes.func,
	onLocationBlur: PropTypes.func,
	isLocationSelected: PropTypes.func,

	// Slots
	childrenBefore: PropTypes.node,
	childrenAfter: PropTypes.node,
};

LabelSVGMap.defaultProps = {
	className: 'svg-map',
	role: 'none', // No role for map
	locationClassName: 'svg-map__location',
	locationTabIndex: '0',
	locationRole: 'none',
};

export default LabelSVGMap;