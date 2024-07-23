let selectedSlides = {};
let clickcount = 0;

function selectSlide(slide, row) {
    if (selectedSlides[row] !== undefined) {
        return;
    }

    clickcount++;

    slide.style.transform = 'translateZ(15px)';
    slide.style.webkitTransform = 'translateZ(15px)';
    slide.style.mozTransform = 'translateZ(15px)';
    slide.style.msTransform = 'translateZ(15px)';
    slide.style.oTransform = 'translateZ(15px)';
    slide.style.transition = '0.3s ease';

    slide.classList.add('selected');

    const newPhotoUrl = generatePhotoUrl(row); 
    slide.setAttribute('src', newPhotoUrl);

    selectedSlides[row] = slide;

    const slideTrack = document.querySelector(`.slide-track[data-row="${row}"], .slide-track2[data-row="${row}"], .slide-track3[data-row="${row}"]`);
    if (slideTrack) {
        slideTrack.classList.add('paused');
        const slideImages = slideTrack.querySelectorAll('.slide img');
        slideImages.forEach(img => {
            img.removeEventListener('mouseover', handleMouseOverSlider);
            img.removeEventListener('mouseout', handleMouseOutSlider);
            img.style.cursor = 'default';
        });
        slideImages.forEach(img => {
            if (img !== slide) {
                img.removeEventListener('mouseover', handleMouseOverSlider);
                img.removeEventListener('mouseout', handleMouseOutSlider);
            }
        });
    } else {
        console.error(`Slide track element not found for row ${row}`);
    }

    if (clickcount === 3) {
        setTimeout(showPopup,1500);
    }
}

function showPopup() {
    const popupOverlay = document.getElementById('popup-overlay');
    popupOverlay.style.display = 'flex';
}



function generatePhotoUrl(row) {
    if (clickcount === 3) { 
        return `img/Win100todeposit.png`;
    }
    return `img/Lose_250x250.png`;
}

function handleMouseOverSlider(event) {
    const img = event.target;
    const row = img.closest('.slide-track, .slide-track2, .slide-track3').getAttribute('data-row');
    if (selectedSlides[row] === undefined) {
        img.style.transform = 'translateZ(15px)';
        img.style.webkitTransform = 'translateZ(15px)';
        img.style.mozTransform = 'translateZ(15px)';
        img.style.msTransform = 'translateZ(15px)';
        img.style.oTransform = 'translateZ(15px)';
    }
}

function handleMouseOutSlider(event) {
    const img = event.target;
    const row = img.closest('.slide-track, .slide-track2, .slide-track3').getAttribute('data-row');
    if (selectedSlides[row] === undefined) {
        img.style.transform = '';
        img.style.webkitTransform = '';
        img.style.mozTransform = '';
        img.style.msTransform = '';
        img.style.oTransform = '';
    }
}

function applyTransformOnHoverSlider() {
    const slideTracks = document.querySelectorAll('.slide-track, .slide-track2, .slide-track3'); // Select all slide tracks

    slideTracks.forEach(track => {
        const row = track.getAttribute('data-row');
        const slideImages = track.querySelectorAll('.slide img');

        slideImages.forEach(img => {
            img.addEventListener('mouseover', handleMouseOverSlider);
            img.addEventListener('mouseout', handleMouseOutSlider);
            img.addEventListener('click', () => selectSlide(img, row));
        });

        const selectedSlide = selectedSlides[row];
        if (selectedSlide) {
            slideImages.forEach(img => {
                if (img !== selectedSlide) {
                    img.removeEventListener('mouseover', handleMouseOverSlider);
                    img.removeEventListener('mouseout', handleMouseOutSlider);
                }
            });
        }
    });
}

applyTransformOnHoverSlider();
