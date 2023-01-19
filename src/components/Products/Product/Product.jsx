import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

import useStyles from './styles';

const Product = ({ product, onAddToCart }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image='' title={product.name} />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        {Product.name}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        {Product.price.formatted_with_symbol}
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{ __html:product.description }} variant='bosy2' color='tectSecondaty' />
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton arial-label="Agregar al Carrito" onClick={() => onAddToCart (product.id, 1)}>
                    <AddShoppingCart/>
                </IconButton> 
            </CardActions>
        </Card>
  );
}

export default Product;