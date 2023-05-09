/*
    =================================================
    Author: Muhammad Ahmed (4zad)
    Copyright (c) 2021 Muhammad Ahmed (4zad).
    All rights reserved.
    =================================================
*/

// ensuring all page content has loaded (like 'useEffect' hook in React.js)
document.addEventListener('DOMContentLoaded', (event) => {
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

      if (scrollY >= currentSectionTop - (viewportHeight * 2) / 5) {
        // console.log(currentSectionTop - (viewportHeight * 2 / 5));
        current = section.getAttribute('id');
      }
    });
    // console.log(current); // 'current' should be holding the id of the section element that is on the viewport; this is a test to see if that is working

    navLinks.forEach((a) => {
      a.classList.remove('active');

      if (a.classList.contains(current)) {
        a.classList.add('active');
        // console.log('active class placement changed'); // test to see if the program enters the if statement, signaling that the 'current' id for the section shown in the viewport has a navigation link with a matching class name
      }
    });

    /* --- CODE FOR FLICKERING ANIMATION TRIGGER --- */
    sectionHeads.forEach((h1) => {
      h1.classList.remove('flicker');

      if (h1.classList.contains(`${current}_header`)) {
        h1.classList.add('flicker');
        // console.log('flicker class placement changed'); // test to see if the program enters the if statement, signaling that the 'current' id for the section shown in the viewport has a header inside it with a class name in the following pattern: `${current}_header`
      }
    });
  });

  /* --- CODE FOR CAROUSEL FUNCTIONALITY --- */
  document.querySelectorAll('.skills_carousel').forEach((carousel) => {
    const items = carousel.querySelectorAll('.skills_list > .skills_item');
    const buttonsHtml = Array.from(items, () => {
      return `<span class="skills_carouselButton"></span>`;
    });

    carousel.insertAdjacentHTML(
      'beforeend',
      `<div class="skills_carouselNav">
         ${buttonsHtml.join('')}
      </div>`
    );

    // Creating onClick event listeners for each button in each carousel
    const buttons = carousel.querySelectorAll('.skills_carouselNav > .skills_carouselButton');

    buttons.forEach((button, i) => {
      button.addEventListener('click', () => {
        const prevSelectedIndex = [...items].findIndex((item) => item.classList.contains('skills_item--selected'));
        const currentSelectedIndex = i;
        const forwardDirection = prevSelectedIndex < currentSelectedIndex ? true : false;
        console.log(prevSelectedIndex, currentSelectedIndex);

        // de-select all the items
        items.forEach((item) => item.classList.remove('skills_item--invisible'));
        items.forEach((item) => item.classList.remove('skills_item--before'));
        items.forEach((item) => item.classList.remove('skills_item--selected'));
        items.forEach((item) => item.classList.remove('skills_item--after'));
        buttons.forEach((button) => button.classList.remove('skills_carouselButton--selected'));
        // de-select all animation classes
        items.forEach((item) => item.classList.remove('beforeToInvisibleScroll'));
        items.forEach((item) => item.classList.remove('selectedToBeforeScroll'));
        items.forEach((item) => item.classList.remove('afterToSelectedScroll'));
        items.forEach((item) => item.classList.remove('invisibleToAfterScroll'));
        items.forEach((item) => item.classList.remove('invisibleToBeforeScroll'));
        items.forEach((item) => item.classList.remove('beforeToSelectedScroll'));
        items.forEach((item) => item.classList.remove('selectedToAfterScroll'));
        items.forEach((item) => item.classList.remove('afterToInvisibleScroll'));

        button.classList.add('skills_carouselButton--selected');

        if (forwardDirection && i - 2 >= 0) {
          const prevPrev = i - 2;

          items[prevPrev].classList.add('skills_item--invisible');
          items[prevPrev].classList.add('beforeToInvisibleScroll');
        }
        if (i - 1 >= 0) {
          const prev = i - 1;

          items[prev].classList.add('skills_item--before'); // for finite carousel
          items[prev].classList.add(forwardDirection ? 'selectedToBeforeScroll' : 'invisibleToBeforeScroll'); // for finite carousel
          // items[i - 1 >= 0 ? i - 1 : items.length - 1 - (items.length % (i - 1))].classList.add('skills_item--before'); // for infinite loop carousel
          // items[i - 2 >= 0 ? i - 2 : items.length - 1 - (items.length % (i - 2))].classList.add(forwardDirection ? 'selectedToBeforeScroll' : 'invisibleToBeforeScroll'); // for infinite loop carousel
        }
        if (i >= 0 && i < items.length) {
          const current = currentSelectedIndex;

          items[current].classList.add('skills_item--selected'); // for both finite and infinite carousels
          items[current].classList.add(forwardDirection ? 'afterToSelectedScroll' : 'beforeToSelectedScroll'); // for both finite and infinite carousels
        }
        if (i + 1 < items.length) {
          const next = i + 1;

          items[next].classList.add('skills_item--after'); // for finite carousel
          items[next].classList.add(forwardDirection ? 'invisibleToAfterScroll' : 'selectedToAfterScroll'); // for finite carousel
          // items[i + 1 < items.length ? i + 1 : items.length % (i + 1)].classList.add('skills_item--after'); // for infinite loop carousel
          // items[i + 2 < items.length ? i + 2 : items.length % (i + 2)].classList.add(forwardDirection ? 'invisibleToAfterScroll' : 'selectedToAfterScroll'); // for infinite loop carousel
        }
        if (!forwardDirection && i + 2 < items.length) {
          const nextNext = i + 2;

          items[nextNext].classList.add('skills_item--invisible');
          items[nextNext].classList.add('afterToInvisibleScroll');
        }

        /*
        // test to ensure no undefined items returned for infinite loop carousel
        console.log(items[i - 2 >= 0 ? i - 2 : items.length - 1 - (items.length % (i - 2))]);
        console.log(items[i - 1 >= 0 ? i - 1 : items.length - 1 - (items.length % (i - 1))]);
        console.log(items[i]);
        console.log(items[i + 1 < items.length ? i + 1 : items.length % (i + 1)]);
        console.log(items[i + 2 < items.length ? i + 2 : items.length % (i + 2)]);
        */
      });
    });

    // Selecting the first item in each carousel on page load
    const firstIndex = 0;

    buttons[firstIndex].classList.add('skills_carouselButton--selected');
    if (firstIndex - 1 >= 0) items[firstIndex - 1].classList.add('skills_item--before'); // for finite carousel
    items[firstIndex].classList.add('skills_item--selected');
    if (firstIndex + 1 < items.length) items[firstIndex + 1].classList.add('skills_item--after'); // for finite carousel
    // items[firstIndex - 1 >= 0 ? firstIndex - 1 : items.length - 1].classList.add('skills_item--before'); // for infinite loop carousel
    // items[firstIndex + 1 < items.length ? firstIndex + 1 : 0].classList.add('skills_item--after'); // for infinite loop carousel
  });

  /* --- CODE FOR INSERTING CURRENT COPYRIGHT YEAR --- */
  document.querySelector('#copyright_year').innerHTML = new Date().getFullYear();
});
