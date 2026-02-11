const counties = document.querySelectorAll(".region")
const arcs = document.querySelector("#arcs")

gsap.set(".region", {fill:"#E8E3D5", stroke:"rgb(122, 116, 102)", strokeWidth:"1"})

gsap.utils.toArray(".region").forEach((county) => {

    const hoverScaleAnim = gsap.timeline({paused:true})
        .to(county, {transformOrigin:"50% 50%", scale:1.05})

    county.addEventListener("mouseenter", function(event) {
        this.parentNode.appendChild(this);
        
        hoverScaleAnim.play();
    })

    county.addEventListener("mouseleave", function(event) {
        hoverScaleAnim.reverse();
    })

    county.addEventListener("click", function(event) {
        
        // Need these reset on each click
        arcs.replaceChildren()
        gsap.set(".region", {fill:"#E8E3D5", stroke:"#7A7466", strokeWidth:"1"})

        // Now the function does its thing
        const clickedCounty = event.currentTarget;
        gsap.set(clickedCounty, {fill:"#C8102E"});
        
        const clickedBBox = clickedCounty.getBBox();
        
        // MP = MidPoint 
        const clickedMP = findCenter(clickedBBox);

        let randomCounties = [];
        
        // Push five random counties 
        for (let i = 0; i < 6 ; i++) {
            randomCounties.push( gsap.utils.toArray(".region")[Math.floor(Math.random()*100)])
        }

        randomCounties.forEach(function(county) {
            gsap.set(".region", {pointerEvents:"none"})
            
            if (county) {
                let countyMP

                county.getBBox() ? countyMP = findCenter(county.getBBox()) : console.log(`No County for index ${county}`)
                
                let shadow = document.createElementNS("http://www.w3.org/2000/svg", "path")
                shadow.setAttribute("class", "shadow")
                shadow.setAttribute("fill", "transparent")
                shadow.setAttribute("stroke", "#000")
                shadow.setAttribute("stroke-width", "4")
                shadow.setAttribute("opacity", ".15")
                // shadow.setAttribute("stroke-dasharray", "10") 

                shadow.setAttribute("d", `M ${Math.floor(clickedMP.x)} ${Math.floor(clickedMP.y)} 
                                   Q ${Math.floor(clickedMP.x)} ${Math.floor(clickedMP.y)} 
                                     ${Math.floor(countyMP.x)} ${Math.floor(countyMP.y)}`)


                let arc = document.createElementNS("http://www.w3.org/2000/svg", "path")
                arc.setAttribute("class", "arc")
                arc.setAttribute("fill", "transparent")
                arc.setAttribute("stroke", "rgb(109, 60, 1)")
                arc.setAttribute("stroke-width", "4")
                arc.setAttribute("stroke-linecap", "round")
                

                let ControlPoint;

                ControlPoint = {
                        x: clickedMP.x,
                        y: countyMP.y
                    } 

                arc.setAttribute("d", `M ${Math.floor(clickedMP.x)} ${Math.floor(clickedMP.y)} 
                               C ${Math.floor(clickedMP.x)} ${Math.floor(clickedMP.y - 250)}
                                 ${Math.floor(countyMP.x - 20)} ${Math.floor(countyMP.y - 150)} 
                                 ${Math.floor(countyMP.x)} ${Math.floor(countyMP.y)}`)
                
                
                arcs.appendChild(shadow)
                arcs.appendChild(arc)
            }
        })

        let tl = gsap.timeline({defaults: {duration:.7, stagger: {amount:.2}}, onComplete: () => {
            gsap.set(".region", {pointerEvents:"auto"})
        }})
            .from(".shadow", {opacity:0, drawSVG:"100% 100%"})
            .from(".arc", {opacity:.5, drawSVG:"100% 100%"}, "<")
            .to(randomCounties, {fill:"#CBBAA7", strokeWidth:3, stagger:0})
        
    })

})

function findCenter({x, y, width, height}) {
    let midPoints = {
        x: x + width/2,
        y: y + height/2
    }

    return midPoints
}
