/* CATEGORIES URL ENDPOINT: /API/Categories */

// Import Express Module and Initialize Router
const Router = require('express').Router();

// Import Dependencies
const { Category, Product } = require('../../Models');

// GET ROUTE: Retrieve and List All Categories
Router.get('/', (req, res) => {
    try {
        Category.findAll({
            include: [Product]
        }).then((Categories) => res.status(200).json({ 
            Message: 'Categories Have Been Found!',
            Categories: Categories
        }));
    } catch (err) {
        console.log(err);
        res.status(500).json({ 
            Error: err, 
            Message: 'Server-side error occurred while processing the GET "/" Route request for retrieving all Categories.'
        });
    }
});

// GET ROUTE: Retrieve and List a Category By ID
Router.get('/:id', (req, res) => {
    try {
        Category.findOne({
            where: {
                id: req.params.id
            },
            include: [Product]
        })
            .then((CategoryByID) => res.status(200).json({ 
                Message: 'Category With Specified ID Has Been Found!',
                CategoryByID: CategoryByID
            }))
            .catch((err) => res.status(400).json({
                Error: err,
                Message: 'No Category with the specified ID was found.'
            }));
    } catch (err) {
        console.log(err);
        res.status(500).json({
            Error: err,
            Message: 'Server-side error occurred while processing the GET "/:id" Route request for retrieving a Category based on its ID.'
        });
    }
});

// POST ROUTE: Create and List New Category
Router.post('/', (req, res) => {
    try {
        Category.create(req.body)
            .then((NewCategory) => res.status(200).json({ 
                Message: 'New Category Has Been Added Successfully!',
                NewCategory: NewCategory
            }))
            .catch((err) => res.status(400).json({ 
                Error: err,
                Message: 'The Category you are trying to create already exists.' 
            }));
    } catch {
        console.log(err);
        res.status(500).json({ 
            Error: err,
            Message: 'Server-side error occurred while processing the POST "/" Route request for creating a New Category.'
        });
    }
});

// PUT ROUTE: Update and List a Category By ID
Router.put('/:id', (req, res) => {
    try {
        Category.update(req.body, {
            where: {
                id: req.params.id
            }
        })
            .then((UpdatedCategory) => res.status(200).json({
                Message: 'Category With Specified ID Has Been Updated Successfully!',
                UpdatedCategory: UpdatedCategory
            }))
            .catch((err) => res.status(400).json({
                Error: err,
                Message: 'The Category you are trying to update was not found.'
            }));
    } catch (err) {
        console.log(err);
        res.status(500).json({
            Error: err,
            Message: 'Server-side error occurred while processing the PUT "/:id" Route request for updating a Category based on its ID.'
        });
    }
});

// DELETE ROUTE: Delete a Category By ID
Router.delete('/:id', (req, res) => {
    try {
        Category.destroy({
            where: {
                id: req.params.id
            }
        })
            .then((DeletedCategory) => res.status(200).json({
                Message: 'Category With Specified ID Has Been Deleted Successfully!',
                DeletedCategory: DeletedCategory
            }))
            .catch((err) => res.status(400).json({
                Error: err,
                Message: 'The Category you are trying to delete was not found.'
            }));
    } catch (err) {
        res.status(500).json({
            Error: err,
            Message: 'Server-side error occurred while processing the DELETE "/:id" Route request for deleting a Category based on its ID.'
        });
    }
});

// Export Category Routes
module.exports = Router;