const dropdownBtns = document.querySelectorAll(".dropdown-btn");
const dropdowns = document.querySelectorAll(".dropdown");
const hamburgerBtn = document.getElementById("hamburger");
const navMenu = document.querySelector(".menu");
const links = document.querySelectorAll(".dropdown a");
const BackToTopButton = document.querySelector("#back-to-top");

function setAriaExpandedFalse() {
  dropdownBtns.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
}

function closeDropdownMenus() {
  dropdowns.forEach((drop) => {
    drop.classList.remove("active");
    drop.addEventListener("click", (e) => e.stopPropagation());
  });
}

function toggleHamburger() {
  navMenu.classList.toggle("show");
}

dropdownBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const dropdownIndex = e.currentTarget.dataset.dropdown;
    const dropdownElement = document.getElementById(dropdownIndex);
  
    dropdownElement.classList.toggle("active");
    dropdowns.forEach((drop) => {
      if (drop.id !== dropdownIndex) {
        drop.classList.remove("active");
        drop.parentElement.querySelector('i').classList.replace('fa-angle-up', 'fa-angle-down');
      }
    });
    e.stopPropagation();
    btn.setAttribute(
      "aria-expanded",
      btn.getAttribute("aria-expanded") === "false" ? "true" : "false"
    );
  });
});

// close dropdown menus when the dropdown links are clicked
links.forEach((link) =>
  link.addEventListener("click", () => {
    closeDropdownMenus();
    setAriaExpandedFalse();
    toggleHamburger();
  })
);

// close dropdown menus when you click on the document body
document.documentElement.addEventListener("click", () => {
  closeDropdownMenus();  
  ResetArrowIcon();
  setAriaExpandedFalse();
});

// close dropdowns when the escape key is pressed
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeDropdownMenus();
    ResetArrowIcon();
    setAriaExpandedFalse();
  }
});

hamburgerBtn.addEventListener("click", toggleHamburger);

function ToggleArrowIcon() {
  const buttons = document.querySelectorAll('.dropdown-btn');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const arrowIcon = button.querySelector('i');
      arrowIcon.classList.toggle('fa-angle-down');
      arrowIcon.classList.toggle('fa-angle-up');
    });
  });
}
ToggleArrowIcon();

function ResetArrowIcon() {
  const buttons = document.querySelectorAll('.dropdown-btn');
  buttons.forEach(button => {
      const arrowIcon = button.querySelector('i');
      if (arrowIcon.classList.contains('fa-angle-up')) {
        arrowIcon.classList.replace('fa-angle-up', 'fa-angle-down');
      }
  });
}

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    BackToTopButton.style.display = "block";
    //BackToTopButton.style.transition = "0.3s ease-in-out";
  } else {
    BackToTopButton.style.display = "none";
    //BackToTopButton.style.transition = "0.3s ease-in-out";
  }
}

// Attach the function to your button or link element
BackToTopButton.addEventListener("click", topFunction);
// When the user clicks on the button, scroll to the top of the document
function topFunction(event) {
    event.preventDefault();
    var targetPosition = 0;
    var start = window.pageYOffset;
    var distance = targetPosition - start;
    var duration = Math.min(1000, Math.abs(distance));
  
    var startTime = null;
    function scrollAnimation(currentTime) {
      if (startTime === null) startTime = currentTime;
      var elapsed = currentTime - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var easeProgress = easeInOutCubic(progress);
      var scrollY = start + distance * easeProgress;
  
      document.documentElement.scrollTop = scrollY;
      document.body.scrollTop = scrollY;
  
      if (elapsed < duration) {
        requestAnimationFrame(scrollAnimation);
      }
    }  
    requestAnimationFrame(scrollAnimation);
}  
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if(slides.length > 0){    
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 5000); // Change image every 2 seconds
    }
}

function scrollToTarget(event) {
    event.preventDefault();
    var targetId = event.target.getAttribute("href");
    var targetElement = document.querySelector(targetId);
    var offset = -100; // Adjust the offset value as needed  
    if (targetElement) {
        var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
            top: targetPosition + offset,
            behavior: "smooth"
        });
    }
  }

var clinicInfoLinks = document.querySelectorAll(".clinic-info-hyperlink-btn");
if (clinicInfoLinks) {
  clinicInfoLinks.forEach(function(link) {
      link.addEventListener("click", scrollToTarget);
  })
}

window.addEventListener('scroll', function() {
  var container = document.querySelector('#nav-menu');
  if (window.scrollY > 0) {
    container.classList.add('scroll-shadow');
  } else {
    container.classList.remove('scroll-shadow');
  }
});

// function KeepAspectRatio() {
//   // Get all elements with class .iframe-calendar or .iframe-scheduling
//   var calendarElements = document.querySelectorAll('.iframe-calendar');
//   var schedulingElements = document.querySelectorAll('.iframe-scheduling');

//   // Calculate and set the new height for each .iframe-calendar element
//   if (calendarElements) {
//     calendarElements.forEach(function (calendarElement) {
//       var width = calendarElement.offsetWidth;
//       var height = calendarElement.offsetWidth;
//       if(width >= height){var newHeight = width * 0.8;}
//       else{var newHeight = width * 1.2;}
//       calendarElement.style.height = newHeight + 'px';
//     });
//   }

//   // Calculate and set the new height for each .iframe-scheduling element
//   if (schedulingElements) {
//     schedulingElements.forEach(function (schedulingElement) {
//       var width = schedulingElement.offsetWidth;
//       var newHeight = width * 0.6;
//       schedulingElement.style.height = newHeight + 'px';
//     });
//   }
// }

// // Call the KeepAspectRatio function when the page finishes loading
// window.addEventListener('load', KeepAspectRatio);
// // Call the KeepAspectRatio function when a resize event occurs
// window.addEventListener('resize', KeepAspectRatio);


var accordionElements = document.getElementsByClassName("accordion");
for (var i = 0; i < accordionElements.length; i++) {
  accordionElements[i].addEventListener("click", function () {
    this.classList.toggle("accordion-active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

function UpdateMonthNumber() {
  var monthNumberElement = document.querySelector('#current-month-number');
  
  if (monthNumberElement) {
    var currentDate = new Date();
    var gmt8MonthNumber = currentDate.getUTCMonth() + 1; // Adding 1 because getUTCMonth() returns a zero-based index
    
    monthNumberElement.textContent = gmt8MonthNumber;
  }
}
// Call the function when the page has finished loading
window.addEventListener('load', function() {
  UpdateMonthNumber();
});




function redirectToIndex() {
  var currentURL = window.location.href; // Get the current URL
  var subpage = currentURL.split('/').pop(); // Get the last part of the URL
  var indexURL = currentURL.replace(subpage, 'index.html'); // Replace the last part with 'index.html'

  // Check if the subpage exists
  fetch(subpage)
    .then(function(response) {
      if (response.status !== 200) { // If the subpage does not exist
        window.location.href = indexURL; // Redirect to index.html
      }
    })
    .catch(function(error) {
      console.log('Error:', error);
    });
}

// Call the function when the page loads
window.onload = redirectToIndex;
