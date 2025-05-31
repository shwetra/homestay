import { useEffect, useCallback } from 'react'
import { createGlobalState } from 'react-hooks-global-state'

const initialState = { isDarkmode: false }
const { useGlobalState } = createGlobalState(initialState)

export const useThemeMode = () => {
	const [isDarkMode, setIsDarkMode] = useGlobalState('isDarkmode')

	const toDark = useCallback(() => {
		setIsDarkMode(true)
		const root = document.querySelector('html')
		if (!root) return
		!root.classList.contains('dark') && root.classList.add('dark')
		localStorage.theme = 'dark'
	},[setIsDarkMode]) 

	const toLight = useCallback(() => {
		setIsDarkMode(false)
		const root = document.querySelector('html')
		if (!root) return
		root.classList.remove('dark')
		localStorage.theme = 'light'
	  }, [setIsDarkMode])

	useEffect(() => {
		// Enbale this if you want use the dark-mode for default mode.
		// if (!localStorage.theme) {
		//   localStorage.theme = "dark";
		// }
		//
		if (localStorage.theme === 'dark') {
			toDark()
		} else {
			toLight()
		}
	}, [toDark,toLight])

	function _toogleDarkMode() {
		if (localStorage.theme === 'light') {
			toDark()
		} else {
			toLight()
		}
	}

	return {
		isDarkMode,
		toDark,
		toLight,
		_toogleDarkMode,
	}
}
