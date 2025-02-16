import React from "react";
import { View, Button, Text , TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack"; 
import MapsScreen from "./maps";  
import Video360 from "./video360"; 



const Stack = createStackNavigator();

export default function SecondPage() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home Page" component={SecondPageScreen}  />
            <Stack.Screen name="Maps" component={MapsScreen} />
            <Stack.Screen name="Video-360" component={Video360}   options={{ gestureEnabled: false }} />
        </Stack.Navigator>
    );
}

function SecondPageScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View style={{ flexDirection: "row", width: "60%", /*justifyContent: "space-between"*/ }}>
                <TouchableOpacity 
                    style={{ padding: 10, backgroundColor: "#1E90FF", borderRadius: 5 , marginRight: 60}}
                    onPress={() => navigation.navigate("Maps")}
                >
                    <Text style={{ color: "white" }}>Maps</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{ padding: 10, backgroundColor: "#1E90FF", borderRadius: 5 , marginLeft: 60}}
                    onPress={() => navigation.navigate("Video-360")}
                >
                    <Text style={{ color: "white" }}>Video-360</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}