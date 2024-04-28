import 'package:flutter/material.dart';
import 'package:flutter_background_service/flutter_background_service.dart';
import 'package:flutter_ringtone_player/flutter_ringtone_player.dart';
import 'package:connect_to_sql_server_directly/connect_to_sql_server_directly.dart';
import 'dart:async';

import 'package:shared_preferences/shared_preferences.dart';

class HomePage extends StatefulWidget {
  final String? Id;
  const HomePage({super.key, required this.Id});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final _connectToSqlServerDirectlyPlugin = ConnectToSqlServerDirectly();
  var alarmID = 0;

  void getAlarms() {
    _connectToSqlServerDirectlyPlugin
        .initializeConnection(
            //serverIp
            //Your serverIp
            '65.108.97.18',
            //Your databaseName
            'epivisiondb',
            //Your username
            'epivisionuser',
            //Your password
            '3R6nhb87#')
        .then((value) {
      if (value) {
        try {
          _connectToSqlServerDirectlyPlugin
              .getRowsOfQueryResult("select * from Alarms where status = 1")
              .then((value) async {
            if (value.runtimeType == String) {
              onError(value.toString());
            } else {
              List<Map<String, dynamic>> tempResult =
                  value.cast<Map<String, dynamic>>();
              for (var element in tempResult) {
                setState(() {
                  alarmID = element['Id'];
                });

                FlutterRingtonePlayer.playAlarm();
                break;
              }
              if (alarmID == 0) {
                Timer(Duration(seconds: 1), () => getAlarms());
              }
            }
          });
        } catch (error) {
          onError(error.toString());
        }
      } else {
        onError('Failed to Connect!');
      }
    });
  }

  Future<bool> updateAlarm() async {
    bool result = false;
    _connectToSqlServerDirectlyPlugin
        .initializeConnection(
      //Your serverIp
      '65.108.97.18',
      //Your databaseName
      'epivisiondb',
      //Your username
      'epivisionuser',
      //Your password
      '3R6nhb87#',
      //Your instance
      // instance: 'node',
    )
        .then((value) {
      if (value) {
        try {
          _connectToSqlServerDirectlyPlugin
              .getStatusOfQueryResult(
                  "update Alarms SET [status] = 0, stoppedBy = ${widget.Id}, stopTime='${DateTime.now()}' where Id = $alarmID")
              .then((value) {
            if (value.runtimeType == String) {
              onError(value.toString());
            } else {
              result = value;
              if (value) {
                setState(() {
                  alarmID = 0;
                });
                getAlarms();
              }
            }
          });
        } catch (error) {
          onError(error.toString());
        }
      } else {
        onError('Failed to Update Alarm Status!');
      }
    });
    return result;
  }

  Future<List<Map<String, dynamic>>> getHistory() async {
    List<Map<String, dynamic>> tempResult = [];
    _connectToSqlServerDirectlyPlugin
        .initializeConnection(
      //Your serverIp
      '65.108.97.18',
      //Your databaseName
      'epivisiondb',
      //Your username
      'epivisionuser',
      //Your password
      '3R6nhb87#',
      //Your instance
      // instance: 'node',
    )
        .then((value) {
      if (value) {
        try {
          _connectToSqlServerDirectlyPlugin
              .getStatusOfQueryResult(
                  "select * from Alarms A join AlarmDevices AD on A.stoppedBy = AD.Id")
              .then((value) {
            if (value.runtimeType == String) {
              onError(value.toString());
            } else {
              tempResult = value.cast<Map<String, dynamic>>();
            }
          });
        } catch (error) {
          onError(error.toString());
        }
      } else {
        onError('Failed to Update Alarm Status!');
      }
    });
    return tempResult;
  }

  void onError(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        backgroundColor: Colors.red,
        duration: const Duration(seconds: 6),
        padding: const EdgeInsets.all(8.0),
        content: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Expanded(
              child: Text(
                message,
                style: const TextStyle(
                    color: Colors.white, fontWeight: FontWeight.bold),
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  void initState() {
    // TODO: implement initState
    getAlarms();
    // const oneSec = Duration(seconds:1);
    // Timer.periodic(oneSec, (Timer t) => getAlarms());
    super.initState();
  }

  var h = 150.0;

  String text = "Stop Service";
  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: Scaffold(
            body: Column(
      // mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Row(
          // crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Padding(
              padding: const EdgeInsets.all(16.0),
              child:
                  Image(image: AssetImage('lib/images/logo.png'), width: 100),
            ),
          ],
        ),
        const SizedBox(height: 20),
        Expanded(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      IconButton(
                        tooltip: 'Foreground Mode',
                        icon: const Icon(Icons.visibility,),
                        // child: const Text("Foreground Mode"),
                        onPressed: () {
                          FlutterBackgroundService().invoke("setAsForeground");
                        },
                      ),
                      IconButton(
                        tooltip: 'Background Mode',
                        icon: const Icon(Icons.visibility_off),
                        // child: const Text("Background Mode"),
                        onPressed: () {
                          FlutterBackgroundService().invoke("setAsBackground");
                        },
                      ),
                      IconButton(
                        tooltip: text,
                        icon: text == 'Stop Service'? Icon(Icons.pause): Icon(Icons.play_arrow),
                        // child: Text(text),
                        onPressed: () async {
                          final service = FlutterBackgroundService();
                          var isRunning = await service.isRunning();
                          if (isRunning) {
                            service.invoke("stopService");
                          } else {
                            service.startService();
                          }

                          if (!isRunning) {
                            text = 'Stop Service';
                          } else {
                            text = 'Start Service';
                          }
                          setState(() {});
                        },
                      ),
                    ],
                  ),
                  AnimatedContainer(
                      duration: const Duration(seconds: 1),
                      width: 200,
                      height: 200,
                      decoration: BoxDecoration(
                        color: Colors.indigo.shade50,
                        shape: BoxShape.circle,
                      ),
                      child: Center(
                          child: Container(
                        width: h,
                        height: h,
                        decoration: BoxDecoration(
                          color: Colors.deepPurple,
                          shape: BoxShape.circle,
                        ),
                        child: Center(
                            child: alarmID == 0
                                ? Icon(Icons.alarm_off,
                                    size: 70, color: Colors.white)
                                : Icon(Icons.alarm,
                                    size: 70, color: Colors.white)),
                      ))),
                  const SizedBox(height: 20),
                  Text(
                      alarmID == 0
                          ? 'Listening for Alarms ...'
                          : 'Alarm is Ringing',
                      style: TextStyle()),
                ],
              ),
              const SizedBox(height: 20),
              Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                ElevatedButton(
                    onPressed: () {
                      getAlarms();
                    },
                    child: Text("Refresh")),
                const SizedBox(width: 20),
                FilledButton(
                    style: ButtonStyle(
                        backgroundColor:
                            MaterialStateProperty.all(Colors.deepPurple)),
                    onPressed: () {
                      if (alarmID == 0) {
                        FlutterRingtonePlayer.stop();
                      } else {
                        FlutterRingtonePlayer.stop();
                        updateAlarm();
                      }
                    },
                    child: Text("Stop", style: TextStyle(color: Colors.white)))
              ]),
            ],
          ),
        ),
        const SizedBox(height: 40),
      ],
    )));
  }
}
