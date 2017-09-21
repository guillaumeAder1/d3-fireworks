var fireWorks = {
    name: "toto",
    createSvg: function(){
        console.log(this.name, 'createSvg')
    }
}
//https://blog.madewithenvy.com/getting-started-with-webpack-2-ed2b86c68783
function Stage(params){
    var height = 500;
    var width = 500;
    var stage;
    var bulletGroup;
    var uuid = 0
    this.createSvg = function(){
        stage = d3.select('#svg').append('svg')
            // .style('width', "500px")
            // .style('height', height + "px")
            .style('width', "100vw")
            .style('height', "100vh")
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

    function getNumNode(nbr){
        return ( Math.floor(Math.random() * 10) % 2 === 0 ) ? nbr : nbr * 2;
    }
    function blow(element, coord, stop){      
        
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

        var groupContainer = bulletGroup.append('g').attr('class', 'container')
        function anim(repeat){
            console.log(repeat)
            var _d = calculatPosition(coord,getNumNode(numNodes));
            var g =  groupContainer.append('g').attr('fill', 'green')
           
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
                    // d3.select('#bullet').selectAll('g').transition().duration(1000).style('opacity', 0).remove()   
                  
                    d3.select('#bullet').select('g.container').each(function(d,i){
                        
                        var gPos = d3.select(this).node().getBBox();
                        var center = [gPos.y + (gPos.height / 2), gPos.x + (gPos.width / 2)];
                        console.log(center[1], center[0] , gPos)
                        d3.select(this).selectAll('g').transition().duration(500)
                        //.attr('transform', 'scale(50, 100) rotate(60 ,' + center[1] + ' ,' + center[0] + ')' )
                        .attr('transform', 'scale(50, 100)' )
                       


                            console.log(coord)
                    })
                    // .transition().duration(1000)
                    //     .attr('transform', 'rotate(60 250 250)' ).style('opacity', 0).remove()                    
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
      
    }

    this.explode = function(){
        console.log("explode")
    }

    this.returnStage = function(){
        console.log(stage)
    }
}