// changed from wc.html

var box = document.querySelector('.box');
var weibo = document.querySelector('.weibo');
var weiboList = document.querySelector('.weiboList');
box.onmouseover = function() {
    weibo.className = 'weibo change'
    weiboList.style.display = 'block';
}

var matcher={
    '5dc122672ebaa6faa962bde8':"经典AI (AAAI/IJCAI)",
    '5dc122672ebaa6faa962c006':"机器学习",
    '5dc122672ebaa6faa962c0af':"计算机视觉",
    '5dc122672ebaa6faa962c145':"自然语言处理",
    '5dc122672ebaa6faa962c218':"机器人",

    '5dc122672ebaa6faa962c073':"知识工程",
    '5dc122672ebaa6faa962c1a3':"语音识别",
    '5dc122672ebaa6faa962c02d':"数据挖掘",
    '5dc122672ebaa6faa962bfbe':"信息检索与推荐",
    '5dc122672ebaa6faa962c273':"数据库",

    '5dc122672ebaa6faa962bf3c':"人机交互",
    '5dc122672ebaa6faa962c104':"计算机图形",
    '5dc122672ebaa6faa962c2a4':"多媒体",
    '5dc122672ebaa6faa962bf6c':"可视化",
    '5dc122672ebaa6faa962bea3':"安全与隐私",

    '5dee1f3316f1663a63471ba9':"计算机网络",
    '5dc122672ebaa6faa962c2cc':"计算机系统",
    '5dc122672ebaa6faa962be57':"计算理论",
    '5debb11593d709897c4ee447':"芯片技术",
    '5dc122672ebaa6faa962c2e1':"物联网",

    '6176111f302569a70eab4245':"虚拟现实",
}
var matcher2={
    '5dc122672ebaa6faa962bde8':"<p>领域顶会:</p><p>AAAI Conference on Artificial Intelligence (AAAI)</p><p>International Joint Conference on Artificial Intelligence (IJCAI)</p><p>International Conference on Uncertainty in Artificial Intelligence (UAI)</p><p>International Conference on Artificial Intelligence and Statistics (AISTATS)</p><p>European Conference on Artificial Intelligence (ECAI)</p><p>Journal of Artificial Intelligence Research (JAIR)</p><p>Artificial Intelligence (AI Journal)</p>",
    '5dc122672ebaa6faa962c006':"<p>领域顶会:</p><p>Annual Conference on Neural Information Processing Systems (NeurIPS)</p><p>International Conference on Machine Learning (ICML)</p><p>International Conference on Learning Representations (ICLR)</p><p>Journal of Machine Learning Research (JMLR)</p><p>IEEE Transactions on Neural Networks and Learning Systems (TNNLS)</p><p>IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI)</p><p>Machine Learning (ML Journal)</p>",
    '5dc122672ebaa6faa962c0af':"<p>领域顶会:</p><p>IEEE Conference on Computer Vision and Pattern Recognition (CVPR)</p><p>International Conference on Computer Vision (ICCV)</p><p>European Conference on Computer Vision (ECCV)</p><p>International Journal of Computer Vision (IJCV)</p><p>IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI)</p>",
    '5dc122672ebaa6faa962c145':"<p>领域顶会:</p><p>Annual Meeting of the Association for Computational Linguistics (ACL)</p><p>Conference on Empirical Methods in Natural Language Processing (EMNLP)</p><p>The Annual Conference of the North American Chapter of the Association for Computational Linguistics (NAACL)</p><p>Annual Conference on Computational Learning Theory (COLT)</p><p>International Conference on Computational Linguistics (COLING)</p><p>Transactions of the Association for Computational Linguistics (TACL)</p>",
    '5dc122672ebaa6faa962c218':"<p>领域顶会:</p><p>IEEE International Conference on Robotics and Automation (ICRA)</p><p>IEEE\RSJ International Conference on Intelligent Robots and Systems (IROS)</p><p>The International Journal of Robotics Research</p><p>IEEE Transactions on Robotics</p><p>IEEE/ASME Transactions on Mechatronics</p>",

    '5dc122672ebaa6faa962c073':"<p>领域顶会:</p><p>IEEE International Semantic Web Conference (ISWC)</p><p>International Conference on Principles of Knowledge Representation and Reasoning (KR)</p><p>Knowledge-Based Systems</p><p>Expert Systems with Applications</p><p>Semantic Web</p>",
    '5dc122672ebaa6faa962c1a3':"<p>领域顶会:</p><p>IEEE International Conference on Acoustics, Speech and SP (ICASSP)</p><p>Conference of the International Speech Communication Association</p><p>IEEE/ACM transactions on audio, speech, and language processing</p><p>ACM Transactions on Speech and Language Processing</p>",
    '5dc122672ebaa6faa962c02d':"<p>领域顶会:</p><p>ACM Knowledge Discovery and Data Mining (KDD)</p><p>ACM International Conference on Web Search and Data Mining (WSDM)</p><p>ACM Transactions on Knowledge Discovery from Data (TKDD)</p><p>IEEE International Conference on Data Mining (ICDM)</p><p>SIAM International Conference on Data Mining (SDM)</p><p>IEEE Transactions on Knowledge and Data Engineering (TKDE)</p><p>Data Mining and Knowledge Discovery (DMKD)</p>",
    '5dc122672ebaa6faa962bfbe':"<p>领域顶会:</p><p>International Conference on Research on Development in Information Retrieval (SIGIR)</p><p>ACM Recommender Systems (RecSys)</p><p>International World Wide Web Conferences (WWW)</p><p>ACM International Conference on Web Search and Data Mining (WSDM)</p><p>ACM International Conference on Information and Knowledge Management (CIKM)</p><p>International Conference on Web and Social Media (ICWSM)</p>",
    '5dc122672ebaa6faa962c273':"<p>领域顶会:</p><p>ACM Conference on Management of Data (SIGMOD)</p><p>International Conference on Very Large Data Bases (VLDB)</p><p>International Conference on Data Engineering (ICDE)</p><p>The Vldb Journal (VLDBJ)</p>",

    '5dc122672ebaa6faa962bf3c':"<p>领域顶会:</p><p>ACM Conference on Human Factors in Computing Systems (CHI)</p><p>Computer Supported Cooperative Work (CSCW)</p><p>ACM Conference on Pervasive and Ubiquitous Computing (UbiComp)</p><p>ACM Symposium on User Interface Software and Technology (UIST)</p><p>ACM Transactions on Computer-Human Interaction (TOCHI)</p><p>International Journal of Human Computer Studies (IJHCS)</p>",
    '5dc122672ebaa6faa962c104':"<p>领域顶会:</p><p>ACM SIGGRAPH Annual Conference (SIGGRAPH)</p><p>ACM Transactions on Graphics (TOG)</p><p>IEEE Transactions on Visualization and Computer Graphics (TVCG)</p><p>IEEE Virtual Reality (VR)</p><p>Computer Graphics Forum</p>",
    '5dc122672ebaa6faa962c2a4':"<p>领域顶会:</p><p>ACM International Conference on Multimedia (MM)</p><p>IEEE Transactions on Image Processing (TIP)</p><p>IEEE Transactions on Multimedia (TMM)</p>",
    '5dc122672ebaa6faa962bf6c':"<p>领域顶会:</p><p>IEEE Transactions on Visualization and Computer Graphics (TVCG)</p><p>IEEE Visualization Conference (IEEE VIS)</p><p>Eurographics/IEEE VGTC Symposium on Visualization : EUROVIS : [proceedings]. Eurographics/IEEE VGTC Symposium on Visualization</p><p>Proceedings. IEEE Symposium on Visual Analytics Science and Technology</p>",
    '5dc122672ebaa6faa962bea3':"<p>领域顶会:</p><p>ACM Conference on Computer and Communications Security (CCS)</p><p>IEEE Symposium on Security and Privacy (S&P)</p><p>Usenix Security Symposium (USS)</p><p>IEEE Transactions on Information Forensics and Security (TIFS)</p><p>International Cryptology Conference (CRYPTO)</p><p>European Cryptology Conference (EUROCRYPT)</p><p>IEEE Transactions on Dependable and Secure Computing (TDSC)</p>",

    '5dee1f3316f1663a63471ba9':"<p>领域顶会:</p><p>ACM International Conference on Mobile Computing and Networking (MobiCom)</p><p>ACM International Conference on the applications, technologies, architectures, and protocols for computer communication (SIGCOMM)</p><p>IEEE Journal on Selected Areas in Communications (JSAC)</p><p>IEEE Transactions on Communications (TCOM)</p><p>IEEE/ACM Transactions on Networking (TON)</p><p>IEEE International Conference on Computer Communications (INFOCOM)</p><p>IEEE Communications Magazine</p>",
    '5dc122672ebaa6faa962c2cc':"<p>领域顶会:</p><p>ACM Symposium on Operating Systems Principles (SOSP)</p><p>USENIX Symposium on Operating Systems Design and Implementations (OSDI)</p><p>Future Generation Computer Systems (FGCS)</p><p>Symposium on Networked Systems Design and Implementation (NSDI)</p><p>USENIX Annual Technical Conference (ATC)</p><p>Conference on File and Storage Technologies (FAST)</p><p>IEEE Transactions on Parallel and Distributed Systems (TPDS)</p><p>ACM Transactions on Computer Systems (TOCS)</p>",
    '5dc122672ebaa6faa962be57':"<p>领域顶会:</p><p>ACM Symposium on Theory of Computing (STOC)</p><p>IEEE Symposium on Foundations of Computer Science (FOCS)</p><p>ACM SIAM Symposium on Discrete Algorithms (SODA)</p><p>Journal of the ACM (JACM)</p><p>SIAM Journal on Computing (SICOMP)</p>",
    '5debb11593d709897c4ee447':"<p>领域顶会:</p><p>International Solid-State Circuits Conference (ISSCC)</p><p>Design Automation Conference (DAC)</p><p>ACM/SIGDA International Symposium on Field-Programmable Gate Arrays (FPGA)</p><p>IEEE Transactions on Very Large Scale Integration (VLSI) Systems</p><p>IEEE Journal of Solid-State Circuits</p><p>International Solid-State Circuits Conference</p><p>IEEE Transactions on Computer-Aided Design of Integrated Circuits and Systems (TCAD)</p><p>High-Performance Computer Architecture (HPCA)</p><p>International Symposium on Computer Architecture (ISCA)</p><p>International Conference for High Performance Computing, Networking, Storage, and Analysis (SC)</p>",
    '5dc122672ebaa6faa962c2e1':"<p>领域顶会:</p><p>IEEE Internet of Things Journal (IoT-J)</p><p>IEEE Transactions on Wireless Communications (TWC)</p><p>ACM Transactions on Sensor Networks (TOSN)</p><p>IEEE Wireless Communications</p><p>ACM Conference on Embedded Networked Sensor Systems (SenSys)</p>",

    '6176111f302569a70eab4245':"<p>领域顶会:</p><p>ACM SIGGRAPH Annual Conference (SIGGRAPH)</p><p>ACM Conference on Human Factors in Computing Systems (CHI)</p><p>IEEE Visualization Conference (IEEE VIS)</p><p>IEEE Virtual Reality (VR)</p><p>International Symposium on Mixed and Augmented Reality (ISMAR)</p>",
}


box.onmouseout = function() {
    weibo.className = 'weibo';
    weiboList.style.display = 'none';
}

drawCloud("5dc122672ebaa6faa962bde8")
drawFamousAuthor("5dc122672ebaa6faa962bde8")
drawPaper("5dc122672ebaa6faa962bde8")

function drawAll(id){
    drawCloud(id)
    drawFamousAuthor(id)
    drawPaper(id)
}

function drawPaper(id){
    var domainSVG2 = d3.select(".domainSVG2")
    var papers;
    $.ajax({
        //url
        url:'https://apiv2.aminer.cn/magic?a=__ai2000v2.Ranking___' ,
        //参数:
        data:'[{"action":"ai2000v2.Ranking","parameters":{"year":2021,"entity_type":"pub","domain_ids":["'+id+'"]}}]',
        //请求类型：
        type:'POST',
        //响应体结果：
        dataType:'json',
        contentType:"application/json",
        async:false,
        //成功回调：
        success:function(data){
            papers=data["data"][0]["data"].splice(0,100)
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

    var maxium=papers[0].content.pub.num_citation

    papers=papers.sort(function(m,n){
        if(m.content.pub.year>n.content.pub.year){
            return 1
        }
        else if(m.content.pub.year<n.content.pub.year){
            return -1
        }
        else{
            return 0
        }
    })

    domainSVG2.selectAll("line").remove()
    domainSVG2.selectAll("text").remove()
    domainSVG2.selectAll("circle").remove()

    domainSVG2.append("line")//竖线
                .attr("x1",screenwidth*0.095)
                .attr("y1", 460)  
                .attr("x2", screenwidth*0.095)
                .attr("y2", 460)  
                .attr("stroke", "black")  
                .attr("stroke-width", "2px")

                .transition()
                .delay(2000)
                .duration(2000)
                .ease(d3.easeLinear)
                .attr("y2", 0);

    domainSVG2.append("line")//横线
                .attr("x1",screenwidth*0.095)
                .attr("y1", 460)  
                .attr("x2", screenwidth*0.095)
                .attr("y2", 460)  
                .attr("stroke", "black")  
                .attr("stroke-width", "2px")

                .transition()
                .delay(2000)
                .duration(2000)
                .ease(d3.easeLinear)
                .attr("x2", screenwidth*0.905)

    domainSVG2.selectAll("line2")
                .data(papers)
                .enter()
                .append("line")
                .attr("x1",function(d,i){
                    return screenwidth*(0.1+i*0.008)
                })
                .attr("y1", function(d,i){
                    return 460
                })  
                .attr("x2", function(d,i){
                    return screenwidth*(0.1+i*0.008)
                })
                .attr("y2", function(d,i){
                    return 460
                })  
                .attr("stroke", "black")  
                .attr("stroke-width", "1px")

                .transition()
                .delay(function(d,i){
                    return 2000+(0.1+i*0.008)/0.000405
                })
                .duration(function(d,i){
                    return 1000
                })
                .ease(d3.easeLinear)
                .attr("y2", function(d,i){
                    return 450*(1-d.content.pub.num_citation/maxium)+5
                })
    
      

    domainSVG2.selectAll("circle2")
                .data(papers)
                .enter()
                .append("a")
                .attr("href",function(d,i){
                    return "https://www.aminer.cn/pub/"+d.id+"/"+d.name.en.replaceAll(" ","-")
                })
                .append("circle")
                .attr("cx",function(d,i){
                    return screenwidth*(0.1+i*0.008)
                })
                .attr("cy",function(d,i){
                    return 450*(1-d.content.pub.num_citation/maxium)+5
                })
                .attr("r",d=>4)
                .attr("fill","azure")
                .on("mouseover",function(d,i){
                    var tooltip=d3.selectAll("body")  
                    .append("div")
                    .attr("class","tooltip")
                    .style("position","absolute")  
                    .style("background-color","black")
                    .style("border-radius","3px")  
                    .style("color","white")
                    .style("padding","10px")
                    .style("width","200px")  
                    .style("opacity",0.0);
                    tooltip.html(i.content.pub.title)
                            .style("left",function(){
                                if(d.pageX<screenwidth*0.8){
                                    return (d.pageX+5)+"px"
                                }
                                else{
                                    return (d.pageX-5)+"px"
                                }
                            })  
                            .style("top", (d.pageY+5)+"px")  
                            .style("transform",function(){
                                if(d.pageX<screenwidth*0.8){
                                    return "translate(0,-100%)"
                                }
                                else{
                                    return "translate(-100%,-100%)"
                                }
                            })
                            .style("opacity",0.8);  
                })
                .on("mouseout",function(d,i){
                    d3.selectAll(".tooltip").remove()
                })

                .transition()
                .delay(function(d,i){
                    return 3000+(0.1+i*0.008)/0.000405
                })
                .duration(function(d,i){
                    return 500
                })
                .ease(d3.easeLinear)
                .attr("fill",function(d,i){
                    return color[i%10]
                })
                
    
    var thisyear=0
    for(var i=0;i<100;i++){
        if(papers[i].content.pub.year!=thisyear){
            // put a year sign here
            domainSVG2.append("text")
                        .text(papers[i].content.pub.year)
                        .attr("text-anchor","middle")
                        .attr("fill","azure")
                        .attr("font-size",10)
                        .attr("x",screenwidth*(0.1+i*0.008))
                        .attr("y",473)

                        .transition()
                        .delay(2000+(0.1+i*0.008)/0.000405)
                        .duration(1000)
                        .ease(d3.easeLinear)
                        .attr("fill","blcak")
            thisyear=papers[i].content.pub.year
        }
    }
    domainSVG2.append("text")
                    .text(maxium)
                    .attr("text-anchor","end")
                    .attr("fill","azure")
                    .attr("font-size",10)
                    .attr("x",screenwidth*0.095-5)
                    .attr("y",30)
                    .transition()
                    .delay(4000)
                    .duration(1000)
                    .ease(d3.easeLinear)
                    .attr("fill","blcak")

    domainSVG2.append("text")
                    .text("引用数")
                    .attr("fill","azure")
                    .attr("text-anchor","end")
                    .attr("font-size",15)
                    .attr("x",screenwidth*0.095-5)
                    .attr("y",15)
                    .transition()
                    .delay(4000)
                    .duration(1000)
                    .ease(d3.easeLinear)
                    .attr("fill","blcak")

    domainSVG2.append("text")
                    .text("年份")
                    .attr("fill","azure")
                    .attr("text-anchor","start")
                    .attr("font-size",15)
                    .attr("x",screenwidth*0.905)
                    .attr("y",467)
                    .transition()
                    .delay(4000)
                    .duration(1000)
                    .ease(d3.easeLinear)
                    .attr("fill","blcak")
}




function drawCloud(id){

    d3.selectAll(".h2ader")
        .on("mouseover",function(d,i){
            var meetings=d3.selectAll("body")  
                            .append("div")
                            .attr("class","meetings")
                            .style("position","absolute")  
                            .style("background-color","black")
                            .style("border-radius","3px")  
                            .style("color","white")
                            .style("width","40%")
                            .style("padding","0 15px")
                            .style("margin","0 30%") 
            meetings.html(matcher2[id])
                            .style("top",(d.pageY+5)+"px")
                            .style("opacity",0.8)
        })
        .on("mouseout",function(d,i){
            d3.selectAll(".meetings").remove()
        })


    var placeholder=document.getElementById("demo");
    placeholder.innerHTML=matcher[id]
    var data=this.getDomainData(id)
    let size = d3.scaleLinear().range([0, 13]).domain([0, d3.max(data, d => d.count)]);
    let word_cloud_data = data.map(function(d){
        return { text: d.text, size: 7 + size(d.count) * 2.5 };
    });
    var c=document.getElementById("myCanvas");
    var cxt=c.getContext("2d");
    var img=new Image()
    img.src="1.jpg"
    img.onload = function (){
        c.width = img.width;
        c.height = img.height;
        cxt.drawImage(img,0,0);
	    var imageData = cxt.getImageData(0,0,c.width, c.height);
        var data = imageData.data;
        var maxwidth=1;
        while(maxwidth<img.width){
             maxwidth=maxwidth*2
        }
        var maxheight=1;
        while(maxheight<img.height){
            maxheight=maxheight*2
        }
        var newframe=[]                            
        for(var i=0;i<maxheight;i++){
            if(i<img.height){
                for(var j=0;j<maxwidth;j++){
                    if(j<img.width){
                        var red=data[(i*img.width+j)*4]
                        var green=data[(i*img.width+j)*4+1]
                        var blue=data[(i*img.width+j)*4+2]
                        var gray=Math.floor(red*0.3+green*0.59+blue*0.11);
                        if(gray<250){
                            newframe.push(0)
                        }
                        else{
                            newframe.push(1)
                        }
                    }
                    else{
                        newframe.push(1)
                    }
                }
            }
            else{
                for(var j=0;j<maxwidth;j++){
                    newframe.push(1)
                }
            }
        }
        var myframe=[]
        var pixcount=0
        var value=0
        var zhengfu=1
        for(var k=0;k<newframe.length;k++){
            if(newframe[k]==0){     // append 0 "black" display value=0
                if(pixcount==0){
                    zhengfu=1
                }
                else{
                    value=value*2
                }
                pixcount+=1
                if(pixcount==32){
                    if(zhengfu==-1){
                        value=-(value+1)
                    }
                    myframe.push(value)
                    pixcount=0
                    value=0
                    zhengfu=1
                }
            }
            else{   // append 1 "white" no-display value=1
                if(pixcount==0){
                    zhengfu=-1
                }
                else{
                    value=value*2+1
                }
                pixcount+=1
                if(pixcount==32){
                    if(zhengfu==-1){
                        value=-(value+1)
                    }
                    myframe.push(value)
                    pixcount=0
                    value=0
                    zhengfu=1
                }
            }
        }
        // console.log(myframe)
        let layout = d3.layout.cloud()
                        .size([1024, 512])
                        .words(word_cloud_data)
                        .padding(2.5)
                        .rotate(0)
                        .fontSize(d => d.size)
                        .myframe(myframe)
                        .on("end", draw);
        layout.start();
    }
}


function getDomainData(id){
    var domainData=[];
    $.ajax({
        //url
        url:'https://apiv2.aminer.cn/magic?a=__ai2000v2.KeywordsNetwork___' ,
        //参数:
        // data:'[{"action":"ai2000v2.Ranking","parameters":{"year":2021,"entity_type":"'+type_data+'","domain_ids":["5e8033d86121f6a2cf583984", "617610d9302569a70eab4244"]}}]',
        data:'[{"action":"ai2000v2.KeywordsNetwork","parameters":{"domain_ids":["'+id+'"]}}]',
        //请求类型：
        type:'POST',
        //响应体结果：
        dataType:'json',
        contentType:"application/json",
        async:false,
        //成功回调：
        success:function(data){
            for(var i=0;i<data.data[0].data.nodes.length;i++){
                domainData.push({text:data.data[0].data.nodes[i].name.en,count:1+Math.floor(data.data[0].data.nodes[i].pagerank*1000)})
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
    })
    return domainData
}


function draw(words) {
    var domainSVG = d3.select(".domainSVG")
    domainSVG.selectAll(".wordcloud").remove()
    domainSVG.append("g")
        .attr("transform", "translate("+screenwidth*0.37+",250)")
        .selectAll(".wordcloud")
        .data(words)
        .enter()
        .append("text")
        .attr("fill", "azure")
        .style("text-anchor", "middle")
        .attr("class","wordcloud")
        .attr("transform", d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
        .text(d => d.text)
        .style("font-size", d => d.size + "px")

        .transition()
        .delay(function(d,i){
            return 1000+50*i
        })
        .duration(50)
        .ease(d3.easeLinear)
        .attr("fill", function(d, i){ 
            return color[i%10]; 
        })
}

function drawFamousAuthor(domain_id){
    $.ajax({
        //url
        url:'https://apiv2.aminer.cn/magic?a=__ranking.GetRankingRecords___' ,
        //参数:
        data:'[{"action":"ranking.GetRankingRecords","parameters":{"brand":"ai_2000_scholar","domain_ids":["'+domain_id+'"],"offset":0,"size":100,"year_left":2012,"year_right":2021,"metric":"ai2000_index_classic"}}]',
        //请求类型：
        type:'POST',
        //响应体结果：
        dataType:'json',
        contentType:"application/json",
        async:false,
        //成功回调：
        success:function(data){
            var authorData=data.data[0].data.records
            authorData=authorData.splice(0,5)
            
            var domainSVG = d3.select(".domainSVG")
            domainSVG.selectAll("rect").remove()
            domainSVG.selectAll("rect")
                    .data(authorData)
                    .enter()
                    .append("rect")
                    .attr("x",screenwidth*0.7)
                    .attr("y",function(d,i){
                        return i*100
                    })
                    .attr("width",90)
                    .attr("height",90)
                    .attr("fill",function(d,i){
                        if(!d.content.person.avatar||d.content.person.avatar==""){
                            return "gray"
                        }
                        var defs=domainSVG.append("defs").attr("class","imgdefs")
                        var catpattern=defs.append("pattern")
                                            .attr("id","catpattern"+d.id)
                                            .attr("height",1)
                                            .attr("width",1)
                        catpattern.append("image")
                                .attr("x", 0)
                                .attr("y", 0)
                                .attr("width",90)
                                .attr("height",90)
                                .attr("xlink:href",d.content.person.avatar);
                        return "url(#catpattern" + d.id+")"
                    })
                    .on("click",function(d,i){
                        searchData3(i.content.person.name.en)
                    })
            domainSVG.selectAll(".name").remove()
            domainSVG.selectAll(".name")
                    .data(authorData)
                    .enter()
                    .append("text")
                    .attr("class","name")
                    .attr("x",screenwidth*0.7+100)
                    .attr("y",function(d,i){
                        return i*100+20
                    })
                    .attr("text-anchor","start")
                    .attr("font-size","20")
                    .attr("fill","black") 
                    .text(function(d,i){
                        if(!d.content.person.name.zh||d.content.person.name.zh==""){
                            return d.content.person.name.en
                        }
                        return d.content.person.name.zh
                    })
            
            domainSVG.selectAll(".hindex").remove()
            domainSVG.selectAll(".hindex")
                    .data(authorData)
                    .enter()
                    .append("text")
                    .attr("class","hindex")
                    .attr("x",screenwidth*0.7+100)
                    .attr("y",function(d,i){
                        return i*100+40
                    })
                    .attr("text-anchor","start")
                    .attr("font-size","15")
                    .attr("fill","black") 
                    .text(function(d,i){
                        return "H-index:"+d.content.person.h_index
                    })

            domainSVG.selectAll(".pubs").remove()
            domainSVG.selectAll(".pubs")
                    .data(authorData)
                    .enter()
                    .append("text")
                    .attr("class","pubs")
                    .attr("x",screenwidth*0.7+100)
                    .attr("y",function(d,i){
                        return i*100+65
                    })
                    .attr("text-anchor","start")
                    .attr("font-size","15")
                    .attr("fill","black") 
                    .text(function(d,i){
                        return "论文数:"+d.content.person.n_pubs
                    })

            domainSVG.selectAll(".n_score").remove()
            domainSVG.selectAll(".n_score")
                    .data(authorData)
                    .enter()
                    .append("text")
                    .attr("class","n_score")
                    .attr("x",screenwidth*0.7+100)
                    .attr("y",function(d,i){
                        return i*100+90
                    })
                    .attr("text-anchor","start")
                    .attr("font-size","15")
                    .attr("fill","black") 
                    .text(function(d,i){
                        return "综合得分:"+d.metrics.ai2000_index_classic.score
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
    })
}

