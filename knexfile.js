module.exports={
    test:{
        client:'pg',
        connection:{
            host:'localhost',
            user:'postgres',
            password:'brunojesus18hd',
            database:'shareabill',
        },
        debug:true,
        migrations: {
            directory:'src/migrations',
        },
        pool:{
            min:0,
            max:50,
            propagateCreateError:false,
        },
    },
};