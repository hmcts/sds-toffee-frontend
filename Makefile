
.DEFAULT=all

build:
	docker build --no-cache -t hmcts/rhubarb-frontend .

run:
	docker run --rm -p 1337:1337 hmcts/rhubarb-frontend:latest