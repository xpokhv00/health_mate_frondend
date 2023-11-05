import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import user from "../../api/user.service";
import { Header } from "../../components/Header";

// Define a type for your state object
type MessageType = {
    message: string;
    type: string;
};

export const AIChat: React.FC = (props: any) => {

    const {navigation} = props;

    const [inputMessage, setInputMessage] = useState<string>(''); // Store the current input message as a string

    const [allMessages, setAllMessages] = useState<MessageType[]>([
        { message: "Hi, I am MediSearch AI, here to help you with medical advice, track your health, and answer your health questions.", type: 'ai' }
    ]); // Store all messages as MessageType[]

    const handleInputChange = (text: string) => {
        setInputMessage(text); // Update the input message
    };

    useEffect(() => {
        console.log(allMessages);
    }, [allMessages]);

    const handleSubmit = () => {

        // Add the new message to allMessages as a MessageType object
        setAllMessages([...allMessages, { message: inputMessage, type: 'human' }]);

        // Clear the input after submitting
        setInputMessage('');

        user.message({message : inputMessage})
          .then((response) => {
              setAllMessages(prevMessages => [...prevMessages,{ message: response.answer, type: 'ai' }]);
          })
          .catch((error) => {
              console.log(error)
          })
    };

    return (
      <View style={{ flex: 1 }}>
          <Header title={"Chat AI"}/>

          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
              {allMessages.map((message, index) => (
                <View key={index} style={{ alignItems: message.type === "ai" ? "flex-start" : "flex-end" }}>
                    <View style={{ backgroundColor: message.type === "ai" ? "#61E084" : "#F6F6F6", borderRadius: 10, padding: 10, margin: 5 }}>
                        <Text style={{ color: message.type === "ai" ? "white" : "black" }}>{message.message}</Text>
                    </View>
                </View>
              ))}
          </ScrollView>

          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 10 }}>
              <TextInput
                style={{ flex: 1, borderColor: 'gray', borderWidth: 1, borderRadius: 10, padding: 10, marginRight: 10 }}
                placeholder="Your message..."
                value={inputMessage}
                onChangeText={text => handleInputChange(text)}
              />
              <TouchableOpacity
                style={{ padding: 10, backgroundColor: '#61E084', borderRadius: 10 }}
                onPress={handleSubmit}
              >
                  <Text style={{ color: 'white' }}>Send</Text>
              </TouchableOpacity>
          </View>
      </View>
    );
}
