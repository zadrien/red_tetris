# Red Tetris

An online multiplayer game

![image](./docs/1.jpg)
![image](./docs/2.jpg)
![image](./docs/3.jpg)

### Development Mode

#### Launch Server

```
$ npm run  srv-dev
> red_tetrisboilerplate@0.0.1 srv-dev /home/zadrien/JS/red_tetris
> DEBUG=tetris:* nodemon src/server/start.js
```

#### Launch Client

```
$ npm run client-dev
> red_tetrisboilerplate@0.0.1 client-dev /home/zadrien/JS/red_tetris
> react-scripts start
```


Point your browser to `http://0.0.0.0:8080/` it will load client side application. You should see `Soon, will be here a fantastic Tetris ...`, open your console and check you have :

```
[HMR] Waiting for update signal from WDS...
bundle.js:28328  action @ 14:29:58.602 ALERT_POP 
bundle.js:28340  prev state Object
bundle.js:28344  action Object
bundle.js:28352  next state Object
bundle.js:616 [WDS] Hot Module Replacement enabled.
```

URL is not yet editable in `params.js`, change it directly inside `package.json`.

As you can guess we are using webpack `hot reload` module, try to update any file under `src/client` and your browser should reload your code.

```
     Updated: 2020/01/16 10:15:35 by zadrien          ###   ########.fr         
```


#### Test

Test, test and re-test …

Stop server, or use an other setup (//TODO)
```
$ npm run test
```