export const bootpy = `# boot.py - v1.0.5
import usb_cdc
import supervisor
import storage
import microcontroller
import io

# optional
# supervisor.set_next_stack_limit(4096 + 4096)
usb_cdc.enable(console=True, data=True)
# used to identify pog compatible keyboards while scanning com ports
supervisor.set_usb_identification("Pog", "Pog Keyboard")


# Open And Read Device Name
DeviceNameFile = io.open("DeviceName","r", encoding="utf-8")
DeviceName = DeviceNameFile.readline()
DeviceNameFile.close

if len(DeviceName) > 11:
  print("Warn: Device Name Too long, shortening")
  DeviceName = DeviceName[:11]


storage.remount("/", readonly=False)
storage.getmount("/").label = DeviceName
storage.remount("/", readonly=False)
storage.enable_usb_drive()

# index configs
# 0 - show usb drive | 0 false, 1 true
if microcontroller.nvm[0] == 0:
    storage.disable_usb_drive()
    storage.remount("/", False)
`
