import { Appbar } from "react-native-paper"
import React from "react"
// import { navigationRef } from "./navigation"
interface HeaderProps {
	onPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined
	title?: string
	subTitle?: string
	isBack?: boolean
}
const Header: React.FC<HeaderProps> = ({
	onPress,
	title = "Todolist",
	subTitle = "",
	isBack = false
}) => {
	return (
		<Appbar.Header>
			{isBack ? <Appbar.BackAction onPress={onPress} /> : null}
			<Appbar.Content title={title} subtitle={subTitle} />
		</Appbar.Header>)
}

export default Header