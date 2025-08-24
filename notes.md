# Notes

## Installation
Installation of NVM and Node
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
```
```
curl -sL https://deb.nodesource.com/setup_16.x -o /tmp/nodesource_setup.sh
sudo bash /tmp/nodesource_setup.sh
sudo apt-get install nodejs
```
Node Installation [on the Pi](https://github.com/sdesalas/node-pi-zero).

Starting the doorguard service:
```bash
npm run start:dev
```
To automatically start doorguard on boot, copy `doorguard.service` to `/etc/systemd/system/`
and enable it using `systemd enable doorguard.service`.

## Port Forwarding
Forward incoming port 80 to port 8080 
so no extra privileges need to be granted to out application, 
since port 80 needs special permissions and port 8080 does not.
- Install necessary packages
```bash
apt install iptables-persistent
```
- Route port 80 to port 8080 for LAN, Wifi and localhost connections via IPv4 and IPv6
```bash
iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
iptables -A PREROUTING -t nat -i wlan0 -p tcp --dport 80 -j REDIRECT --to-port 8080
iptables -t nat -A OUTPUT -o lo -p tcp --dport 80 -j REDIRECT --to-port 8080
ip6tables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
ip6tables -A PREROUTING -t nat -i wlan0 -p tcp --dport 80 -j REDIRECT --to-port 8080
ip6tables -t nat -A OUTPUT -o lo -p tcp --dport 80 -j REDIRECT --to-port 8080
```
- Make changes permanent
```bash
iptables-save > /etc/iptables/rules.v4
ip6tables-save > /etc/iptables/rules.v6
```

## Turn off onboard LED
```bash
echo 0 > /sys/class/leds/ACT/brightness
echo 0 > /sys/class/leds/default-on/brightness
```
to turn off the LED permamently, add
`dtparam=act_led_trigger=none` and 
`dtparam=act_led_activelow=on` to 
`/boot/config.txt`.

## Enable "Headphone Jack"
The Raspberry Pi we chose does not have a headphone jack, 
even tho the hardware would support it. 
We turn it back on and add the required hardware ourselves. 
The audio will be a digital pwm signal 
where the pwm frequency needs to be filtered out to create the analog audio.
 
Add the following to `/boot/firmware/config.txt` (/boot/config.txt is deprecated)
```
[all]
# enable headphone jack
dtoverlay=audremap,enable_jack=on
dtoverlay=pwm-2chan,pin=18,func=2,pin2=13,func2=4
```