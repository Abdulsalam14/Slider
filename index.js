
function smoothScrollTo(container, targetScrollLeft, duration) {
    const startScrollLeft = container.scrollLeft;
    const distance = targetScrollLeft - startScrollLeft;
    const startTime = performance.now();

    function step(currentTime) {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < duration) {
            const scrollAmount = startScrollLeft + (distance * (elapsedTime / duration));
            container.scrollLeft = scrollAmount;
            requestAnimationFrame(step);
        } else {
            container.scrollLeft = targetScrollLeft;
        }
    }
    requestAnimationFrame(step);
}


let showimg = document.getElementById('showimg');
let imagescont = document.getElementsByClassName('images')[0];
let images = document.querySelectorAll('.images img');
let imagescontsize = imagescont.offsetWidth;
let allimagessize = 0;
let txt=document.getElementById('txt');


images.forEach(e => {
    allimagessize += e.offsetWidth;
})

let isDragging = false;
let startX;
let scrollLeft;


let rightx = 0
let movedx = 0;

for (let i = 0; i < images.length; i++) {
    const img = images[i];
    img.addEventListener('dblclick', function () {
        let differ = allimagessize - imagescontsize;
        if (i < 2) {
            movedx = 0;
        }
        if (i >= 2 && i < 5) {
            movedx = img.offsetWidth;
        }
        else if (i >= 5 && i < 8) {
            movedx = img.offsetWidth * 2;
        }
        else if (i >= 8 && i < images.length) {
            movedx = img.offsetWidth * (i - 2) + differ;
        }

        rightx = -movedx;
        differ -= movedx

        for (let k = 0; k < images.length; k++) {
            const e2 = images[k];
            e2.style.border = 'none';
            e2.style.padding = '0px';
        }

        smoothScrollTo(imagescont, -rightx, 500);

        img.style.border = '4px solid white';
        txt.style.display='none';
        showimg.style.display='inline';
        setTimeout(() => {
            showimg.style.opacity = 1;
            showimg.setAttribute('src', img.getAttribute('src'))
        }, 700);
        showimg.style.opacity = 0;
    })


    imagescont.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - imagescont.offsetLeft;
        scrollLeft = imagescont.scrollLeft;
    });
    imagescont.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    imagescont.addEventListener('mouseup', () => {
        isDragging = false;

    });

    imagescont.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - imagescont.offsetLeft;
        const walk = (x - startX)*0.8;
        imagescont.scrollLeft = scrollLeft - walk;
    });
}
