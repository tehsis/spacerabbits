#!/bin/bash

set -e

cordova create com.bunnywars --link-to=dist
cd com.bunnywars
cordova platform add ios


