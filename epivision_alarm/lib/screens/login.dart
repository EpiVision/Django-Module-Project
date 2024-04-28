import 'package:epivision_alarm/screens/home.dart';
import 'package:flutter/material.dart';
import 'package:connect_to_sql_server_directly/connect_to_sql_server_directly.dart';
// import 'package:flutter/services.dart';
import 'package:flutter_otp_text_field/flutter_otp_text_field.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

// final dio = Dio();
// dynamic getToken(String api,int patientId) async {
//   final response = await dio.get(api,data: {'patientId': patientId});
//   return response.data;
// }
class _LoginPageState extends State<LoginPage> {
  List<TestModel> userLogin = [];
  List<TableRow> tableRowsList = [];
  bool isLoading = false;
  final _connectToSqlServerDirectlyPlugin = ConnectToSqlServerDirectly();
  final _nameController = TextEditingController();
  final _weightController = TextEditingController();

  @override
  void initState() {
    // getStudentsTableData();
    isLogin();
    super.initState();
  }

  void isLogin() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    final String? Id = prefs.getString('Id');
    final bool? repeat = prefs.getBool('login');
    if (repeat == true) {
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => HomePage(Id: Id,)),
      );
    }
  }

  void getStudentsTableData(String paircode) {
    setState(() {
      isLoading = true;
    });
    userLogin.clear();
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
      '3R6nhb87#',
      //instance
      // instance: 'node',
    )
        .then((value) {
      if (value) {
        try {
          _connectToSqlServerDirectlyPlugin
              .getRowsOfQueryResult(
                  "select * from AlarmDevices where paircode = ${paircode}")
              .then((value) async {
            if (value.runtimeType == String) {
              onError(value.toString());
            } else {
              List<Map<String, dynamic>> tempResult =
                  value.cast<Map<String, dynamic>>();
              for (var element in tempResult) {
                userLogin.add(
                  TestModel(
                      Id: element['Id'],
                      patientId: element['patientId'],
                      deviceName: element['deviceName'],
                      paircode: element['paircode']),
                );
                // getToken("${BASE_URL}getToken/",element['patientId']).then((value) async {
                //   if(value != null){

                final SharedPreferences prefs =
                    await SharedPreferences.getInstance();

                prefs.setBool('login', true);
                prefs.setString('Id', element['Id'].toString());
                // prefs.setString('token', value);
                return Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => HomePage(Id: element['Id'].toString())),
                );

                // createTableRows();
                // });
              }
              // createTableRows();
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

  void onError(String message) {
    setState(() {
      isLoading = false;
    });
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
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(12, 20, 12, 0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Image(
                  image: AssetImage('lib/images/logo.png'),
                  width: 200,
                ),
                SizedBox(height: MediaQuery.of(context).size.height * 0.23),
                Text(
                  'Pair Code',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 15),
                Container(
                  child: OtpTextField(
                    numberOfFields: 5,
                    borderColor: Colors.indigoAccent,
                    //set to true to show as box or false to show as dash
                    showFieldAsBox: true,
                    //runs when a code is typed in
                    onCodeChanged: (String code) {
                      //handle validation or checks here
                    },

                    //runs when every textfield is filled
                    onSubmit: (String verificationCode) {
                      handleSubmit(verificationCode);
                      showDialog(
                          context: context,
                          builder: (context) {
                            return AlertDialog(
                              title: Text("Login Status"),
                              content: Text('Authenticating...'),
                            );
                          });
                    }, // end onSubmit
                  ),
                ),
                SizedBox(height: 15),
                Text('Get Device Pair Code from your Web Portal',
                    style: TextStyle(fontSize: 12)),
              ],
            ),
          ),
        ),
      ),
    );
  }

  void handleSubmit(String verificationCode) {
    getStudentsTableData(verificationCode);
  }
}

class TestModel {
  final int Id;
  final int patientId;
  final String deviceName;
  final String paircode;

  TestModel({
    required this.Id,
    required this.patientId,
    required this.deviceName,
    required this.paircode,
  });
}
