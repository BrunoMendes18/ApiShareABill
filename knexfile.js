module.exports={
    test:{
        client:'pg',
        connection:{
            host:'localhost',
            user:'postgres',
            password:'PASword!', /* colocar a vossa pass */
            database:'apishareabill',
        },
        debug:true,
        migrations: {
            directory:'src/migrations',
        },
        seeds: {
            directory:'src/seeds',
        },
        pool:{
            min:0,
            max:50,
            propagateCreateError:false,
        },
    },
};