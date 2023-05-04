/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import { View, FlatList, Text } from 'react-native';
import DraftItem from './DraftItem';
import ScheduledDraftItem from './ScheduledDraftItem';
import styles from '../styles/globalTheme';

function DraftList({ drafts, navigation }) {
  const scheduledDrafts = [];
  const unscheduledDrafts = [];

  drafts.forEach((draft) => {
    if (draft.isScheduled) {
      scheduledDrafts.push(draft);
    } else {
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
            <ScheduledDraftItem
              item={item}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item.draftId.toString()}
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
          keyExtractor={(item) => item.draftId.toString()}
        />
      </View>
      )}

      {scheduledDrafts.length === 0 && unscheduledDrafts.length === 0 && (
      <Text style={styles.emptyText}>No drafts found</Text>
      )}
    </View>
  );
}

export default DraftList;
