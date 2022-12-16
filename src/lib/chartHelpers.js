function axesDomain(axis, axisObject, label, visWidth, visHeight){
    if (axis == 'x' || axis == 'X'){
        axisObject
            .call(g => g.select('.domain').remove())
            .append('text')
            .attr('fill', 'black')
            .attr('text-anchor', 'start')
            .attr('dominant-baseline', 'hanging')
            .attr('font-weight', 'bold')
            .attr('y', 20)
            .attr('x', visWidth /2)
            .text(label);
    } else if (axis == 'y' || axis == 'Y'){
        axisObject
        .call(g => g.select('.domain').remove())
        .append('text')
        .attr('fill', 'black')
        .attr('text-anchor', 'start')
        .attr('dominant-baseline', 'hanging')
        .attr('font-weight', 'bold')
        .attr('y',-2)
        .attr('x',-30)
        .text(label);
    }
}

export default{
    axesDomain
}