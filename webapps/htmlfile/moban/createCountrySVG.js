        // changed from arcgraph2.html
        var screenwidth=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
        var screenheight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight; 
        var countrySVG=d3.select(".countrySVG")

        var mycolor2=["#88B8CC","#8B91AB","#DDCDCD","#787785","#C1CFD0","#C9DEF1","#C19992","#F3D5D8","#B5C5C4","#F6F6F6"]

        var total=0
        for(var i=0;i<createCountryData.length;i++){
            createCountryData[i].startAngle=total
            total+=createCountryData[i].value
            createCountryData[i].endAngle=total
        }

        countrySVG.selectAll("rect")
            .data(createCountryData)
            .enter()
            .append("rect")
            .attr("x",function(d,i){
                return screenwidth*0.1+screenwidth*0.4/createCountryData.length*i
            })
            .attr("y",function(d,i){
                return 530
            })
            .attr("width",function(d,i){
                return screenwidth*0.4*0.9/createCountryData.length
            })
            .attr("height",function(d,i){
                return 0
            })
            .attr("fill",function(d,i){
                return mycolor2[i%10]
            })
            .attr("id",function(d,i){
                return d.name+"chart"
            })
            .on("mouseover",function(d,i){
                countrySVG.selectAll('[id="' + i.name+"chart"+'"]').attr("opacity","50%")
                countrySVG.selectAll('[id="' + i.name+i.value+'"]').style("visibility","visible")
            })
            .on("mouseout",function(d,i){
                countrySVG.selectAll('[id="' + i.name+"chart"+'"]').attr("opacity","100%")
                countrySVG.selectAll('[id="' + i.name+i.value+'"]').style("visibility","hidden")
            })
            .transition()
            .delay(function(d){
                return 2000
            })
            .duration(2000)
            .ease(d3.easeLinear)
            .attr("y",function(d){
                var dataheight=20+480*d.value/createCountryData[0].value
                return 530-dataheight
            })
            .attr("height",function(d,i){
                return 20+480*d.value/createCountryData[0].value
            })
            
            
        countrySVG.append("line")
                .attr("x1",screenwidth*0.096)
                .attr("y1", 530)  
                .attr("x2", screenwidth*0.096)
                .attr("y2", 0)  
                .attr("stroke", "white")  
                .attr("stroke-width", "2px")

        countrySVG.append("line")
                .attr("x1",screenwidth*0.096)
                .attr("y1", 530)  
                .attr("x2", screenwidth*0.51)
                .attr("y2", 530)  
                .attr("stroke", "white")  
                .attr("stroke-width", "2px")
        
        countrySVG.selectAll("text1")
                .data(createCountryData)
                .enter()
                .append("text")
                .attr("x",function(d,i){
                    return screenwidth*0.1+screenwidth*0.4/createCountryData.length*i
                })
                .attr("y",function(d,i){
                    var dataheight=20+480*d.value/createCountryData[0].value
                    return 530-dataheight
                })
                .text(function(d,i){
                    return d.name+":"+d.value
                })
                .attr("fill","white")
                .attr("font-size",13)
                .attr("text-anchor","start")
                .style("visibility","hidden")
                .attr("id",function(d,i){
                    return d.name+d.value
                })

        countrySVG.selectAll("text2")
                .data(createCountryData)
                .enter()
                .append("text")
                .attr("x",function(d,i){
                    return screenwidth*0.11+screenwidth*0.4/createCountryData.length*i
                })
                .attr("y",function(d,i){
                    var dataheight=20+480*d.value/createCountryData[0].value
                    return 540
                })
                .text(function(d,i){
                    return d.shortname
                })
                .attr("fill","white")
                .attr("font-size",10)
                .attr("text-anchor","middle")
                .attr("id",function(d,i){
                    return d.shortname
                })
                
            // draw organization data
            var organizationSVG=d3.select(".countrySVG")

            for(var i=0;i<10;i++){
                createOrganizationData[i].value=parseInt(createOrganizationData[i].value)
            }
            // console.log(createOrganizationData)
    
            var total=0
            for(var i=0;i<createOrganizationData.length;i++){
                createOrganizationData[i].startAngle=total
                total+=createOrganizationData[i].value
                createOrganizationData[i].endAngle=total
            }
    
            var pie=d3.pie().value(function(d){
                return d.value
            })
            var piedata=pie(createOrganizationData)
            var arcPath=d3.arc().innerRadius(0).outerRadius(250)

            organizationSVG.selectAll("path")
                .data(piedata)
                .enter()
                .append("path")
                .attr("d",function(d,i){
                    return arcPath(d)
                })
                .attr("transform","translate("+screenwidth*0.75+","+550*0.5+")")
                .attr("stroke","azure")
                .attr("stroke-width","3px")
                .attr("fill",function(d,i){
                    return mycolor2[i%10]
                })
                .attr("opacity",0)
                .attr("id",function(d,i){
                    return d.data.name+"chart"
                })
                .on("mouseover",function(d,i){
                    organizationSVG.selectAll('[id="' + i.data.name+"chart"+'"]').attr("opacity","50%")
                    organizationSVG.selectAll('[id="' + i.data.name+i.data.value+'"]').style("visibility","visible")
                    organizationSVG.selectAll('[id="' + i.data.name+'"]').style("visibility","hidden")
                })
                .on("mouseout",function(d,i){
                    organizationSVG.selectAll('[id="' + i.data.name+"chart"+'"]').attr("opacity","100%")
                    organizationSVG.selectAll('[id="' + i.data.name+i.data.value+'"]').style("visibility","hidden")
                    organizationSVG.selectAll('[id="' + i.data.name+'"]').style("visibility","visible")
                })
                .transition()
                .delay(function(d){
                    return 2000
                })
                .duration(2000)
                .ease(d3.easeLinear)
                .attr("opacity",1)
                
            organizationSVG.selectAll("text3")
                .data(createOrganizationData)
                .enter()
                .append("text")
                .text(function(d,i){
                    return d.name+":"+d.value
                })
                .attr("text-anchor",function(d,i){
                    if(i==9){
                        return "middle"
                    }
                    if(i==10){
                        return "start"
                    }
                    if(d.startAngle+d.endAngle<total){
                        return "start"
                    }
                    else{
                        return "end"
                    }
                })
                .attr("fill","white")
                .attr("font-size",15)
                .attr("transform",function(d,i){
                    return "translate("+screenwidth*0.75+","+550*0.5+")"+
                            "translate("+260*Math.sin(Math.PI*d.startAngle/total+Math.PI*d.endAngle/total)
                            +","+260*Math.cos(Math.PI*d.startAngle/total+Math.PI*d.endAngle/total)*(-1)+")"
                })
                .style("visibility","hidden")
                .attr("id",function(d,i){
                    return d.name+d.value
                })
    
            organizationSVG.selectAll("text4")
                .data(createOrganizationData)
                .enter()
                .append("text")
                .text(function(d,i){
                    return d.name
                })
                .attr("fill","white")
                .attr("opacity",0)
                .attr("text-anchor",function(d,i){
                    if(i==9){
                        return "middle"
                    }
                    if(i==10){
                        return "start"
                    }
                    if(d.startAngle+d.endAngle<total){
                        return "start"
                    }
                    else{
                        return "end"
                    }
                })
                .attr("font-size",10)
                .attr("transform",function(d,i){
                    return "translate("+screenwidth*0.75+","+550*0.5+")"+
                            "translate("+255*Math.sin(Math.PI*d.startAngle/total+Math.PI*d.endAngle/total)
                            +","+255*Math.cos(Math.PI*d.startAngle/total+Math.PI*d.endAngle/total)*(-1)+")"
                })
                .style("visibility","visible")
                .attr("id",function(d,i){
                    return d.name
                })
                .transition()
            .delay(function(d){
                return 3500
            })
            .duration(500)
            .ease(d3.easeLinear)
            .attr("opacity",1)
            
            organizationSVG.append("text")
                            .text("机构")
                            .attr("fill","white")
                            .attr("text-anchor","start")
                            .attr("font-size",15)
                            .attr("x",screenwidth*0.51+5)
                            .attr("y",535)
            organizationSVG.append("text")
                            .text("人数")
                            .attr("fill","white")
                            .attr("text-anchor","end")
                            .attr("font-size",15)
                            .attr("x",screenwidth*0.096-5)
                            .attr("y",15)
            