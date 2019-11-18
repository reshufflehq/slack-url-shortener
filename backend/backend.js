import * as db from '@reshuffle/db';


/* 
  import { get, update, remove, Q, find } from '@reshuffle/db';
 */


const LINKS = 'links';
const allKeysQuery = db.Q.filter(db.Q.key.startsWith(LINKS+`/`));
const connected = 'connected';


/* @expose */
export async function addNewUrl(phrase, link) {
  const added = await db.update(`${LINKS}/${phrase}`, (prev_value) => { return link; });
  return db.find(allKeysQuery);
}


/* @expose */
export async function deleteLink(url) {
  return db.remove(url);
}


/* @expose */
export async function checkIsConnected() {
  return db.get(connected);
}

/**
 * List of all urls
 *
 * @return { array } - list with all links
 */
/* @expose */
export async function getLinks() {
  return db.find(allKeysQuery) || [];
}

