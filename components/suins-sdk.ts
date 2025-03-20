import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { SuinsClient } from '@/src/suins-client.js';
import { SuinsTransaction } from '@/src/suins-transaction.js';


(async () => {
	const network = 'testnet';
	
	const suiClient = new SuiClient({
		url: getFullnodeUrl(network), 
	});

	
	const suinsClient = new SuinsClient({
		client: suiClient,
		network,
	});

	
	console.log(await suinsClient.getPriceList());
	console.log(await suinsClient.getRenewalPriceList());
	console.log(await suinsClient.getCoinTypeDiscount());

	
	console.log('Domain Record: ', await suinsClient.getNameRecord('myname.sui'));

	
	const tx = new Transaction();
	const suinsTx = new SuinsTransaction(suinsClient, tx);
	const maxPaymentAmount = 5 * 1_000_000; 
	const [coin] = suinsTx.transaction.splitCoins('0xMyCoin', [maxPaymentAmount]);

	
	const coinConfig = suinsClient.config.coins.NS; 
	const priceInfoObjectId = (await suinsClient.getPriceInfoObject(tx, coinConfig.feed))[0];
	const nft = suinsTx.register({
		domain: 'myname.sui',
		years: 2,
		coinConfig,
		couponCode: 'fiveplus15percentoff',
		priceInfoObjectId,
		coin,
	});

	/* Registration Example Using USDC */
	// const coinConfig = suinsClient.config.coins.USDC; // Specify the coin type used for the transaction
	// const nft = suinsTx.register({
	// 	domain: 'myname.sui',
	// 	years: 2,
	// 	coinConfig,
	// 	coin,
	// });

	// /* Renew Example */
	// const coinConfig = suinsClient.config.coins.SUI; // Specify the coin type used for the transaction
	// const priceInfoObjectId = await suinsClient.getPriceInfoObject(tx, coinConfig.feed)[0];
	// suinsTx.renew({
	// 	nft: '0xMyNft',
	// 	years: 2,
	// 	coinConfig,
	// 	coin,
	// 	priceInfoObjectId,
	// });

	
	suinsTx.setTargetAddress({ nft, address: '0xMyAddress' });

	suinsTx.setDefault('myname.sui');

	suinsTx.setUserData({
		nft,
		value: 'hello',
		key: 'walrus_site_id',
	});

	
	suinsTx.transaction.transferObjects([nft], '0xMyAddress');

	suinsTx.transaction.transferObjects([coin], '0xMyAddress');

	/* Subname Example */
	// const subnameNft = suinsTx.createSubName({
	// 	parentNft: '0xMyParentNft',
	// 	name: 'name.myname.sui',
	// 	expirationTimestampMs: 1862491339394,
	// 	allowChildCreation: true,
	// 	allowTimeExtension: true,
	// });
	// suinsTx.transaction.transferObjects([subnameNft], 'YOUR_ADDRESS');

	/* Extend Subname Expiration */
	// suinsTx.extendExpiration({
	// 	nft: '0xMySubnameNft',
	// 	expirationTimestampMs: 1862511339394,
	// });
})();
