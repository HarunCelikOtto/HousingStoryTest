/* Using JS objects to set initial house states */
let vacantHouseObj = {
    title: "Vacant Housing",
    vacantNum: 713,
    occupNum: 1320,
    
    get vacSubText() {
        return `Total Vacant Units: ${this.vacantNum}`;
    },

    get occupSubText() {
        return `Total Occupied Units: ${this.occupNum}`;
    },

    build: function() {
        // Defaults of existing elements
        gsap.set("#small_window", {transformOrigin:"50% 50%", rotate:-5})
        gsap.set("#tall_roof", {transformOrigin:"50% 0%", rotate:4, y:2})
        gsap.set("#hedges", {transformOrigin:"50% 0%", opacity:0, y:20})
        gsap.set("#sold_signage", {transformOrigin:"50% 0%", scale:0})

        // Generating the subtext based on data
        let infoNode = document.querySelector("#stats")
        const ns = "http://www.w3.org/2000/svg"
        
        let subtextEl = document.createElementNS(ns, "text")
        const titleTransform = document.querySelector("#title_text").getAttribute("transform");

        subtextEl.setAttribute("id", "sub_text")
        subtextEl.setAttribute("transform", titleTransform)
        subtextEl.setAttribute("dy", "1.2em")
        subtextEl.setAttribute("dx", "2px")
        subtextEl.setAttribute("font-size", "7") 
        subtextEl.textContent = this.vacSubText;

        infoNode.appendChild(subtextEl);

        this.tl = gsap.timeline({paused:true, duration:.3})
            .to("#vacant_signage", {transformOrigin:"50% 0%", scale:1.1, repeat:1, yoyo:true, duration:0.1})
            .to("#stats", {opacity:0, y:-10, duration:.3})
            .to("#title_text", {textContent: "Occupied Housing"})
            .to("#sub_text", {textContent: this.occupSubText})
            .to("#hedges", {transformOrigin:"50% 0%", opacity:1, y:0})
            .to(`[data-name="bolt"], #bolt`, {opacity:0, duration:0.4})
            .to(`[data-name="plank_forward"], #plank_forward`, {transformOrigin:"0% 100%", rotate:30})
            .to(`[data-name="plank_forward"], #plank_forward`, {y:20}, "<=-.05")
            .to(`[data-name="plank_backward"], #plank_backward`, {transformOrigin:"100% 100%",rotate:-30})
            .to(`[data-name="plank_backward"], #plank_backward`, {y:20}, "<=-.1")
            .to("#small_window", {transformOrigin:"50% 50%", rotate:0})
            .to("#tall_roof", {transformOrigin:"50% 0%", rotate:0, y:0})
            .to("#stats", {opacity:1, y:0, duration:.2}, "<")
            .to(`[data-name="glass"], #glass`, {fill:"#f9ff37", ease:"rough"})
            .to("#sold_signage", {transformOrigin:"50% 0%", scale:1.1, ease:"bounce"}, "<")
            .timeScale(1.2)
    },

    animate: function() {
        this.tl.play();
    },

    reverse: function() {
        this.tl.reverse();
    }
}

vacantHouseObj.build();

let isVacant=true;

const SVGWrapper = document.querySelector("#svgUnitsWrapper")
const signage = document.querySelector("#signage")

signage.addEventListener("click", function() {
    isVacant ? vacantHouseObj.animate() : vacantHouseObj.reverse();
    isVacant = !isVacant;  
})




/* 
NOTES

Order
- text
- hedges
- bolts
- boards
- window 
- roof
- lights
- sold

Animation triggers on click

Sign needs to change with a transformation origin of 50-50 and can scale up
- Text may need to appear after the sign components as squished text might be weird if not quick.

Boards need to fall of into the ground
- Hedges pop up
- Boards fall behind

Roof of vacant house slightly tilted.

Lights in the house turn bright yellow (indicator they are on)
- Get erratic ease to make light flicker

Text updates with correct category of housing data

THIS ANIMATION COULD BE A REPAIR COSTS ONE TOO
*/ 