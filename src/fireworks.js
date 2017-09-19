
var fireWorks = {
    name: "toto",
    createSvg: function(){
        console.log(this.name, 'createSvg')
    }
}

function Stage(params){
    var height = 500;
    var width = 500;
    var stage;
    var bulletGroup;
    var uuid = 0
    this.createSvg = function(){
        stage = d3.select('#svg').append('svg')
            .style('width', "500px")
            .style('height', height + "px")
            .style('background-color', "lightgray");
        bulletGroup = stage.append('g').attr('id', 'bullet')
        stage.on('click',this.createFire)

    };

    this.createFire = function(){
        console.log(stage.attr('height'))
        var coord = d3.mouse(this)
        bulletGroup.append('circle')
            .attr('cx', coord[0])
            .attr('cy', height)
            .attr('r', 3)
            .transition()
                .attr('cy', coord[1])
                .on('end', function(){
                    d3.select(this).remove()
                    blow(this, coord);
                });
           
    };
    function calculatPosition(origin, numNodes){
        var res = new Array(numNodes).fill();
        var radius = getRandomInt(10,100);
        var r = getRandomInt(1,6);
        //var radius =40
        var list = res.map(function(element, i) {
            var angle = (i / (numNodes/2)) * Math.PI;            
            return {
                r:r,
                dx: origin[0] + (radius * Math.cos(angle)),
                dy: origin[1] + (radius * Math.sin(angle)),
            }          
        }, this);
        return list;
    }
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    function blow(element, coord, stop){
        console.log('blow', element)
        
        var radius = getRandomInt(10,50);
        var numNodes = getRandomInt(6,12)
        var nodes = [], 
        
        width = (radius * 2) + 50,
        height = (radius * 2) + 50,
        angle,
        x,
        y,
        i;
        var _angle = 360 / numNodes;
        var opacity = getRandomInt(0,6) / 10;
        var rad = getRandomInt(3,6) 


        function anim(repeat){
            console.log(repeat)
            var _d = calculatPosition(coord, numNodes);
            var g =  bulletGroup.append('g')
            var sel = g.selectAll('circle').data(_d).enter()
            var animation = sel.append('circle')
            .attr('cx', coord[0])
            .attr('cy', coord[1])
            .attr('r',  1)
            .transition()  
                .duration(1500)              
                //.delay(function(d,i){return i *50})
                .attr('cx', function(d){return d.dx})
                .attr('cy', function(d){return d.dy})
                .attr('r', function(d){return d.r})
            if(repeat > 0){
                sel.on('end',anim(repeat -= 1))
               
                // animation.on('end', function(){
                //     anim(repeat-= 1)
                //     //d3.select(this).remove()
                // })
            } else {
                animation.on('end', function(){
                    d3.select('#bullet').selectAll('g').transition().duration(1000).style('opacity', 0).remove()                    
                })
                // g.selectAll('circle').transition().duration(250).style('opacity', 0)
                // g.remove()
                //.on('end', remove(sel));
            }
            function _remove(el){
                console.log(el)
                d3.select(this).remove()
            }

        }
        anim( getRandomInt(2,6) )
        return
        for (i=0; i<numNodes; i++) { 

            console.log("Mouse posX ", coord[0], "Mouse posY ", coord[1])
            angle = (i / (numNodes/2)) * Math.PI; // Calculate the angle at which the element will be placed.
                                                // For a semicircle, we would use (i / numNodes) * Math.PI.
            console.log(" cos = ", Math.cos(angle), " angle =  ", angle ,"width = " , (width/2));
            console.log(" sin = ", Math.sin(angle), " angle =  ", angle ,"width ", (width/2));
            x = (radius * Math.cos(angle)) ; // Calculate 0  the x position of the element.
            y = (radius * Math.sin(angle)) ; // Calculate the y position of the element.
          
            console.log(" X (radius * Math.cos(angle)) = ", x)
            console.log(" Y (radius * Math.sin(angle)) = ", y)
            console.log("---------------------")
           
            bulletGroup.append('circle')
                .attr('cx', coord[0])
                .attr('cy',  coord[1])
                .attr('r', rad)
                .style('fill',"red")
                .style('opacity',opacity)
                .transition()     
                    .duration(500)
                    .attr('cx', coord[0] + x)
                    .attr('cy',  coord[1] + y)
                    .on('end', function(d){
                        if(!stop){
                            var coord = [parseInt(d3.select(this).attr('cx')), parseInt(d3.select(this).attr('cy'))]
                            blow(this, coord, true)
                            console.log(d3.select(this), d, true)
                            d3.select(this).remove();         
                        }else{
                            d3.select(this).remove(); 
                        }
                    });
            nodes.push({'id': i, 'x': x, 'y': y});
        }
        console.log(nodes)
        // nodes.forEach(function(element) {
        //     bulletGroup.append('circle')
        //         .attr('cx',  element.x)
        //         .attr('cy',  element.y)
        //         .attr('r',4)
        // }, this);
    }

    this.explode = function(){
        console.log("explode")
    }

    this.returnStage = function(){
        console.log(stage)
    }
}