HTMLOPTIMIZER = ./node_modules/minimize/bin/minimize
HTMLOPTIMIZERFLAGS = '--output'
CC = ./node_modules/webpack/bin/webpack.js 
CCFLAGS = '--watch'
CP = cp
SERVER = ./node_modules/http-server/bin/http-server
SRCFOLDER = src
BUILDFOLDER = dist
NPM = npm
NPMFLAGS = i
TSD = ./node_modules/tsd/build/cli.js
TSDFLAGS = install

all: build

dev: $(BUILDFOLDER)/index.html $(BUILDFOLDER)/bunnywars.ts-dev $(BUILDFOLDER)/phaser.min.js run-server

build: js-dependencies ts-dependencies $(BUILDFOLDER)/index.html $(BUILDFOLDER)/bunnywars.ts $(BUILDFOLDER)/phaser.min.js

js-dependencies: node_modules/
	$(NPM) $(NPMFLAGS)

ts-dependencies: typings/
	$(TSD) $(TSDFLAGS)

$(BUILDFOLDER)/index.html: $(SRCFOLDER)/index.html
	$(HTMLOPTIMIZER) $(HTMLOPTIMIZERFLAGS) $@ $^ 

$(BUILDFOLDER)/bunnywars.ts: $(wildcard **/*.ts)
	$(CC)

$(BUILDFOLDER)/bunnywars.ts-dev:
	$(CC) $(CCFLGAS)

$(BUILDFOLDER)/phaser.min.js: ./node_modules/phaser/build/phaser.min.js
	$(CP) $^ $@

run-server:
	$(SERVER) $(BUILDFOLDER)

clean:
	rm -r dist/
