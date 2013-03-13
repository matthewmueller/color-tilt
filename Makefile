all:
	@npm install
	@component install
	@component build

start:
	@node app.js 9000

clean:
	rm -rf build components node_modules
