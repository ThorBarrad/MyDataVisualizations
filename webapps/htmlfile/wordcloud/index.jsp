<body>
    <h1 style="text-align: right;">
        arXiv计算机各类论文词云图
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
        String tableName="paper2";
        String url="jdbc:mysql://localhost/"+dbName+"?user="+userName+"&password="+userPasswd;
        Class.forName(driverName).newInstance();
        Connection connection=DriverManager.getConnection(url);
        Statement statement=connection.createStatement();
        
        String sql="SELECT SUM(AI),SUM(AR),SUM(CC),SUM(CE),SUM(CG),SUM(CL),SUM(CR),SUM(CV),SUM(CY),SUM(DB),SUM(DC),SUM(DL),SUM(DM),SUM(DS),SUM(ET),SUM(FL),SUM(GL),SUM(GR),SUM(GT),SUM(HC),SUM(IR),SUM(IT),SUM(LG),SUM(LO),SUM(MA),SUM(MM),SUM(MS),SUM(NA),SUM(NE),SUM(NI),SUM(OH),SUM(OS),SUM(PF),SUM(PL),SUM(RO),SUM(SC),SUM(SD),SUM(SE),SUM(SI),SUM(SY) FROM english.paper2";

        ResultSet rs=statement.executeQuery(sql);

        String[] catcount=new String[40];
        rs.next();
        for(int count=0;count<40;count++){
            catcount[count]=rs.getString(count+1);
            //out.print(rs.getString(count+1)+"<br>");
        }

        rs.close();
        statement.close();
        connection.close();
    %>

    <!-- <script src="../d3.v3.min.js" charset="utf-8"></script> -->
    <!-- <script src="../d3.layout.cloud.js"></script> -->

    <script src="../d3.min.js" charset="utf-8"></script>
    <!-- <script src="https://cdn.rawgit.com/jasondavies/d3-cloud/master/build/d3.layout.cloud.js"></script> -->
    <script src="../package/d3.layout.cloud2.js"></script>

    <script>
        var screenwidth=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
        var screenheight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
        screenwidth=screenwidth-50;
        screenheight=screenheight-180;

        var color=d3.schemeCategory10;

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
        var words=new Array(40)	
        <%for(int i=0;i<40;i++){%>
            words[<%=i%>]={text:sbj[<%=i%>],size:<%=catcount[i]%>,data:<%=catcount[i]%>}
        <%}%>

        console.log(words)

        var wc=d3.layout.cloud()
                    .size([1024, 512])
                    .words(words)
                    .padding(3)
                    .rotate(function() { 
                        a=Math.round(Math.random())*2-1
                        console.log(a)
                        return a * 45;
                    })
                    .fontSize(function(d) { 
                        return Math.round(10+40*d.size/100000)
                    })
                    .on("end", draw)
                    .start();

        function draw(words) {
            var svg=d3.select("body")
                        .append("svg")
                        .attr("width", screenwidth)
                        .attr("height", screenheight)
            svg.selectAll("text")
                .data(words)
                .enter()
                .append("text")
                .style("font-size", function(d){ 
                    return d.size+ "px"; 
                })
                .style("fill", function(d, i) {
                    return color[i%10]; 
                })
                .attr("text-anchor", "middle")
                .attr("transform", function(d) {
                    return "translate(" + (screenwidth/2+d.x)+","+(screenheight/2+d.y) + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) {
                    return d.text; 
                })
                .on("mouseover",function(d,i){
                    d3.select(this).text(function(d){
                        return d.data
                    })
                })
                .on("mouseout",function(d,i){
                    d3.select(this).text(function(d){
                        return d.text
                    })
                })
         }
    </script>
</body>