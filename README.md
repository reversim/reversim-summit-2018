# Website for Reversim Summit 2017
http://summit2017.reversim.com/

#### Authors:

* [Lidan Hifi](https://www.linkedin.com/in/lidan)
* [Amit Zur](https://github.com/amitzur)

#### Contributors:

* [Ori Harel](https://github.com/oriharel)

#### Getting started

Install:
```
$ yarn
```

Start:
This will start an API server connecting to local mongo db called `ReversimSummit` and listening on `5001`, and a webpack dev server which serves the frontend at port `3000`. 
```
$ yarn start
```

Import data:

You may import data for development. There's a shell script to do that, which takes `/data/*.json` files into your local mongo setup at the `ReversimSummit` db.
```
$ ./scripts/import_dev_db.sh
```

# License
MIT
