import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Card, IconButton } from "react-native-paper";
export interface TodoItem {
	id: number
	todo: string
	detail: string
	status: 'a' | 'p' | 'd'
}

interface ListItemProps {
	item: TodoItem,
	onChangeStatus: (id: number, status: 'a' | 'd') => Promise<void>
}
const style = StyleSheet.create({
	IconButton: {
		width: 24,
		padding: 0
	}
})
export const ListItem: React.FC<ListItemProps> = ({ item, onChangeStatus }) => {
	if (item.status === 'd') {
		return null
	}
	return (<Card style={{
		margin: 5,
		backgroundColor: item.status === 'a' ? '#ECFDF5' : 'white'
	}}>
		<Card.Title
			title={
				item.status === 'a' ? <Text style={{
					textDecorationLine: 'line-through'
				}}>{item.todo}</Text> : item.todo
			}
			subtitle={item.status === 'a' ? <Text style={{
				textDecorationLine: 'line-through'
			}}>{item.detail}</Text> : item.detail}
			right={(props) => (<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
				{item.status === 'p' ? <IconButton style={style.IconButton} color="green" hasTVPreferredFocus={undefined} tvParallaxProperties={undefined} {...props} icon="check-circle" onPress={() => {
					onChangeStatus(item.id, 'a')
				}} /> : null}
				<IconButton style={style.IconButton} color="red" hasTVPreferredFocus={undefined} tvParallaxProperties={undefined} {...props} icon="minus-circle" onPress={() => { onChangeStatus(item.id, 'd') }} />
			</View>)} />
	</Card>)
}
