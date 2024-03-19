import express from "express"
import itemController from "../controller/itemController.js"


const itemRoute = express.Router()

itemRoute.route('/item/:id')
          .get(itemController.getItemById)
          .patch(itemController.updateItem)
          .delete(itemController.deleteItem)
          
itemRoute.post('/item/add',itemController.addItem)
export default itemRoute
