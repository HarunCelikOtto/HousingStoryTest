const medIncomeRect = document.querySelector("#median-income")
const medHouseValueRect = document.querySelector("#median-house-value")
const rectLabels = document.querySelectorAll(".rect-label")
const gapLabels = document.querySelectorAll(".lab-gap")

let med_income = 1600;
let med_home_value = 3000;

let test = d3.selectAll("div#svgAffordWrapper rect")

gsap.timeline({
    defaults:{},
    scrollTrigger:{
        trigger:"#svgAffordWrapper",
        start:"top-=600",
        end:"bottom+=200 100%",
        scrub:3,
        // markers:true,
        pinSpacing:true
    }
})
    .fromTo(medIncomeRect, {attr: {width:0}}, {attr: {width:35}, ease:"back.out(4)"})
    .fromTo(medHouseValueRect, {attr: {x:100}}, {attr: {x:55}, ease:"back.out(4)"}, "<")
    .fromTo(rectLabels, {opacity:0, scale:0.7}, {opacity:1, scale:1})

    .from(gapLabels, {attr: {x:20}, opacity:0}, "<-.2")
