// IMPORTANT FLOW OF LOGIC TEST CASE - each test case is an arrangement of testSteps.
// it can ofcourse implement other testcases into it

import { hasTxt, pressItem, reload, waitTextToBe } from './testSteps/general';
/* consts */
import { homeIds } from './../../screens/home/testIds';
import { nativeIds } from './../../screens/NativeTestScreen/testIds';
import { notifTimeout } from './consts/general';

// openApp
export async function openApp() {
  await reload();
  await hasTxt('Welcome to the homescreen', homeIds.homeTxt);
}

// dismisses notification via our work around
// and checks if it was successfull
export async function dismissNotif() {
  // so here we dismiss the notification
  await pressItem(nativeIds.natDisNotif);
  // and here we wait to check for the notification to actually be gone
  await waitTextToBe(nativeIds.mainText, 'gone', notifTimeout);
}
