import React from 'react';
import { View, FlatList, Text } from 'react-native';
import DraftItem from './DraftItem'; // import the DraftItem component
import styles from '../styles/globalTheme'; // import your styles here

const DraftList = ({ drafts, navigation }) => {

	const scheduledDrafts = [];
	const unscheduledDrafts = [];

	drafts.forEach((draft) => {
		if (draft.isScheduled) {
			scheduledDrafts.push(draft);
		}
		else {
			unscheduledDrafts.push(draft);
		}
	});

	return (
		<View style={styles.backgroundContainer}>
			{scheduledDrafts.length > 0 && (
				<View style={styles.draftSection}>
					<Text style={styles.sectionHeader}>Scheduled Drafts</Text>
					<FlatList
						data={scheduledDrafts}
						renderItem={({ item }) => (
							<DraftItem
								item={item}
								navigation={navigation}
							/>
						)}
						keyExtractor={(item, index) => index.toString()}
					/>
				</View>
			)}

			{unscheduledDrafts.length > 0 && (
				<View style={styles.draftSection}>
					<Text style={styles.sectionHeader}>Unscheduled Drafts</Text>
					<FlatList
						data={unscheduledDrafts}
						renderItem={({ item }) => (
							<DraftItem
								item={item}
								navigation={navigation}
							/>
						)}
						keyExtractor={(item, index) => index.toString()}
					/>
				</View>
			)}

			{scheduledDrafts.length === 0 && unscheduledDrafts.length === 0 && (
				<Text style={styles.emptyText}>No drafts found</Text>
			)}
		</View>
	);
};


export default DraftList;
