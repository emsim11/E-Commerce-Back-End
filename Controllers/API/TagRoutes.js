/* TAGS URL ENDPOINT: /API/Tags */

// Import Express Module and Initialize Router
const Router = require('express').Router();

// Import Dependencies
const { Product, ProductTag, Tag } = require('../../Models');

// GET ROUTE: Retrieve and List All Tags
Router.get('/', (req, res) => {
    try {
        Tag.findAll({
            include: [
                {
                    model: Product,
                    through: ProductTag
                }
            ]
        }).then((Tags) => res.status(200).json({ 
            Message: 'Tags Have Been Found!',
            Tags: Tags
        }));
    } catch (err) {
        console.log(err);
        res.status(500).json({ 
            Error: err, 
            Message: 'Server-side error occurred while processing the GET "/" Route request for retrieving all Tags.'
        });
    }
});

// GET ROUTE: Retrieve and List a Tag By ID
Router.get('/:id', (req, res) => {
    try {
        Tag.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Product,
                    through: ProductTag
                }
            ]
        })
            .then((TagByID) => res.status(200).json({ 
                Message: 'Tag With Specified ID Has Been Found!',
                TagByID: TagByID
            }))
            .catch((err) => res.status(404).json({ /* Status 404 Versus Status 400 Code */
                Error: err,
                Message: 'No Tag with the specified ID was found.'
            }));
    } catch (err) {
        console.log(err);
        res.status(500).json({
            Error: err,
            Message: 'Server-side error occurred while processing the GET "/:id" Route request for retrieving a Tag based on its ID.'
        });
    }
});

// POST ROUTE: Create and List New Tag
Router.post('/', (req, res) => {
    try {
        Tag.create(req.body)
            .then((NewTag) => res.status(200).json({ 
                Message: 'New Tag Has Been Added Successfully!',
                NewTag: NewTag
            }))
            .catch((err) => res.status(404).json({ /* Status 404 Versus Status 400 Code */
                Error: err,
                Message: 'The Tag you are trying to create already exists.' 
            }));
    } catch {
        console.log(err);
        res.status(500).json({ 
            Error: err,
            Message: 'Server-side error occurred while processing the POST "/" Route request for creating a New Tag.'
        });
    }
});

// PUT ROUTE: Update and List a Tag By ID
Router.put('/:id', (req, res) => {
    try {
        Tag.update(req.body, {
            where: {
                id: req.params.id
            }
        })
            .then((UpdatedTag) => res.status(200).json({
                Message: 'Tag With Specified ID Has Been Updated Successfully!',
                UpdatedTag: UpdatedTag
            }))
            .catch((err) => res.status(404).json({ /* Status 404 Versus Status 400 Code */
                Error: err,
                Message: 'The Tag you are trying to update was not found.'
            }));
    } catch (err) {
        console.log(err);
        res.status(500).json({
            Error: err,
            Message: 'Server-side error occurred while processing the PUT "/:id" Route request for updating a Tag based on its ID.'
        });
    }
});

// DELETE ROUTE: Delete a Tag By ID
Router.delete('/:id', (req, res) => {
    try {
        Tag.destroy({
            where: {
                id: req.params.id
            }
        })
            .then((DeletedTag) => res.status(200).json({
                Message: 'Tag With Specified ID Has Been Deleted Successfully!',
                DeletedTag: DeletedTag
            }))
            .catch((err) => res.status(404).json({ /* Status 404 Versus Status 400 Code */
                Error: err,
                Message: 'The Tag you are trying to delete was not found.'
            }));
    } catch (err) {
        res.status(500).json({
            Error: err,
            Message: 'Server-side error occurred while processing the DELETE "/:id" Route request for deleting a Tag based on its ID.'
        });
    }
});

// Export Tag Routes
module.exports = Router;