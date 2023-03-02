<body>
    <a href="https://www.aminer.cn/channel/143">
    <h1 style="text-align: right;">
        arXiv论文发表数量随时间变化曲线
    </h1>
    </a>
    <h2 style="text-align: right;">
        2007-5至2022-3
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
        String tableName="paper2";
        String url="jdbc:mysql://localhost/"+dbName+"?user="+userName+"&password="+userPasswd;
        Class.forName(driverName).newInstance();
        Connection connection=DriverManager.getConnection(url);
        Statement statement=connection.createStatement();
        
        String sql="SELECT publish_date,SUM(AI),SUM(AR),SUM(CC),SUM(CE),SUM(CG),SUM(CL),SUM(CR),SUM(CV),SUM(CY),SUM(DB),SUM(DC),SUM(DL),SUM(DM),SUM(DS),SUM(ET),SUM(FL),SUM(GL),SUM(GR),SUM(GT),SUM(HC),SUM(IR),SUM(IT),SUM(LG),SUM(LO),SUM(MA),SUM(MM),SUM(MS),SUM(NA),SUM(NE),SUM(NI),SUM(OH),SUM(OS),SUM(PF),SUM(PL),SUM(RO),SUM(SC),SUM(SD),SUM(SE),SUM(SI),SUM(SY) FROM english.paper2 group by publish_date";

        ResultSet rs=statement.executeQuery(sql);

        String[][] catcount=new String[179][41];
        int i=0;
        while(rs.next()){
            for(int count=0;count<41;count++){
                catcount[i][count]=rs.getString(count+1);
                //out.print(rs.getString(count+1)+" ");
            }
            //out.print("<br>");
            i++;
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

        var sbj=new Array(
            "Artificial Intelligence",
            "Hardware Architecture",
            "Computational Complexity",
            "Computational Engineering, Finance, and Science",
            "Computational Geometry",
            "Computation and Language",
            "Cryptography and Security",
            "Computer Vision and Pattern Recognition",
            "Computers and Society",
            "Databases",

            "Distributed, Parallel, and Cluster Computing",
            "Digital Libraries",
            "Discrete Mathematics",
            "Data Structures and Algorithms",
            "Emerging Technologies",
            "Formal Languages and Automata Theory",
            "General Literature",
            "Graphics",
            "Computer Science and Game Theory",
            "Human-Computer Interaction",

            "Information Retrieval",
            "Information Theory",
            "Machine Learning",
            "Logic in Computer Science",
            "Multiagent Systems",
            "Multimedia",
            "Mathematical Software",
            "Numerical Analysis",
            "Neural and Evolutionary Computing",
            "Networking and Internet Architecture",

            "Other Computer Science",
            "Operating Systems",
            "Performance",
            "Programming Languages",
            "Robotics",
            "Symbolic Computation",
            "Sound",
            "Software Engineering",
            "Social and Information Networks",
            "Systems and Control",
        )

        var data=new Array(40)

        <%for(int k=0;k<40;k++){%>
            data[<%=k%>]={text:sbj[<%=k%>],pubcount:new Array(179),pubcount2:new Array(179)}
            <%for(int j=0;j<179;j++){%>
                data[<%=k%>].pubcount[<%=j%>]=<%=catcount[j][k+1]%>
                data[<%=k%>].pubcount2[<%=j%>]=<%=catcount[j][k+1]%>
            <%}%>
        <%}%>
        
        for(var m=0;m<data.length;m++){
            data[m].show=true
        }

        var color=d3.schemeCategory10

        for(var m=0;m<40;m++){
            data[m].value=0
            for(var n=0;n<179;n++){
                data[m].value+=data[m].pubcount[n]
            }
        }

        data=data.sort(function(m,n){
            if(m.value>n.value){
                return -1
            }
            else if(m.value<n.value){
                return 1
            }
            else{
                return 0
            }
        })

        data=data.splice(0,10)

        function drawlines(){
            d3.selectAll('[id="' +"lines"+'"]').remove()
            var maxheight=0
            for(var m=0;m<179;m++){
                var temp=0
                for(var n=0;n<10;n++){
                    if(data[n].show){
                        temp+=data[n].pubcount[m]
                    }
                }
                if(temp>maxheight){
                    maxheight=temp
                }
            }
            for(var m=0;m<10;m++){
                for(var n=0;n<179;n++){
                    if(m>0){
                        if(data[m].show){
                            data[m].pubcount[n]+=data[m-1].pubcount[n]
                        }
                        else{
                            data[m].pubcount[n]=data[m-1].pubcount[n]
                        }
                    }
                    else if(m==0&&!data[m].show){
                        data[m].pubcount[n]=0
                    }
                }
                if(!data[m].show){
                    continue
                }
                svg.selectAll("line"+m)
                    .data(data[m].pubcount)
                    .enter()
                    .append("line")
                    .attr("x1",function(d,i){
                        return 10+screenwidth*0.7*i/179
                    })
                    .attr("y1", function(d,i){
                        return screenheight*(1-d/maxheight)
                    })  
                    .attr("x2", function(d,i){
                        return 10+screenwidth*0.7*(i+1)/179
                    })  
                    .attr("y2", function(d,i){
                        if(i==178){
                            return screenheight*(1-d/maxheight)
                        }
                        return screenheight*(1-data[m].pubcount[i+1]/maxheight)
                    })  
                    .attr("stroke", function(d,i){
                        return color[m]
                    })  
                    .attr("stroke-width", "1px")
                    .attr("id","lines")
                    // .on("mouseover",function(d,i){
                    //     d3.select(this).attr("stroke-width", "3px")
                        
                    //     svg.append("text")
                    //         .attr("x",function(){
                    //             return 10+screenwidth*0.7*(a+0.5)/179
                    //         })
                    //         .attr("y",screenheight+15)
                    //         .text(function(){
                    //             return data[m].text
                    //         })
                    //         .attr("font-size",15)
                    //         .style("fill",function(){
                    //             return color[m]
                    //         })
                    //         .attr("text-anchor","middle")
                    //         .attr("id","texts")
                    // })
                    // .on("mouseout",function(d,i){
                    //     d3.select(this).attr("stroke-width", "1px")
                    //     d3.selectAll('[id="' +"texts"+'"]').remove()
                    // })
            }
            svg.append("text")
                .attr("x",6)
                .attr("y",15)
                .text(maxheight)
                .attr("font-size",15)
                .style("fill","black")
                .attr("text-anchor","left")
                .attr("id","lines")
        }

        svg.append("line")
                .attr("x1",6)
                .attr("y1", screenheight)  
                .attr("x2", 6)  
                .attr("y2", 15)  
                .attr("stroke", "black")  
                .attr("stroke-width", "2px")
        svg.append("line")
                .attr("x1",6)
                .attr("y1", screenheight)  
                .attr("x2", screenwidth*0.72)  
                .attr("y2", screenheight)  
                .attr("stroke", "black")  
                .attr("stroke-width", "2px")

        drawlines()


        svg.selectAll("text2")
            .data(data)
            .enter()
            .append("text")
            .attr("x",function(d,i){
                return screenwidth*0.87
            })
            .attr("y",function(d,i){
                return screenheight*(0.95-i*0.1)
            })
            .text(function(d,i){
                return d.text
            })
            .attr("font-size",15)
            .style("fill", function(d, i) {
                return color[i]; 
            })
            .attr("text-anchor","middle")
            .on("click",function(d,i){
                d3.select(this).attr("opacity",function(){
                    if(!i.show){
                        return "100%"
                    }
                    else{
                        return "40%"
                    }
                })
                i.show=!i.show
                for(var m=0;m<10;m++){
                    for(var n=0;n<179;n++){
                        data[m].pubcount[n]=data[m].pubcount2[n]
                    }
                }
                console.log(data)
                drawlines()
            })
    </script>
</body>