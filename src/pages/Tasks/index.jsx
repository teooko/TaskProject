import Page from '../Page';
import {ScrollView} from 'react-native';
import TaskList from './TaskList';
import TaskListForm from './TaskListForm';
import {StyleSheet, Text} from 'react-native';
import {icons} from '../../assets/Icons';
import {SvgXml} from 'react-native-svg';
import * as React from 'react';
const Tasks = ({navigation}) => {
    return (
        <Page navigation={navigation}>
            <Text style={styles.title}>
                <SvgXml
                    xml={icons.lightBulb}
                    width={'20'}
                    height={'20'}
                    fill={'white'}
                />
                Manage Activities
            </Text>
            <ScrollView
                style={styles.tasksWrapper}
                showsVerticalScrollIndicator={false}
                overScrollMode={'never'}
                automaticallyAdjustContentInsets={true}>
                <TaskListForm />
                <TaskList />
            </ScrollView>
        </Page>
    );
};

const styles = StyleSheet.create({
    title: {
        height: 35,
        color: 'white',
        marginLeft: 20,
        fontSize: 20,
    },
    tasksWrapper: {
        overflow: 'hidden',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});

export default Tasks;
