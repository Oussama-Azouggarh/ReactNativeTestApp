import { StyleSheet , View , Image} from "react-native";



export default function homePage(){
    return(
        <View style = {style.container}>
            <View>
                <Image source = {require("../assets/images/welcomeMAR.png")} style = {style.image} />

            </View>

        </View>
    );
}

const style = StyleSheet.create({
    container : {
        flex : 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",

    },
    image: {
        width: 300,
        height: 150, 
        resizeMode : "cover" 

    }

});