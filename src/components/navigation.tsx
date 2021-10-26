import { createNavigationContainerRef, StackActions } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef()

export function navigate(name: never, params: never) {
	if (navigationRef.isReady()) {
		navigationRef.current?.navigate(name,params);
	}
}

export function replace(name: string, params?: object) {
	if (navigationRef.isReady()) {
		navigationRef.current?.dispatch(
			StackActions.replace(name, {
				...params
			})
		)
	}
}