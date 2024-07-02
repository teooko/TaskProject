import {ScrollView} from 'react-native';
import Page from '../Page';
import React, {useEffect} from 'react';
import Calendar from './Calendar';
import DailyActivity from './DailyActivity';
import {fetchDailyTasks, fetchTasks} from "../../store/tasksSlice";
import {fetchWeeklyTasks, insertDays} from "../../store/slice";
import store from "../../store";
import {useDispatch, useSelector} from "react-redux";
import {useStartup} from "../../hooks/useStartup";

const Home = ({navigation}) => {
    return (
        <Page navigation={navigation}>
            <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                overScrollMode={'never'}
                showsVerticalScrollIndicator={false}>
                <Calendar />
                <DailyActivity navigation={navigation} />
            </ScrollView>
        </Page>
    );
};

export default Home;
