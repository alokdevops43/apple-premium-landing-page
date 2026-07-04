window.addEventListener("load",()=>{

    setTimeout(()=>{

        document.getElementById("preloader").style.display="none";

    },1200);

});

/*==================================================
                SELECTORS
==================================================*/

const progressBar = document.getElementById("progress-bar");

const navbar = document.querySelector("header");

const navLinks = document.querySelectorAll(".nav-links a");

const preloader = document.getElementById("preloader");


/*==================================================
                PRELOADER
==================================================*/

window.addEventListener("load", () => {

    if(preloader){

        preloader.style.transition = "opacity .6s ease";

        preloader.style.opacity = "0";

        setTimeout(() => {

            preloader.style.display = "none";

        },600);

    }

});


/*==================================================
            SCROLL PROGRESS BAR
==================================================*/

function updateProgressBar(){

    const scrollTop =
        document.documentElement.scrollTop ||
        document.body.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        (scrollTop / scrollHeight) * 100;

    progressBar.style.width = progress + "%";

}

window.addEventListener("scroll", updateProgressBar);


/*==================================================
                STICKY NAVBAR
==================================================*/

function stickyNavbar(){

    if(window.scrollY > 50){

        navbar.style.background =
            "rgba(0,0,0,.82)";

        navbar.style.backdropFilter =
            "blur(25px)";

        navbar.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.35)";

    }

    else{

        navbar.style.background =
            "rgba(0,0,0,.35)";

        navbar.style.backdropFilter =
            "blur(18px)";

        navbar.style.boxShadow =
            "none";

    }

}

window.addEventListener("scroll", stickyNavbar);


/*==================================================
            SMOOTH SCROLL
==================================================*/

navLinks.forEach(link=>{

    link.addEventListener("click",(e)=>{

        e.preventDefault();

        const target =
            document.querySelector(
                link.getAttribute("href")
            );

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


/*==================================================
            INITIALIZE
==================================================*/

updateProgressBar();

stickyNavbar();

/*==================================================
            SCROLL REVEAL
==================================================*/

const revealElements = document.querySelectorAll(

    ".fade-up, .fade-left, .fade-right, .zoom-in, .reveal"

);

const revealObserver = new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("active");

        }

    });

},

{

    threshold:0.15

}

);

revealElements.forEach(element=>{

    revealObserver.observe(element);

});


/*==================================================
            ACTIVE NAVIGATION
==================================================*/

const sections = document.querySelectorAll("section");

function activeNavigation(){

    let current = "";

    sections.forEach(section=>{

        const sectionTop =

            section.offsetTop - 120;

        const sectionHeight =

            section.offsetHeight;

        if(

            window.scrollY >= sectionTop &&

            window.scrollY < sectionTop + sectionHeight

        ){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(

            link.getAttribute("href") === "#" + current

        ){

            link.classList.add("active");

        }

    });

}

window.addEventListener(

    "scroll",

    activeNavigation

);


/*==================================================
            COUNTER ANIMATION
==================================================*/

const counters = document.querySelectorAll(

    ".stat h2"

);

let counterStarted = false;

function startCounter(){

    if(counterStarted) return;

    const statsSection =

        document.getElementById("stats");

    if(!statsSection) return;

    const trigger =

        statsSection.offsetTop - window.innerHeight + 150;

    if(window.scrollY < trigger) return;

    counterStarted = true;

    counters.forEach(counter=>{

        const text =

            counter.innerText;

        const number =

            parseInt(text.replace(/\D/g,""));

        if(isNaN(number)) return;

        let current = 0;

        const increment =

            Math.ceil(number / 80);

        const timer = setInterval(()=>{

            current += increment;

            if(current >= number){

                current = number;

                clearInterval(timer);

            }

            counter.innerText =

                current + text.replace(/[0-9]/g,"");

        },20);

    });

}

window.addEventListener(

    "scroll",

    startCounter

);


/*==================================================
            INITIAL CALLS
==================================================*/

activeNavigation();

startCounter();

/*==================================================
            MOBILE MENU
==================================================*/

const menuButton = document.querySelector(

    ".fa-bars"

);

const navMenu = document.querySelector(

    ".nav-links"

);

if(menuButton && navMenu){

    menuButton.addEventListener("click",()=>{

        navMenu.classList.toggle("show-menu");

    });

    navLinks.forEach(link=>{

        link.addEventListener("click",()=>{

            navMenu.classList.remove("show-menu");

        });

    });

}


/*==================================================
            HERO PARALLAX
==================================================*/

const hero = document.getElementById("hero");

const heroPhone = document.querySelector(

    ".hero-right img"

);

if(hero && heroPhone){

    hero.addEventListener("mousemove",(e)=>{

        const x =

            (window.innerWidth/2 - e.clientX)/40;

        const y =

            (window.innerHeight/2 - e.clientY)/40;

        heroPhone.style.transform =

            `translate(${x}px, ${y}px)`;

    });

    hero.addEventListener("mouseleave",()=>{

        heroPhone.style.transform =

            "translate(0,0)";

    });

}


/*==================================================
            GALLERY HOVER
==================================================*/

const galleryImages = document.querySelectorAll(

    ".gallery-item img"

);

galleryImages.forEach(image=>{

    image.addEventListener("mouseenter",()=>{

        image.style.transform =

            "scale(1.08)";

    });

    image.addEventListener("mouseleave",()=>{

        image.style.transform =

            "scale(1)";

    });

});


/*==================================================
            DESIGN CARD TILT
==================================================*/

const designCards = document.querySelectorAll(

    ".design-card"

);

designCards.forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x =

            e.clientX - rect.left;

        const y =

            e.clientY - rect.top;

        const rotateY =

            ((x / rect.width)-0.5)*10;

        const rotateX =

            ((y / rect.height)-0.5)*-10;

        card.style.transform =

            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-10px)`;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform =

            "perspective(1000px) rotateX(0) rotateY(0)";

    });

});


/*==================================================
            IMAGE PARALLAX
==================================================*/

const parallaxImages = document.querySelectorAll(

    ".parallax"

);

window.addEventListener("scroll",()=>{

    const scroll = window.pageYOffset;

    parallaxImages.forEach(image=>{

        image.style.transform =

            `translateY(${scroll*0.08}px)`;

    });

});


/*==================================================
            HERO BUTTON HOVER
==================================================*/

const heroButtons = document.querySelectorAll(

    ".hero-buttons .btn"

);

heroButtons.forEach(button=>{

    button.addEventListener("mouseenter",()=>{

        button.style.transform =

            "translateY(-6px) scale(1.04)";

    });

    button.addEventListener("mouseleave",()=>{

        button.style.transform =

            "translateY(0) scale(1)";

    });

});


/*==================================================
            END PART 3
==================================================*/

/*==================================================
            FAQ ACCORDION
==================================================*/

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item=>{

    const answer = item.querySelector("p");

    if(answer){

        answer.style.display = "none";

    }

    item.addEventListener("click",()=>{

        faqItems.forEach(other=>{

            if(other!==item){

                const otherAnswer = other.querySelector("p");

                if(otherAnswer){

                    otherAnswer.style.display="none";

                }

                other.classList.remove("active");

            }

        });

        if(answer){

            if(answer.style.display==="block"){

                answer.style.display="none";

                item.classList.remove("active");

            }

            else{

                answer.style.display="block";

                item.classList.add("active");

            }

        }

    });

});


/*==================================================
            BUTTON RIPPLE
==================================================*/

const buttons = document.querySelectorAll(".btn");

buttons.forEach(button=>{

    button.addEventListener("click",(e)=>{

        const ripple = document.createElement("span");

        ripple.classList.add("ripple-circle");

        const rect = button.getBoundingClientRect();

        ripple.style.left =

            (e.clientX-rect.left)+"px";

        ripple.style.top =

            (e.clientY-rect.top)+"px";

        button.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});


/*==================================================
            MAGNETIC CARDS
==================================================*/

const cards = document.querySelectorAll(

".design-card,.feature-card,.gallery-item,.spec-card"

);

cards.forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x =

            e.clientX-rect.left-rect.width/2;

        const y =

            e.clientY-rect.top-rect.height/2;

        card.style.transform=

        `translate(${x*0.04}px,${y*0.04}px)`;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translate(0,0)";

    });

});


/*==================================================
            MOUSE GLOW
==================================================*/

const glow = document.createElement("div");

glow.className="mouse-glow";

document.body.appendChild(glow);

document.addEventListener("mousemove",(e)=>{

    glow.style.left=e.clientX+"px";

    glow.style.top=e.clientY+"px";

});


/*==================================================
            HERO PARALLAX TEXT
==================================================*/

const heroContent=document.querySelector(".hero-left");

if(heroContent){

    document.addEventListener("mousemove",(e)=>{

        const x=(window.innerWidth/2-e.clientX)/60;

        const y=(window.innerHeight/2-e.clientY)/60;

        heroContent.style.transform=

        `translate(${x}px,${y}px)`;

    });

}


/*==================================================
            SCROLL TO TOP
==================================================*/

const topButton=document.createElement("div");

topButton.className="scroll-top";

topButton.innerHTML="↑";

document.body.appendChild(topButton);

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        topButton.classList.add("show");

    }

    else{

        topButton.classList.remove("show");

    }

});

topButton.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


/*==================================================
            END PART 4
==================================================*/

/*==================================================
            LAZY LOADING IMAGES
==================================================*/

const lazyImages = document.querySelectorAll("img");

const lazyObserver = new IntersectionObserver(

(entries, observer)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            const image = entry.target;

            image.classList.add("loaded");

            observer.unobserve(image);

        }

    });

},

{

    threshold:0.1

}

);

lazyImages.forEach(image=>{

    lazyObserver.observe(image);

});


/*==================================================
            DEBOUNCE
==================================================*/

function debounce(callback, delay){

    let timer;

    return (...args)=>{

        clearTimeout(timer);

        timer = setTimeout(()=>{

            callback(...args);

        }, delay);

    };

}


/*==================================================
            THROTTLE
==================================================*/

function throttle(callback, delay){

    let waiting = false;

    return (...args)=>{

        if(waiting) return;

        callback(...args);

        waiting = true;

        setTimeout(()=>{

            waiting = false;

        }, delay);

    };

}


/*==================================================
            OPTIMIZED SCROLL EVENTS
==================================================*/

window.addEventListener(

    "scroll",

    throttle(()=>{

        updateProgressBar();

        stickyNavbar();

        activeNavigation();

        startCounter();

    },16)

);


/*==================================================
            WINDOW RESIZE
==================================================*/

window.addEventListener(

    "resize",

    debounce(()=>{

        updateProgressBar();

    },200)

);


/*==================================================
            IMAGE FADE-IN
==================================================*/

document.querySelectorAll("img").forEach(image=>{

    image.addEventListener("load",()=>{

        image.style.opacity="1";

    });

});


/*==================================================
            DISABLE RIGHT CLICK
            (OPTIONAL)
==================================================*/

// document.addEventListener("contextmenu",(e)=>{

//     e.preventDefault();

// });


/*==================================================
            DISABLE IMAGE DRAG
==================================================*/

document.querySelectorAll("img").forEach(image=>{

    image.setAttribute("draggable","false");

});


/*==================================================
            INITIALIZATION
==================================================*/

document.addEventListener("DOMContentLoaded",()=>{

    updateProgressBar();

    stickyNavbar();

    activeNavigation();

    startCounter();

});


/*==================================================
            CONSOLE MESSAGE
==================================================*/

console.log(

"%cNova X Pro Landing Page",

"color:#0071e3;font-size:20px;font-weight:bold;"

);

console.log(

"%cDesigned with HTML • CSS • JavaScript",

"color:white;font-size:14px;"

);


/*==================================================
            END OF SCRIPT
==================================================*/