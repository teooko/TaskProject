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
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-indexed
        const day = String(currentDate.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        //store.dispatch(fetchDailyTasks(formattedDate));
        //store.dispatch(insertDays());
        dispatch(fetchTasks(bearerToken));
        // store.dispatch(fetchWeeklyTasks(0));
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
