'use strict';
import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, TouchableOpacity, Image, Text, Vibration } from 'react-native';
import Camera from 'react-native-camera';
import { Actions } from 'react-native-router-flux';

const IconLeft = (
    <TouchableOpacity
        activeOpacity={0.8}
        style={{width: 50,height: 50, backgroundColor: '#ff0000'}}
        onPress={() => {
                Actions.pop();

        }}>
        <View >
        </View>

    </TouchableOpacity>
);
let isFirstIn = true;
export default class ShowScanScreen extends Component {
    initData() {
        isFirstIn = true;
    }

    constructor(props) {
        super(props);
        this.initData();

        this.camera = null;

        this.state = {
            camera: {
                aspect: Camera.constants.Aspect.sretch,
                captureTarget: Camera.constants.CaptureTarget.cameraRoll,
                type: Camera.constants.Type.back,
                orientation: Camera.constants.Orientation.auto,
                flashMode: Camera.constants.FlashMode.auto,
            },
            isRecording: false,
        };

        this.takePicture = this.takePicture.bind(this);
        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
        this.switchType = this.switchType.bind(this);
        this.switchFlash = this.switchFlash.bind(this);
    }

    takePicture() {
        if (this.camera) {
            this.camera.capture()
                .then((data) => console.log(data))
                .catch(err => console.error(err));
        }
    }

    startRecording() {
        if (this.camera) {
            this.camera.capture({ mode: Camera.constants.CaptureMode.video })
                .then((data) => console.log(data))
                .catch(err => console.error(err));
            this.setState({
                isRecording: true
            });
        }
    }

    stopRecording() {
        if (this.camera) {
            this.camera.stopCapture();
            this.setState({
                isRecording: false
            });
        }
    }

    switchType() {
        let newType;
        const { back, front } = Camera.constants.Type;

        if (this.state.camera.type === back) {
            newType = front;
        } else if (this.state.camera.type === front) {
            newType = back;
        }

        this.setState({
            camera: {
                ...this.state.camera,
                type: newType,
            },
        });
    }

    get typeIcon() {
        let icon;
        const { back, front } = Camera.constants.Type;

        if (this.state.camera.type === back) {
            icon = require('../assets/ic_camera_rear_white.png');
        } else if (this.state.camera.type === front) {
            icon = require('../assets/ic_camera_front_white.png');
        }

        return icon;
    }

    switchFlash() {
        let newFlashMode;
        const { auto, on, off } = Camera.constants.FlashMode;

        if (this.state.camera.flashMode === auto) {
            newFlashMode = on;
        } else if (this.state.camera.flashMode === on) {
            newFlashMode = off;
        } else if (this.state.camera.flashMode === off) {
            newFlashMode = auto;
        }

        this.setState({
            camera: {
                ...this.state.camera,
                flashMode: newFlashMode,
            },
        });
    }

    get flashIcon() {
        let icon;
        const { auto, on, off } = Camera.constants.FlashMode;

        if (this.state.camera.flashMode === auto) {
            icon = require('../assets/ic_flash_auto_white.png');
        } else if (this.state.camera.flashMode === on) {
            icon = require('../assets/ic_flash_on_white.png');
        } else if (this.state.camera.flashMode === off) {
            icon = require('../assets/ic_flash_off_white.png');
        }

        return icon;
    }

    onBarCodeRead(e) {
        console.log(e.data);
        if (isFirstIn) {
            // alert(e.data);
            Vibration.vibrate();
            isFirstIn = false;
            // console.log(StringUtil.object2Json(this.props));
            Actions.pop({ refresh: ({ 'mScanedQRCode': e.data }) });
        } else {

        }

    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    animated
                    hidden
                />
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={this.state.camera.aspect}
                    captureTarget={this.state.camera.captureTarget}
                    type={this.state.camera.type}
                    flashMode={this.state.camera.flashMode}
                    defaultTouchToFocus
                    mirrorImage={false}
                    // onBarCodeRead={(data) => {
                    //     console.log(data);
                    //     alert(data);
                    // }}
                    onBarCodeRead={this.onBarCodeRead}
                >
                    <Text style={styles.centerBox}/>
                    {/*<Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>*/}
                </Camera>

                <View style={[styles.overlay, styles.topOverlay]}>
                    {IconLeft}

                    {/*<TouchableOpacity*/}
                    {/*style={styles.typeButton}*/}
                    {/*onPress={() => {*/}
                    {/*}}*/}
                    {/*// onPress={this.switchType}*/}
                    {/*>*/}
                    {/*<Image*/}
                    {/*source={this.typeIcon}*/}
                    {/*/>*/}
                    {/*</TouchableOpacity>*/}
                    <TouchableOpacity
                        style={styles.flashButton}
                        onPress={
                            () => {
                                    this.switchFlash();
                            }
                        }
                    >
                        <Image
                            source={this.flashIcon}
                        />
                    </TouchableOpacity>
                </View>
                {/*<View style={[styles.overlay, styles.bottomOverlay]}>*/}
                {/*{*/}
                {/*!this.state.isRecording*/}
                {/*&&*/}
                {/*<TouchableOpacity*/}
                {/*style={styles.captureButton}*/}
                {/*onPress={this.takePicture}*/}
                {/*>*/}
                {/*<Image*/}
                {/*source={require('../assets/ic_photo_camera_36pt.png')}*/}
                {/*/>*/}
                {/*</TouchableOpacity>*/}
                {/*||*/}
                {/*null*/}
                {/*}*/}
                {/*<View style={styles.buttonsSpace}/>*/}
                {/*{*/}
                {/*!this.state.isRecording*/}
                {/*&&*/}
                {/*<TouchableOpacity*/}
                {/*style={styles.captureButton}*/}
                {/*onPress={this.startRecording}*/}
                {/*>*/}
                {/*<Image*/}
                {/*source={require('../assets/ic_videocam_36pt.png')}*/}
                {/*/>*/}
                {/*</TouchableOpacity>*/}
                {/*||*/}
                {/*<TouchableOpacity*/}
                {/*style={styles.captureButton}*/}
                {/*onPress={this.stopRecording}*/}
                {/*>*/}
                {/*<Image*/}
                {/*source={require('../assets/ic_stop_36pt.png')}*/}
                {/*/>*/}
                {/*</TouchableOpacity>*/}
                {/*}*/}
                {/*</View>*/}
            </View>
        );
    }

    //ios:{ path: 'assets-library://asset/asset.JPG?id=C7A7D82A-C0F9-4011-B920-3C5433189CBD&ext=JPG' }
    // takePicture() {
    //     const options = {};
    //     //options.location = ...
    //     this.camera.capture({
    //         metadata: options,
    //         jpegQuality:50,
    //
    //     })
    //         .then((data) => console.log(data))
    //         .catch(err => console.error(err));
    // }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    },
    centerBox: {
        position: 'absolute',
        top: 200,
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#29B6F6',
        backgroundColor: 'rgba(0,0,0,0.0)',
    },
    overlay: {
        position: 'absolute',
        padding: 16,
        right: 0,
        left: 0,
        alignItems: 'center',
    },
    topOverlay: {
        top: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomOverlay: {
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButton: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 40,
    },
    typeButton: {
        padding: 5,
    },
    flashButton: {
        padding: 5,
    },
    buttonsSpace: {
        width: 10,
    },
});
