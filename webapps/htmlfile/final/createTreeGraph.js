        // changed from treegraph.html
        
        var screenwidth=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
        var screenheight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
        screenwidth=screenwidth-50;
        screenheight=screenheight+300;

        
        d3.selectAll(".h1ader")
            .on("mouseover",function(d,i){
                var about=d3.selectAll("body")  
                            .append("div")
                            .attr("class","about")
                            .style("position","absolute")  
                            .style("background-color","black")
                            .style("border-radius","3px")  
                            .style("color","white")
                            .style("padding","0 15px")
                            .style("margin","0 13%")  
                            .style("opacity",0.0);  
                about.html('<p>"AI 2000最具影响力学者年度榜单"旨在评选这十年人工智能领域的2000位全球顶尖研究学者。该榜单旨在表彰具有持久贡献和影响的杰出技术成就。</p><p>AI 2000 涵盖与人工智能相关的20个核心领域以及新兴领域。每年遴选时，参考过去10年各领域最有影响力的会议和期刊发表论文的引用情况，各领域排名前10名的学者荣膺该领域当年【AI 2000最具影响力学者奖】，排名11至100名的学者荣获【AI 2000最具影响力学者提名奖】。因此，每年将选出约 200 位最具影响力的学者（每个领域 10 位乘以 20 多个领域），形成一个由约 2000 位学者组成的群体，他们将在下个 10 年推动人工智能各个领域的创新和进步。</p>')
                            .style("top",(d.pageY+5)+"px")
                            .style("opacity",0.8)
            })
            .on("mouseout",function(d,i){
                d3.selectAll(".about").remove()
            })

        var treeGraphSVG=d3.select(".treeGraphSVG")

        function getData(type_data){
            var resultData;
            $.ajax({
                //url
                url:'https://apiv2.aminer.cn/magic?a=__ai2000v2.Ranking___' ,
                //参数:
                data:'[{"action":"ai2000v2.Ranking","parameters":{"year":2021,"entity_type":"'+type_data+'","domain_ids":["5e8033d86121f6a2cf583984", "617610d9302569a70eab4244"]}}]',
                //请求类型：
                type:'POST',
                //响应体结果：
                dataType:'json',
                contentType:"application/json",
                async:false,
                //成功回调：
                success:function(data){
                    resultData=data["data"][0]["data"]
                },
                //超时时间：
                timeout:2000,
                //失败回调：
                error:function(){
                    console.log('出错');
                },
                //传递头信息：
                header:{
                    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36 Edg/100.0.1185.44",
                }
            })
            return resultData
        }

        var countryData=getData("country")
        var organizationData=getData("organization")
        var scholarData=getData("scholar")

        var treeData={"name":"AI 2000","children":new Array(),"avatar":"","id":0};

        for(var i=0;i<countryData.length;i++){
            treeData["children"].push({
                "name":countryData[i]["name"]["en"],
                "id":countryData[i]["id"],
                "children":new Array(),
                "avatar":countryData[i]["content"]["avatar"]
            })
        }

        for(var i=0;i<organizationData.length;i++){
            if(!organizationData[i]["country_ids"]){
                continue
            }
            for(var j=0;j<treeData["children"].length;j++){
                if(treeData["children"][j]["id"]==organizationData[i]["country_ids"][0]){
                    treeData["children"][j]["children"].push({
                        "name":organizationData[i]["name"]["en"],
                        "id":organizationData[i]["id"],
                        "children":new Array(),
                        "avatar":organizationData[i]["content"]["avatar"]
                    })
                    break
                }
            }
        }

        for(var i=0;i<scholarData.length;i++){
            if(!scholarData[i]["country_ids"]||!scholarData[i]["org_ids"]){
                continue
            }
            for(var j=0;j<treeData["children"].length;j++){
                if(treeData["children"][j]["id"]==scholarData[i]["country_ids"][0]){
                    for(var k=0;k<treeData["children"][j]["children"].length;k++){
                        if(treeData["children"][j]["children"][k]["id"]==scholarData[i]["org_ids"][0]){
                            treeData["children"][j]["children"][k]["children"].push({
                                "name":scholarData[i]["name"]["en"],
                                "id":scholarData[i]["id"],
                                "avatar":scholarData[i]["content"]["person"]["avatar"]
                            })
                            break
                        }
                    }
                    break
                }
            }
        }

        var tree=d3.tree().size([2*Math.PI,screenheight*0.5]); 

        var hi=d3.hierarchy(treeData);

        var root=tree(hi);

        links=root.links();

        nodes=root.descendants();

        var gc=treeGraphSVG.append("g")


        var lines=gc.selectAll("path")
                    .data(links)
                    .enter()
                    .append("path")
                    .attr("fill","none")
                    .attr("stroke","#00f")
                    .attr("class",function(d){
                        return "AI2000 "+d.source.data.id
                    })
                    .attr("id",function(d){
                        return d.target.data.id
                    })
                    .attr("transform","translate(" + (screenwidth*0.5) + "," + (screenheight*0.65) + ")")
                    .attr("d",d3.linkRadial().angle(d => d.x).radius(d => d.y))
                    
        
        function processPath(i){
            if(!i.children){
                return
            }
            for(var j=0;j<i.children.length;j++){
                var path = d3.select('[id="' + i.children[j].data.id+'"]')
                path.transition()
                    .delay(function(d){
                        return 1000+d.source.depth*1000
                    })
                    .duration(1000)
                    .ease(d3.easeLinear)
                    .attr("stroke-dashoffset", 0);
                processPath(i.children[j])
            }
        }
        function processPath2(i){
            if(!i.children){
                return
            }
            for(var j=0;j<i.children.length;j++){
                var path = d3.select('[id="' + i.children[j].data.id+'"]')
                var totalLength = path.node().getTotalLength();
                path.attr("stroke-dasharray", totalLength + " " + totalLength)
                    .attr("stroke-dashoffset", totalLength)
                processPath2(i.children[j])
            }
        }
        processPath2(nodes[0])
        processPath(nodes[0])
        
                    


        
        var nodetxt=gc.selectAll("text") 
                        .data(nodes)
                        .join("text")
                        .attr("x",d=>Math.cos(d.x-Math.PI/2)*d.y)
                        .attr("y",d=>Math.sin(d.x-Math.PI/2)*d.y)
                        .attr("text-anchor",function(d,i){
                            if(d.x>Math.PI){
                                return "end"
                            }
                            else{
                                return "start"
                            }
                        })
                        .attr("font-size","9")
                        .attr("fill",function(d,i){
                            return "azure"
                        }) 
                        .attr("transform",function(d,i){
                            if(d.x>Math.PI){
                                return "translate(" + (screenwidth*0.5) + "," + (screenheight*0.65) + ")"
                                +"rotate("+(d.x*180/Math.PI+90)+","+(Math.cos(d.x-Math.PI/2)*d.y)+","+(Math.sin(d.x-Math.PI/2)*d.y)+")"
                            }
                            else{
                                return "translate(" + (screenwidth*0.5) + "," + (screenheight*0.65) + ")"
                                +"rotate("+(d.x*180/Math.PI-90)+","+(Math.cos(d.x-Math.PI/2)*d.y)+","+(Math.sin(d.x-Math.PI/2)*d.y)+")"
                            }                            
                        })
                        .text(d=>!d.children?d.data.name:"")
                        .attr("class",function(d){
                            return "AI2000 "+d.data.id
                        })
                        .transition()
                        .delay(function(d){
                            return 4000
                        })
                        .duration(500)
                        .ease(d3.easeLinear)
                        .attr("fill", "green");

        var mynode=gc.selectAll("circle")
                        .data(nodes)
                        .join("circle")
                        .attr("cx",d=>Math.cos(d.x-Math.PI/2)*d.y)
                        .attr("cy",d=>Math.sin(d.x-Math.PI/2)*d.y)
                        .attr("r",d=>4)
                        .attr("fill","azure")
                        .attr("transform","translate(" + (screenwidth*0.5) + "," + (screenheight*0.65) + ")")
                        .attr("class",function(d){
                            return "AI2000 "+d.data.id
                        })
                        .on("mouseover",function(d,i){
                            d3.select(".mypic").remove()
                            d3.select(".myname").remove()
                            d3.selectAll(".AI2000").attr("opacity","30%")
                            process(i.data)

                            treeGraphSVG.append("rect")
                                .attr("class","mypic")
                                .attr("x",screenwidth*0.47)
                                .attr("y",screenheight*0.94)
                                .attr("width",100)
                                .attr("height",100)
                                .style('fill', function(){
                                    if(i.data.avatar==""){
                                        return "none"
                                    }
                                    var defs=treeGraphSVG.append("defs").attr("class","imgdefs")
                                    var catpattern=defs.append("pattern")
                                                        .attr("id","catpattern"+i.data.name.replaceAll(" ","").replaceAll("(","").replaceAll(")",""))
                                                        .attr("height",1)
                                                        .attr("width",1)
                                    catpattern.append("image")
                                            .attr("x", 0)
                                            .attr("y", 0)
                                            .attr("width",100)
                                            .attr("height",100)
                                            .attr("xlink:href",i.data.avatar.replaceAll(" ","%20"));
                                    return "url(#catpattern" + i.data.name.replaceAll(" ","").replaceAll("(","").replaceAll(")","") + ")"
                                })
                            treeGraphSVG.append("text")
                                .attr("class","myname")
                                .attr("x",screenwidth*0.47+50)
                                .attr("y",screenheight*0.94+120)
                                .attr("text-anchor","middle")
                                .attr("font-size","20")
                                .attr("fill","black") 
                                .text(i.data.name)
                        })
                        .transition()
                        .delay(function(d){
                            return 1000+d.depth*1000
                        })
                        .duration(500)
                        .ease(d3.easeLinear)
                        .attr("fill", "red");

        function process(i){
            d3.selectAll('[class="AI2000 ' +i.id+'"]').attr("opacity","100%")
            if(i.children){
                for(var j=0;j<i.children.length;j++){
                    process(i.children[j])
                }
            }
        }