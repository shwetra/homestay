// 'use client'
// import 'client-only'

// import { useEffect } from 'react'

// /**
//  * Hook that alerts clicks outside of the passed ref
//  */
// function useOutsideAlerter(
// 	ref: React.RefObject<HTMLDivElement>,
// 	handleClickOutsideCallback: () => void,
// ) {
// 	useEffect(() => {
// 		/**
// 		 * Alert if clicked on outside of element
// 		 */
// 		function handleClickOutside(event: MouseEvent) {
// 			if (ref.current && !ref.current.contains(event.target as Node)) {
// 				handleClickOutsideCallback()
// 			}
// 		}
// 		// Bind the event listener
// 		document.addEventListener('mousedown', handleClickOutside)
// 		return () => {
// 			// Unbind the event listener on clean up
// 			document.removeEventListener('mousedown', handleClickOutside)
// 		}
// 	}, [ref]) // eslint-disable-line react-hooks/exhaustive-deps
// }

// export default useOutsideAlerter



'use client'
import 'client-only'

import { useEffect } from 'react'

/**
 * Hook that triggers a callback when clicking outside of the passed ref
 */
function useOutsideAlerter<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  handleClickOutsideCallback: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleClickOutsideCallback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, handleClickOutsideCallback])
}

export default useOutsideAlerter
