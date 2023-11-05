import {Appbar} from 'react-native-paper';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

export const Header = (props: any) => {
    const navigation = useNavigation();

    const [active, setActive] = useState(false);

    const _handleSearch = () => {
        props.navigation.toggleDrawer();
    };

    return (
        <Appbar.Header
            style={{backgroundColor: 'rgb(46,45,134)'}}
            options={{centerTitle: true}}>

            {props.action === 'back' && (
                <Appbar.BackAction
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
            )}
            <Appbar.Content
                style={{alignItems: 'center'}}
                title={props.title}
            />
        </Appbar.Header>
    );
};
