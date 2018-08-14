import promise from 'bluebird';
import pgp from 'pg-promise';

const ConnectionString = process.env.DATABASE_URL || 'postgres://postgres:root@localhost:5432/shopping_list';

const db = pgp({ promiseLib: promise })(ConnectionString);

export { db };
