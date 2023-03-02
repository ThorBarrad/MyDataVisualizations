<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    
    <head>
        <title>AI 2000人工智能学者可视化</title>
    </head>

    <body style="background-color:azure;">
        <canvas id="myCanvas" style="position: absolute;visibility: hidden;"></canvas>  

        <h1 style="text-align: center;" class="h1ader">AI 2000人工智能学者可视化</h1>

        <h3 style="text-align: center;">小组成员：蒋卓良，李傲然</h3>

        <h2 style="text-align: center;">最具影响力学者所属国家及机构</h2>
        <svg class="treeGraphSVG" style="width:100%;height:1350px"></svg>

        <h2 style="text-align: center;">被提名学者占比最高的国家和机构</h2>
        <svg class="countrySVG" style="width:100%;height:550px"></svg>

        <h2 style="text-align: center;" class="h2ader">各领域杰出人物及领域关键词</h2>

        <div class="box">
            <div class="weibo" id="demo">选择领域<i class="select"></i></div>
            <ul class="weiboList">
                <li onclick="drawAll('5dc122672ebaa6faa962bde8')">经典AI (AAAI/IJCAI)</li>
                <li onclick="drawAll('5dc122672ebaa6faa962c006')">机器学习</li>
                <li onclick="drawAll('5dc122672ebaa6faa962c0af')">计算机视觉</li>
                <li onclick="drawAll('5dc122672ebaa6faa962c145')">自然语言处理</li>
                <li onclick="drawAll('5dc122672ebaa6faa962c218')">机器人</li>

                <li onclick="drawAll('5dc122672ebaa6faa962c073')">知识工程</li>
                <li onclick="drawAll('5dc122672ebaa6faa962c1a3')">语音识别</li>
                <li onclick="drawAll('5dc122672ebaa6faa962c02d')">数据挖掘</li>
                <li onclick="drawAll('5dc122672ebaa6faa962bfbe')">信息检索与推荐</li>
                <li onclick="drawAll('5dc122672ebaa6faa962c273')">数据库</li>

                <li onclick="drawAll('5dc122672ebaa6faa962bf3c')">人机交互</li>
                <li onclick="drawAll('5dc122672ebaa6faa962c104')">计算机图形</li>
                <li onclick="drawAll('5dc122672ebaa6faa962c2a4')">多媒体</li>
                <li onclick="drawAll('5dc122672ebaa6faa962bf6c')">可视化</li>
                <li onclick="drawAll('5dc122672ebaa6faa962bea3')">安全与隐私</li>

                <li onclick="drawAll('5dee1f3316f1663a63471ba9')">计算机网络</li>
                <li onclick="drawAll('5dc122672ebaa6faa962c2cc')">计算机系统</li>
                <li onclick="drawAll('5dc122672ebaa6faa962be57')">计算理论</li>
                <li onclick="drawAll('5debb11593d709897c4ee447')">芯片技术</li>
                <li onclick="drawAll('5dc122672ebaa6faa962c2e1')">物联网</li>

                <li onclick="drawAll('6176111f302569a70eab4245')">虚拟现实</li>
            </ul>
        </div>

        <svg class="domainSVG" style="width:100%;height:500px"></svg>
        <svg class="domainSVG2" style="width:100%;height:500px"></svg>

        <h2 style="text-align: center;">学者间合作关系与论文发表情况</h2>
        <input type="text" id="myinput" style="position:absolute;left: 42%;"/>
        <button onclick="searchData2()" style="position:absolute;left: 55%;">搜索</button>

        <svg class="authorSVG" style="width:100%;height:300px"></svg>
        <svg class="authorSVG2" style="width:100%;height:400px"></svg>
    </body>

    <%@ page contentType="text/html;charset=UTF-8" %>
    <%@ page language="java" %>
    <%@ page import="com.mysql.jdbc.Driver" %>
    <%@ page import="java.sql.*" %>
    <%
        String driverName="com.mysql.jdbc.Driver";
        String userName="root";
        String userPasswd="jzljzl233";
        String dbName="english";
        String tableName="countrydata";
        String url="jdbc:mysql://localhost/"+dbName+"?user="+userName+"&password="+userPasswd;
        Class.forName(driverName).newInstance();
        Connection connection=DriverManager.getConnection(url);
        Statement statement=connection.createStatement();

        String sql="Select * from "+tableName;
        ResultSet rs=statement.executeQuery(sql);

        String[] shortName=new String[20];
        String[] name=new String[20];
        String[] value=new String[20];
        String[] picSrc=new String[20];

        int count=0;
        while(rs.next()){
            shortName[count]='"'+rs.getString(2)+'"';
            name[count]='"'+rs.getString(3)+'"';
            value[count]='"'+rs.getString(4)+'"';
            picSrc[count]='"'+rs.getString(5)+'"';
            count++;
        }

        rs.close();
        statement.close();
        connection.close();
    %>

    <%
        driverName="com.mysql.jdbc.Driver";
        userName="root";
        userPasswd="jzljzl233";
        dbName="english";
        tableName="organizationdata";
        url="jdbc:mysql://localhost/"+dbName+"?user="+userName+"&password="+userPasswd;
        Class.forName(driverName).newInstance();
        connection=DriverManager.getConnection(url);
        statement=connection.createStatement();

        sql="Select * from "+tableName;
        rs=statement.executeQuery(sql);

        String[] name2=new String[10];
        String[] value2=new String[10];
        String[] picSrc2=new String[10];

        count=0;
        while(rs.next()&&count<10){
            name2[count]='"'+rs.getString(2)+'"';
            value2[count]='"'+rs.getString(3)+'"';
            picSrc2[count]='"'+rs.getString(4)+'"';
            count++;
        }

        rs.close();
        statement.close();
        connection.close();
    %>
    <script src="d3.min.js"></script>
    <script src="jquery.js"></script>
    <script src="d3.layout.cloud3.js"></script>
    
    <script>
        var color=d3.schemeCategory10
        var screenwidth=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
        var screenheight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight; 

        var createCountryData=new Array(20)
        <%for(int i=0;i<20;i++){%>
            createCountryData[<%=i%>]={"shortname":<%=shortName[i]%>,"name":<%=name[i]%>,"value":<%=value[i]%>,"picSrc":<%=picSrc[i]%>}
        <%}%>
        var createOrganizationData=new Array(10)
        <%for(int i=0;i<10;i++){%>
            createOrganizationData[<%=i%>]={"name":<%=name2[i]%>,"value":<%=value2[i]%>,"picSrc":<%=picSrc2[i]%>}
        <%}%>
    </script>

    <script src="createTreeGraph.js"></script>
    <script src="createCountrySVG.js"></script>
    <script src="createDomainSVG.js"></script>
    <script src="createAuthorSVG.js"></script>
    <style>
        ul li {
            list-style: none;
        }
        a {
            text-decoration: none;
            color: #4c4c4c;
        }
        a:hover {
            color: #e88415;
        }
        .box {
            position: absolute;
            width: 180px;
            margin: 0 43%;
            font-size: 14px;
            color: #4c4c4c;
        }
        .weibo {
            position: relative;
            /* background-color: #fcfcfc; */
            background-color: azure;
        }
        .weibo {
            display: block;
            height: 40px;
            line-height: 40px;
            padding-left: 20px;
        }
        .change {
            color: #f9a74f;
            background-color: #edeef0;
        }
        i {
            position: absolute;
            top: 50%;
            right: 15px;
            margin-top: -4px;
            width: 5px;
            height: 5px;
            border-bottom: 1px solid orangered;
            border-right: 1px solid orangered;
            transform: rotate(45deg);
        }
        .weiboList {
            margin: 0;
            padding:0;
            display: none;
            height: 200px;
            overflow: scroll;
        }
        .weiboList li {
            display: block;
            width: 148.5px;
            height: 33px;
            line-height: 33px;
            padding-left: 15px;
            border-bottom: 1px solid #fecc5b;
            background-color: #fff;
        }
        .weiboList li:hover {
            background-color: #fff5da;
        }
    </style>
</html>