import postgres from 'postgres';

export const handle = async ({ event, resolve }) => {
	//Connecting to the database in local environment
  const source = postgres(`postgres://postgres:1234@127.0.0.1:5432/test`);
	
	//awaiting the event to resolve
	event.locals = {
		sql: source
		}
	const response = await resolve(event);
	return response;
};
