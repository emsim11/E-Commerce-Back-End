/* PRODUCTS URL ENDPOINT: /API/Products */

// Import Express Module and Initialize Router
const Router = require('express').Router();

// Import Dependencies
const { Category, Product, ProductTag, Tag } = require('../../Models');

// GET ROUTE: Retrieve and List All Products
Router.get('/', (req, res) => {
    try {
        Product.findAll({
            include: [
                Category,
                {
                    model: Tag,
                    through: ProductTag
                }
            ]
        }).then((Products) => res.status(200).json({ 
            Message: 'Products Have Been Found!',
            Products: Products
        }));
    } catch (err) {
        console.log(err);
        res.status(500).json({ 
            Error: err, 
            Message: 'Server-side error occurred while processing the GET "/" Route request for retrieving all Products.'
        });
    }
});

// GET ROUTE: Retrieve and List a Product By ID
Router.get('/:id', (req, res) => {
    try {
        Product.findOne({
            where: {
                id: req.params.id
            },
            include: [
                Category,
                {
                    model: Tag,
                    through: ProductTag
                }
            ]
        })
            .then((ProductByID) => res.status(200).json({ 
                Message: 'Product With Specified ID Has Been Found!',
                ProductByID: ProductByID
            }))
            .catch((err) => res.status(400).json({
                Error: err,
                Message: 'No Product with the specified ID was found.'
            }));
    } catch (err) {
        console.log(err);
        res.status(500).json({
            Error: err,
            Message: 'Server-side error occurred while processing the GET "/:id" Route request for retrieving a Product based on its ID.'
        });
    }
});

// POST ROUTE: Create and List New Product (Establish Product Tags Bulk Create Within ProductTag Model)
Router.post('/', (req, res) => {
    try {
        Product.create(req.body)
            .then((NewProduct) => {
                if (req.body.TagIDs && req.body.TagIDs.length) {
                    const ProductTagIDs = req.body.TagIDs.map((TagID) => {
                        return {
                            Product_Id: NewProduct.id,
                            TagID
                        }
                    });
                    return ProductTag.bulkCreate(ProductTagIDs);
                    res.status(200).json({ 
                        Message: 'New Product Has Been Added Successfully!',
                        NewProduct: NewProduct
                    });
                }
            })
                .then((ProductTagIDs) => res.status(200).json({
                    Message: 'New Product With Tag(s) Has Been Added Successfully!',
                    ProductTagIDs: ProductTagIDs
                }))
                .catch((err) => res.status(404).json({
                    Error: err,
                    Message: 'The Product_Name must have a value to create a New Product.' 
                }));
    } catch {
        console.log(err);
        res.status(500).json({ 
            Error: err,
            Message: 'Server-side error occurred while processing the POST "/" Route request for creating a New Product.'
        });
    }
});

// PUT ROUTE: Update and List a Product By ID
Router.put('/:id', (req, res) => {
    try {
        // Update Product Data
        Product.update(req.body, {
            where: {
                id: req.params.id
            }
        })
            .then((UpdatedProduct) => {
                if (req.body.TagIDs && req.body.TagIDs.length) {
                    ProductTag.findAll({
                        where: { Product_Id: req.params.id }
                    }).then((ProductTags) => {
                        // Create Filtered List of New Tag IDs
                        const ProductTagIDs = ProductTags.map(({ Tag_Id }) => Tag_Id);
                        const NewProductTags = req.body.TagIDs
                            .filter((Tag_Id) => !ProductTagIDs.includes(Tag_Id))
                            .map((Tag_Id) => {
                                return {
                                    Product_Id: req.params.id,
                                    Tag_Id
                                }
                            });
                        // Select Tags to Remove
                        const RemovedProductTags = ProductTags
                            .filter(({ Tag_Id }) => !req.body.TagIDs.includes(Tag_Id))
                            .map(({ id }) => id);
                        // Create NewProductTags and Delete RemovedProductTags
                        return Promise.all([
                            ProductTag.bulkCreate(NewProductTags),
                            ProductTag.destroy({ where: { id: RemovedProductTags } })
                        ]);
                    });
                };
                res.status(200).json({
                    Message: 'Product With Specified ID and its Tags Have Been Updated Successfully!',
                    UpdatedProduct: UpdatedProduct
                });
            })
            .catch((err) => res.status(404).json({
                Error: err,
                Message: 'The Product you are trying to update was not found.'
            }));
    } catch (err) {
        console.log(err);
        res.status(500).json({
            Error: err,
            Message: 'Server-side error occurred while processing the PUT "/:id" Route request for updating a Product based on its ID.'
        });
    }
});

// DELETE ROUTE: Delete a Product By ID
Router.delete('/:id', (req, res) => {
    try {
        Product.destroy({
            where: {
                id: req.params.id
            }
        })
            .then((DeletedProduct) => {
                console.log(`${DeletedProduct.Product_Name} has been deleted.`);
                res.status(200).json({
                    Message: 'Product With Specified ID Has Been Deleted Successfully!',
                    DeletedProduct: DeletedProduct
                });
            })
            .catch((err) => {
                console.log('ERROR:', err);
                res.status(404).json({
                    Error: err,
                    Message: 'The Product you are trying to delete was not found.'
                });
            });
    } catch (err) {
        console.log('ERROR:', err);
        res.status(500).json({
            Error: err,
            Message: 'Server-side error occurred while processing the DELETE "/:id" Route request for deleting a Product based on its ID.'
        });
    }
});

// Export Product Routes
module.exports = Router;