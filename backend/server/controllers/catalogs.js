import { db } from '../config';

const getAllCatalogs = (req, res, next) => {
  db.any('select * from catalogs ORDER BY id desc')
    .then(data => res.status(200).send(data))
    .catch(err => next(err));
};

const getCatalogById = (req, res, next) => {
  const id = parseInt(req.params.id);
  db.any('select * from purchases where catalogId = $1', id)
    .then(data => res.status(200).send(data))
    .catch(err => next(err));
};

const addCatalog = (req, res, next) => {
  db.one('insert into catalogs(name)' +
    'values(${name})  RETURNING id',
  req.body)
    .then(result => res.send(result))
    .catch(err => next(err));
};


const updateCatalog = (req, res, next) => {
  const id = parseInt(req.params.id);
  db.none('update catalogs set name=${name}' +
    `where id=${id}`,
  req.body)
    .then(() => res.sendStatus(200))
    .catch(err => next(err));
};

const removeCatalog = (req, res, next) => {
  const id = parseInt(req.params.id);
  db.result('delete from catalogs where id = $1', id)
    .then(() => res.sendStatus(200))
    .catch(err => next(err));
};

export default {
  getAllCatalogs,
  getCatalogById,
  addCatalog,
  updateCatalog,
  removeCatalog,
};
