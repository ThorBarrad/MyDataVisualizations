<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		<script src = "https://d3js.org/d3.v7.min.js"></script>
		<script type="text/javascript">  
			
		var nodes = [{name:"a.IM" },{name:"AI" },
		{name:"CL"},{name: "CV"},{name: "DC"},
		{name: "LG" },{name: "NE"},
		{name: "RO" },{name:"SD" },{name:"ST" },
		{name:"p.data" },{name:"p.soc"},
		{name: "q.BM" },{name:"q.RM"},{name:"s.AP" },
		{name:"s.ME" },{name:"s.ML" }];
		var chinese = ["仪器仪表和天体物理学方法","人工智能",
		  "计算与语言","机器视觉与模式识别","分布式并行与集群计算","自动学习","神经与进化计算",
		  "机器人学","声音处理","统计理论","数据分析统计和概率","物理学与社会","生物分子",
		  "风险管理","应用统计","统计方法论","(统计)机器学习"];
		var edge_data =[[0, 59, 3, 148, 158, 326, 32, 34, 2, 0, 57, 32, 0, 0, 10, 9, 79],
			[59,0,6399,6619,600,19141,2319,3273,531,154,78,136,45,8,249,254,5991],
			[3,6399,0,1826,58,8838,677,207,1913,11,80,320,13,2,116,25,1958],
			[148,6619,1823,0,277,19540,1633,3778,448,56,128,32,22,0,248,105,5336],
			[158, 600, 56, 277, 0, 2239, 240, 140, 10, 18, 31, 38, 14, 1, 22, 18, 730],
			[326,19141,8824,19540,2239,0,4948,3807,3159,1861,515,331,290,65,1341,1526, 44983],
			[32,2319,674,1633,240,4948, 0,326,154,36,36,48,16,2,32,23,1836],
			[34, 3273, 191, 3778, 140, 3807, 326, 0, 55, 5, 4, 6, 1, 0, 49, 9, 734],
			[2, 531, 1903, 448, 10, 3159, 154, 55, 0, 6, 16, 10, 1, 0, 29, 9, 804],
			[0, 154, 10, 56, 18, 1861, 36, 5, 6, 0, 58, 36, 2, 1, 61, 327, 1603],
			[57, 78, 77, 128, 31, 515, 36, 4, 16, 58, 0, 670, 4, 1, 80, 71, 295],
			[32, 136, 320, 32, 38, 331, 48, 6, 10, 36, 670, 0, 1, 8, 292, 111, 248],
			[0, 45, 13, 22, 14, 290, 16, 1, 1, 2, 4, 1, 0, 0, 5, 4, 86],
			[0, 8, 2, 0, 1, 65, 2, 0, 0, 1, 1, 8, 0, 0, 8, 2, 28],
			[10, 249, 113, 248, 22, 1341, 32, 49, 29, 61, 80, 292, 5, 8, 0, 270, 985],
			[10, 314, 58, 132, 44, 1842, 64, 11, 10, 376, 191, 789, 8, 5, 291, 0, 1491],
			[79,5991,1954,5336,730,44983,1836,734,804,1603,295,248,86,28,985,1302,0]]      
		var edges = new Array(16*16);
		for (i = 0;i < 17;i ++)
		{
			for (j = 0;j < 17;j ++)
			{
				edges[16*i+j] = {"source":i,"target":j,"value":edge_data[i][j]}
			}
		}
		console.log('原数组：',edges);
		
		
		function drag(){
		    function dragstarted(event,d){
		        if(!event.active) forceSimulation.alphaTarget(0.3).restart();
		            d.fx=d.x
		            d.fy=d.y
		        }
		    function dragged(event,d){
		        d.fx=event.x
		        d.fy=event.y
		    }
		    function dragended(event,d){
		        if(!event.active) forceSimulation.alphaTarget(0);
		            d.fx=null
		            d.fy=null
		    }
		    return d3.drag()
		            .on("start",dragstarted)
		            .on("drag",dragged)
		            .on("end",dragended)
		}
		var forceSimulation=d3.forceSimulation()
		            .force("link",d3.forceLink())
		            .force("charge",d3.forceManyBody().strength(-20))
		            .force("center",d3.forceCenter(950,3600));
		forceSimulation.nodes(nodes)
		                .on("tick")
		forceSimulation.force("link")
		                .links(edges)
		                .distance(function(d){
		                    return 600;
		                })
		var path=svg.selectAll(".mypath")
		            .data(edges)
		            .enter()
		            .append("path")
		            .attr("class","mypath")
		            .attr("id",function(d,i){
		                return "edgepath"+i
		            })
		            .attr("stroke",d3.rgb(186, 235, 252))
		            .attr("opacity","50%")  
		            .style("stroke-width",function(d,i){
		                return 2
		            })
		function set_single(n)
		{
			var edges_ = new Array(17);
			var length = new Array(17);
			for (j = 0;j < 17;j ++)
			{
				edges_[j] = {"source":n,"target":j,"value":edge_data[n][j]}
				length[j] = edge_data[n][j]
			}
			var forceSimulation=d3.forceSimulation()
			            .force("link",d3.forceLink())
			            .force("charge",d3.forceManyBody().strength(-100))
			            .force("center",d3.forceCenter(900,3800));
			forceSimulation.nodes(nodes)
			                .on("tick")
			forceSimulation.force("link")
			                .links(edges_)
			                .distance(function(d,i){
                          var max = Math.max.apply(Math,length);
                          var min = Math.min.apply(Math,length);
                          return (length[i]-min)/(max - min)*300+300;
                      })
			var path=svg.selectAll(".mypath")
			            .data(edges_)
			            .enter()
			            .append("path")
			            .attr("class","mypath")
			            .attr("id",function(d,i){
			                return "edgepath"+i
			            })
			            .attr("stroke",d3.rgb(186, 235, 252))
			            .attr("opacity","50%")  
			            .style("stroke-width",function(d,i){
			                return 4
			            })
			var dott=svg.selectAll(".node")
			            .data(nodes)
			            .enter()
			            .append("circle")
			            .attr("class","node")
			            .attr("r",function(d,i){
                          var max = Math.max.apply(Math,length);
                          var min = Math.min.apply(Math,length);
                          return (length[i]-min)/(max - min)*50+30;
                      })
			            .attr("id",function(d,i){
			                return "dot"+i
			            })
						.attr("fill",d3.rgb(252,157,154))
						.attr("opacity","70%")
						.style("stroke-width",function(d,i){
						    return 2
						})
			            .call(drag())
						.on("dblclick",function(d,i)
						{
							d3.selectAll(".node").remove()
							d3.selectAll(".mypath").remove()
							d3.selectAll(".ttxt").remove()
							d3.selectAll(".etxt").remove()
							d3.selectAll(".imgdefs").remove()
							set_single(i);
							})
				var ttxt=svg.selectAll(".ttxt")
				            .data(nodes)
				            .enter()
				            .append("text")
				            .text(function(d,i){
				                return d.name
				            })
				            .attr("class","ttxt")
				            .attr("text-anchor","middle")
				            .attr("font-size",25)
				            .call(drag())
				
				var etxt=svg.selectAll(".etxt")
				            .data(edges_)
				            .enter()
				            .append("text")
				            .append("textPath")
				            .attr("xlink:href",function(d,i){
				                return "#edgepath"+i
				            })
				            .text(function(d,i){
				                if(d.value>10){
				                    return d.value
				                }
				                else{
				                    return ""
				                }
				            })
				            .attr("startOffset","50%")
				            .attr("class","etxt")
				            .attr("text-anchor","middle")
				            .attr("font-size",16)
				
				forceSimulation.on("tick",()=>{
				    path.attr("d",function(d){
				        return "M"+d.source.x+","+d.source.y+"L"+d.target.x+","+d.target.y
				    })
				    dott.attr("cx",d=>d.x)
				        .attr("cy",d=>d.y)
				    ttxt.attr("transform",function(d){
				        return "translate("+(d.x)+","+(d.y+5+15)+")"
				    })
				})
			
			
		}
		var dott=svg.selectAll(".node")
		            .data(nodes)
		            .enter()
		            .append("circle")
		            .attr("class","node")
		            .attr("r",function(d,i){
		                return 30
		            })
		            .attr("id",function(d,i){
		                return "dot"+i
		            })
					.attr("fill",d3.rgb(252,157,154))
					.attr("opacity","70%")
					.style("stroke-width",function(d,i){
					    return 2
					})
		            .call(drag())
					.on("dblclick",function(d,i)
					{
						d3.selectAll(".node").remove()
						d3.selectAll(".mypath").remove()
						d3.selectAll(".ttxt").remove()
						d3.selectAll(".etxt").remove()
						d3.selectAll(".imgdefs").remove()
						set_single(i);
						})
					
		
		var ttxt=svg.selectAll(".ttxt")
		            .data(nodes)
		            .enter()
		            .append("text")
		            .text(function(d,i){
		                return d.name
		            })
		            .attr("class","ttxt")
		            .attr("text-anchor","middle")
		            .attr("font-size",25)
		            .call(drag())
		
		var etxt=svg.selectAll(".etxt")
		            .data(edges)
		            .enter()
		            .append("text")
		            .append("textPath")
		            .attr("xlink:href",function(d,i){
		                return "#edgepath"+i
		            })
		            .text(function(d,i){
		                if(d.value>10){
		                    return d.value
		                }
		                else{
		                    return ""
		                }
		            })
		            .attr("startOffset","50%")
		            .attr("class","etxt")
		            .attr("text-anchor","middle")
		            .attr("font-size",12)
		
		forceSimulation.on("tick",()=>{
		    path.attr("d",function(d){
		        return "M"+d.source.x+","+d.source.y+"L"+d.target.x+","+d.target.y
		    })
		    dott.attr("cx",d=>d.x)
		        .attr("cy",d=>d.y)
		    ttxt.attr("transform",function(d){
		        return "translate("+(d.x)+","+(d.y+5+15)+")"
		    })
		})
		
		
		
		
		
		function btn(){
			d3.selectAll(".node").remove()
			d3.selectAll(".mypath").remove()
			d3.selectAll(".ttxt").remove()
			d3.selectAll(".etxt").remove()
			d3.selectAll(".imgdefs").remove()
			var forceSimulation=d3.forceSimulation()
			            .force("link",d3.forceLink())
			            .force("charge",d3.forceManyBody().strength(-20))
			            .force("center",d3.forceCenter(950,3600));
			forceSimulation.nodes(nodes)
			                .on("tick")
			forceSimulation.force("link")
			                .links(edges)
			                .distance(function(d){
			                    return 600;
			                })
			var path=svg.selectAll(".mypath")
			            .data(edges)
			            .enter()
			            .append("path")
			            .attr("class","mypath")
			            .attr("id",function(d,i){
			                return "edgepath"+i
			            })
			            .attr("stroke",d3.rgb(186, 235, 252))
			            .attr("opacity","50%")  
			            .style("stroke-width",function(d,i){
			                return 2
			            })
			var dott=svg.selectAll(".node")
			            .data(nodes)
			            .enter()
			            .append("circle")
			            .attr("class","node")
			            .attr("r",function(d,i){
			                return 30
			            })
			            .attr("id",function(d,i){
			                return "dot"+i
			            })
						.attr("fill",d3.rgb(252,157,154))
						.attr("opacity","70%")
						.style("stroke-width",function(d,i){
						    return 2
						})
			            .call(drag())
						.on("dblclick",function(d,i)
						{
							d3.selectAll(".node").remove()
							d3.selectAll(".mypath").remove()
							d3.selectAll(".ttxt").remove()
							d3.selectAll(".etxt").remove()
							d3.selectAll(".imgdefs").remove()
							set_single(i);
							})
						
			
			var ttxt=svg.selectAll(".ttxt")
			            .data(nodes)
			            .enter()
			            .append("text")
			            .text(function(d,i){
			                return d.name
			            })
			            .attr("class","ttxt")
			            .attr("text-anchor","middle")
			            .attr("font-size",25)
			            .call(drag())
			
			var etxt=svg.selectAll(".etxt")
			            .data(edges)
			            .enter()
			            .append("text")
			            .append("textPath")
			            .attr("xlink:href",function(d,i){
			                return "#edgepath"+i
			            })
			            .text(function(d,i){
			                if(d.value>10){
			                    return d.value
			                }
			                else{
			                    return ""
			                }
			            })
			            .attr("startOffset","50%")
			            .attr("class","etxt")
			            .attr("text-anchor","middle")
			            .attr("font-size",12)
			
			forceSimulation.on("tick",()=>{
			    path.attr("d",function(d){
			        return "M"+d.source.x+","+d.source.y+"L"+d.target.x+","+d.target.y
			    })
			    dott.attr("cx",d=>d.x)
			        .attr("cy",d=>d.y)
			    ttxt.attr("transform",function(d){
			        return "translate("+(d.x)+","+(d.y+5+15)+")"
			    })
			})
		}
		</script>
		
	</body>
</html>