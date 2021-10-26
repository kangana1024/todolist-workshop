import React, { useContext } from "react"
import { Button, Headline } from "react-native-paper"
import Header from "../components/header"
import { navigationRef } from "../components/navigation"
import { FormBuilder } from 'react-native-paper-form-builder'
import { useForm } from "react-hook-form"
import { Alert, ScrollView } from "react-native"
import TodoSetting from "../components/context"
interface TodoReq {
	todo: string
	detail: string
}
const CreateTodo = () => {
	const { control, setFocus, handleSubmit } = useForm({
		defaultValues: {
			todo: '',
			detail: '',
		},
		mode: 'onChange',
	})

	const { version: {
		setVersion
	}, loading: {
		setLoading
	} } = useContext(TodoSetting)

	const fetchData = async (val: TodoReq) => {
		setLoading(true)
		try {
			const res = await fetch("https://apidemo.showkhun.co/create", {
				method: 'POST',
				body: JSON.stringify(val),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const data = await res.json()
			if (data?.id) {
				console.log(data.id)
				const version = (new Date()).getTime() || 0
				setVersion && setVersion(version)
				navigationRef.goBack()
			}
		} catch (error) {
			console.log('Error : ', error)
		} finally {
			setLoading(false)
		}
	}
	return (
		<>
			<Header isBack onPress={() => {
				navigationRef.goBack()
			}} title="Create Todo List" />
			<ScrollView style={{ paddingHorizontal: 15, paddingTop: 10 }}>
				<Headline style={{
					marginBottom: 10
				}}>Create Todo Lists</Headline>

				<FormBuilder
					control={control}
					setFocus={setFocus}
					formConfigArray={[
						{
							type: 'text',
							name: 'todo',

							rules: {
								required: {
									value: true,
									message: 'Todo is required',
								},
							},
							textInputProps: {
								label: 'Todo',
							},
						},
						{
							type: 'text',
							name: 'detail',
							rules: {
								required: {
									value: true,
									message: 'Detail is required',
								},
							},
							textInputProps: {
								label: 'Detail',
							},
						},
					]}
				/>
				<Button
					mode={'contained'}
					onPress={handleSubmit((data: TodoReq) => {

						fetchData(data).then()
					})}>
					Submit
				</Button>
			</ScrollView>
		</>
	)
}

export default CreateTodo