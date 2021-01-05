// mainly a workaround module to test some things,
// like notifications, which detox does not have support for
import React from 'react';
import { View, Text, NativeEventEmitter, NativeModules } from 'react-native';
import NativeTest from '../../NativeTest';
/* style */
import { screenContainer } from '../../styles/generalStyles';
import { natTest } from './style';
/* consts */
import { nativeIds } from './testIds';
import { GenButton } from './../../components/GenButton/index';

// SOOO this module should only be opened when it can check a validation
// of something.
// In the current example/current state as it is, it will check if a notification
// is open and if it is open, then it will print out 'true' else 'false'
// IMPORTANT - it needs to be opened BEFORE the notification shoots out.
export const NativeTestScreen = (props) => {
  const [natResp, setNatResp] = React.useState('false');
  const [mainTimIds, setMainTimIds] = React.useState(null);

  const checkIfNotifOpened = async () => {
    NativeTest.isNotifOpen(mainTimIds[0], () => {
      setNatResp('gone');
    });
  };

  const dismissNotif = async () => {
    // so here after we receive the notification we dismiss it
    NativeTest.dismissNotif(mainTimIds[0], () => {
      // and here we check if it actuall has been dismissed
      // with a little timeout of 3 seconds
      setTimeout(checkIfNotifOpened, 3000);
    });
  };

  const dontRemNotif = async () => {
    // so here after we receive the notification we dismiss it
    NativeTest.dontRemNotif(mainTimIds[0], () => {
      // and here we check if it actuall has been dismissed
      // with a little timeout of 3 seconds
      setTimeout(checkIfNotifOpened, 3000);
    });
  };

  React.useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.NativeTest);
    const eventListener = eventEmitter.addListener(
      'notifOpened',
      (mainTimeIds) => {
        setNatResp('true');
        setMainTimIds(mainTimeIds);
      }
    );

    return () => {
      eventListener.remove();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={screenContainer.style}>
      <Text style={natTest.mainText} testID={nativeIds.mainText}>
        {natResp}
      </Text>
      <GenButton
        testID={nativeIds.natDisNotif}
        // we time out this so we could see the notification
        // in the test, cause its removed waaay fast
        onPress={() => setTimeout(dismissNotif, 2000)}
        text="Dismiss notif"
      />
      <GenButton
        testID={nativeIds.dontRemNot}
        // we time out this so we could see the notification
        // in the test, cause its removed waaay fast
        onPress={() => setTimeout(dontRemNotif, 2000)}
        text="Dont rem notif"
      />
    </View>
  );
};
