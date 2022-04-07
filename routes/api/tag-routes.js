const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll(
      {
        include: Product
      }
    );
  
    res.status(200).json(tagData);
  } catch (error){
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: Product
    })
  
    if (!tagData){
      res.status(404).json({error: "no such tag"})
    }
    else{
      res.status(200).json(tagData);
    }
  }
  catch (error){
    res.status(500).json(error);
  }
  
  

});

router.post('/', async (req, res) => {
  try {
    if (req.body){
      const newTag = await Tag.create(req.body);
      res.status(200).json(newTag)
    }
    else {
      res.status(400).json({error: 'no tag data provided'});
    }
  }
  catch (error){
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    if (!req.body){
      res.status(400).json({error: "no update data provided"});
    }
    else {
      const tagData = await Tag.update(req.body, {
        where: {
          id: req.params.id
        }
      });
      if (!tagData){
        res.status(404).json({error: 'no such tag'})
      } 
      else {
        res.status(200).json(tagData);
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    if (!req.params.id){
      res.status(400).json({error: 'no id provided'});
    }
    else {
      const tagData = await Tag.destroy({
        where: {
          id: req.params.id
        }
      });
      if (!tagData) {
        res.status(404).json({error: 'no such tag'})
      }
      else {
        res.status(200).json(tagData);
      }
    }
  } catch (error){
    res.status(500).json(error);
  }
});

module.exports = router;
