// IMPORTANT FLOW OF LOGIC TEST STEPS - these are aranges of actions
// and expects to form some sort of a step

export async function reload() {
  await device.reloadReactNative();
}

export async function pressBack() {
  await device.pressBack();
}

export async function toBackground() {
  await device.sendToHome();
}

// checks if element is visible
export async function elVis(idStr) {
  await expect(element(by.id(idStr))).toBeVisible();
}

export async function elNotVis(idStr) {
  await expect(element(by.id(idStr))).not.toBeVisible();
}

// waits for element to become visible
export async function waitElVis(idStr, timeOut) {
  await waitFor(element(by.id(idStr)))
    .toBeVisible()
    .withTimeout(timeOut);
}

// waits for element to dissapear
export async function waitElNotVis(idStr, timeOut) {
  await waitFor(element(by.id(idStr)))
    .not.toBeVisible()
    .withTimeout(timeOut);
}

// waits for text to become the passed in text
// mainly used with the test screen UI
export async function waitTextToBe(idStr, txt, timeOut) {
  await waitFor(element(by.id(idStr)))
    .toHaveText(txt)
    .withTimeout(timeOut);
}

// test step to wait for a specified text to NOT appear
// for a given amount of time in milliseconds
export async function waitTextToNotAppear(idStr, txt, timeOut) {
  // hacky way again but it works lol
  try {
    await waitFor(element(by.id(idStr)))
      .toHaveText(txt)
      .withTimeout(timeOut);

    throw `Text '${txt}' with id '${idStr}' appeared before the set timeout: ${timeOut}`;
  } catch (err) {
    if (!err.message && err.indexOf('before the set timeout') !== -1) {
      throw err;
    } else {
      return true;
    }
  }
}

// checks if text is visible
export async function txtVis(txt) {
  await expect(element(by.text(txt))).toBeVisible();
}

export async function txtNotVis(txt) {
  await expect(element(by.text(txt))).not.toBeVisible();
}

// checks if elements has text
export async function hasTxt(txt, idStr) {
  await expect(element(by.id(idStr))).toHaveText(txt);
}

// checks if contains text
export async function containTxt(txt, idStr) {
  // this is hacky right now, because there's no other way
  // to check if something CONTAINS text
  try {
    await hasTxt(txt, idStr);
  } catch (error) {
    const errMsg = error.message.toString();
    const startInd = errMsg.indexOf('text=') + 5;
    const txtPart = errMsg.substring(startInd);
    const endInd = txtPart.indexOf(',');
    const elementText = txtPart.substring(0, endInd);

    if (elementText.indexOf(txt) !== -1) {
      return true;
    }

    throw `Element '${idStr}' does NOT contain '${txt}'`;
  }
}

export async function longPressIt(idStr) {
  // setting to 2secs, cause of debuging time differences n stuff
  await element(by.id(idStr)).longPress(2000);
}

export async function pressItem(idStr) {
  await element(by.id(idStr)).tap();
}

export async function typeText(idStr, txt) {
  await element(by.id(idStr)).typeText(txt);
}

// note we use clear text and type text here
// to immitate more of user actions as when you use
// typeText the keyboard actually appears instead of
// just using the replace text functionality
export async function replaceTxt(idStr, txt) {
  await element(by.id(idStr)).clearText();
  await element(by.id(idStr)).typeText(txt);
}
