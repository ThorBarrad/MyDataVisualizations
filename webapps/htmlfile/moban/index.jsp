<!DOCTYPE html>
<html lang="en">

  <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link href="https://fonts.googleapis.com/css?family=Raleway:100,300,400,500,700,900" rel="stylesheet">

    <title>AI 2000人工智能学者可视化</title>
    <!-- Additional CSS Files -->
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">

    <link rel="stylesheet" type="text/css" href="css/font-awesome.css">

    <link rel="stylesheet" type="text/css" href="css/fullpage.min.css">

    <link rel="stylesheet" type="text/css" href="css/owl.carousel.css">

    <link rel="stylesheet" href="css/animate.css">

    <link rel="stylesheet" href="css/templatemo-style.css">

    <link rel="stylesheet" href="css/responsive.css">

    </head>
    
    <body>
    <canvas id="myCanvas" style="position: absolute;visibility: hidden;"></canvas>  
    <div id="video">

        <header id="header">
            <div class="container-fluid">
                <div class="navbar">
                    <a href="#" id="logo" title="Elegance by TemplateMo">
                        AI 2000 人工智能学者可视化
                    </a>
                    <div class="navigation-row">
                        <nav id="navigation">
                            <button type="button" class="navbar-toggle"> <i class="fa fa-bars"></i> </button>
                            <div class="nav-box navbar-collapse">
                                <ul class="navigation-menu nav navbar-nav navbars" id="nav">
                                    <li data-menuanchor="slide01" class="active"><a href="#slide01">首页</a></li>
                                    <li data-menuanchor="slide02"><a href="#slide02">关于</a></li>
                                    <li data-menuanchor="slide03"><a href="#slide03">获奖</a></li>
                                    <li data-menuanchor="slide04"><a href="#slide04">提名</a></li>
                                    <li data-menuanchor="slide05"><a href="#slide05">领域</a></li>
                                    <li data-menuanchor="slide06"><a href="#slide06">学者</a></li>
                                    <li data-menuanchor="slide07"><a href="#slide07">致谢</a></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>


        <div id="fullpage" class="fullpage-default">

            <div class="section animated-row" data-section="slide01">
                <div class="section-inner">
                    <div class="welcome-box">
                        <span class="welcome-first animate" data-animate="fadeInUp">Hello, welcome to</span>
                        <h1 class="welcome-title animate" data-animate="fadeInUp">AI 2000</h1>
                        <p class="animate" data-animate="fadeInUp">小组成员：蒋卓良 李傲然</p>
                        <div class="scroll-down next-section animate data-animate="fadeInUp""><img src="images/mouse-scroll.png" alt=""><span>Scroll Down</span></div>
                    </div>
                </div>
            </div>

            <div class="section animated-row" data-section="slide02">
                <div class="section-inner">
                    <div class="about-section">
                        <div class="row justify-content-center">
                            <div class="col-lg-8 wide-col-laptop">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="about-contentbox">
                                            <div class="animate" data-animate="fadeInUp">
                                                <span>关于 AI 2000</span>
                                                <h2>What Is It?</h2>
                                                <p>"AI 2000最具影响力学者年度榜单"旨在评选这十年人工智能领域的2000位全球顶尖研究学者。该榜单旨在表彰具有持久贡献和影响的杰出技术成就。</p><p>AI 2000 涵盖与人工智能相关的20个核心领域以及新兴领域。每年遴选时，参考过去10年各领域最有影响力的会议和期刊发表论文的引用情况，各领域排名前10名的学者荣膺该领域当年【AI 2000最具影响力学者奖】，排名11至100名的学者荣获【AI 2000最具影响力学者提名奖】。因此，每年将选出约 200 位最具影响力的学者（每个领域 10 位乘以 20 多个领域），形成一个由约 2000 位学者组成的群体，他们将在下个 10 年推动人工智能各个领域的创新和进步。</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <figure class="about-img animate" data-animate="fadeInUp"><img src="images/aminer.jpg" class="rounded" alt=""></figure>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="section animated-row" data-section="slide03">
                <h2 style="text-align: center;margin-top: 100px;">获奖学者所属国家及机构</h2>
                <svg class="treeGraphSVG" style="width:100%;height:1350px"></svg>
            </div>

            <div class="section animated-row" data-section="slide04">
                <h2 style="text-align: center;">提名学者占比最高的国家和机构</h2>
                <svg class="countrySVG" style="width:100%;height:550px"></svg>
            </div>

            <div class="section animated-row myslide06" data-section="slide06">
                <h2 style="text-align: center;margin-top: 100px;" class="h2ader">各领域杰出人物及领域关键词</h2>
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
            </div>

            <div class="section animated-row myslide05" data-section="slide05">
                <h2 style="text-align: center;margin-top: 100px;">学者间合作关系与论文发表情况</h2>
                <input type="text" id="myinput" style="position:absolute;left: 42%;"/>
                <button onclick="searchData2()" style="position:absolute;left: 55%;">搜索</button>

                <svg class="authorSVG" style="width:100%;height:250px"></svg>
                <svg class="authorSVG2" style="width:100%;height:330px"></svg>
            </div>

            <div class="section animated-row" data-section="slide07">
                <div class="section-inner">
                    <div class="welcome-box">
                        <h1 class="welcome-title animate" data-animate="fadeInUp">感谢观看</h1>
                        <p class="animate" data-animate="fadeInUp">2022.6.15</p>
                    </div>
                </div>
            </div>
        </div>

    </div>  

    <script src="js/jquery.js"></script>

    <script src="js/bootstrap.min.js"></script>

    <script src="js/fullpage.min.js"></script>

    <script src="js/scrolloverflow.js"></script>

    <script src="js/owl.carousel.min.js"></script>

    <script src="js/jquery.inview.min.js"></script>

    <script src="js/form.js"></script>

    <script src="js/custom.js"></script>


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
        .box ul li {
            list-style: none;
        }
        .box a {
            text-decoration: none;
            color: #4c4c4c;
        }
        .box a:hover {
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
            background-color: azure;
        }
        .weibo {
            display: block;
            height: 40px;
            line-height: 40px;
            /* padding-left: 10px; */
        }
        .change {
            color: #f9a74f;
            background-color: #edeef0;
        }
        .box i {
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
            width: 163.5px;
            height: 33px;
            line-height: 33px;
            padding-left: 15px;
            border-bottom: 1px solid #fecc5b;
            background-color: #fff;
        }
        .weiboList li:hover {
            background-color: #fff5da;
        }
        .meetings p{
            margin:0 0 0 10px;
        }
    </style>
</body>
</html>