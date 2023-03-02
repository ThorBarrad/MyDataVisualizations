<body>
    <h1 style="text-align: right;">
        英文单词首字母与词性统计
    </h1>
    <h2 style="text-align: right;">
        19数科蒋卓良
    </h2>
    <%@ page contentType="text/html;charset=UTF-8" %>
    <%@ page language="java" %>
    <%@ page import="com.mysql.jdbc.Driver" %>
    <%@ page import="java.sql.*" %>
    <%
        String driverName="com.mysql.jdbc.Driver";
        String userName="root";
        String userPasswd="jzljzl233";
        String dbName="english";
        String tableName="map_enword";
        //String tableName="map_xhzd";
        String url="jdbc:mysql://localhost/"+dbName+"?user="+userName+"&password="+userPasswd;
        Class.forName(driverName).newInstance();
        Connection connection=DriverManager.getConnection(url);
        Statement statement=connection.createStatement();

        String sql="Select * from "+tableName+" order by english";
        ResultSet rs=statement.executeQuery(sql);
        String[] words=new String[5668];
        String[] yinbiao=new String[5668];
        String[] chinese=new String[5668];
        int count=0;
        while(rs.next()){
            words[count]='"'+rs.getString(2)+'"';
            yinbiao[count]='"'+rs.getString(3)+'"';
            chinese[count]='"'+rs.getString(4)+'"';
            count++;
        }

        rs.close();
        statement.close();
        connection.close();
    %>

    <script src="../package/d3.min.js"></script>
    <script>
        var screenwidth=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
        var screenheight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
        screenwidth=screenwidth-50;
        screenheight=screenheight-180;

        var svg=d3.select("body")
                .append("svg")
                .attr("width",screenwidth+40)
                .attr("height",screenheight+20)


        var data=new Array(5668)
        <%for(int i=0;i<5668;i++){%>
            data[<%=i%>]={"word":<%=words[i]%>,"yinbiao":<%=yinbiao[i]%>,"chinese":<%=chinese[i]%>}
        <%}%>

        // console.log(data)

        var mydata=new Array(26)
        var firstletter=""
        var count=0
        for(var i=0;i<data.length;i++){
            if(data[i]["word"][0].toLowerCase()!=firstletter){
                // n:名词 v:动词 a:形容词/副词 p:介词 i:语气词 c:连词
                mydata[count]={"n":0,"v":0,"a":0,"e":0,"o":0,"i":0,"c":0,"start":data[i]["word"][0].toLowerCase(),"total":0}
                count++
                firstletter=data[i]["word"][0].toLowerCase()
            }
            if(data[i]["chinese"].slice(0,4)=="prep"){
                mydata[count-1]["e"]+=1
            }
            else if(data[i]["chinese"].slice(0,4)=="pron"){
                mydata[count-1]["o"]+=1
            }
            else{
                mydata[count-1][data[i]["chinese"][0]]+=1
            }
            
            mydata[count-1]["total"]+=1
        }
        // console.log(mydata)

        var color=d3.schemeCategory10
        
        svg.selectAll("rect")
                .data(mydata)
                .enter()
                .append("rect")
                .attr("x",function(d,i){
                    return Math.round(0.4*screenwidth/mydata.length)*i+25
                })
                .attr("y",function(d,i){
                    var dataheight=screenheight*d["total"]/1000
                    return screenheight-dataheight-10
                })
                .attr("width",function(d,i){
                    return Math.round(0.4*0.9*screenwidth/mydata.length)
                })
                .attr("height",function(d,i){
                    return screenheight*d["total"]/1000+10
                })
                .attr("fill",function(d,i){
                    return color[i%10]
                })
                .on("click",function(d,i){
                    d3.selectAll('[id="' +"rectchart"+'"]').attr("opacity","100%")
                    d3.select(this).attr("opacity","50%")
                    var letterdata=[
                        {"cixing":"n.","cipin":i["n"],"short":"n"},
                        {"cixing":"v.","cipin":i["v"],"short":"v"},
                        {"cixing":"a.","cipin":i["a"],"short":"a"},
                        {"cixing":"prep.","cipin":i["e"],"short":"e"},
                        {"cixing":"pron.","cipin":i["o"],"short":"o"},
                        {"cixing":"int.","cipin":i["i"],"short":"i"},
                        {"cixing":"conj.","cipin":i["c"],"short":"c"},
                    ]
                    var total=i["total"]
                    var start=i["start"]
                    var pie=d3.pie().value(function(d){
                        if(d.cipin==0){
                            return 0
                        }
                        return Math.max(d.cipin,total/100)
                    })
                    var piedata=pie(letterdata)
                    // console.log(piedata)
                    d3.selectAll('[id="' +"piechart"+'"]').remove()
                    for(var i=0;i<letterdata.length;i++){
                        d3.selectAll('[id="' +letterdata[i].cixing+'"]').remove()
                    }
                    svg.selectAll("path")
                        .data(piedata)
                        .enter()
                        .append("path")
                        .attr("d",function(e,j){
                            // console.log("outerRadius "+j+" : "+300*letterdata[j].cipin/total)
                            // var arcPath=d3.arc().innerRadius(0).outerRadius(300*letterdata[j].cipin/total)
                            var arcPath=d3.arc().innerRadius(0).outerRadius(200)
                            return arcPath(e)
                        })
                        .attr("transform","translate("+screenwidth*0.6+","+screenheight*0.6+")")
                        .attr("stroke","white")
                        .attr("stroke-width","3px")
                        .attr("id","piechart")
                        .attr("fill",function(d,i){
                            return color[i]
                        })
                        .on("mouseover",function(f,k){
                            d3.select(this).attr("opacity","50%")
                            a=piedata.indexOf(k)
                            cx=letterdata[a]["short"]
                            // console.log(cx+" "+start)
                            var fiveword=[]
                            for(var x=0;x<data.length;x++){
                                if(cx=="e"||cx=="o"){
                                    if(data[x]["word"][0].toLowerCase()==start&&data[x]["chinese"].slice(0,5)==letterdata[a]["cixing"]){
                                        fiveword[fiveword.length]={"word":data[x]["word"],"yinbiao":data[x]["yinbiao"],"chinese":data[x]["chinese"]}
                                        if(fiveword.length==6){
                                            break
                                        }
                                    }
                                }
                                else{
                                    if(data[x]["word"][0].toLowerCase()==start&&data[x]["chinese"][0]==cx){
                                        fiveword[fiveword.length]={"word":data[x]["word"],"yinbiao":data[x]["yinbiao"],"chinese":data[x]["chinese"]}
                                        if(fiveword.length==6){
                                            break
                                        }
                                    }
                                }
                                
                            }
                            d3.selectAll('[id="' +letterdata[a]["cixing"]+'"]').style("visibility","visible")
                            // console.log(fiveword)
                            svg.selectAll("text1")
                                .data(fiveword)
                                .enter()
                                .append("text")
                                .text(function(d,i){
                                    return d["word"]
                                })
                                .attr("font-size",20)
                                .attr("transform",function(d,i){
                                    return "translate("+screenwidth*0.8+","+screenheight*(0.1+i*0.15)+")"
                                })
                                .attr("id","mytext")

                            svg.selectAll("text2")
                                .data(fiveword)
                                .enter()
                                .append("text")
                                .text(function(d,i){
                                    return d["yinbiao"]
                                })
                                .attr("font-size",13)
                                .attr("transform",function(d,i){
                                    return "translate("+screenwidth*0.8+","+screenheight*(0.15+i*0.15)+")"
                                })
                                .attr("id","mytext")
                                
                            svg.selectAll("text3")
                                .data(fiveword)
                                .enter()
                                .append("text")
                                .text(function(d,i){
                                    return d["chinese"]
                                })
                                .attr("font-size",13)
                                .attr("transform",function(d,i){
                                    return "translate("+screenwidth*0.8+","+screenheight*(0.2+i*0.15)+")"
                                })
                                .attr("id","mytext")
                        })
                        .on("mouseout",function(f,k){
                            d3.select(this).attr("opacity","100%")
                            d3.selectAll('[id="' +"mytext"+'"]').remove()
                            d3.selectAll('[id="' +letterdata[a]["cixing"]+'"]').style("visibility","hidden")
                        })

                    svg.selectAll("ftext")
                        .data(piedata)
                        .enter()
                        .append("text")
                        // .attr("x",function(m,n){
                        //     return screenwidth*0.6+210*Math.sin(m.startAngle/2+m.endAngle/2)
                        // })
                        // .attr("y",function(m,n){
                        //     return screenheight*0.6+210*Math.cos(m.startAngle/2+m.endAngle/2)
                        // })
                        .attr("transform",function(m,n){
                            return "translate("+screenwidth*0.6+","+screenheight*0.6+")"+
                                    "translate("+210*Math.sin(m.startAngle/2+m.endAngle/2)+
                                    ","+210*Math.cos(m.startAngle/2+m.endAngle/2)*(-1)+")"
                        })
                        .text(function(m,n){
                            if(letterdata[n]["cipin"]==0){
                                return ""
                            }
                            return letterdata[n]["cixing"]+":"+letterdata[n]["cipin"]
                        })
                        .attr("font-size",15)
                        .attr("id",function(d,i){
                            return letterdata[i].cixing
                        })
                        .style("visibility","hidden")
                        .attr("text-anchor",function(m,n){
                            return "middle"
                        })

                })
                .attr("id","rectchart")

        svg.append("line")
                .attr("x1",22)
                .attr("y1", screenheight)  
                .attr("x2", 22)
                .attr("y2", 0)  
                .attr("stroke", "black")  
                .attr("stroke-width", "2px")

        svg.append("line")
                .attr("x1",22)
                .attr("y1", screenheight)  
                .attr("x2", screenwidth*0.43)
                .attr("y2", screenheight)  
                .attr("stroke", "black")  
                .attr("stroke-width", "2px")

        svg.selectAll("ltext")
                .data(mydata)
                .enter()
                .append("text")
                .attr("x",function(d,i){
                    return Math.round(0.4*screenwidth/mydata.length)*i+25+Math.round(0.2*0.9*screenwidth/mydata.length)
                })
                .attr("y",function(d,i){
                    return screenheight*1.03
                })
                .text(function(d,i){
                    return d.start
                })
                .attr("font-size",15)
                .attr("text-anchor","middle")

        svg.selectAll("ltext2")
                .data(mydata)
                .enter()
                .append("text")
                .attr("x",function(d,i){
                    return Math.round(0.4*screenwidth/mydata.length)*i+25+Math.round(0.2*0.9*screenwidth/mydata.length)
                })
                .attr("y",function(d,i){
                    var dataheight=screenheight*d["total"]/1000
                    return screenheight-dataheight-11
                })
                .text(function(d,i){
                    return d.total
                })
                .attr("font-size",10)
                .attr("text-anchor","middle")
    </script>
</body>