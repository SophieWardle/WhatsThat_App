import React from 'react';
import { View, FlatList, Text } from 'react-native';
import DraftItem from './DraftItem'; // import the DraftItem component
import styles from '../styles/globalTheme'; // import your styles here

const DraftList = ({ drafts, navigation }) => {
	return (
		<View style={styles.backgroundContainer}>
			<FlatList
				data={drafts}
				renderItem={({ item }) => (
					<DraftItem
						item={item}
						navigation={navigation}
					/>
				)}
				keyExtractor={(item, index) => index.toString()}
			/>
		</View>
	);
};

export default DraftList;
