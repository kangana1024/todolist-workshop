import React, { useContext, useEffect, useState } from "react"
import { FlatList, SafeAreaView, View } from "react-native"
import { Headline, IconButton } from "react-native-paper"
import TodoSetting from "../components/context"
import Header from "../components/header"
import { ListItem, TodoItem } from "../components/listitem"
import * as RootNavigation from "../components/navigation"

const Todo = () => {
	const [dataSource, setDataSource] = useState<TodoItem[]>([])
	const { version: {
		version,
		setVersion
	}, loading: {
		setLoading
	} } = useContext(TodoSetting)

	const fetchData = async () => {
		try {
			const res = await fetch("https://apidemo.showkhun.co/lists")
			const data = await res.json()
			if (data?.lists) {
				setDataSource([...data.lists])
			}
		} catch (error) {
			console.log('Error : ', error)
		}
	}

	const changeStatusData = async (id: number, status: 'a' | 'd') => {
		setLoading(true)
		const dat = {
			id,
			status
		}
		try {
			const res = await fetch("https://apidemo.showkhun.co/changestatus", {
				method: 'PATCH',
				body: JSON.stringify(dat),
				headers: {
					'Content-Type': 'application/json; charset=UTF-8'
				}
			})
			const data = await res.json()
			if (data?.id) {
				const version = (new Date()).getTime() || 0
				setVersion && setVersion(version)
			}
		} catch (error) {
			console.log('Error : ', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchData().then()
	}, [version])

	return (
		<>
			<Header />
			<View style={{
				position: 'relative',
				padding: 20,
				paddingBottom:10
			}}>
				<Headline>Todo Lists</Headline>
				<IconButton style={{
					position: 'absolute',
					right: 10,
					top: 20
				}} color="blue" hasTVPreferredFocus={undefined} tvParallaxProperties={undefined} icon="plus-circle" onPress={() => {
					RootNavigation.navigate('Create' as never, {} as never)
				}} />
			</View>



			<FlatList
				style={{
					padding: 10,
					marginBottom: 20
				}}
				data={dataSource}
				renderItem={({ item }) => {
					return (
						<ListItem item={item} onChangeStatus={changeStatusData} />
					)
				}}
				keyExtractor={item => item.id + ""}
			/>
		</>
	)
}

export default Todo