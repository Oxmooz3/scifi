export const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - 100

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

export const getCurrentSection = (): string | null => {
  const sections = ['home', 'about', 'services', 'portfolio', 'contact']
  const scrollPosition = window.scrollY + window.innerHeight / 2

  for (let i = sections.length - 1; i >= 0; i--) {
    const element = document.getElementById(sections[i])
    if (element && element.offsetTop <= scrollPosition) {
      return sections[i]
    }
  }

  return 'home'
}
