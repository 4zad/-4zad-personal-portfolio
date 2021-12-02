/*
    =================================================
    Author: Muhammad Ahmed (4zad)
    Copyright (c) 2021 Muhammad Ahmed (4zad).
    All rights reserved.
    =================================================
*/

// const toggleMenu = (status) =>
// {

// }





/* --- CODE FOR NAVIGATION BAR INDICATOR OF WHICH SECTION YOU ARE VIEWING --- */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav_bar > .nav_links > ul li > a');
const sectionHeads = document.querySelectorAll('section > h1');
// console.log(sections); // test to see if `document.querySelectorAll('section')` was successful
// console.log(navLinks); // test to see if `document.querySelectorAll('.nav_bar > .nav_links > ul li a')` was successful
// console.log(sectionHeads); // test to see if `document.querySelectorAll('section > h1')` was successful

window.addEventListener('scroll', () => {
    let current = '';
    // console.log(scrollY); // 'scrollY' and 'pageYOffset' display the position of your scroll from the top of the webpage, or in otherwords how much you have scrolled
    // 'pageYOffset' is an alias for 'scrollY'

    sections.forEach((section) => {
        const currentSectionTop = section.offsetTop;
        // console.log(eachSectionTop); // test to see if 'section.offsetTop' is returning the correct values of how far the beginning/top of each section is from the beginning/top of the webpage
        const currentSectionHeight = section.clientHeight;

        if (scrollY >= (currentSectionTop - (currentSectionHeight * 2 / 5))) {
            current = section.getAttribute('id');
        }
    })
    // console.log(current); // 'current' should be holding the id of the section element that is on the viewport; this is a test to see if that is working

    navLinks.forEach((a) => {
        a.classList.remove('active');

        if (a.classList.contains(current)) {
            a.classList.add('active');
            // console.log('active class placement changed'); // test to see if the program enters the if statement, signaling that the 'current' id fo the section shown in the viewport has a link with a matching class name
        }
    })

    sectionHeads.forEach((h1) => {
        h1.classList.remove('flicker');

        if (h1.classList.contains(`${current}_header`)) {
            h1.classList.add('flicker');
        }
    })
});




