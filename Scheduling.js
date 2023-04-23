import { useState } from "react";
import { Modal } from "react-native";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import DatePicker from "react-native-modern-datepicker";
import { getToday, getFormatedDate } from "react-native-modern-datepicker";
import TimePicker from 'react-time-picker';
export default function Sheduling() {

	const today = new Date();

	const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'YYYY/MM/DD')
	const [open, setOpen] = useState(false);//open/closes modal
	const [date, setDate] = useState(false);//date var
	const [time, setTime] = useState('00:00');//time var

	function handleOnPress() {
		setOpen(!open);
	}

	function handleDateChange(propDate) {
		setDate(propDate)
		console.log(propDate);
	}

	function handleTimeChange(propTime) {
		setTime(propTime)
		console.log(propTime);
	}

	return (
		<View style={styles.container}>

			<TouchableOpacity onPress={handleOnPress}>
				<Text> Schedule Now </Text>
			</TouchableOpacity>

			<Modal
				animationType="slide"
				transparent={true}
				visible={open}
			>
				<View style={styles.centered}>
					<View style={styles.modal}>

						<DatePicker
							mode='calendar'
							minimumDate={startDate}
							selected={date}
							onDateChange={handleDateChange}
						/>

						<TimePicker
							onChange={handleTimeChange}
							value={time}
							disableClock={true}
							clearIcon={null}
						/>

						<TouchableOpacity onPress={handleOnPress}>
							<Text> Close </Text>
						</TouchableOpacity>
					</View>

				</View>

			</Modal>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modal: {
		margin: 20,
		borderRadius: 20,
		width: '90%',
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
})