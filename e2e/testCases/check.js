import { navigate } from './nav';
import { waitTextToBe, waitTextToNotAppear } from './testSteps/general';
/* consts */
import { actMenIds } from '../../screens/ActionMenu/testIds';
import { nativeIds } from '../../screens/NativeTestScreen/testIds';
import { notifTimeout } from './consts/general';

// simply checks for notification to appear or NOT appear
// via our workaround
export async function checkNotif(notAppear, timeout = notifTimeout) {
  // since when the notification comes up
  // our menu button(which we use for the testing screen)
  // cannot be seen, we need to open the testing screen
  // BEFORE the notification triggers, to see the results
  await navigate(actMenIds.testAct);

  if (notAppear) {
    await waitTextToNotAppear(nativeIds.mainText, 'true', 180000);
  } else {
    // and here we wait until our test screen shows the
    // words 'true' meaning the notification has opened
    await waitTextToBe(nativeIds.mainText, 'true', timeout);
  }
}
