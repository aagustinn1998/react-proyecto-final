import React, { useState, useEffect } from 'react';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';


import { commerce } from '../../../lib/commerce';
import useStyles from './styles';
import Direccion from '../Direccion';
import Pago from '../Pago';

const steps = ['Direccion de envio', 'Detalles de pago'];


const Checkout = ({ cart, order, onCaptureCheckout, error  }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();
    const history = useHistory();

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const test = (data) => {
      setShippingData(data);
  
      nextStep();
    };

    


    useEffect(() => {
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, { type: 'cart'});
          
          setCheckoutToken(token);

        } catch {
          if (activeStep !== steps.length) history.push('/');
        }
      }; 

      generateToken();
    }, [cart]);



  let Confirmacion = () => (order.customer ? (
    <>
      <div>
        <Typography variant="h5">Gracias por su compra, {order.customer.firstname} {order.customer.lastname}!</Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2"> Pedido: {order.customer_reference}</Typography>
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">Volver a la Home</Button>
    </>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  ));

  if (error) {
    Confirmacion = () => (
      <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Volver a la </Button>
      </>
    );
  }

    const Form = () => activeStep === 0
        ? <Direccion checkoutToken={checkoutToken} nextStep={nextStep} setShippingData={setShippingData} test={test} />
        : <Pago checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} />

        return (
          <>
            <CssBaseline />
            <div className={classes.toolbar} />
            <main className={classes.layout}>
              <Paper className={classes.paper}>
                <Typography variant="h4" align="center">Checkout</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                {activeStep === steps.length ? <Confirmacion /> : checkoutToken && <Form />}
              </Paper>
            </main>
          </>
        );
      };
      

export default Checkout;