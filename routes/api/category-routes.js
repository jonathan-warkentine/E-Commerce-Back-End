const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    res.status(200).json(await Category.findAll({
      include: Product
    }));
  }
  catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try{
    const categoryData = await Category.findByPk(req.params.id, {
      include: Product
    });

    if (!categoryData){
      res.status(404).json({error: 'no such category'});
    }
    else {
      res.status(200).json(categoryData);
    }
  }
  catch (error){
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    if (!categoryData){
      res.status(400).json({error: 'check your request'});
    }
    else {
      res.status(200).json(categoryData);
    }
  }
  catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!categoryData){
      res.status(404).json({error: 'no such category'})
    }
    else{
      res.status(200).json(categoryData)
    }
  }
  catch (error){
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData){
      res.status(404).json({error: 'no such category'});
    }
    else {
      res.status(200).json(categoryData);
    }
  }
  catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
