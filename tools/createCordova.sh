#!/bin/bash

set -e

./node_modules/cordova/bin/cordova create com.bunnywars --link-to=dist
cd com.bunnywars
../node_modules/cordova/bin/cordova platform add ios


