import {ScrollView} from 'react-native';
import Page from '../Page';
import React, {useEffect} from 'react';
import Calendar from './Calendar';
import DailyActivity from './DailyActivity';
import {fetchDailyTasks, fetchTasks} from "../../store/tasksSlice";
import {fetchWeeklyTasks, insertDays} from "../../store/slice";
import store from "../../store";
import {useDispatch, useSelector} from "react-redux";

const Home = ({navigation}) => {
    const dispatch = useDispatch();
    const {bearerToken} = useSelector(state => state.account);
    useEffect(() => {
        
    }, []);
    
    return (
        <Page navigation={navigation}>
            <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                overScrollMode={'never'}
                showsVerticalScrollIndicator={false}>
                <Calendar />
                <DailyActivity />
            </ScrollView>
        </Page>
    );
};

export default Home;
