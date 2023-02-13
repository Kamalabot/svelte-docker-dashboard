import postgres from 'postgres';
require('dotenv').config()
import { sequence } from '@sveltejs/kit/hooks'

export const handle = async ({ event, resolve }) => {
	//Connecting to the database in local environment
  console.log(postgres)
  const test = postgres(`postgres://postgres:thevwn@pipeline-tank.coc5gkht2i7a.us-east-1.rds.amazonaws.com:5432/test`,{
    idle_timeout: 10,
    max_lifetime: 60 * 10});
	
  const users = postgres(`postgres://postgres:thevwn@pipeline-tank.coc5gkht2i7a.us-east-1.rds.amazonaws.com:5432/users`,{
    idle_timeout: 10,
    max_lifetime: 60 * 10});
	
  const company_prog= postgres(`postgres://postgres:thevwn@pipeline-tank.coc5gkht2i7a.us-east-1.rds.amazonaws.com:5432/company_progress`,{
    idle_timeout: 10,
    max_lifetime: 60 * 10});

	//awaiting the event to resolve
	event.locals = {
		sql: test,
    sql1: users,
    sql2: company_prog
		}
	const response = await resolve(event);
	return response;
};
