// changed from pathforce.html

function searchData2(){
    var input_name=$("#myinput").val()
    d3.selectAll(".node").remove()              
    d3.selectAll(".mypath").remove()
    d3.selectAll(".ttxt").remove()
    d3.selectAll(".etxt").remove()
    // authorSVG2.selectAll(".imgdefs").remove()
    searchData(input_name)
}

function searchData3(name){
    d3.selectAll(".node").remove()              
    d3.selectAll(".mypath").remove()
    d3.selectAll(".ttxt").remove()
    d3.selectAll(".etxt").remove()
    // authorSVG2.selectAll(".imgdefs").remove()
    searchData(name)
}

function getPersonalData(personalData){ // 由学者id搜索学者论文
    // 搜索学者最近10年论文发表数量
    $.ajax({
        //url
        url:'https://apiv2.aminer.cn/magic?a=GetPersonPubsStats__person.GetPersonPubsStats___' ,
        //参数:
        data:'[{"action":"person.GetPersonPubsStats","parameters":{"ids":["'+personalData.id+'"]}}]',
        //请求类型：
        type:'POST',
        //响应体结果：
        dataType:'json',
        contentType:"application/json",
        async:false,
        //成功回调：
        success:function(data){
            authorSVG.selectAll(".authorRect").remove()
            authorSVG.append("rect")
                    .attr("class","authorRect")
                    .attr("x",screenwidth*0.13)
                    .attr("y",screenheight*0.13)
                    .attr("width",200)
                    .attr("height",200)
                    .attr("fill",function(){
                        if(personalData.avatar==""){
                            return "none"
                        }
                        var mydefs=authorSVG.append("defs").attr("class","imgdefs")
                        var mycatpattern=mydefs.append("pattern")
                                                .attr("id","catpattern2"+personalData.id)
                                                .attr("height",1)
                                                .attr("width",1)
                        mycatpattern.append("image")
                                    .attr("x", 0)
                                    .attr("y", 0)
                                    .attr("width",200)
                                    .attr("height",200)
                                    .attr("xlink:href",personalData.picture);
                        return "url(#catpattern2" + personalData.id + ")"
                    })
                    .on("mouseover",function(d,i){
                        var bioholder=d3.selectAll("body")  
                            .append("div")
                            .attr("class","bioholder")
                            .style("position","absolute")  
                            .style("background-color","black")
                            .style("border-radius","3px")  
                            .style("color","white")
                            .style("padding","10px")
                            .style("margin","0 13%")  
                            .style("opacity",0.0);  
                        bioholder.html(personalData.bio)
                                .style("top",(d.pageY+5)+"px")
                                .style("opacity",0.8)
                    })
                    .on("mouseout",function(d,i){
                        d3.selectAll(".bioholder").remove()
                    })
            
            authorSVG.selectAll(".authorName").remove()
            authorSVG.append("text")
                    .attr("class","authorName")
                    .attr("x",screenwidth*0.13+220)
                    .attr("y",screenheight*0.13+30)
                    .attr("text-anchor","start")
                    .attr("font-size","30")
                    .attr("fill","black") 
                    .text(personalData.name)

            authorSVG.selectAll(".authorPosition").remove()
            authorSVG.append("text")
                    .attr("class","authorPosition")
                    .attr("x",screenwidth*0.13+220)
                    .attr("y",screenheight*0.13+60)
                    .attr("text-anchor","start")
                    .attr("font-size","20")
                    .attr("fill","black") 
                    .text(personalData.position)

            authorSVG.selectAll(".authorAffiliation").remove()
            authorSVG.append("text")
                    .attr("class","authorAffiliation")
                    .attr("x",screenwidth*0.13+220)
                    .attr("y",screenheight*0.13+90)
                    .attr("text-anchor","start")
                    .attr("font-size","20")
                    .attr("fill","black") 
                    .text(personalData.affiliation)

            authorSVG.selectAll(".authorInt").remove()
            authorSVG.append("text")
                    .attr("class","authorInt")
                    .attr("x",screenwidth*0.13+220)
                    .attr("y",screenheight*0.13+120)
                    .attr("text-anchor","start")
                    .attr("font-size","20")
                    .attr("fill","black") 
                    .text("研究方向:")
                
            authorSVG.selectAll(".authorInterests").remove()
            authorSVG.selectAll(".authorInterests")
                    .data(personalData.interests.slice(0,3))
                    .enter()
                    .append("text")
                    .attr("class","authorInterests")
                    .attr("x",screenwidth*0.13+220)
                    .attr("y",function(d,i){
                        return screenheight*0.13+148+i*23
                    })
                    .attr("text-anchor","start")
                    .attr("font-size","15")
                    .attr("fill","black") 
                    .text(function(d,i){
                        return d.t
                    })
            authorSVG.selectAll(".authorInterests2").remove()
            authorSVG.selectAll(".authorInterests2")
                    .data(personalData.interests.slice(3,5))
                    .enter()
                    .append("text")
                    .attr("class","authorInterests")
                    .attr("x",screenwidth*0.13+450)
                    .attr("y",function(d,i){
                        return screenheight*0.13+148+i*23
                    })
                    .attr("text-anchor","start")
                    .attr("font-size","15")
                    .attr("fill","black") 
                    .text(function(d,i){
                        return d.t
                    })
            
            var newdata=Array()
            var mydata=data.data[0].keyValues.year
            var maxx=0
            for(var i=2012;i<2023;i++){
                var find=false
                for(var j=0;j<mydata.length;j++){
                    if(mydata[j].year==i){
                        newdata.push({"value":mydata[j].size,"year":i})
                        find=true
                        if(mydata[j].size>maxx){
                            maxx=mydata[j].size
                        }
                    }
                }
                if(!find){
                    newdata.push({"value":0,"year":i})
                }
            }

            authorSVG2.selectAll(".paper").remove()
            authorSVG2.append("line")//竖线
                .attr("class","paper")
                .attr("x1",screenwidth*0.13)
                .attr("y1", 265)  
                .attr("x2", screenwidth*0.13)
                .attr("y2", 265)  
                .attr("stroke", "black")  
                .attr("stroke-width", "2px")

                .transition()
                .delay(500)
                .duration(1000)
                .ease(d3.easeLinear)
                .attr("y2", 15);

            authorSVG2.append("line")//横线
                .attr("class","paper")
                .attr("x1",screenwidth*0.13)
                .attr("y1", 265)  
                .attr("x2", screenwidth*0.13)
                .attr("y2", 265)  
                .attr("stroke", "black")  
                .attr("stroke-width", "2px")

                .transition()
                .delay(500)
                .duration(2000)
                .ease(d3.easeLinear)
                .attr("x2", screenwidth*0.63)

            authorSVG2.selectAll("lline")
                        .data(newdata.slice(0,10))
                        .enter()
                        .append("line")
                        .attr("class","paper")
                        .attr("x1",function(d,i){
                            return screenwidth*(0.13+0.05*i)
                        })
                        .attr("y1", function(d,i){
                            return 15+250*(1-d.value/maxx)
                        })  
                        .attr("x2", function(d,i){
                            return screenwidth*(0.13+0.05*i)
                        })
                        .attr("y2", function(d,i){
                            return 15+250*(1-d.value/maxx)
                        })  
                        .attr("stroke", "black")  
                        .attr("stroke-width", "1px")
                        .transition()
                        .delay(function(d,i){
                            return 500+i*200
                        })
                        .duration(200)
                        .ease(d3.easeLinear)
                        .attr("x2", function(d,i){
                            return screenwidth*(0.18+0.05*i)
                        })
                        .attr("y2", function(d,i){
                            return 15+250*(1-newdata[i+1].value/maxx)
                        })  

            authorSVG2.selectAll("teext")
                        .data([2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022])
                        .enter()
                        .append("text")
                        .text(function(d){
                            return d
                        })
                        .attr("text-anchor","middle")
                        .attr("fill","azure")
                        .attr("font-size",10)
                        .attr("class","paper")
                        .attr("x",function(d,i){
                            return screenwidth*(0.13+0.05*i)
                        })
                        .attr("y",280)

                        .transition()
                        .delay(function(d,i){
                            return 500+i*200
                        })
                        .duration(500)
                        .ease(d3.easeLinear)
                        .attr("fill","blcak")
            
            authorSVG2.append("text")
                        .text(maxx)
                        .attr("class","paper")
                        .attr("text-anchor","end")
                        .attr("fill","azure")
                        .attr("font-size",10)
                        .attr("x",screenwidth*0.13-5)
                        .attr("y",27)
                        .transition()
                        .delay(1500)
                        .duration(500)
                        .ease(d3.easeLinear)
                        .attr("fill","blcak")

            authorSVG2.append("text")
                    .text("论文数")
                    .attr("fill","azure")
                    .attr("class","paper")
                    .attr("text-anchor","middle")
                    .attr("font-size",15)
                    .attr("x",screenwidth*0.13)
                    .attr("y",15)
                    .transition()
                    .delay(1500)
                    .duration(500)
                    .ease(d3.easeLinear)
                    .attr("fill","blcak")

            authorSVG2.append("text")
                    .text("年份")
                    .attr("fill","azure")
                    .attr("class","paper")
                    .attr("text-anchor","start")
                    .attr("font-size",15)
                    .attr("x",screenwidth*0.63+5)
                    .attr("y",265)
                    .transition()
                    .delay(2500)
                    .duration(500)
                    .ease(d3.easeLinear)
                    .attr("fill","blcak")

            authorSVG2.selectAll("ccircle")
                        .data(newdata)
                        .enter()
                        .append("a")
                        .attr("class",function(d,i){
                            return "paperyear"+d.year
                        })
                        .append("circle")
                        .attr("class","paper")
                        .attr("cx",function(d,i){
                            return screenwidth*(0.13+0.05*i)
                        })
                        .attr("cy",function(d,i){
                            return 15+250*(1-d.value/maxx)
                        })
                        .attr("r",4)
                        .attr("fill",'azure')
                        .on("mouseover",function(d,i){
                                $.ajax({
                                    //url
                                    url:'https://apiv2.aminer.cn/magic?a=GetPersonPubs__person.GetPersonPubs___' ,
                                    //参数:
                                    data:'[{"action":"person.GetPersonPubs","parameters":{"offset":0,"size":'+i.value+',"sorts":["!year"],"ids":["'+personalData.id+'"],"searchType":"all","filters":{"year":'+i.year+'}},"schema":{"publication":["id","year","title","title_zh","abstract","abstract_zh","authors._id","authors.name","authors.name_zh","num_citation","venue.info.name","venue.volume","venue.info.name_zh","venue.issue","pages.start","pages.end","lang","pdf","doi","urls","versions"]}}]',
                                    //请求类型：
                                    type:'POST',
                                    //响应体结果：
                                    dataType:'json',
                                    contentType:"application/json",
                                    async:false,
                                    //成功回调：
                                    success:function(data){
                                        if(data.data[0].items){
                                            var papers=data.data[0].items
                                            
                                            papers=papers.sort(function(m,n){
                                                if(m.num_citation>n.num_citation){
                                                    return -1
                                                }
                                                else if(m.num_citation<n.num_citation){
                                                    return 1
                                                }
                                                else{
                                                    return 0
                                                }
                                            })
                                            // console.log(papers)
                                            var authorpaperholder=d3.selectAll("body")  
                                            .append("div")
                                            .attr("class","authorpaperholder")
                                            .style("position","absolute")  
                                            .style("background-color","black")
                                            .style("border-radius","3px")  
                                            .style("color","white")
                                            .style("padding","10px") 
                                            .style("opacity",0.0);  
                                            authorpaperholder.html(papers[0].title)
                                                .style("left",(d.pageX)+"px")
                                                .style("top",(d.pageY+5)+"px")
                                                .style("transform","translate(-50%,0)")
                                                .style("opacity",0.8)
                                            
                                            d3.selectAll(".paperyear"+i.year)
                                            .attr("href",function(d,i){
                                                return "https://www.aminer.cn/pub/"+papers[0].id+"/"+papers[0].title.toLowerCase().replaceAll(" ","-")
                                            })
                                        }
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
                                });
                            
                        })
                        .on("mouseout",function(d,i){
                            d3.selectAll(".authorpaperholder").remove()
                        })
                        .transition()
                        .delay(function(d,i){
                            return 500+i*200
                        })
                        .duration(200)
                        .ease(d3.easeLinear)
                        .attr("fill",function(d,i){
                            return color[i%10]
                        })

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
    });
}


function getData(personalData){   // 由学者id搜索到关联学者姓名
    
    getPersonalData(personalData)

    $.ajax({
        //url
        url:'https://apiv2.aminer.cn/n?a=GetPersonRelation__personRelation.GetPersonRelation___' ,
        //参数:
        data:'[{"action":"personRelation.GetPersonRelation","parameters":{"id":"'+personalData.id+'","topn":23}}]',
        //请求类型：
        type:'POST',
        async:false,
        //响应体结果：
        dataType:'json',
        contentType:"application/json",
        //成功回调：
        success:function(data){

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

            var d=data["data"][0]["data"]

            var person=d["persons"]
            var relations=d["relations"]
            var node=[]
            var edge=[]
            for(var i=0;i<person.length;i++){
                node[i]={"name":person[i]["name"],"group":i}
            }
            for(var j=0;j<relations.length;j++){
                if(relations[j]["w"]){
                    edge[edge.length]={"source":relations[j]["f"],"target":relations[j]["t"],"value":relations[j]["w"]}
                }
            }

            var forceSimulation=d3.forceSimulation()
                        .force("link",d3.forceLink())
                        .force("charge",d3.forceManyBody().strength(-100))
                        .force("center",d3.forceCenter(screenwidth*0.8,screenheight*0.3));

            forceSimulation.nodes(node)
                            .on("tick")

            forceSimulation.force("link")
                            .links(edge)
                            .distance(function(d){
                                return Math.min((30-d.value)*6,100)
                            })

            var path=authorSVG2.selectAll(".mypath")
                        .data(edge)
                        .enter()
                        .append("path")
                        .attr("class","mypath")
                        .attr("id",function(d,i){
                            return "edgepath"+i
                        })
                        .attr("stroke", "gray")
                        .attr("opacity","50%")  
                        .style("stroke-width",function(d,i){
                            return 2
                        })

            var dott=authorSVG2.selectAll(".node")
                        .data(node)
                        .enter()
                        .append("circle")
                        .attr("class","node")
                        .attr("r",function(d,i){
                            return 10
                        })
                        .attr("id",function(d,i){
                            return "dot"+i
                        })
                        .style("fill",function(d,i){
                            // if(d.avatar==""){
                            //     return color[i%10]
                            // }
                            // var defs=authorSVG2.append("defs").attr("class","imgdefs")
                            // var catpattern=defs.append("pattern")
                            //                     .attr("id","catpattern"+i)
                            //                     .attr("height",1)
                            //                     .attr("width",1)
                            // catpattern.append("image")
                            //         .attr("x", -5)
                            //         .attr("y", -5)
                            //         .attr("width",40)
                            //         .attr("height",40)
                            //         .attr("xlink:href",d.avatar);
                            // return "url(#catpattern" + i + ")"
                            return color[i%10]
                        })
                        .call(drag())

            var ttxt=authorSVG2.selectAll(".ttxt")
                        .data(node)
                        .enter()
                        .append("text")
                        .text(function(d,i){
                            return d.name
                        })
                        .attr("class","ttxt")
                        .attr("text-anchor","middle")
                        .attr("font-size",10)
                        .call(drag())

            forceSimulation.on("tick",()=>{
                path.attr("d",function(d){
                    return "M"+d.source.x+","+d.source.y+"L"+d.target.x+","+d.target.y
                })
                dott.attr("cx",d=>d.x)
                    .attr("cy",d=>d.y)
                ttxt.attr("transform",function(d){
                    return "translate("+(d.x)+","+(d.y+5+10)+")"
                })
            })
        },
        //超时时间：
        timeout:2000,
        //失败回调：
        error:function(){
            console.log('出错');
        },
        //传递头信息：
        header:{
            "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36 Edg/100.0.1185.44"
        }
    });
}
function searchData(name){  // 由学者姓名搜索到学者id与详细信息
    $.ajax({
        //url
        url:'https://searchtest.aminer.cn/aminer-search/search/person' ,
        //参数:
        data:'{"query":"'+name+'","needDetails":true,"page":0,"size":20,"aggregations":[{"field":"h_index","rangeList":[{"from":0,"to":10},{"from":10,"to":20},{"from":20,"to":30},{"from":30,"to":40},{"from":40,"to":50},{"from":50,"to":60},{"from":60,"to":99999}],"size":0,"type":"range"},{"field":"lang","size":10,"type":"terms"},{"field":"nation","size":10,"type":"terms"},{"field":"gender","size":10,"type":"terms"}],"filters":[],"sort":[{"field":"h_index","asc":false}]}',
        //请求类型：
        type:'POST',
        //响应体结果：
        dataType:'json',
        contentType:"application/json",
        async:false,
        //成功回调：
        success:function(data){
            var personalData={}
            // id
            personalData["id"]=data["data"]["hitList"][0]["id"]
            // name
            if(!data.data.hitList[0].nameZh||data.data.hitList[0].nameZh==""){
                personalData["name"]=data.data.hitList[0].name
            }
            else{
                personalData["name"]=data.data.hitList[0].nameZh
            }
            // picture
            personalData["picture"]=data.data.hitList[0].avatar
            // interests
            if(data.data.hitList[0].interests.length<5){
                personalData["interests"]=data.data.hitList[0].interests
            }
            else{
                personalData["interests"]=data.data.hitList[0].interests.splice(0,5)
            }
            // affiliation
            personalData["affiliation"]=data.data.hitList[0].contact.affiliation
            // bio
            if(!data.data.hitList[0].contact.bioZh||data.data.hitList[0].contact.bioZh==""){
                personalData["bio"]=data.data.hitList[0].contact.bio
            }
            else{
                personalData["bio"]=data.data.hitList[0].contact.bioZh
            }
            // position
            if(data.data.hitList[0].contact.positionZh||data.data.hitList[0].contact.positionZh!=""){
                personalData["position"]=data.data.hitList[0].contact.positionZh
            }
            else if(data.data.hitList[0].contact.position!=""){
                personalData["position"]=data.data.hitList[0].contact.position
            }
            else{
                personalData["position"]=data.data.hitList[0].contact.titles[0]
            }

            getData(personalData)
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
    });
}

var screenwidth=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
var screenheight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
screenwidth=screenwidth-50;
screenheight=screenheight-170;
            
var authorSVG=d3.select(".authorSVG")
var authorSVG2=d3.select(".authorSVG2")
searchData("david silver")