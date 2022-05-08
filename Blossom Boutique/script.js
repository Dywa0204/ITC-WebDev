let root = document.querySelector(':root');
let slide = document.getElementsByClassName('slide-content');
let slideIndex = 0, sliderTime, isNavOpen = false;


//TOGGLE NAV BY CLICK HAMBURGER ICON
document.querySelector('.header-logo i').addEventListener('click', toggleNav);
//CLOSE NAV BY CLICK NAV MENUS
document.querySelectorAll('.nav-menus a').forEach(item => {
    item.addEventListener('click', () => {
        if(isNavOpen) toggleNav();
    })
})
//TOGGLE NAV OPEN AND CLOSE
function toggleNav(){
    let navHeight = document.querySelector('.nav-menus ul').clientHeight + 64;
    if(isNavOpen){
        root.style.setProperty('--nav-height', '0');
        document.querySelector('.header-logo i').setAttribute('class', 'fa fa-bars');
        isNavOpen = false;
    }else{
        root.style.setProperty('--nav-height', navHeight + 'px');
        document.querySelector('.header-logo i').setAttribute('class', 'fa fa-times');
        isNavOpen = true;
    }
}

//CHANGE HEADER BACKGROUND COLOR ONSCROLL
window.onscroll = () => {
    if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
        root.style.setProperty('--header-background', '#0c0c0ce6')
    }else{
        root.style.setProperty('--header-background', 'transparent')
    }
}


//SET HIGHT OF SLIDER
root.style.setProperty('--window-innerHeight', window.innerHeight + 'px');
window.addEventListener('resize', (event) => {
    root.style.setProperty('--window-innerHeight', event.target.innerHeight + 'px');
})

//SET TIME LOOP OF SLIDER
function setTimeSlider(is){
    if(is == 'next') setSlider(slideIndex += 1);
    else if(is == 'pref') setSlider(slideIndex -= 1);
    else setSlider(slideIndex = is);
	
    sliderTime = setTimeout(() => {
        setTimeSlider('next');
    }, 5000)
}setTimeSlider('next');

//CHANGE THE INDEX OF SLIDER
function setSlider(n) {
    if (n > slide.length) slideIndex = 1;
    if (n < 1) slideIndex = slide.length;

    for (let i = 0; i < slide.length; i++) {
        slide[i].setAttribute('class', 'slide-content');
        document.getElementById('slide-' + i).setAttribute('class', 'dot');
    }

    slide[slideIndex-1].setAttribute('class', 'slide-content slide-visible');
    document.getElementById('slide-' + (slideIndex-1)).setAttribute('class', 'dot dot-selected');
}

//CHANGE SLIDER BY CLICK ARROW ANGLE BUTTON
document.querySelectorAll('.slider-btn i').forEach((item) => {
    item.addEventListener('click', (event) => {
        clearTimeout(sliderTime);
        if(event.target.id == 'slider-btn-next') setTimeSlider('next');
        else if(event.target.id == 'slider-btn-pref') setTimeSlider('pref');
    })
})

//CHANGE SLIDER BY CLICK THE DOTS
for(let i = 0; i < 4; i++){
    document.getElementById('slide-' + i).addEventListener('click', () => {
        clearTimeout(sliderTime);
        setTimeSlider(i+1);
    })
}


const productList = [
    'Batik Tradisional', 'Gaun Pengantin', 'Blouse dan Kemeja', 'Jas dan Almamater',
    'Sweater dan Jaket', 'Kaos dan Baju Santai', 'Bawahan', 'Hijab dan Pakaian Muslim', 
    'Sepatu dan Sandal', 'Tas dan Dompet', 'Hampers Hadiah', 'Aksesoris Lainnya'
];

//PRINT LIST OF PRODUCT
for(const product of productList){
    let div = document.createElement('div');
    let figure = document.createElement('figure');
    let img = document.createElement('img');
    let figcaption = document.createElement('figcaption');
    let h4 = document.createElement('h4');

    div.setAttribute('class', 'product-list-content');
    img.setAttribute('src', './images/products/product_' + (productList.indexOf(product)+1) + '.jpg');
    h4.append(product);
    figure.appendChild(img);
    figcaption.appendChild(h4);
    div.appendChild(figure);
    div.appendChild(figcaption);
    document.querySelector('.product-list').appendChild(div);
}

//OPEN PRODUCT INFO MODAL BY CLICK PRODUCT ELEMENT
document.querySelectorAll('.product-list-content').forEach((item, index) => {
    item.addEventListener('click', () => { openSideModal(index) })
})

//OPEN SIDE MODAL FUNCTION
function openSideModal(index){
    document.querySelector('.side-modal-container p').removeAttribute('class');
    root.style.setProperty('--modal-close-btn', 'block');
    root.style.setProperty('--modal-background-width', '100vw');
    root.style.setProperty('--modal-width', '70vw');
    document.querySelector('.side-modal-container h1').innerHTML = productList[index];
    let modalFigure = document.querySelector('.side-modal-container figure');
    modalFigure.innerHTML = '';
    for(let i = 1; i <= 3; i++){
        let img = document.createElement('img');
        img.setAttribute('src', './images/product_preview/' + (index+1) + '/preview_' + i + '.jpg');
        modalFigure.appendChild(img);
    }
}

//CLOSE PRODUCT INFO MODAL BY CLICK CLOSE ICON
document.querySelector('.side-modal-container i').addEventListener('click', () => {
    document.querySelector('.side-modal-container p').setAttribute('class', 'text-ellipsis');
    root.style.setProperty('--modal-close-btn', 'none');
    root.style.setProperty('--modal-width', '0vw');
    setTimeout(() => {
        root.style.setProperty('--modal-background-width', '0vw');
    }, 300)
})

const galleryItemSize = ['sm', 'lg', 'sm', 'md', 'sm', 'md', 'lg', 'sm', 'lg', 'sm', 'md', 'sm'];

//PRINT GALLERY GRID
for(let i = 0; i < galleryItemSize.length; i++){
    let div = document.createElement('div');
    let img = document.createElement('img');
    let icon = document.createElement('i');

    icon.setAttribute('class', 'fa fa-eye');
    img.setAttribute('src', './images/product_preview/' + (i+1) + '/preview_1.jpg')
    div.setAttribute('class', 'gallery-item gallery-item-' + galleryItemSize[i]);
    div.appendChild(img);
    div.appendChild(icon);
    document.querySelector('.gallery-grid').appendChild(div);
}

//OPEN PRODUCT INFO MODAL BY CLICK GALLERY ITEM
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.addEventListener('click', () => { openSideModal(index) })
})

//OPEN PRODUCT INFO MODAL BY CLICK FOOTER PRODUCT ITEM
document.querySelectorAll('.footer-product').forEach((item, index) => {
    item.addEventListener('click', () => {openSideModal(index)})
})