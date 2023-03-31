

import { Request, Response } from "express";


import cron from 'node-cron';
import generateWinner from '../dev/controllers/generateWinner';

cron.schedule('*/3 * * * *', async () => {
    try {
      // Call the generateWinner function here
      let req :Request = {} as Request;
      var res :Response= {} as Response;
      await generateWinner.generateWinner(req,res);
    } catch (err) {
      console.error(err);
    }
  });


