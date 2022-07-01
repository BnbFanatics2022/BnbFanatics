function scrollTrigger(selector, options = {}){
    let els = document.querySelectorAll(selector)
    els = Array.from(els)
    els.forEach(el => {
        addObserver(el, options)
    })
}

function addObserver(el, options){
    if(!('IntersectionObserver' in window)){
        if(options.cb){
            options.cb(el)
        }else{
            entry.target.classList.add('active')
        }
        return
    }
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                if(options.cb){
                    options.cb(el)
                }else{
                    entry.target.classList.add('active')
                }
                observer.unobserve(entry.target)
            }
        })
    }, options)
    observer.observe(el)
}

//About Section animation
scrollTrigger('.about-text')
scrollTrigger('.buy-section')

//Tokenomics Card animation
scrollTrigger('.s-box')

//Roadmap Section animation
scrollTrigger('.direction-l')
scrollTrigger('.direction-r')

//Team Section Members animation
scrollTrigger('.team-member')

//Footer animation
scrollTrigger('.footer-img')


function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

function count (){
  const obj1 = document.getElementById("perc1");
  animateValue(obj1, 0, 3, 5000);
  const obj2 = document.getElementById("perc2");
  animateValue(obj2, 0, 6, 5000);
}

function increment (){
Number.prototype.format = function(n) {
    var r = new RegExp('\\d(?=(\\d{3})+' + (n > 0 ? '\\.' : '$') + ')', 'g');
    return this.toFixed(Math.max(0, Math.floor(n))).replace(r, '$&,');
};

$('.count').each(function () {
    $(this).prop('counter', 0).animate({
        counter: $(this).text()
    }, {
        duration: 5000,
        easing: 'easeOutExpo',
        step: function (step) {
            $(this).text('' + step.format());
        }
    });
});
}

const elements = document.querySelectorAll('.count');
const callback = str => { console.log(str); };
const observer = new IntersectionObserver(handleIntersection);

elements.forEach(obs => {
  observer.observe(obs);
});

function handleIntersection(entries, observer){
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      increment();
      count();
      callback('observer-' + entry.target.getAttribute('count'));
      observer.unobserve(entry.target);
    }
  });
}
