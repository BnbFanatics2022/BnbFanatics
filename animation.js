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
