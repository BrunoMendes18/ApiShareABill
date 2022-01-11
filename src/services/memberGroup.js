module.exports = (app) => {
    
    const save = async (membrosGrupo) => {

        return await app.db('membrosGrupo').insert(membrosGrupo);
    }

    return { save };
}