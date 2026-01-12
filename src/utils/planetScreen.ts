export const planetScreen = { x: 0, y: 0 }

const emitter = new EventTarget()

export function setPlanetScreen(x: number, y: number) {
  planetScreen.x = x
  planetScreen.y = y
  emitter.dispatchEvent(new CustomEvent('planetScreenUpdate'))
}

export function usePlanetScreen() {
  // lightweight hook to subscribe to updates
  const { useEffect, useState } = require('react')
  const [pos, setPos] = useState({ x: planetScreen.x, y: planetScreen.y })

  useEffect(() => {
    const onUpdate = () => setPos({ x: planetScreen.x, y: planetScreen.y })
    emitter.addEventListener('planetScreenUpdate', onUpdate)
    return () => emitter.removeEventListener('planetScreenUpdate', onUpdate)
  }, [])

  return pos
}