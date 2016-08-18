PATH := node_modules/.bin:$(PATH)
SHELL := /bin/bash

.FORCE:

all: .FORCE
	babel src -d lib
	npm shrinkwrap --production
	docker build -t jobstartinc/cthulhu:$(tag) .

clean:
	rimraf lib

test: .FORCE
	CONTAINER=$(docker run -d -e "PORT=8080" -p 8080:8080 jobstartinc/cthulhu:$(tag))
	mocha
	docker stop $CONTAINER

lint: .FORCE
	eslint src
	eslint test

publish: .FORCE
	docker push jobstartinc/cthulhu:$(tag)

development: .FORCE
	nodemon ./dev.js
