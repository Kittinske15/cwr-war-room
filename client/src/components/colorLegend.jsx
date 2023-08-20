export const colorLegend = (
  selection,
  {
    colorScale,
    colorLegendLabel,
    colorLegendX,
    colorLegendY,
    tickSpacing = 20,
    tickPadding = 15,
    colorLegendLabelX = -10,
    colorLegendLabelY = -20,
    circleRadius = 6,
    colorText = 'black',
  }
) => {
  const backgroundRect = selection.selectAll('rect')
  .data([null]);             
const n = colorScale.domain().length; 
backgroundRect.enter().append('rect')
  .merge(backgroundRect)
    .attr('x', colorLegendLabelX * 4 +50)   
    .attr('y', colorLegendLabelY * 4 +500)   
    .attr('rx', circleRadius * 2)   
    .attr('width', 140)
    .attr('height', tickSpacing * n * 1.35 + circleRadius * 2 ) 
    .attr('fill', 'white')
    .attr('opacity', 0.8);

  const colorLegendG = selection
    .selectAll('g.color-legend')
    .data([null])
    .join('g')
    .attr('class', 'color-legend')
    .attr(
      'transform',
      `translate(${colorLegendX},${colorLegendY})`
    );

  colorLegendG
    .selectAll('text.color-legend-label')
    .data([null])
    .join('text')
    .attr('x', colorLegendLabelX)
    .attr('y', colorLegendLabelY)
    .attr('class', 'color-legend-label')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 16)
    .attr('fill',colorText)
    .text(colorLegendLabel);

  colorLegendG
    .selectAll('g.tick')
    .data(colorScale.domain())
    .join((enter) =>
      enter
        .append('g')
        .attr('class', 'tick')
        .call((selection) => {
          selection.append('circle');
          selection.append('text');
        })
    )
    .attr(
      'transform',
      (d, i) => `translate(0, ${i * tickSpacing})`
    )
    .attr('font-size', 14)
    .attr('font-family', 'sans-serif')
    .call((selection) => {
      selection
        .select('circle')
        .attr('r', circleRadius)
        .attr('fill', colorScale)
    .attr('stroke', '#000')
    .attr('stroke-width', .5);
    //text
      selection
        .select('text')
        .attr('dy', '0.32em')
        .attr('x', tickPadding)
        .attr('fill', colorText)
        .text((d) => d);

    });
};
