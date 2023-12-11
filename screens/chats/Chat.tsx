import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import ChatIllustration from '../../assets/ChatIllustration.png'
import doctorIcon from '../../assets/doctorIcon.png'
import brainstorm from '../../assets/brainstorm.png'
import { Header } from "../../components/Header";
import { Button } from "react-native-paper";

export function Chat(props: any) {

    const {navigation} = props;

    return (
      <View>
        <Header title={"Questions"}/>
          <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Questions?</Text>

              <View style={{ width: '100%', alignItems: 'center', marginTop: 16 }}>
          <Image
                    source={ChatIllustration}
                    style={{ width: '80%', height: 200 }}
                  />
              </View>

              <View style={{ marginTop: 16 }}>
                  <TouchableOpacity
                    style={{
                        backgroundColor: '#61E084',
                        padding: 16,
                        marginVertical: 10,
                        borderRadius: 8,
                        alignItems: 'center',
                        flexDirection: "row",
                        justifyContent: "center"
                    }}
                    onPress={() => navigation.navigate('AIChat')}
                  >
                      <Image
                        source={brainstorm}
                        style={{ width: 24, height: 24, marginRight: 10 }}
                      />
                      <Text style={{ fontWeight: 'bold', color: 'white' }}>Ask HealthMate</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                        backgroundColor: '#61E084',
                        padding: 16,
                        marginVertical: 10,
                        borderRadius: 8,
                        alignItems: 'center',
                      flexDirection: "row",
                      justifyContent: "center"
                    }}
                    onPress={() => navigation.navigate('ContactDoctor')}
                  >
                      <Image
                        source={doctorIcon}
                        style={{ width: 24, height: 24, marginRight: 10 }}
                      />
                      <Text style={{ fontWeight: 'bold', color: 'white' }}>Contact a Doctor</Text>
                  </TouchableOpacity>
              </View>
          </View>
        <View>
          <Button onPress={() => navigation.navigate("AuthType")}>Auth Flow</Button>
          <Button onPress={() => navigation.navigate("DoctorMain")}>Doctor QR</Button>
          <Button onPress={() => navigation.navigate("Birthday")}>Register Flow</Button>
        </View>
      </View>
    );
}
