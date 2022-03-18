/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world Mutual' }
})

Route.resource('accounts', 'AccountsController').apiOnly()
Route.get('accounts/:id/movements', 'AccountsController.movement')
Route.post('movements/credit', 'MovementsController.credit')
Route.post('movements/debit', 'MovementsController.debit')
Route.post('movements/transfer', 'MovementsController.transfer')
Route.get('movements/account/:id/balance', 'MovementsController.balance')
