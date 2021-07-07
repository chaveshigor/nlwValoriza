import {createConnection, getConnection} from 'typeorm';

const connection = {
  async create(){
    await createConnection()
  },

  async close(){
    await getConnection().close(); 
  },

  async clear(){
    const connection = getConnection();
    const entities = connection.entityMetadatas

    entities.map(async(entityName) => {
      const repository = connection.getRepository(entityName.name)
      try {
        await repository.query(`DELETE FROM ${entityName.tableName}`)
      } catch (error) {
        throw new Error(`Mensagem: ${error}`)
      }
    })
    // entities.forEach(async (entity) => {
    //   const repository = connection.getRepository(entity.name);
    //   try {
    //       //await repository.query(`TRUNCATE TABLE ${entity.tableName}`);
    //       // await repository.clear()
    //       console.log(entity.name)
    //   } catch (error) {
    //       throw new Error(`Error trying to clear the table ${entity.tableName}`)
    //   }
    // });
  },
};

export default connection;
