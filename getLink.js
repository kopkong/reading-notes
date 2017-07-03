/**
 * Created by colin on 2017/7/3.
 */

const path = require('path');
const fs   = require('fs');
const querystring = require('querystring');

fs.readdir(__dirname, (err, files) => {
    files.forEach(file => {
        fs.stat(file, (err, stat) => {
            if(stat.isDirectory()){
                // read mds
                fs.readdir(file, (err, mds) => {
                    mds.forEach(md => {
                        if(md.indexOf('.md') !== -1){
                            let title = '* [' + md.replace('.md','') + '](https://github.com/kopkong/reading-notes/blob/master/';

                            title += querystring.escape(file) + '/' + querystring.escape(md) + ')';
                            console.log(title);
                        }
                    })

                });
            }
        });
    });
});


