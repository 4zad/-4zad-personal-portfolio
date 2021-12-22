/*
    =================================================
    Author: Muhammad Ahmed (4zad)
    Copyright (c) 2021 Muhammad Ahmed (4zad).
    All rights reserved.
    =================================================
*/

/* --- CODE FOR NAVIGATION BAR INDICATOR TRIGGER OF WHICH SECTION YOU ARE VIEWING --- */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav_bar > .nav_links > ul li > a');
// console.log(sections); // test to see if `document.querySelectorAll('section')` was successful
// console.log(navLinks); // test to see if `document.querySelectorAll('.nav_bar > .nav_links > ul li a')` was successful

const sectionHeads = document.querySelectorAll('section > h1');
// console.log(sectionHeads); // test to see if `document.querySelectorAll('section > h1')` was successful

window.addEventListener('scroll', () => {
    let current = '';
    // console.log(scrollY); // 'scrollY' and 'pageYOffset' display the position of your scroll from the top of the webpage, or in otherwords how much you have scrolled
    // 'pageYOffset' is an alias for 'scrollY'

    sections.forEach((section) => {
        const currentSectionTop = section.offsetTop;
        // console.log(currentSectionTop); // test to see if 'section.offsetTop' is returning the correct values of how far the beginning/top of each section is from the beginning/top of the webpage
        const currentSectionHeight = section.clientHeight;
        // console.log(currentSectionHeight); // test to see if the right height is being measured by 'section.clientHeight'
        const viewportHeight = window.innerHeight;
        // console.log(viewportHeight); // test to see if the 'viewportHeight' variable has successfully gotten the inner height value (viewport height value) from 'window.innerHeight'

        if (scrollY >= (currentSectionTop - (viewportHeight * 2 / 5))) {
            // console.log(currentSectionTop - (viewportHeight * 2 / 5));
            current = section.getAttribute('id');
        }
    })
    // console.log(current); // 'current' should be holding the id of the section element that is on the viewport; this is a test to see if that is working

    navLinks.forEach((a) => {
        a.classList.remove('active');

        if (a.classList.contains(current)) {
            a.classList.add('active');
            // console.log('active class placement changed'); // test to see if the program enters the if statement, signaling that the 'current' id for the section shown in the viewport has a navigation link with a matching class name
        }
    })

    /* --- CODE FOR FLICKERING ANIMATION TRIGGER --- */
    sectionHeads.forEach((h1) => {
        h1.classList.remove('flicker');

        if (h1.classList.contains(`${current}_header`)) {
            h1.classList.add('flicker');
            // console.log('flicker class placement changed'); // test to see if the program enters the if statement, signaling that the 'current' id for the section shown in the viewport has a header inside it with a class name in the following pattern: `${current}_header`
        }
    })
});






