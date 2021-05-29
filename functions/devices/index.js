const pattern = /^My .+ Device$/g;

const detectType = (mac, ip, bssids, gateway) => {
  if (ip === gateway) {
    return 'network';
  }

  if (bssids.some((bssid) => bssid.toLowerCase().slice(0, 8) === mac.toLowerCase().slice(0, 8))) {
    return 'connecting';
  }

  return 'end';
};

exports.aggregateDevices = async (snap) => {
  const { db } = require('../_helpers/initialize_admin');

  const {
    pid, discovered, config, nid,
  } = snap.data();

  const newDevices = [];
  const existingDevices = (await db.collection('Devices').where('pid', '==', pid).get()).docs
    .map((existingDoc) => ({
      ...existingDoc.data(),
      id: existingDoc.id,
    }));

  await Promise.all(discovered.map(async ({
    mac, ip, timestamp, name, manufacturer, model,
  }) => {
    if (mac) { // devices without MAC addresses cannot uniquely be identified
      const index = existingDevices.findIndex((existingDevice) => existingDevice.mac === mac);

      let deviceDoc = null;

      if (index > -1) { // existing device found
        deviceDoc = existingDevices[index];

        // remove found device so that at the end, all remaining devices can be marked as inactive
        existingDevices.splice(index, 1);
      }

      let { bssids } = config;

      // backgrounded scans may not have BSSIDs
      if (!bssids) {
        bssids = (await db.collection('Profiles').doc(pid).get()).networks[nid].bssids;
      }

      const lastOnline = timestamp[timestamp.length - 1];

      if (deviceDoc) { // already a doc for device of this MAC address
        const updatedDevice = {
          ...deviceDoc,
          lastOnline,
          status: 'active',
        };

        if ((!updatedDevice.manufacturer || updatedDevice.manufacturer !== manufacturer)
          && manufacturer) {
          updatedDevice.manufacturer = manufacturer;
        }

        if ((!updatedDevice.model || updatedDevice.model !== model)
          && model) {
          updatedDevice.model = model;
        }

        // if no name in previous device OR previous device used manufacturer to autogenerate name
        // and now a real name is found
        if ((!updatedDevice.name || updatedDevice.name.match(pattern)
          || updatedDevice.name !== name) && name) {
          updatedDevice.name = name;
        }

        // if device switched networks (brought to second house, etc.)
        if (updatedDevice.nid !== nid) {
          updatedDevice.nid = nid;
        }

        return db.collection('Devices').doc(deviceDoc.id).set(updatedDevice);
      }

      // else create new device doc
      deviceDoc = db.collection('Devices').doc();

      const newDevice = {
        ref: deviceDoc,
        mac,
        discovered: timestamp[0],
        status: 'active',
        name: name || (manufacturer ? `My ${manufacturer} Device` : 'My Device'),
        lastOnline,
        type: detectType(mac, ip, bssids, config.gateway),
        pid,
        nid,
      };

      if (manufacturer) newDevice.manufacturer = manufacturer;

      if (model) newDevice.model = model;

      newDevices.push(newDevice);
    }

    return null;
  }));

  // add docs for new devices
  await Promise.all(newDevices.map((device) => {
    const newDevice = { ...device };

    delete newDevice.ref;

    return device.ref.set(newDevice);
  }));

  // update status of remaining devices that appeared in last scan but not this one
  await Promise.all(existingDevices.map((device) => {
    const updatedDevice = {
      ...device,
      status: 'inactive',
    };

    return db.collection('Devices').doc(device.id).set(updatedDevice);
  }));
};
