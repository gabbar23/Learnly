import cron from 'node-cron';
import { Op } from 'sequelize';
//import generateWinner from '../controllers/generateWinner';
import { Auction } from '../dev/models/aunctionModel';

// schedule a cron job to run every minute
cron.schedule('* * * * *', async () => {
  try {
    // Find all auctions that have ended
    const auctions = await Auction.findAll({ where: { endTime: { [Op.lt]: new Date() } } });

    for (const auction of auctions) {
      console.log(`Auction ${auction.getDataValue("auctionId")} has ended. Generating winner...`);

      // call the generateWinner function for each ended auction
     // await generateWinner.generateWinner({ body: { auctionId: auction.getDataValue("auctionId") } }, { status: () => {}, json: () => {} });
    }
  } catch (err) {
    console.log(err);
  }
});
