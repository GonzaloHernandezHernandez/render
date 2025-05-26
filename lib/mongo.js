const { MongoClient, ObjectId } = require('mongodb')
const USER = 'ghernandezheinf'
const PASSWORD = 'EbonkA3FAoiL3FjR'
const DB_NAME = 'pasaletras'
const MONGO_URI_ATLAS = `mongodb+srv://ghernandezheinf:EbonkA3FAoiL3FjR@cluster0.fj3d1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

class MongoLib {
    async connect() {
        if (MongoLib.connection != null) {
            return MongoLib.connection.db(DB_NAME)
        } else {
            try {
                MongoLib.connection = await MongoClient.connect(MONGO_URI_ATLAS)
                console.log('conectado a la bdd')
                return MongoLib.connection.db(DB_NAME)
            } catch(e){
                console.log('error en conexión a la bdd')
                throw e
            }
        }
    }

    async getQuestions(collection) {
        try {
            const db = await this.connect()
            const result = await db.collection(collection).find().toArray()
            return result
        } catch (error) {
            console.error('Question error:', error)
            throw new Error('Cannot get questions')
        }
    }

    async getQuestionById(collection, id) {
        try {
            const db = await this.connect()
            const result = await db.collection(collection).findOne({_id: new ObjectId(id)})
            return result
        } catch (error) {
            console.error('Question error: ', error)
            throw new Error('Cannot find question with id ', id)
        }
    }

    async updateQuestion(collection, id, question) {
        try {
            const db = await this.connect()
            const result = await db.collection(collection).updateOne(
                {_id: new ObjectId(id)}, 
                {$set: question})
            return result
        }
        catch(error){
            console.error('Question error: ', error)
            throw new Error('Cannot update question with id ', id)
        }
    }

    async addQuestion(collection, question){
        try{
            const db = await this.connect()
            const result = await db.collection(collection).insertOne(question)
            return result
        } catch(error){
            console.error('Question error: ', error)
            throw new Error('Cannot add question')
        }
    }

    async deleteQuestion(collection, id){
        try{
            const db = await this.connect()
            const result = await db.collection(collection).deleteOne({_id: new ObjectId(id)})
            return result.deletedCount > 0
        }catch(error){
            console.error('Question error: ', error)
            throw new Error('Cannot delete question with id ', id)
        }
    }
}

module.exports = MongoLib;
