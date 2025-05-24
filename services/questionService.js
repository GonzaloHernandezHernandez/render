const MongoLib = require("../lib/mongo");

class QuestionsService {
  constructor() {
    this.collection = 'questions';
    this.mongoDB = new MongoLib();
  }

  async getQuestions() {
    return await this.mongoDB.getQuestions(this.collection)
  }

  async getQuestionById(id) {
    return await this.mongoDB.getQuestionById(this.collection, id)
  }

  async updateQuestion(id, question){
    return await this.mongoDB.updateQuestion(this.collection, id, question)
  }

  async addQuestion(question){
    return await this.mongoDB.addQuestion(this.collection, question)
  }

  async deleteQuestion(id){
    return await this.mongoDB.deleteQuestion(this.collection, id)
  }
}

module.exports = QuestionsService;