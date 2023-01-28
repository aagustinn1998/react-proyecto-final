import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography} from '@material-ui/core';

import useStyles from './styles';
import Direccion from '../Direccion';
import Pago from '../Pago';

const steps = ['Shipping address', 'Payment details'];


const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const classes = useStyles();

    const Confirmacion = () => (
      <div>
        Confirmacion
      </div>
    );

    const Form = () => activeStep === 0
        ? <Direccion  />
        : <Pago  />

    return (
        <>
          <div className={classes.toolbar} />
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Typography variant="h4" align="center">Checkout</Typography>
              <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map((step) => (
                  <Step key={step}>
                    <StepLabel>{step}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length ? <Confirmacion /> : <Form />}
            </Paper>
          </main>
        </>
      );
};

export default Checkout;