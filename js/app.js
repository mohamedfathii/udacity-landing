/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */
/**
 * Define Global Variables
 *
 */
const fragment = document.createDocumentFragment()
const sections = document.querySelectorAll('section')
const scrollButton = document.getElementById('button')
const navbarList = document.getElementById('navbar__list')

/**
 * End Global Variables
 * Start Helper Functions
 *
 */
menuItem = (id, name) => {
  return `<a class ="menu__link" data-id="${id}">${name}</a>`
}

isInsideTheViewPort = (item) => {
  return item.getBoundingClientRect().top >= 0
}
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
navigationMenu = () => {
  for (section of sections) {
    const addedMenuItem = document.createElement('li')
    const sectionId = section.getAttribute('id')
    const sectionName = section.getAttribute('data-nav')
    addedMenuItem.innerHTML = menuItem(sectionId, sectionName)
    fragment.appendChild(addedMenuItem)
  }
  navbarList.appendChild(fragment)
}

// Add class 'active' to section when near top of viewport
toggleActiveClass = () => {
  for (const section of sections) {
    isInsideTheViewPort(section)
      ? section.classList.add('active')
      : section.classList.remove('active')
  }
}
// Scroll to anchor ID using scrollTO event
scrollTOElement = (event) => {
  if (event.target.nodeName.toLowerCase() === 'a') {
    const selectedItem = document.getElementById(
      event.target.getAttribute('data-id')
    )
    selectedItem.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    })
  }
}
toggleScrollTopBtn = () => {
  window.pageYOffset > navbarList.offsetTop
    ? scrollButton.classList.add('show')
    : scrollButton.classList.remove('show')
}
scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
navigationMenu()
// Scroll to section on link click
navbarList.addEventListener('click', (event) => {
  scrollTOElement(event)
})
scrollButton.addEventListener('click', () => {
  scrollToTop()
})
// Set sections as active
document.addEventListener('scroll', () => {
  toggleActiveClass()
  toggleScrollTopBtn()
})
