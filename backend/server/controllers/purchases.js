import { db } from '../config';

const defaultPurchase = {
  name: '',
  quantity: '',
  cost: '',
  completed: false
};

const addPurchase = (req, res, next) => {
  req.body.catalogId = parseInt(req.params.id);
  req.body = { ...defaultPurchase, ...req.body };
  db.one('insert into purchases(catalogId, name, quantity, cost, completed)' +
    'values(${catalogId}, ${name}, ${quantity}, ${cost}, ${completed}) RETURNING id',
  req.body)
    .then(result => res.send(result))
    .catch(err => next(err));
};

const updatePurchase = (req, res, next) => {
  const id = parseInt(req.params.id);
  db.none('update purchases set name=${name}, quantity=${quantity}, cost=${cost}, completed=${completed}' +
    `where id=${id}`,
  req.body)
    .then(() => res.sendStatus(200))
    .catch(err => next(err));
};

const removePurchase = (req, res, next) => {
  const id = parseInt(req.params.id);
  db.result(`delete from purchases where id=${id}`)
    .then(() => res.sendStatus(200))
    .catch(err => next(err));
};

const updatePurchaseStatus = (req, res, next) => {
  const id = parseInt(req.params.id);
  const { status } = req.query;
  db.none(`update purchases set completed=${status} where id=${id}`)
    .then(() => res.sendStatus(200))
    .catch(err => next(err));
};

export default {
  addPurchase,
  updatePurchase,
  updatePurchaseStatus,
  removePurchase,
};
